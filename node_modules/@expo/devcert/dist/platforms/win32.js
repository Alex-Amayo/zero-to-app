"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const fs_1 = require("fs");
const shared_1 = require("./shared");
const utils_1 = require("../utils");
const user_interface_1 = tslib_1.__importDefault(require("../user-interface"));
const debug = (0, debug_1.default)('devcert:platforms:windows');
let encryptionKey;
class WindowsPlatform {
    constructor() {
        this.HOST_FILE_PATH = 'C:\\Windows\\System32\\Drivers\\etc\\hosts';
    }
    /**
     * Windows is at least simple. Like macOS, most applications will delegate to
     * the system trust store, which is updated with the confusingly named
     * `certutil` exe (not the same as the NSS/Mozilla certutil). Firefox does it's
     * own thing as usual, and getting a copy of NSS certutil onto the Windows
     * machine to try updating the Firefox store is basically a nightmare, so we
     * don't even try it - we just bail out to the GUI.
     */
    addToTrustStores(certificatePath_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (certificatePath, options = {}) {
            // IE, Chrome, system utils
            debug('adding devcert root to Windows OS trust store');
            try {
                (0, utils_1.run)('certutil', ['-addstore', '-user', 'root', certificatePath]);
            }
            catch (e) {
                e.output.map((buffer) => {
                    if (buffer) {
                        console.log(buffer.toString());
                    }
                });
            }
            debug('adding devcert root to Firefox trust store');
            // Firefox (don't even try NSS certutil, no easy install for Windows)
            try {
                yield (0, shared_1.openCertificateInFirefox)('start firefox', certificatePath);
            }
            catch (_a) {
                debug('Error opening Firefox, most likely Firefox is not installed');
            }
        });
    }
    removeFromTrustStores(certificatePath) {
        debug('removing devcert root from Windows OS trust store');
        try {
            console.warn('Removing old certificates from trust stores. You may be prompted to grant permission for this. It\'s safe to delete old devcert certificates.');
            (0, utils_1.run)('certutil', ['-delstore', '-user', 'root', 'devcert']);
        }
        catch (e) {
            debug(`failed to remove ${certificatePath} from Windows OS trust store, continuing. ${e.toString()}`);
        }
    }
    addDomainToHostFileIfMissing(domain) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let hostsFileContents = (0, fs_1.readFileSync)(this.HOST_FILE_PATH, 'utf8');
            if (!hostsFileContents.includes(domain)) {
                yield (0, utils_1.sudo)(`echo 127.0.0.1  ${domain} >> ${this.HOST_FILE_PATH}`);
            }
        });
    }
    deleteProtectedFiles(filepath) {
        (0, shared_1.assertNotTouchingFiles)(filepath, 'delete');
        (0, fs_1.rmSync)(filepath, { force: true, recursive: true });
    }
    readProtectedFile(filepath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, shared_1.assertNotTouchingFiles)(filepath, 'read');
            if (!encryptionKey) {
                encryptionKey = yield user_interface_1.default.getWindowsEncryptionPassword();
            }
            // Try to decrypt the file
            try {
                return this.decrypt((0, fs_1.readFileSync)(filepath, 'utf8'), encryptionKey);
            }
            catch (e) {
                // If it's a bad password, clear the cached copy and retry
                if (e.message.indexOf('bad decrypt') >= -1) {
                    encryptionKey = null;
                    return yield this.readProtectedFile(filepath);
                }
                throw e;
            }
        });
    }
    writeProtectedFile(filepath, contents) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, shared_1.assertNotTouchingFiles)(filepath, 'write');
            if (!encryptionKey) {
                encryptionKey = yield user_interface_1.default.getWindowsEncryptionPassword();
            }
            let encryptedContents = this.encrypt(contents, encryptionKey);
            (0, fs_1.writeFileSync)(filepath, encryptedContents);
        });
    }
    encrypt(text, key) {
        let cipher = crypto_1.default.createCipher('aes256', new Buffer(key));
        return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    }
    decrypt(encrypted, key) {
        let decipher = crypto_1.default.createDecipher('aes256', new Buffer(key));
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    }
}
exports.default = WindowsPlatform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luMzIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBsYXRmb3Jtcy93aW4zMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBZ0M7QUFDaEMsNERBQTRCO0FBQzVCLDJCQUFnRjtBQUVoRixxQ0FBNEU7QUFFNUUsb0NBQXFDO0FBQ3JDLCtFQUFtQztBQUVuQyxNQUFNLEtBQUssR0FBRyxJQUFBLGVBQVcsRUFBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRXZELElBQUksYUFBcUIsQ0FBQztBQUUxQixNQUFxQixlQUFlO0lBQXBDO1FBRVUsbUJBQWMsR0FBRyw0Q0FBNEMsQ0FBQztJQTBGeEUsQ0FBQztJQXhGQzs7Ozs7OztPQU9HO0lBQ0csZ0JBQWdCO3FFQUFDLGVBQXVCLEVBQUUsVUFBbUIsRUFBRTtZQUNuRSwyQkFBMkI7WUFDM0IsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUE7WUFDdEQsSUFBSSxDQUFDO2dCQUNILElBQUEsV0FBRyxFQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDbkUsQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRTtvQkFDOUIsSUFBSSxNQUFNLEVBQUUsQ0FBQzt3QkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUNqQyxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUNELEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO1lBQ25ELHFFQUFxRTtZQUNyRSxJQUFJLENBQUM7Z0JBQ0gsTUFBTSxJQUFBLGlDQUF3QixFQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNuRSxDQUFDO1lBQUMsV0FBTSxDQUFDO2dCQUNQLEtBQUssQ0FB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QUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTyxPQUFPLENBQUMsU0FBaUIsRUFBRSxHQUFXO1FBQzVDLElBQUksUUFBUSxHQUFHLGdCQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUVGO0FBNUZELGtDQTRGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVEZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyBybVN5bmMgYXMgcm0sIHdyaXRlRmlsZVN5bmMgYXMgd3JpdGUsIHJlYWRGaWxlU3luYyBhcyByZWFkIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJy4uL2luZGV4JztcbmltcG9ydCB7IGFzc2VydE5vdFRvdWNoaW5nRmlsZXMsIG9wZW5DZXJ0aWZpY2F0ZUluRmlyZWZveCB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnLic7XG5pbXBvcnQgeyBydW4sIHN1ZG8gfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgVUkgZnJvbSAnLi4vdXNlci1pbnRlcmZhY2UnO1xuXG5jb25zdCBkZWJ1ZyA9IGNyZWF0ZURlYnVnKCdkZXZjZXJ0OnBsYXRmb3Jtczp3aW5kb3dzJyk7XG5cbmxldCBlbmNyeXB0aW9uS2V5OiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmRvd3NQbGF0Zm9ybSBpbXBsZW1lbnRzIFBsYXRmb3JtIHtcblxuICBwcml2YXRlIEhPU1RfRklMRV9QQVRIID0gJ0M6XFxcXFdpbmRvd3NcXFxcU3lzdGVtMzJcXFxcRHJpdmVyc1xcXFxldGNcXFxcaG9zdHMnO1xuXG4gIC8qKlxuICAgKiBXaW5kb3dzIGlzIGF0IGxlYXN0IHNpbXBsZS4gTGlrZSBtYWNPUywgbW9zdCBhcHBsaWNhdGlvbnMgd2lsbCBkZWxlZ2F0ZSB0b1xuICAgKiB0aGUgc3lzdGVtIHRydXN0IHN0b3JlLCB3aGljaCBpcyB1cGRhdGVkIHdpdGggdGhlIGNvbmZ1c2luZ2x5IG5hbWVkXG4gICAqIGBjZXJ0dXRpbGAgZXhlIChub3QgdGhlIHNhbWUgYXMgdGhlIE5TUy9Nb3ppbGxhIGNlcnR1dGlsKS4gRmlyZWZveCBkb2VzIGl0J3NcbiAgICogb3duIHRoaW5nIGFzIHVzdWFsLCBhbmQgZ2V0dGluZyBhIGNvcHkgb2YgTlNTIGNlcnR1dGlsIG9udG8gdGhlIFdpbmRvd3NcbiAgICogbWFjaGluZSB0byB0cnkgdXBkYXRpbmcgdGhlIEZpcmVmb3ggc3RvcmUgaXMgYmFzaWNhbGx5IGEgbmlnaHRtYXJlLCBzbyB3ZVxuICAgKiBkb24ndCBldmVuIHRyeSBpdCAtIHdlIGp1c3QgYmFpbCBvdXQgdG8gdGhlIEdVSS5cbiAgICovXG4gIGFzeW5jIGFkZFRvVHJ1c3RTdG9yZXMoY2VydGlmaWNhdGVQYXRoOiBzdHJpbmcsIG9wdGlvbnM6IE9wdGlvbnMgPSB7fSk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIElFLCBDaHJvbWUsIHN5c3RlbSB1dGlsc1xuICAgIGRlYnVnKCdhZGRpbmcgZGV2Y2VydCByb290IHRvIFdpbmRvd3MgT1MgdHJ1c3Qgc3RvcmUnKVxuICAgIHRyeSB7XG4gICAgICBydW4oJ2NlcnR1dGlsJywgWyctYWRkc3RvcmUnLCAnLXVzZXInLCAncm9vdCcsIGNlcnRpZmljYXRlUGF0aF0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUub3V0cHV0Lm1hcCgoYnVmZmVyOiBCdWZmZXIpID0+IHtcbiAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGJ1ZmZlci50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGRlYnVnKCdhZGRpbmcgZGV2Y2VydCByb290IHRvIEZpcmVmb3ggdHJ1c3Qgc3RvcmUnKVxuICAgIC8vIEZpcmVmb3ggKGRvbid0IGV2ZW4gdHJ5IE5TUyBjZXJ0dXRpbCwgbm8gZWFzeSBpbnN0YWxsIGZvciBXaW5kb3dzKVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBvcGVuQ2VydGlmaWNhdGVJbkZpcmVmb3goJ3N0YXJ0IGZpcmVmb3gnLCBjZXJ0aWZpY2F0ZVBhdGgpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgZGVidWcoJ0Vycm9yIG9wZW5pbmcgRmlyZWZveCwgbW9zdCBsaWtlbHkgRmlyZWZveCBpcyBub3QgaW5zdGFsbGVkJyk7XG4gICAgfVxuICB9XG4gIFxuICByZW1vdmVGcm9tVHJ1c3RTdG9yZXMoY2VydGlmaWNhdGVQYXRoOiBzdHJpbmcpIHtcbiAgICBkZWJ1ZygncmVtb3ZpbmcgZGV2Y2VydCByb290IGZyb20gV2luZG93cyBPUyB0cnVzdCBzdG9yZScpO1xuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1JlbW92aW5nIG9sZCBjZXJ0aWZpY2F0ZXMgZnJvbSB0cnVzdCBzdG9yZXMuIFlvdSBtYXkgYmUgcHJvbXB0ZWQgdG8gZ3JhbnQgcGVybWlzc2lvbiBmb3IgdGhpcy4gSXRcXCdzIHNhZmUgdG8gZGVsZXRlIG9sZCBkZXZjZXJ0IGNlcnRpZmljYXRlcy4nKTtcbiAgICAgIHJ1bignY2VydHV0aWwnLCBbJy1kZWxzdG9yZScsICctdXNlcicsICdyb290JywgJ2RldmNlcnQnXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZGVidWcoYGZhaWxlZCB0byByZW1vdmUgJHsgY2VydGlmaWNhdGVQYXRoIH0gZnJvbSBXaW5kb3dzIE9TIHRydXN0IHN0b3JlLCBjb250aW51aW5nLiAkeyBlLnRvU3RyaW5nKCkgfWApXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkRG9tYWluVG9Ib3N0RmlsZUlmTWlzc2luZyhkb21haW46IHN0cmluZykge1xuICAgIGxldCBob3N0c0ZpbGVDb250ZW50cyA9IHJlYWQodGhpcy5IT1NUX0ZJTEVfUEFUSCwgJ3V0ZjgnKTtcbiAgICBpZiAoIWhvc3RzRmlsZUNvbnRlbnRzLmluY2x1ZGVzKGRvbWFpbikpIHtcbiAgICAgIGF3YWl0IHN1ZG8oYGVjaG8gMTI3LjAuMC4xICAkeyBkb21haW4gfSA+PiAkeyB0aGlzLkhPU1RfRklMRV9QQVRIIH1gKTtcbiAgICB9XG4gIH1cbiAgXG4gIGRlbGV0ZVByb3RlY3RlZEZpbGVzKGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICBhc3NlcnROb3RUb3VjaGluZ0ZpbGVzKGZpbGVwYXRoLCAnZGVsZXRlJyk7XG4gICAgcm0oZmlsZXBhdGgsIHsgZm9yY2U6IHRydWUsIHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxuXG4gIGFzeW5jIHJlYWRQcm90ZWN0ZWRGaWxlKGZpbGVwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICdyZWFkJyk7XG4gICAgaWYgKCFlbmNyeXB0aW9uS2V5KSB7XG4gICAgICBlbmNyeXB0aW9uS2V5ID0gYXdhaXQgVUkuZ2V0V2luZG93c0VuY3J5cHRpb25QYXNzd29yZCgpO1xuICAgIH1cbiAgICAvLyBUcnkgdG8gZGVjcnlwdCB0aGUgZmlsZVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWNyeXB0KHJlYWQoZmlsZXBhdGgsICd1dGY4JyksIGVuY3J5cHRpb25LZXkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIElmIGl0J3MgYSBiYWQgcGFzc3dvcmQsIGNsZWFyIHRoZSBjYWNoZWQgY29weSBhbmQgcmV0cnlcbiAgICAgIGlmIChlLm1lc3NhZ2UuaW5kZXhPZignYmFkIGRlY3J5cHQnKSA+PSAtMSkge1xuICAgICAgICBlbmNyeXB0aW9uS2V5ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVhZFByb3RlY3RlZEZpbGUoZmlsZXBhdGgpO1xuICAgICAgfVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB3cml0ZVByb3RlY3RlZEZpbGUoZmlsZXBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZykge1xuICAgIGFzc2VydE5vdFRvdWNoaW5nRmlsZXMoZmlsZXBhdGgsICd3cml0ZScpO1xuICAgIGlmICghZW5jcnlwdGlvbktleSkge1xuICAgICAgZW5jcnlwdGlvbktleSA9IGF3YWl0IFVJLmdldFdpbmRvd3NFbmNyeXB0aW9uUGFzc3dvcmQoKTtcbiAgICB9XG4gICAgbGV0IGVuY3J5cHRlZENvbnRlbnRzID0gdGhpcy5lbmNyeXB0KGNvbnRlbnRzLCBlbmNyeXB0aW9uS2V5KTtcbiAgICB3cml0ZShmaWxlcGF0aCwgZW5jcnlwdGVkQ29udGVudHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbmNyeXB0KHRleHQ6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcbiAgICBsZXQgY2lwaGVyID0gY3J5cHRvLmNyZWF0ZUNpcGhlcignYWVzMjU2JywgbmV3IEJ1ZmZlcihrZXkpKTtcbiAgICByZXR1cm4gY2lwaGVyLnVwZGF0ZSh0ZXh0LCAndXRmOCcsICdoZXgnKSArIGNpcGhlci5maW5hbCgnaGV4Jyk7XG4gIH1cblxuICBwcml2YXRlIGRlY3J5cHQoZW5jcnlwdGVkOiBzdHJpbmcsIGtleTogc3RyaW5nKSB7XG4gICAgbGV0IGRlY2lwaGVyID0gY3J5cHRvLmNyZWF0ZURlY2lwaGVyKCdhZXMyNTYnLCBuZXcgQnVmZmVyKGtleSkpO1xuICAgIHJldHVybiBkZWNpcGhlci51cGRhdGUoZW5jcnlwdGVkLCAnaGV4JywgJ3V0ZjgnKSArIGRlY2lwaGVyLmZpbmFsKCd1dGY4Jyk7XG4gIH1cblxufVxuIl19