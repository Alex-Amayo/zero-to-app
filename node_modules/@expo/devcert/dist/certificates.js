"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateDomainCertificate;
exports.generateKey = generateKey;
const tslib_1 = require("tslib");
// import path from 'path';
const debug_1 = tslib_1.__importDefault(require("debug"));
const mkdirp_1 = require("mkdirp");
const fs_1 = require("fs");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const certificate_authority_1 = require("./certificate-authority");
const debug = (0, debug_1.default)('devcert:certificates');
/**
 * Generate a domain certificate signed by the devcert root CA. Domain
 * certificates are cached in their own directories under
 * CONFIG_ROOT/domains/<domain>, and reused on subsequent requests. Because the
 * individual domain certificates are signed by the devcert root CA (which was
 * added to the OS/browser trust stores), they are trusted.
 */
function generateDomainCertificate(domain) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        (0, mkdirp_1.sync)((0, constants_1.pathForDomain)(domain));
        debug(`Generating private key for ${domain}`);
        let domainKeyPath = (0, constants_1.pathForDomain)(domain, 'private-key.key');
        generateKey(domainKeyPath);
        debug(`Generating certificate signing request for ${domain}`);
        let csrFile = (0, constants_1.pathForDomain)(domain, `certificate-signing-request.csr`);
        (0, constants_1.withDomainSigningRequestConfig)(domain, (configpath) => {
            (0, utils_1.openssl)(['req', '-new', '-config', configpath, '-key', domainKeyPath, '-out', csrFile]);
        });
        debug(`Generating certificate for ${domain} from signing request and signing with root CA`);
        let domainCertPath = (0, constants_1.pathForDomain)(domain, `certificate.crt`);
        yield (0, certificate_authority_1.withCertificateAuthorityCredentials)(({ caKeyPath, caCertPath }) => {
            (0, constants_1.withDomainCertificateConfig)(domain, (domainCertConfigPath) => {
                (0, utils_1.openssl)(['ca', '-config', domainCertConfigPath, '-in', csrFile, '-out', domainCertPath, '-keyfile', caKeyPath, '-cert', caCertPath, '-days', '825', '-batch']);
            });
        });
    });
}
// Generate a cryptographic key, used to sign certificates or certificate signing requests.
function generateKey(filename) {
    debug(`generateKey: ${filename}`);
    (0, utils_1.openssl)(['genrsa', '-out', filename, '2048']);
    (0, fs_1.chmodSync)(filename, 400);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGVzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJjZXJ0aWZpY2F0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFpQkEsNENBcUJDO0FBR0Qsa0NBSUM7O0FBN0NELDJCQUEyQjtBQUMzQiwwREFBZ0M7QUFDaEMsbUNBQXdDO0FBQ3hDLDJCQUF3QztBQUN4QywyQ0FBeUc7QUFDekcsbUNBQWtDO0FBQ2xDLG1FQUE4RTtBQUU5RSxNQUFNLEtBQUssR0FBRyxJQUFBLGVBQVcsRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRWxEOzs7Ozs7R0FNRztBQUNILFNBQThCLHlCQUF5QixDQUFDLE1BQWM7O1FBQ3BFLElBQUEsYUFBTSxFQUFDLElBQUEseUJBQWEsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRTlCLEtBQUssQ0FBQyw4QkFBK0IsTUFBTyxFQUFFLENBQUMsQ0FBQztRQUNoRCxJQUFJLGFBQWEsR0FBRyxJQUFBLHlCQUFhLEVBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDN0QsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTNCLEtBQUssQ0FBQyw4Q0FBK0MsTUFBTyxFQUFFLENBQUMsQ0FBQztRQUNoRSxJQUFJLE9BQU8sR0FBRyxJQUFBLHlCQUFhLEVBQUMsTUFBTSxFQUFFLGlDQUFpQyxDQUFDLENBQUM7UUFDdkUsSUFBQSwwQ0FBOEIsRUFBQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNwRCxJQUFBLGVBQU8sRUFBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzFGLENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLDhCQUErQixNQUFPLGdEQUFnRCxDQUFDLENBQUM7UUFDOUYsSUFBSSxjQUFjLEdBQUcsSUFBQSx5QkFBYSxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRTlELE1BQU0sSUFBQSwyREFBbUMsRUFBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUU7WUFDdEUsSUFBQSx1Q0FBMkIsRUFBQyxNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFO2dCQUMzRCxJQUFBLGVBQU8sRUFBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFDaEssQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQTtBQUVELDJGQUEyRjtBQUMzRixTQUFnQixXQUFXLENBQUMsUUFBZ0I7SUFDMUMsS0FBSyxDQUFDLGdCQUFpQixRQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLElBQUEsZUFBTyxFQUFDLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFBLGNBQUssRUFBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGNyZWF0ZURlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCB7IHN5bmMgYXMgbWtkaXJwIH0gZnJvbSAnbWtkaXJwJztcbmltcG9ydCB7IGNobW9kU3luYyBhcyBjaG1vZCB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHBhdGhGb3JEb21haW4sIHdpdGhEb21haW5TaWduaW5nUmVxdWVzdENvbmZpZywgd2l0aERvbWFpbkNlcnRpZmljYXRlQ29uZmlnIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgb3BlbnNzbCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgd2l0aENlcnRpZmljYXRlQXV0aG9yaXR5Q3JlZGVudGlhbHMgfSBmcm9tICcuL2NlcnRpZmljYXRlLWF1dGhvcml0eSc7XG5cbmNvbnN0IGRlYnVnID0gY3JlYXRlRGVidWcoJ2RldmNlcnQ6Y2VydGlmaWNhdGVzJyk7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBkb21haW4gY2VydGlmaWNhdGUgc2lnbmVkIGJ5IHRoZSBkZXZjZXJ0IHJvb3QgQ0EuIERvbWFpblxuICogY2VydGlmaWNhdGVzIGFyZSBjYWNoZWQgaW4gdGhlaXIgb3duIGRpcmVjdG9yaWVzIHVuZGVyXG4gKiBDT05GSUdfUk9PVC9kb21haW5zLzxkb21haW4+LCBhbmQgcmV1c2VkIG9uIHN1YnNlcXVlbnQgcmVxdWVzdHMuIEJlY2F1c2UgdGhlXG4gKiBpbmRpdmlkdWFsIGRvbWFpbiBjZXJ0aWZpY2F0ZXMgYXJlIHNpZ25lZCBieSB0aGUgZGV2Y2VydCByb290IENBICh3aGljaCB3YXNcbiAqIGFkZGVkIHRvIHRoZSBPUy9icm93c2VyIHRydXN0IHN0b3JlcyksIHRoZXkgYXJlIHRydXN0ZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlRG9tYWluQ2VydGlmaWNhdGUoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgbWtkaXJwKHBhdGhGb3JEb21haW4oZG9tYWluKSk7XG5cbiAgZGVidWcoYEdlbmVyYXRpbmcgcHJpdmF0ZSBrZXkgZm9yICR7IGRvbWFpbiB9YCk7XG4gIGxldCBkb21haW5LZXlQYXRoID0gcGF0aEZvckRvbWFpbihkb21haW4sICdwcml2YXRlLWtleS5rZXknKTtcbiAgZ2VuZXJhdGVLZXkoZG9tYWluS2V5UGF0aCk7XG5cbiAgZGVidWcoYEdlbmVyYXRpbmcgY2VydGlmaWNhdGUgc2lnbmluZyByZXF1ZXN0IGZvciAkeyBkb21haW4gfWApO1xuICBsZXQgY3NyRmlsZSA9IHBhdGhGb3JEb21haW4oZG9tYWluLCBgY2VydGlmaWNhdGUtc2lnbmluZy1yZXF1ZXN0LmNzcmApO1xuICB3aXRoRG9tYWluU2lnbmluZ1JlcXVlc3RDb25maWcoZG9tYWluLCAoY29uZmlncGF0aCkgPT4ge1xuICAgIG9wZW5zc2woWydyZXEnLCAnLW5ldycsICctY29uZmlnJywgY29uZmlncGF0aCwgJy1rZXknLCBkb21haW5LZXlQYXRoLCAnLW91dCcsIGNzckZpbGVdKTtcbiAgfSk7XG5cbiAgZGVidWcoYEdlbmVyYXRpbmcgY2VydGlmaWNhdGUgZm9yICR7IGRvbWFpbiB9IGZyb20gc2lnbmluZyByZXF1ZXN0IGFuZCBzaWduaW5nIHdpdGggcm9vdCBDQWApO1xuICBsZXQgZG9tYWluQ2VydFBhdGggPSBwYXRoRm9yRG9tYWluKGRvbWFpbiwgYGNlcnRpZmljYXRlLmNydGApO1xuXG4gIGF3YWl0IHdpdGhDZXJ0aWZpY2F0ZUF1dGhvcml0eUNyZWRlbnRpYWxzKCh7IGNhS2V5UGF0aCwgY2FDZXJ0UGF0aCB9KSA9PiB7XG4gICAgd2l0aERvbWFpbkNlcnRpZmljYXRlQ29uZmlnKGRvbWFpbiwgKGRvbWFpbkNlcnRDb25maWdQYXRoKSA9PiB7XG4gICAgICBvcGVuc3NsKFsnY2EnLCAnLWNvbmZpZycsIGRvbWFpbkNlcnRDb25maWdQYXRoLCAnLWluJywgY3NyRmlsZSwgJy1vdXQnLCBkb21haW5DZXJ0UGF0aCwgJy1rZXlmaWxlJywgY2FLZXlQYXRoLCAnLWNlcnQnLCBjYUNlcnRQYXRoLCAnLWRheXMnLCAnODI1JywgJy1iYXRjaCddKVxuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gR2VuZXJhdGUgYSBjcnlwdG9ncmFwaGljIGtleSwgdXNlZCB0byBzaWduIGNlcnRpZmljYXRlcyBvciBjZXJ0aWZpY2F0ZSBzaWduaW5nIHJlcXVlc3RzLlxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlS2V5KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgZGVidWcoYGdlbmVyYXRlS2V5OiAkeyBmaWxlbmFtZSB9YCk7XG4gIG9wZW5zc2woWydnZW5yc2EnLCAnLW91dCcsIGZpbGVuYW1lLCAnMjA0OCddKTtcbiAgY2htb2QoZmlsZW5hbWUsIDQwMCk7XG59Il19