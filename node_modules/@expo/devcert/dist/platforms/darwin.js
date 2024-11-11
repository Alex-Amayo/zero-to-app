"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const debug_1 = tslib_1.__importDefault(require("debug"));
const command_exists_1 = require("command-exists");
const utils_1 = require("../utils");
const shared_1 = require("./shared");
const debug = (0, debug_1.default)('devcert:platforms:macos');
const getCertUtilPath = () => path_1.default.join((0, utils_1.run)('brew', ['--prefix', 'nss']).toString().trim(), 'bin', 'certutil');
class MacOSPlatform {
    constructor() {
        this.FIREFOX_BUNDLE_PATH = '/Applications/Firefox.app';
        this.FIREFOX_BIN_PATH = path_1.default.join(this.FIREFOX_BUNDLE_PATH, 'Contents/MacOS/firefox');
        this.FIREFOX_NSS_DIR = path_1.default.join(process.env.HOME, 'Library/Application Support/Firefox/Profiles/*');
        this.HOST_FILE_PATH = '/etc/hosts';
    }
    /**
     * macOS is pretty simple - just add the certificate to the system keychain,
     * and most applications will delegate to that for determining trusted
     * certificates. Firefox, of course, does it's own thing. We can try to
     * automatically install the cert with Firefox if we can use certutil via the
     * `nss` Homebrew package, otherwise we go manual with user-facing prompts.
     */
    addToTrustStores(certificatePath_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (certificatePath, options = {}) {
            // Chrome, Safari, system utils
            debug('Adding devcert root CA to macOS system keychain');
            (0, utils_1.run)('sudo', [
                'security',
                'add-trusted-cert',
                '-d',
                '-r',
                'trustRoot',
                '-k',
                '/Library/Keychains/System.keychain',
                '-p',
                'ssl',
                '-p',
                'basic',
                certificatePath
            ]);
            if (this.isFirefoxInstalled()) {
                // Try to use certutil to install the cert automatically
                debug('Firefox install detected. Adding devcert root CA to Firefox trust store');
                if (!this.isNSSInstalled()) {
                    if (!options.skipCertutilInstall) {
                        if ((0, command_exists_1.sync)('brew')) {
                            debug(`certutil is not already installed, but Homebrew is detected. Trying to install certutil via Homebrew...`);
                            try {
                                (0, utils_1.run)('brew', ['install', 'nss'], { stdio: 'ignore' });
                            }
                            catch (e) {
                                debug(`brew install nss failed`);
                            }
                        }
                        else {
                            debug(`Homebrew didn't work, so we can't try to install certutil. Falling back to manual certificate install`);
                            return yield (0, shared_1.openCertificateInFirefox)(this.FIREFOX_BIN_PATH, certificatePath);
                        }
                    }
                    else {
                        debug(`certutil is not already installed, and skipCertutilInstall is true, so we have to fall back to a manual install`);
                        return yield (0, shared_1.openCertificateInFirefox)(this.FIREFOX_BIN_PATH, certificatePath);
                    }
                }
                yield (0, shared_1.closeFirefox)();
                yield (0, shared_1.addCertificateToNSSCertDB)(this.FIREFOX_NSS_DIR, certificatePath, getCertUtilPath());
            }
            else {
                debug('Firefox does not appear to be installed, skipping Firefox-specific steps...');
            }
        });
    }
    removeFromTrustStores(certificatePath) {
        debug('Removing devcert root CA from macOS system keychain');
        try {
            (0, utils_1.run)('sudo', [
                'security',
                'remove-trusted-cert',
                '-d',
                certificatePath
            ], {
                stdio: 'ignore'
            });
        }
        catch (e) {
            debug(`failed to remove ${certificatePath} from macOS cert store, continuing. ${e.toString()}`);
        }
        if (this.isFirefoxInstalled() && this.isNSSInstalled()) {
            debug('Firefox install and certutil install detected. Trying to remove root CA from Firefox NSS databases');
            (0, shared_1.removeCertificateFromNSSCertDB)(this.FIREFOX_NSS_DIR, certificatePath, getCertUtilPath());
        }
    }
    addDomainToHostFileIfMissing(domain) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const trimDomain = domain.trim().replace(/[\s;]/g, '');
            let hostsFileContents = (0, fs_1.readFileSync)(this.HOST_FILE_PATH, 'utf8');
            if (!hostsFileContents.includes(trimDomain)) {
                (0, utils_1.sudoAppend)(this.HOST_FILE_PATH, `127.0.0.1 ${trimDomain}\n`);
            }
        });
    }
    deleteProtectedFiles(filepath) {
        (0, shared_1.assertNotTouchingFiles)(filepath, 'delete');
        (0, utils_1.run)('sudo', ['rm', '-rf', filepath]);
    }
    readProtectedFile(filepath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, shared_1.assertNotTouchingFiles)(filepath, 'read');
            return (yield (0, utils_1.run)('sudo', ['cat', filepath])).toString().trim();
        });
    }
    writeProtectedFile(filepath, contents) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, shared_1.assertNotTouchingFiles)(filepath, 'write');
            if ((0, fs_1.existsSync)(filepath)) {
                yield (0, utils_1.run)('sudo', ['rm', filepath]);
            }
            (0, fs_1.writeFileSync)(filepath, contents);
            yield (0, utils_1.run)('sudo', ['chown', '0', filepath]);
            yield (0, utils_1.run)('sudo', ['chmod', '600', filepath]);
        });
    }
    isFirefoxInstalled() {
        return (0, fs_1.existsSync)(this.FIREFOX_BUNDLE_PATH);
    }
    isNSSInstalled() {
        try {
            return (0, utils_1.run)('brew', ['list', '-1']).toString().includes('\nnss\n');
        }
        catch (e) {
            return false;
        }
    }
}
exports.default = MacOSPlatform;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFyd2luLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwbGF0Zm9ybXMvZGFyd2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUF3QjtBQUN4QiwyQkFBNEY7QUFDNUYsMERBQWdDO0FBQ2hDLG1EQUF1RDtBQUN2RCxvQ0FBMkM7QUFFM0MscUNBQXFKO0FBR3JKLE1BQU0sS0FBSyxHQUFHLElBQUEsZUFBVyxFQUFDLHlCQUF5QixDQUFDLENBQUM7QUFFckQsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFBLFdBQUcsRUFBQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFFL0csTUFBcUIsYUFBYTtJQUFsQztRQUVVLHdCQUFtQixHQUFHLDJCQUEyQixDQUFDO1FBQ2xELHFCQUFnQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDakYsb0JBQWUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGdEQUFnRCxDQUFDLENBQUM7UUFFaEcsbUJBQWMsR0FBRyxZQUFZLENBQUM7SUFvSHhDLENBQUM7SUFsSEM7Ozs7OztPQU1HO0lBQ0csZ0JBQWdCO3FFQUFDLGVBQXVCLEVBQUUsVUFBbUIsRUFBRTtZQUVuRSwrQkFBK0I7WUFDL0IsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFDekQsSUFBQSxXQUFHLEVBQUMsTUFBTSxFQUFFO2dCQUNWLFVBQVU7Z0JBQ1Ysa0JBQWtCO2dCQUNsQixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osV0FBVztnQkFDWCxJQUFJO2dCQUNKLG9DQUFvQztnQkFDcEMsSUFBSTtnQkFDSixLQUFL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QUVPLGNBQWM7UUFDcEIsSUFBSSxDQUFDO1lBQ0gsT0FBTyxJQUFBLFdBQUcsRUFBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDO0NBRUY7QUExSEQsZ0NBMEhDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgd3JpdGVGaWxlU3luYyBhcyB3cml0ZUZpbGUsIGV4aXN0c1N5bmMgYXMgZXhpc3RzLCByZWFkRmlsZVN5bmMgYXMgcmVhZCB9IGZyb20gJ2ZzJztcbmltcG9ydCBjcmVhdGVEZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgeyBzeW5jIGFzIGNvbW1hbmRFeGlzdHMgfSBmcm9tICdjb21tYW5kLWV4aXN0cyc7XG5pbXBvcnQgeyBydW4sIHN1ZG9BcHBlbmQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IHsgYWRkQ2VydGlmaWNhdGVUb05TU0NlcnREQiwgYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcywgb3BlbkNlcnRpZmljYXRlSW5GaXJlZm94LCBjbG9zZUZpcmVmb3gsIHJlbW92ZUNlcnRpZmljYXRlRnJvbU5TU0NlcnREQiB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLic7XG5cbmNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ2RldmNlcnQ6cGxhdGZvcm1zOm1hY29zJyk7XG5cbmNvbnN0IGdldENlcnRVdGlsUGF0aCA9ICgpID0+IHBhdGguam9pbihydW4oJ2JyZXcnLCBbJy0tcHJlZml4JywgJ25zcyddKS50b1N0cmluZygpLnRyaW0oKSwgJ2JpbicsICdjZXJ0dXRpbCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWNPU1BsYXRmb3JtIGltcGxlbWVudHMgUGxhdGZvcm0ge1xuXG4gIHByaXZhdGUgRklSRUZPWF9CVU5ETEVfUEFUSCA9ICcvQXBwbGljYXRpb25zL0ZpcmVmb3guYXBwJztcbiAgcHJpdmF0ZSBGSVJFRk9YX0JJTl9QQVRIID0gcGF0aC5qb2luKHRoaXMuRklSRUZPWF9CVU5ETEVfUEFUSCwgJ0NvbnRlbnRzL01hY09TL2ZpcmVmb3gnKTtcbiAgcHJpdmF0ZSBGSVJFRk9YX05TU19ESVIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5lbnYuSE9NRSwgJ0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9GaXJlZm94L1Byb2ZpbGVzLyonKTtcblxuICBwcml2YXRlIEhPU1RfRklMRV9QQVRIID0gJy9ldGMvaG9zdHMnO1xuXG4gIC8qKlxuICAgKiBtYWNPUyBpcyBwcmV0dHkgc2ltcGxlIC0ganVzdCBhZGQgdGhlIGNlcnRpZmljYXRlIHRvIHRoZSBzeXN0ZW0ga2V5Y2hhaW4sXG4gICAqIGFuZCBtb3N0IGFwcGxpY2F0aW9ucyB3aWxsIGRlbGVnYXRlIHRvIHRoYXQgZm9yIGRldGVybWluaW5nIHRydXN0ZWRcbiAgICogY2VydGlmaWNhdGVzLiBGaXJlZm94LCBvZiBjb3Vyc2UsIGRvZXMgaXQncyBvd24gdGhpbmcuIFdlIGNhbiB0cnkgdG9cbiAgICogYXV0b21hdGljYWxseSBpbnN0YWxsIHRoZSBjZXJ0IHdpdGggRmlyZWZveCBpZiB3ZSBjYW4gdXNlIGNlcnR1dGlsIHZpYSB0aGVcbiAgICogYG5zc2AgSG9tZWJyZXcgcGFja2FnZSwgb3RoZXJ3aXNlIHdlIGdvIG1hbnVhbCB3aXRoIHVzZXItZmFjaW5nIHByb21wdHMuXG4gICAqL1xuICBhc3luYyBhZGRUb1RydXN0U3RvcmVzKGNlcnRpZmljYXRlUGF0aDogc3RyaW5nLCBvcHRpb25zOiBPcHRpb25zID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgIC8vIENocm9tZSwgU2FmYXJpLCBzeXN0ZW0gdXRpbHNcbiAgICBkZWJ1ZygnQWRkaW5nIGRldmNlcnQgcm9vdCBDQSB0byBtYWNPUyBzeXN0ZW0ga2V5Y2hhaW4nKTtcbiAgICBydW4oJ3N1ZG8nLCBbXG4gICAgICAnc2VjdXJpdHknLFxuICAgICAgJ2FkZC10cnVzdGVkLWNlcnQnLFxuICAgICAgJy1kJyxcbiAgICAgICctcicsXG4gICAgICAndHJ1c3RSb290JyxcbiAgICAgICctaycsXG4gICAgICAnL0xpYnJhcnkvS2V5Y2hhaW5zL1N5c3RlbS5rZXljaGFpbicsXG4gICAgICAnLXAnLFxuICAgICAgJ3NzbCcsXG4gICAgICAnLXAnLFxuICAgICAgJ2Jhc2ljJyxcbiAgICAgIGNlcnRpZmljYXRlUGF0aFxuICAgIF0pO1xuXG4gICAgaWYgKHRoaXMuaXNGaXJlZm94SW5zdGFsbGVkKCkpIHtcbiAgICAgIC8vIFRyeSB0byB1c2UgY2VydHV0aWwgdG8gaW5zdGFsbCB0aGUgY2VydCBhdXRvbWF0aWNhbGx5XG4gICAgICBkZWJ1ZygnRmlyZWZveCBpbnN0YWxsIGRldGVjdGVkLiBBZGRpbmcgZGV2Y2VydCByb290IENBIHRvIEZpcmVmb3ggdHJ1c3Qgc3RvcmUnKTtcbiAgICAgIGlmICghdGhpcy5pc05TU0luc3RhbGxlZCgpKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5za2lwQ2VydHV0aWxJbnN0YWxsKSB7XG4gICAgICAgICAgaWYgKGNvbW1hbmRFeGlzdHMoJ2JyZXcnKSkge1xuICAgICAgICAgICAgZGVidWcoYGNlcnR1dGlsIGlzIG5vdCBhbHJlYWR5IGluc3RhbGxlZCwgYnV0IEhvbWVicmV3IGlzIGRldGVjdGVkLiBUcnlpbmcgdG8gaW5zdGFsbCBjZXJ0dXRpbCB2aWEgSG9tZWJyZXcuLi5gKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHJ1bignYnJldycsIFsnaW5zdGFsbCcsICduc3MnXSwgeyBzdGRpbzogJ2lnbm9yZScgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGRlYnVnKGBicmV3IGluc3RhbGwgbnNzIGZhaWxlZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWJ1ZyhgSG9tZWJyZXcgZGlkbid0IHdvcmssIHNvIHdlIGNhbid0IHRyeSB0byBpbnN0YWxsIGNlcnR1dGlsLiBGYWxsaW5nIGJhY2sgdG8gbWFudWFsIGNlcnRpZmljYXRlIGluc3RhbGxgKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBvcGVuQ2VydGlmaWNhdGVJbkZpcmVmb3godGhpcy5GSVJFRk9YX0JJTl9QQVRILCBjZXJ0aWZpY2F0ZVBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWJ1ZyhgY2VydHV0aWwgaXMgbm90IGFscmVhZHkgaW5zdGFsbGVkLCBhbmQgc2tpcENlcnR1dGlsSW5zdGFsbCBpcyB0cnVlLCBzbyB3ZSBoYXZlIHRvIGZhbGwgYmFjayB0byBhIG1hbnVhbCBpbnN0YWxsYClcbiAgICAgICAgICByZXR1cm4gYXdhaXQgb3BlbkNlcnRpZmljYXRlSW5GaXJlZm94KHRoaXMuRklSRUZPWF9CSU5fUEFUSCwgY2VydGlmaWNhdGVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXdhaXQgY2xvc2VGaXJlZm94KCk7XG4gICAgICBhd2FpdCBhZGRDZXJ0aWZpY2F0ZVRvTlNTQ2VydERCKHRoaXMuRklSRUZPWF9OU1NfRElSLCBjZXJ0aWZpY2F0ZVBhdGgsIGdldENlcnRVdGlsUGF0aCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ0ZpcmVmb3ggZG9lcyBub3QgYXBwZWFyIHRvIGJlIGluc3RhbGxlZCwgc2tpcHBpbmcgRmlyZWZveC1zcGVjaWZpYyBzdGVwcy4uLicpO1xuICAgIH1cbiAgfVxuICBcbiAgcmVtb3ZlRnJvbVRydXN0U3RvcmVzKGNlcnRpZmljYXRlUGF0aDogc3RyaW5nKSB7XG4gICAgZGVidWcoJ1JlbW92aW5nIGRldmNlcnQgcm9vdCBDQSBmcm9tIG1hY09TIHN5c3RlbSBrZXljaGFpbicpO1xuICAgIHRyeSB7XG4gICAgICBydW4oJ3N1ZG8nLCBbXG4gICAgICAgICdzZWN1cml0eScsXG4gICAgICAgICdyZW1vdmUtdHJ1c3RlZC1jZXJ0JyxcbiAgICAgICAgJy1kJyxcbiAgICAgICAgY2VydGlmaWNhdGVQYXRoXG4gICAgICBdLCB7XG4gICAgICAgIHN0ZGlvOiAnaWdub3JlJ1xuICAgICAgfSk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBkZWJ1ZyhgZmFpbGVkIHRvIHJlbW92ZSAkeyBjZXJ0aWZpY2F0ZVBhdGggfSBmcm9tIG1hY09TIGNlcnQgc3RvcmUsIGNvbnRpbnVpbmcuICR7IGUudG9TdHJpbmcoKSB9YCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRmlyZWZveEluc3RhbGxlZCgpICYmIHRoaXMuaXNOU1NJbnN0YWxsZWQoKSkge1xuICAgICAgZGVidWcoJ0ZpcmVmb3ggaW5zdGFsbCBhbmQgY2VydHV0aWwgaW5zdGFsbCBkZXRlY3RlZC4gVHJ5aW5nIHRvIHJlbW92ZSByb290IENBIGZyb20gRmlyZWZveCBOU1MgZGF0YWJhc2VzJyk7XG4gICAgICByZW1vdmVDZXJ0aWZpY2F0ZUZyb21OU1NDZXJ0REIodGhpcy5GSVJFRk9YX05TU19ESVIsIGNlcnRpZmljYXRlUGF0aCwgZ2V0Q2VydFV0aWxQYXRoKCkpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZERvbWFpblRvSG9zdEZpbGVJZk1pc3NpbmcoZG9tYWluOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0cmltRG9tYWluID0gZG9tYWluLnRyaW0oKS5yZXBsYWNlKC9bXFxzO10vZywnJylcbiAgICBsZXQgaG9zdHNGaWxlQ29udGVudHMgPSByZWFkKHRoaXMuSE9TVF9GSUxFX1BBVEgsICd1dGY4Jyk7XG4gICAgaWYgKCFob3N0c0ZpbGVDb250ZW50cy5pbmNsdWRlcyh0cmltRG9tYWluKSkge1xuICAgICAgc3Vkb0FwcGVuZCh0aGlzLkhPU1RfRklMRV9QQVRILCBgMTI3LjAuMC4xICR7dHJpbURvbWFpbn1cXG5gKTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVQcm90ZWN0ZWRGaWxlcyhmaWxlcGF0aDogc3RyaW5nKSB7XG4gICAgYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcyhmaWxlcGF0aCwgJ2RlbGV0ZScpO1xuICAgIHJ1bignc3VkbycsIFsncm0nLCAnLXJmJywgZmlsZXBhdGhdKTtcbiAgfVxuXG4gIGFzeW5jIHJlYWRQcm90ZWN0ZWRGaWxlKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBhc3NlcnROb3RUb3VjaGluZ0ZpbGVzKGZpbGVwYXRoLCAncmVhZCcpO1xuICAgIHJldHVybiAoYXdhaXQgcnVuKCdzdWRvJywgWydjYXQnLCBmaWxlcGF0aF0pKS50b1N0cmluZygpLnRyaW0oKTtcbiAgfVxuXG4gIGFzeW5jIHdyaXRlUHJvdGVjdGVkRmlsZShmaWxlcGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKSB7XG4gICAgYXNzZXJ0Tm90VG91Y2hpbmdGaWxlcyhmaWxlcGF0aCwgJ3dyaXRlJyk7XG4gICAgaWYgKGV4aXN0cyhmaWxlcGF0aCkpIHtcbiAgICAgIGF3YWl0IHJ1bignc3VkbycsIFsncm0nLCBmaWxlcGF0aF0pO1xuICAgIH1cbiAgICB3cml0ZUZpbGUoZmlsZXBhdGgsIGNvbnRlbnRzKTtcbiAgICBhd2FpdCBydW4oJ3N1ZG8nLCBbJ2Nob3duJywgJzAnLCBmaWxlcGF0aF0pO1xuICAgIGF3YWl0IHJ1bignc3VkbycsIFsnY2htb2QnLCAnNjAwJywgZmlsZXBhdGhdKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNGaXJlZm94SW5zdGFsbGVkKCkge1xuICAgIHJldHVybiBleGlzdHModGhpcy5GSVJFRk9YX0JVTkRMRV9QQVRIKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNOU1NJbnN0YWxsZWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBydW4oJ2JyZXcnLCBbJ2xpc3QnLCAnLTEnXSkudG9TdHJpbmcoKS5pbmNsdWRlcygnXFxubnNzXFxuJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG59O1xuIl19