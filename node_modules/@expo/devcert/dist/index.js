"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uninstall = void 0;
exports.certificateFor = certificateFor;
exports.hasCertificateFor = hasCertificateFor;
exports.configuredDomains = configuredDomains;
exports.removeDomain = removeDomain;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const debug_1 = tslib_1.__importDefault(require("debug"));
const command_exists_1 = require("command-exists");
const constants_1 = require("./constants");
const platforms_1 = tslib_1.__importDefault(require("./platforms"));
const certificate_authority_1 = tslib_1.__importStar(require("./certificate-authority"));
Object.defineProperty(exports, "uninstall", { enumerable: true, get: function () { return certificate_authority_1.uninstall; } });
const certificates_1 = tslib_1.__importDefault(require("./certificates"));
const user_interface_1 = tslib_1.__importDefault(require("./user-interface"));
const debug = (0, debug_1.default)('devcert');
/**
 * Request an SSL certificate for the given app name signed by the devcert root
 * certificate authority. If devcert has previously generated a certificate for
 * that app name on this machine, it will reuse that certificate.
 *
 * If this is the first time devcert is being run on this machine, it will
 * generate and attempt to install a root certificate authority.
 *
 * Returns a promise that resolves with { key, cert }, where `key` and `cert`
 * are Buffers with the contents of the certificate private key and certificate
 * file, respectively
 *
 * If `options.getCaBuffer` is true, return value will include the ca certificate data
 * as { ca: Buffer }
 *
 * If `options.getCaPath` is true, return value will include the ca certificate path
 * as { caPath: string }
 */
function certificateFor(domain_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function* (domain, options = {}) {
        if (constants_1.VALID_IP.test(domain)) {
            throw new Error('IP addresses are not supported currently');
        }
        if (!constants_1.VALID_DOMAIN.test(domain)) {
            throw new Error(`"${domain}" is not a valid domain name.`);
        }
        debug(`Certificate requested for ${domain}. Skipping certutil install: ${Boolean(options.skipCertutilInstall)}. Skipping hosts file: ${Boolean(options.skipHostsFile)}`);
        if (options.ui) {
            Object.assign(user_interface_1.default, options.ui);
        }
        if (!constants_1.isMac && !constants_1.isLinux && !constants_1.isWindows) {
            throw new Error(`Platform not supported: "${process.platform}"`);
        }
        if (!(0, command_exists_1.sync)('openssl')) {
            throw new Error('OpenSSL not found: OpenSSL is required to generate SSL certificates - make sure it is installed and available in your PATH');
        }
        let domainKeyPath = (0, constants_1.pathForDomain)(domain, `private-key.key`);
        let domainCertPath = (0, constants_1.pathForDomain)(domain, `certificate.crt`);
        if (!(0, fs_1.existsSync)(constants_1.rootCAKeyPath)) {
            debug('Root CA is not installed yet, so it must be our first run. Installing root CA ...');
            yield (0, certificate_authority_1.default)(options);
        }
        else if (options.getCaBuffer || options.getCaPath) {
            debug('Root CA is not readable, but it probably is because an earlier version of devcert locked it. Trying to fix...');
            yield (0, certificate_authority_1.ensureCACertReadable)(options);
        }
        if (!(0, fs_1.existsSync)((0, constants_1.pathForDomain)(domain, `certificate.crt`))) {
            debug(`Can't find certificate file for ${domain}, so it must be the first request for ${domain}. Generating and caching ...`);
            yield (0, certificates_1.default)(domain);
        }
        if (!options.skipHostsFile) {
            yield platforms_1.default.addDomainToHostFileIfMissing(domain);
        }
        debug(`Returning domain certificate`);
        const ret = {
            key: (0, fs_1.readFileSync)(domainKeyPath),
            cert: (0, fs_1.readFileSync)(domainCertPath)
        };
        if (options.getCaBuffer)
            ret.ca = (0, fs_1.readFileSync)(constants_1.rootCACertPath);
        if (options.getCaPath)
            ret.caPath = constants_1.rootCACertPath;
        return ret;
    });
}
function hasCertificateFor(domain) {
    return (0, fs_1.existsSync)((0, constants_1.pathForDomain)(domain, `certificate.crt`));
}
function configuredDomains() {
    return (0, fs_1.readdirSync)(constants_1.domainsDir);
}
function removeDomain(domain) {
    return (0, fs_1.rmSync)((0, constants_1.pathForDomain)(domain), { force: true, recursive: true });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQW1FQSx3Q0FtREM7QUFFRCw4Q0FFQztBQUVELDhDQUVDO0FBRUQsb0NBRUM7O0FBbElELDJCQUEwRztBQUMxRywwREFBZ0M7QUFDaEMsbURBQXVEO0FBQ3ZELDJDQVVxQjtBQUNyQixvRUFBMEM7QUFDMUMseUZBQXVHO0FBRzlGLDBGQUhtRCxpQ0FBUyxPQUduRDtBQUZsQiwwRUFBdUQ7QUFDdkQsOEVBQXFEO0FBR3JELE1BQU0sS0FBSyxHQUFHLElBQUEsZUFBVyxFQUFDLFNBQVMsQ0FBQyxDQUFDO0FBNkJyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxTQUFzQixjQUFjO2lFQUFvQixNQUFjLEVBQUUsVUFBYSxFQUFPO1FBQzFGLElBQUksb0JBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUNELElBQUksQ0FBQyx3QkFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxNQUFNLCtCQUErQixDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUNELEtBQUssQ0FBQyw2QkFBOEIsTUFBTyxnQ0FBaUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBRSwwQkFBMkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUUsRUFBRSxDQUFDLENBQUM7UUFFL0ssSUFBSSxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLHdCQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFRCxJQUFJLENBQUMsaUJBQUssSUFBSSxDQUFDLG1CQUFPLElBQUksQ0FBQyxxQkFBUyxFQUFFLENBQUM7WUFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNkIsT0FBTyxDQUFDLFFBQVMsR0FBRyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFBLHFCQUFhLEVBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDRIQUE0SCxDQUFDLENBQUM7UUFDaEosQ0FBQztRQUVELElBQUksYUFBYSxHQUFHLElBQUEseUJBQWEsRUFBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUM3RCxJQUFJLGNBQWMsR0FBRyxJQUFBLHlCQUFhLEVBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLElBQUEsZUFBTSxFQUFDLHlCQUFhLENBQUMsRUFBRSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxtRkFBbUYsQ0FBQyxDQUFDO1lBQzNGLE1BQU0sSUFBQSwrQkFBMkIsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxDQUFDO2FBQU0sSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNwRCxLQUFLLENBQUMsK0dBQStHLENBQUMsQ0FBQztZQUN2SCxNQUFNLElBQUEsNENBQW9CLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFBLGVBQU0sRUFBQyxJQUFBLHlCQUFhLEVBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3RELEtBQUssQ0FBQyxtQ0FBb0MsTUFBTyx5Q0FBMEMsTUFBTyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ2xJLE1BQU0sSUFBQSxzQkFBeUIsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMzQixNQUFNLG1CQUFlLENBQUMsNEJBQTRCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRXRDLE1BQU0sR0FBRyxHQUFHO1lBQ1YsR0FBRyxFQUFFLElBQUEsaUJBQVEsRUFBQyxhQUFhLENBQUM7WUFDNUIsSUFBSSxFQUFFLElBQUEsaUJBQVEsRUFBQyxjQUFjLENBQUM7U0FDYixDQUFDO1FBQ3BCLElBQUksT0FBTyxDQUFDLFdBQVc7WUFBRyxHQUFpQixDQUFDLEVBQUUsR0FBRyxJQUFBLGlCQUFRLEVBQUMsMEJBQWMsQ0FBQyxDQUFDO1FBQzFFLElBQUksT0FBTyxDQUFDLFNBQVM7WUFBRyxHQUFlLENBQUMsTUFBTSxHQUFHLDBCQUFjLENBQUM7UUFFaEUsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQUE7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxNQUFjO0lBQzlDLE9BQU8sSUFBQSxlQUFNLEVBQUMsSUFBQSx5QkFBYSxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELFNBQWdCLGlCQUFpQjtJQUMvQixPQUFPLElBQUEsZ0JBQU8sRUFBQyxzQkFBVSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELFNBQWdCLFlBQVksQ0FBQyxNQUFjO0lBQ3pDLE9BQU8sSUFBQSxXQUFFLEVBQUMsSUFBQSx5QkFBYSxFQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNyRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcm1TeW5jIGFzIHJtLCByZWFkRmlsZVN5bmMgYXMgcmVhZEZpbGUsIHJlYWRkaXJTeW5jIGFzIHJlYWRkaXIsIGV4aXN0c1N5bmMgYXMgZXhpc3RzIH0gZnJvbSAnZnMnO1xuaW1wb3J0IGNyZWF0ZURlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCB7IHN5bmMgYXMgY29tbWFuZEV4aXN0cyB9IGZyb20gJ2NvbW1hbmQtZXhpc3RzJztcbmltcG9ydCB7XG4gIGlzTWFjLFxuICBpc0xpbnV4LFxuICBpc1dpbmRvd3MsXG4gIHBhdGhGb3JEb21haW4sXG4gIGRvbWFpbnNEaXIsXG4gIHJvb3RDQUtleVBhdGgsXG4gIHJvb3RDQUNlcnRQYXRoLFxuICBWQUxJRF9ET01BSU4sXG4gIFZBTElEX0lQXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBjdXJyZW50UGxhdGZvcm0gZnJvbSAnLi9wbGF0Zm9ybXMnO1xuaW1wb3J0IGluc3RhbGxDZXJ0aWZpY2F0ZUF1dGhvcml0eSwgeyBlbnN1cmVDQUNlcnRSZWFkYWJsZSwgdW5pbnN0YWxsIH0gZnJvbSAnLi9jZXJ0aWZpY2F0ZS1hdXRob3JpdHknO1xuaW1wb3J0IGdlbmVyYXRlRG9tYWluQ2VydGlmaWNhdGUgZnJvbSAnLi9jZXJ0aWZpY2F0ZXMnO1xuaW1wb3J0IFVJLCB7IFVzZXJJbnRlcmZhY2UgfSBmcm9tICcuL3VzZXItaW50ZXJmYWNlJztcbmV4cG9ydCB7IHVuaW5zdGFsbCB9O1xuXG5jb25zdCBkZWJ1ZyA9IGNyZWF0ZURlYnVnKCdkZXZjZXJ0Jyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyAvKiBleHRlbmRzIFBhcnRpYWw8SUNhQnVmZmVyT3B0cyAmIElDYVBhdGhPcHRzPiAgKi97XG4gIC8qKiBSZXR1cm4gdGhlIENBIGNlcnRpZmljYXRlIGRhdGE/ICovXG4gIGdldENhQnVmZmVyPzogYm9vbGVhbjtcbiAgLyoqIFJldHVybiB0aGUgcGF0aCB0byB0aGUgQ0EgY2VydGlmaWNhdGU/ICovXG4gIGdldENhUGF0aD86IGJvb2xlYW47XG4gIC8qKiBJZiBgY2VydHV0aWxgIGlzIG5vdCBpbnN0YWxsZWQgYWxyZWFkeSAoZm9yIHVwZGF0aW5nIG5zcyBkYXRhYmFzZXM7IGUuZy4gZmlyZWZveCksIGRvIG5vdCBhdHRlbXB0IHRvIGluc3RhbGwgaXQgKi9cbiAgc2tpcENlcnR1dGlsSW5zdGFsbD86IGJvb2xlYW4sXG4gIC8qKiBEbyBub3QgdXBkYXRlIHlvdXIgc3lzdGVtcyBob3N0IGZpbGUgd2l0aCB0aGUgZG9tYWluIG5hbWUgb2YgdGhlIGNlcnRpZmljYXRlICovXG4gIHNraXBIb3N0c0ZpbGU/OiBib29sZWFuLFxuICAvKiogVXNlciBpbnRlcmZhY2UgaG9va3MgKi9cbiAgdWk/OiBVc2VySW50ZXJmYWNlXG59XG5cbmludGVyZmFjZSBJQ2FCdWZmZXIge1xuICBjYTogQnVmZmVyO1xufVxuaW50ZXJmYWNlIElDYVBhdGgge1xuICBjYVBhdGg6IHN0cmluZztcbn1cbmludGVyZmFjZSBJRG9tYWluRGF0YSB7XG4gIGtleTogQnVmZmVyO1xuICBjZXJ0OiBCdWZmZXI7XG59XG50eXBlIElSZXR1cm5DYTxPIGV4dGVuZHMgT3B0aW9ucz4gPSBPWydnZXRDYUJ1ZmZlciddIGV4dGVuZHMgdHJ1ZSA/IElDYUJ1ZmZlciA6IGZhbHNlO1xudHlwZSBJUmV0dXJuQ2FQYXRoPE8gZXh0ZW5kcyBPcHRpb25zPiA9IE9bJ2dldENhUGF0aCddIGV4dGVuZHMgdHJ1ZSA/IElDYVBhdGggOiBmYWxzZTtcbnR5cGUgSVJldHVybkRhdGE8TyBleHRlbmRzIE9wdGlvbnMgPSB7fT4gPSAoSURvbWFpbkRhdGEpICYgKElSZXR1cm5DYTxPPikgJiAoSVJldHVybkNhUGF0aDxPPik7XG5cbi8qKlxuICogUmVxdWVzdCBhbiBTU0wgY2VydGlmaWNhdGUgZm9yIHRoZSBnaXZlbiBhcHAgbmFtZSBzaWduZWQgYnkgdGhlIGRldmNlcnQgcm9vdFxuICogY2VydGlmaWNhdGUgYXV0aG9yaXR5LiBJZiBkZXZjZXJ0IGhhcyBwcmV2aW91c2x5IGdlbmVyYXRlZCBhIGNlcnRpZmljYXRlIGZvclxuICogdGhhdCBhcHAgbmFtZSBvbiB0aGlzIG1hY2hpbmUsIGl0IHdpbGwgcmV1c2UgdGhhdCBjZXJ0aWZpY2F0ZS5cbiAqXG4gKiBJZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIGRldmNlcnQgaXMgYmVpbmcgcnVuIG9uIHRoaXMgbWFjaGluZSwgaXQgd2lsbFxuICogZ2VuZXJhdGUgYW5kIGF0dGVtcHQgdG8gaW5zdGFsbCBhIHJvb3QgY2VydGlmaWNhdGUgYXV0aG9yaXR5LlxuICpcbiAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB7IGtleSwgY2VydCB9LCB3aGVyZSBga2V5YCBhbmQgYGNlcnRgXG4gKiBhcmUgQnVmZmVycyB3aXRoIHRoZSBjb250ZW50cyBvZiB0aGUgY2VydGlmaWNhdGUgcHJpdmF0ZSBrZXkgYW5kIGNlcnRpZmljYXRlXG4gKiBmaWxlLCByZXNwZWN0aXZlbHlcbiAqIFxuICogSWYgYG9wdGlvbnMuZ2V0Q2FCdWZmZXJgIGlzIHRydWUsIHJldHVybiB2YWx1ZSB3aWxsIGluY2x1ZGUgdGhlIGNhIGNlcnRpZmljYXRlIGRhdGFcbiAqIGFzIHsgY2E6IEJ1ZmZlciB9XG4gKiBcbiAqIElmIGBvcHRpb25zLmdldENhUGF0aGAgaXMgdHJ1ZSwgcmV0dXJuIHZhbHVlIHdpbGwgaW5jbHVkZSB0aGUgY2EgY2VydGlmaWNhdGUgcGF0aFxuICogYXMgeyBjYVBhdGg6IHN0cmluZyB9XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjZXJ0aWZpY2F0ZUZvcjxPIGV4dGVuZHMgT3B0aW9ucz4oZG9tYWluOiBzdHJpbmcsIG9wdGlvbnM6IE8gPSB7fSBhcyBPKTogUHJvbWlzZTxJUmV0dXJuRGF0YTxPPj4ge1xuICBpZiAoVkFMSURfSVAudGVzdChkb21haW4pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJUCBhZGRyZXNzZXMgYXJlIG5vdCBzdXBwb3J0ZWQgY3VycmVudGx5Jyk7XG4gIH1cbiAgaWYgKCFWQUxJRF9ET01BSU4udGVzdChkb21haW4pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcIiR7ZG9tYWlufVwiIGlzIG5vdCBhIHZhbGlkIGRvbWFpbiBuYW1lLmApO1xuICB9XG4gIGRlYnVnKGBDZXJ0aWZpY2F0ZSByZXF1ZXN0ZWQgZm9yICR7IGRvbWFpbiB9LiBTa2lwcGluZyBjZXJ0dXRpbCBpbnN0YWxsOiAkeyBCb29sZWFuKG9wdGlvbnMuc2tpcENlcnR1dGlsSW5zdGFsbCkgfS4gU2tpcHBpbmcgaG9zdHMgZmlsZTogJHsgQm9vbGVhbihvcHRpb25zLnNraXBIb3N0c0ZpbGUpIH1gKTtcblxuICBpZiAob3B0aW9ucy51aSkge1xuICAgIE9iamVjdC5hc3NpZ24oVUksIG9wdGlvbnMudWkpO1xuICB9XG5cbiAgaWYgKCFpc01hYyAmJiAhaXNMaW51eCAmJiAhaXNXaW5kb3dzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBQbGF0Zm9ybSBub3Qgc3VwcG9ydGVkOiBcIiR7IHByb2Nlc3MucGxhdGZvcm0gfVwiYCk7XG4gIH1cblxuICBpZiAoIWNvbW1hbmRFeGlzdHMoJ29wZW5zc2wnKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignT3BlblNTTCBub3QgZm91bmQ6IE9wZW5TU0wgaXMgcmVxdWlyZWQgdG8gZ2VuZXJhdGUgU1NMIGNlcnRpZmljYXRlcyAtIG1ha2Ugc3VyZSBpdCBpcyBpbnN0YWxsZWQgYW5kIGF2YWlsYWJsZSBpbiB5b3VyIFBBVEgnKTtcbiAgfVxuXG4gIGxldCBkb21haW5LZXlQYXRoID0gcGF0aEZvckRvbWFpbihkb21haW4sIGBwcml2YXRlLWtleS5rZXlgKTtcbiAgbGV0IGRvbWFpbkNlcnRQYXRoID0gcGF0aEZvckRvbWFpbihkb21haW4sIGBjZXJ0aWZpY2F0ZS5jcnRgKTtcblxuICBpZiAoIWV4aXN0cyhyb290Q0FLZXlQYXRoKSkge1xuICAgIGRlYnVnKCdSb290IENBIGlzIG5vdCBpbnN0YWxsZWQgeWV0LCBzbyBpdCBtdXN0IGJlIG91ciBmaXJzdCBydW4uIEluc3RhbGxpbmcgcm9vdCBDQSAuLi4nKTtcbiAgICBhd2FpdCBpbnN0YWxsQ2VydGlmaWNhdGVBdXRob3JpdHkob3B0aW9ucyk7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5nZXRDYUJ1ZmZlciB8fCBvcHRpb25zLmdldENhUGF0aCkge1xuICAgIGRlYnVnKCdSb290IENBIGlzIG5vdCByZWFkYWJsZSwgYnV0IGl0IHByb2JhYmx5IGlzIGJlY2F1c2UgYW4gZWFybGllciB2ZXJzaW9uIG9mIGRldmNlcnQgbG9ja2VkIGl0LiBUcnlpbmcgdG8gZml4Li4uJyk7XG4gICAgYXdhaXQgZW5zdXJlQ0FDZXJ0UmVhZGFibGUob3B0aW9ucyk7XG4gIH1cblxuICBpZiAoIWV4aXN0cyhwYXRoRm9yRG9tYWluKGRvbWFpbiwgYGNlcnRpZmljYXRlLmNydGApKSkge1xuICAgIGRlYnVnKGBDYW4ndCBmaW5kIGNlcnRpZmljYXRlIGZpbGUgZm9yICR7IGRvbWFpbiB9LCBzbyBpdCBtdXN0IGJlIHRoZSBmaXJzdCByZXF1ZXN0IGZvciAkeyBkb21haW4gfS4gR2VuZXJhdGluZyBhbmQgY2FjaGluZyAuLi5gKTtcbiAgICBhd2FpdCBnZW5lcmF0ZURvbWFpbkNlcnRpZmljYXRlKGRvbWFpbik7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMuc2tpcEhvc3RzRmlsZSkge1xuICAgIGF3YWl0IGN1cnJlbnRQbGF0Zm9ybS5hZGREb21haW5Ub0hvc3RGaWxlSWZNaXNzaW5nKGRvbWFpbik7XG4gIH1cblxuICBkZWJ1ZyhgUmV0dXJuaW5nIGRvbWFpbiBjZXJ0aWZpY2F0ZWApO1xuXG4gIGNvbnN0IHJldCA9IHtcbiAgICBrZXk6IHJlYWRGaWxlKGRvbWFpbktleVBhdGgpLFxuICAgIGNlcnQ6IHJlYWRGaWxlKGRvbWFpbkNlcnRQYXRoKVxuICB9IGFzIElSZXR1cm5EYXRhPE8+O1xuICBpZiAob3B0aW9ucy5nZXRDYUJ1ZmZlcikgKHJldCBhcyBJQ2FCdWZmZXIpLmNhID0gcmVhZEZpbGUocm9vdENBQ2VydFBhdGgpO1xuICBpZiAob3B0aW9ucy5nZXRDYVBhdGgpIChyZXQgYXMgSUNhUGF0aCkuY2FQYXRoID0gcm9vdENBQ2VydFBhdGg7XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NlcnRpZmljYXRlRm9yKGRvbWFpbjogc3RyaW5nKSB7XG4gIHJldHVybiBleGlzdHMocGF0aEZvckRvbWFpbihkb21haW4sIGBjZXJ0aWZpY2F0ZS5jcnRgKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmVkRG9tYWlucygpIHtcbiAgcmV0dXJuIHJlYWRkaXIoZG9tYWluc0Rpcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEb21haW4oZG9tYWluOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHJtKHBhdGhGb3JEb21haW4oZG9tYWluKSwgeyBmb3JjZTogdHJ1ZSwgcmVjdXJzaXZlOiB0cnVlIH0pO1xufVxuIl19