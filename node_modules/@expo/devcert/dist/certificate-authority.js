"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = installCertificateAuthority;
exports.withCertificateAuthorityCredentials = withCertificateAuthorityCredentials;
exports.ensureCACertReadable = ensureCACertReadable;
exports.uninstall = uninstall;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const debug_1 = tslib_1.__importDefault(require("debug"));
const constants_1 = require("./constants");
const platforms_1 = tslib_1.__importDefault(require("./platforms"));
const utils_1 = require("./utils");
const certificates_1 = require("./certificates");
const debug = (0, debug_1.default)('devcert:certificate-authority');
/**
 * Install the once-per-machine trusted root CA. We'll use this CA to sign
 * per-app certs.
 */
function installCertificateAuthority() {
    return tslib_1.__awaiter(this, arguments, void 0, function* (options = {}) {
        debug(`Uninstalling existing certificates, which will be void once any existing CA is gone`);
        uninstall();
        (0, constants_1.ensureConfigDirs)();
        debug(`Making a temp working directory for files to copied in`);
        let rootKeyPath = (0, utils_1.mktmp)();
        debug(`Generating the OpenSSL configuration needed to setup the certificate authority`);
        seedConfigFiles();
        debug(`Generating a private key`);
        (0, certificates_1.generateKey)(rootKeyPath);
        debug(`Generating a CA certificate`);
        (0, utils_1.openssl)(['req', '-new', '-x509', '-config', constants_1.caSelfSignConfig, '-key', rootKeyPath, '-out', constants_1.rootCACertPath, '-days', '825']);
        debug('Saving certificate authority credentials');
        yield saveCertificateAuthorityCredentials(rootKeyPath);
        debug(`Adding the root certificate authority to trust stores`);
        yield platforms_1.default.addToTrustStores(constants_1.rootCACertPath, options);
    });
}
/**
 * Initializes the files OpenSSL needs to sign certificates as a certificate
 * authority, as well as our CA setup version
 */
function seedConfigFiles() {
    // This is v2 of the devcert certificate authority setup
    (0, fs_1.writeFileSync)(constants_1.caVersionFile, '2');
    // OpenSSL CA files
    (0, fs_1.writeFileSync)(constants_1.opensslDatabaseFilePath, '');
    (0, fs_1.writeFileSync)(constants_1.opensslSerialFilePath, '01');
}
function withCertificateAuthorityCredentials(cb) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        debug(`Retrieving devcert's certificate authority credentials`);
        let tmpCAKeyPath = (0, utils_1.mktmp)();
        let caKey = yield platforms_1.default.readProtectedFile(constants_1.rootCAKeyPath);
        (0, fs_1.writeFileSync)(tmpCAKeyPath, caKey);
        yield cb({ caKeyPath: tmpCAKeyPath, caCertPath: constants_1.rootCACertPath });
        (0, fs_1.unlinkSync)(tmpCAKeyPath);
    });
}
function saveCertificateAuthorityCredentials(keypath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        debug(`Saving devcert's certificate authority credentials`);
        let key = (0, fs_1.readFileSync)(keypath, 'utf-8');
        yield platforms_1.default.writeProtectedFile(constants_1.rootCAKeyPath, key);
    });
}
function certErrors() {
    try {
        (0, utils_1.openssl)(['x509', '-in', constants_1.rootCACertPath, '-noout']);
        return '';
    }
    catch (e) {
        return e.toString();
    }
}
// This function helps to migrate from v1.0.x to >= v1.1.0.
/**
 * Smoothly migrate the certificate storage from v1.0.x to >= v1.1.0.
 * In v1.1.0 there are new options for retrieving the CA cert directly,
 * to help third-party Node apps trust the root CA.
 *
 * If a v1.0.x cert already exists, then devcert has written it with
 * platform.writeProtectedFile(), so an unprivileged readFile cannot access it.
 * Pre-detect and remedy this; it should only happen once per installation.
 */
function ensureCACertReadable() {
    return tslib_1.__awaiter(this, arguments, void 0, function* (options = {}) {
        if (!certErrors()) {
            return;
        }
        /**
         * on windows, writeProtectedFile left the cert encrypted on *nix, the cert
         * has no read permissions either way, openssl will fail and that means we
         * have to fix it
         */
        try {
            const caFileContents = yield platforms_1.default.readProtectedFile(constants_1.rootCACertPath);
            platforms_1.default.deleteProtectedFiles(constants_1.rootCACertPath);
            (0, fs_1.writeFileSync)(constants_1.rootCACertPath, caFileContents);
        }
        catch (e) {
            return installCertificateAuthority(options);
        }
        // double check that we have a live one
        const remainingErrors = certErrors();
        if (remainingErrors) {
            return installCertificateAuthority(options);
        }
    });
}
/**
 * Remove as much of the devcert files and state as we can. This is necessary
 * when generating a new root certificate, and should be available to API
 * consumers as well.
 *
 * Not all of it will be removable. If certutil is not installed, we'll leave
 * Firefox alone. We try to remove files with maximum permissions, and if that
 * fails, we'll silently fail.
 *
 * It's also possible that the command to untrust will not work, and we'll
 * silently fail that as well; with no existing certificates anymore, the
 * security exposure there is minimal.
 */
function uninstall() {
    platforms_1.default.removeFromTrustStores(constants_1.rootCACertPath);
    platforms_1.default.deleteProtectedFiles(constants_1.domainsDir);
    platforms_1.default.deleteProtectedFiles(constants_1.rootCADir);
    platforms_1.default.deleteProtectedFiles((0, constants_1.getLegacyConfigDir)());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGUtYXV0aG9yaXR5LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJjZXJ0aWZpY2F0ZS1hdXRob3JpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUE4QkEsOENBc0JDO0FBY0Qsa0ZBT0M7QUE0QkQsb0RBc0JDO0FBZUQsOEJBS0M7O0FBL0lELDJCQUlZO0FBQ1osMERBQWdDO0FBRWhDLDJDQVdxQjtBQUNyQixvRUFBMEM7QUFDMUMsbUNBQXlDO0FBQ3pDLGlEQUE2QztBQUc3QyxNQUFNLEtBQUssR0FBRyxJQUFBLGVBQVcsRUFBQywrQkFBK0IsQ0FBQyxDQUFDO0FBRTNEOzs7R0FHRztBQUNILFNBQThCLDJCQUEyQjtpRUFBQyxVQUFtQixFQUFFO1FBQzdFLEtBQUssQ0FBQyxxRkFBcUYsQ0FBQyxDQUFDO1FBQzdGLFNBQVMsRUFBRSxDQUFDO1FBQ1osSUFBQSw0QkFBZ0IsR0FBRSxDQUFDO1FBRW5CLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1FBQ2hFLElBQUksV0FBVyxHQUFHLElBQUEsYUFBSyxHQUFFLENBQUM7UUFFMUIsS0FBSyxDQUFDLGdGQUFnRixDQUFDLENBQUM7UUFDeEYsZUFBZSxFQUFFLENBQUM7UUFFbEIsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDbEMsSUFBQSwwQkFBVyxFQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXpCLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ3JDLElBQUEsZUFBTyxFQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLDRCQUFnQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLDBCQUFjLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFNUgsS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDbEQsTUFBTSxtQ0FBbUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2RCxLQUFLLENB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QUFBLDhCQUFrQixHQUFFLENBQUMsQ0FBQztBQUM3RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgdW5saW5rU3luYyBhcyBybSxcbiAgcmVhZEZpbGVTeW5jIGFzIHJlYWRGaWxlLFxuICB3cml0ZUZpbGVTeW5jIGFzIHdyaXRlRmlsZVxufSBmcm9tICdmcyc7XG5pbXBvcnQgY3JlYXRlRGVidWcgZnJvbSAnZGVidWcnO1xuXG5pbXBvcnQge1xuICBkb21haW5zRGlyLFxuICByb290Q0FEaXIsXG4gIGVuc3VyZUNvbmZpZ0RpcnMsXG4gIGdldExlZ2FjeUNvbmZpZ0RpcixcbiAgcm9vdENBS2V5UGF0aCxcbiAgcm9vdENBQ2VydFBhdGgsXG4gIGNhU2VsZlNpZ25Db25maWcsXG4gIG9wZW5zc2xTZXJpYWxGaWxlUGF0aCxcbiAgb3BlbnNzbERhdGFiYXNlRmlsZVBhdGgsXG4gIGNhVmVyc2lvbkZpbGVcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGN1cnJlbnRQbGF0Zm9ybSBmcm9tICcuL3BsYXRmb3Jtcyc7XG5pbXBvcnQgeyBvcGVuc3NsLCBta3RtcCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZ2VuZXJhdGVLZXkgfSBmcm9tICcuL2NlcnRpZmljYXRlcyc7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnLi9pbmRleCc7XG5cbmNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ2RldmNlcnQ6Y2VydGlmaWNhdGUtYXV0aG9yaXR5Jyk7XG5cbi8qKlxuICogSW5zdGFsbCB0aGUgb25jZS1wZXItbWFjaGluZSB0cnVzdGVkIHJvb3QgQ0EuIFdlJ2xsIHVzZSB0aGlzIENBIHRvIHNpZ25cbiAqIHBlci1hcHAgY2VydHMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGluc3RhbGxDZXJ0aWZpY2F0ZUF1dGhvcml0eShvcHRpb25zOiBPcHRpb25zID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgZGVidWcoYFVuaW5zdGFsbGluZyBleGlzdGluZyBjZXJ0aWZpY2F0ZXMsIHdoaWNoIHdpbGwgYmUgdm9pZCBvbmNlIGFueSBleGlzdGluZyBDQSBpcyBnb25lYCk7XG4gIHVuaW5zdGFsbCgpO1xuICBlbnN1cmVDb25maWdEaXJzKCk7XG5cbiAgZGVidWcoYE1ha2luZyBhIHRlbXAgd29ya2luZyBkaXJlY3RvcnkgZm9yIGZpbGVzIHRvIGNvcGllZCBpbmApO1xuICBsZXQgcm9vdEtleVBhdGggPSBta3RtcCgpO1xuXG4gIGRlYnVnKGBHZW5lcmF0aW5nIHRoZSBPcGVuU1NMIGNvbmZpZ3VyYXRpb24gbmVlZGVkIHRvIHNldHVwIHRoZSBjZXJ0aWZpY2F0ZSBhdXRob3JpdHlgKTtcbiAgc2VlZENvbmZpZ0ZpbGVzKCk7XG5cbiAgZGVidWcoYEdlbmVyYXRpbmcgYSBwcml2YXRlIGtleWApO1xuICBnZW5lcmF0ZUtleShyb290S2V5UGF0aCk7XG5cbiAgZGVidWcoYEdlbmVyYXRpbmcgYSBDQSBjZXJ0aWZpY2F0ZWApO1xuICBvcGVuc3NsKFsncmVxJywgJy1uZXcnLCAnLXg1MDknLCAnLWNvbmZpZycsIGNhU2VsZlNpZ25Db25maWcsICcta2V5Jywgcm9vdEtleVBhdGgsICctb3V0Jywgcm9vdENBQ2VydFBhdGgsICctZGF5cycsICc4MjUnXSk7XG5cbiAgZGVidWcoJ1NhdmluZyBjZXJ0aWZpY2F0ZSBhdXRob3JpdHkgY3JlZGVudGlhbHMnKTtcbiAgYXdhaXQgc2F2ZUNlcnRpZmljYXRlQXV0aG9yaXR5Q3JlZGVudGlhbHMocm9vdEtleVBhdGgpO1xuXG4gIGRlYnVnKGBBZGRpbmcgdGhlIHJvb3QgY2VydGlmaWNhdGUgYXV0aG9yaXR5IHRvIHRydXN0IHN0b3Jlc2ApO1xuICBhd2FpdCBjdXJyZW50UGxhdGZvcm0uYWRkVG9UcnVzdFN0b3Jlcyhyb290Q0FDZXJ0UGF0aCwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIGZpbGVzIE9wZW5TU0wgbmVlZHMgdG8gc2lnbiBjZXJ0aWZpY2F0ZXMgYXMgYSBjZXJ0aWZpY2F0ZVxuICogYXV0aG9yaXR5LCBhcyB3ZWxsIGFzIG91ciBDQSBzZXR1cCB2ZXJzaW9uXG4gKi9cbmZ1bmN0aW9uIHNlZWRDb25maWdGaWxlcygpIHtcbiAgLy8gVGhpcyBpcyB2MiBvZiB0aGUgZGV2Y2VydCBjZXJ0aWZpY2F0ZSBhdXRob3JpdHkgc2V0dXBcbiAgd3JpdGVGaWxlKGNhVmVyc2lvbkZpbGUsICcyJyk7XG4gIC8vIE9wZW5TU0wgQ0EgZmlsZXNcbiAgd3JpdGVGaWxlKG9wZW5zc2xEYXRhYmFzZUZpbGVQYXRoLCAnJyk7XG4gIHdyaXRlRmlsZShvcGVuc3NsU2VyaWFsRmlsZVBhdGgsICcwMScpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd2l0aENlcnRpZmljYXRlQXV0aG9yaXR5Q3JlZGVudGlhbHMoY2I6ICh7IGNhS2V5UGF0aCwgY2FDZXJ0UGF0aCB9OiB7IGNhS2V5UGF0aDogc3RyaW5nLCBjYUNlcnRQYXRoOiBzdHJpbmcgfSkgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQpIHtcbiAgZGVidWcoYFJldHJpZXZpbmcgZGV2Y2VydCdzIGNlcnRpZmljYXRlIGF1dGhvcml0eSBjcmVkZW50aWFsc2ApO1xuICBsZXQgdG1wQ0FLZXlQYXRoID0gbWt0bXAoKTtcbiAgbGV0IGNhS2V5ID0gYXdhaXQgY3VycmVudFBsYXRmb3JtLnJlYWRQcm90ZWN0ZWRGaWxlKHJvb3RDQUtleVBhdGgpO1xuICB3cml0ZUZpbGUodG1wQ0FLZXlQYXRoLCBjYUtleSk7XG4gIGF3YWl0IGNiKHsgY2FLZXlQYXRoOiB0bXBDQUtleVBhdGgsIGNhQ2VydFBhdGg6IHJvb3RDQUNlcnRQYXRoIH0pO1xuICBybSh0bXBDQUtleVBhdGgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzYXZlQ2VydGlmaWNhdGVBdXRob3JpdHlDcmVkZW50aWFscyhrZXlwYXRoOiBzdHJpbmcpIHtcbiAgZGVidWcoYFNhdmluZyBkZXZjZXJ0J3MgY2VydGlmaWNhdGUgYXV0aG9yaXR5IGNyZWRlbnRpYWxzYCk7XG4gIGxldCBrZXkgPSByZWFkRmlsZShrZXlwYXRoLCAndXRmLTgnKTtcbiAgYXdhaXQgY3VycmVudFBsYXRmb3JtLndyaXRlUHJvdGVjdGVkRmlsZShyb290Q0FLZXlQYXRoLCBrZXkpO1xufVxuXG5cbmZ1bmN0aW9uIGNlcnRFcnJvcnMoKTogc3RyaW5nIHtcbiAgdHJ5IHtcbiAgICBvcGVuc3NsKFsneDUwOScsICctaW4nLCByb290Q0FDZXJ0UGF0aCwgJy1ub291dCddKTtcbiAgICByZXR1cm4gJyc7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZS50b1N0cmluZygpO1xuICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaGVscHMgdG8gbWlncmF0ZSBmcm9tIHYxLjAueCB0byA+PSB2MS4xLjAuXG4vKipcbiAqIFNtb290aGx5IG1pZ3JhdGUgdGhlIGNlcnRpZmljYXRlIHN0b3JhZ2UgZnJvbSB2MS4wLnggdG8gPj0gdjEuMS4wLlxuICogSW4gdjEuMS4wIHRoZXJlIGFyZSBuZXcgb3B0aW9ucyBmb3IgcmV0cmlldmluZyB0aGUgQ0EgY2VydCBkaXJlY3RseSxcbiAqIHRvIGhlbHAgdGhpcmQtcGFydHkgTm9kZSBhcHBzIHRydXN0IHRoZSByb290IENBLlxuICogXG4gKiBJZiBhIHYxLjAueCBjZXJ0IGFscmVhZHkgZXhpc3RzLCB0aGVuIGRldmNlcnQgaGFzIHdyaXR0ZW4gaXQgd2l0aFxuICogcGxhdGZvcm0ud3JpdGVQcm90ZWN0ZWRGaWxlKCksIHNvIGFuIHVucHJpdmlsZWdlZCByZWFkRmlsZSBjYW5ub3QgYWNjZXNzIGl0LlxuICogUHJlLWRldGVjdCBhbmQgcmVtZWR5IHRoaXM7IGl0IHNob3VsZCBvbmx5IGhhcHBlbiBvbmNlIHBlciBpbnN0YWxsYXRpb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbnN1cmVDQUNlcnRSZWFkYWJsZShvcHRpb25zOiBPcHRpb25zID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFjZXJ0RXJyb3JzKCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLyoqXG4gICAqIG9uIHdpbmRvd3MsIHdyaXRlUHJvdGVjdGVkRmlsZSBsZWZ0IHRoZSBjZXJ0IGVuY3J5cHRlZCBvbiAqbml4LCB0aGUgY2VydFxuICAgKiBoYXMgbm8gcmVhZCBwZXJtaXNzaW9ucyBlaXRoZXIgd2F5LCBvcGVuc3NsIHdpbGwgZmFpbCBhbmQgdGhhdCBtZWFucyB3ZVxuICAgKiBoYXZlIHRvIGZpeCBpdFxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCBjYUZpbGVDb250ZW50cyA9IGF3YWl0IGN1cnJlbnRQbGF0Zm9ybS5yZWFkUHJvdGVjdGVkRmlsZShyb290Q0FDZXJ0UGF0aCk7XG4gICAgY3VycmVudFBsYXRmb3JtLmRlbGV0ZVByb3RlY3RlZEZpbGVzKHJvb3RDQUNlcnRQYXRoKTtcbiAgICB3cml0ZUZpbGUocm9vdENBQ2VydFBhdGgsIGNhRmlsZUNvbnRlbnRzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBpbnN0YWxsQ2VydGlmaWNhdGVBdXRob3JpdHkob3B0aW9ucyk7XG4gIH1cbiAgXG4gIC8vIGRvdWJsZSBjaGVjayB0aGF0IHdlIGhhdmUgYSBsaXZlIG9uZVxuICBjb25zdCByZW1haW5pbmdFcnJvcnMgPSBjZXJ0RXJyb3JzKCk7XG4gIGlmIChyZW1haW5pbmdFcnJvcnMpIHtcbiAgICByZXR1cm4gaW5zdGFsbENlcnRpZmljYXRlQXV0aG9yaXR5KG9wdGlvbnMpO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGFzIG11Y2ggb2YgdGhlIGRldmNlcnQgZmlsZXMgYW5kIHN0YXRlIGFzIHdlIGNhbi4gVGhpcyBpcyBuZWNlc3NhcnlcbiAqIHdoZW4gZ2VuZXJhdGluZyBhIG5ldyByb290IGNlcnRpZmljYXRlLCBhbmQgc2hvdWxkIGJlIGF2YWlsYWJsZSB0byBBUElcbiAqIGNvbnN1bWVycyBhcyB3ZWxsLlxuICogXG4gKiBOb3QgYWxsIG9mIGl0IHdpbGwgYmUgcmVtb3ZhYmxlLiBJZiBjZXJ0dXRpbCBpcyBub3QgaW5zdGFsbGVkLCB3ZSdsbCBsZWF2ZVxuICogRmlyZWZveCBhbG9uZS4gV2UgdHJ5IHRvIHJlbW92ZSBmaWxlcyB3aXRoIG1heGltdW0gcGVybWlzc2lvbnMsIGFuZCBpZiB0aGF0XG4gKiBmYWlscywgd2UnbGwgc2lsZW50bHkgZmFpbC5cbiAqIFxuICogSXQncyBhbHNvIHBvc3NpYmxlIHRoYXQgdGhlIGNvbW1hbmQgdG8gdW50cnVzdCB3aWxsIG5vdCB3b3JrLCBhbmQgd2UnbGxcbiAqIHNpbGVudGx5IGZhaWwgdGhhdCBhcyB3ZWxsOyB3aXRoIG5vIGV4aXN0aW5nIGNlcnRpZmljYXRlcyBhbnltb3JlLCB0aGVcbiAqIHNlY3VyaXR5IGV4cG9zdXJlIHRoZXJlIGlzIG1pbmltYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmluc3RhbGwoKTogdm9pZCB7XG4gIGN1cnJlbnRQbGF0Zm9ybS5yZW1vdmVGcm9tVHJ1c3RTdG9yZXMocm9vdENBQ2VydFBhdGgpO1xuICBjdXJyZW50UGxhdGZvcm0uZGVsZXRlUHJvdGVjdGVkRmlsZXMoZG9tYWluc0Rpcik7XG4gIGN1cnJlbnRQbGF0Zm9ybS5kZWxldGVQcm90ZWN0ZWRGaWxlcyhyb290Q0FEaXIpO1xuICBjdXJyZW50UGxhdGZvcm0uZGVsZXRlUHJvdGVjdGVkRmlsZXMoZ2V0TGVnYWN5Q29uZmlnRGlyKCkpO1xufSJdfQ==