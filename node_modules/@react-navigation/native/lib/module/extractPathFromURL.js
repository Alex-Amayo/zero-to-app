import escapeStringRegexp from 'escape-string-regexp';
export default function extractPathFromURL(prefixes, url) {
  for (const prefix of prefixes) {
    var _prefix$match;
    const protocol = ((_prefix$match = prefix.match(/^[^:]+:/)) === null || _prefix$match === void 0 ? void 0 : _prefix$match[0]) ?? '';
    const host = prefix.replace(new RegExp(`^${escapeStringRegexp(protocol)}`), '').replace(/\/+/g, '/') // Replace multiple slash (//) with single ones
    .replace(/^\//, ''); // Remove extra leading slash

    const prefixRegex = new RegExp(`^${escapeStringRegexp(protocol)}(/)*${host.split('.').map(it => it === '*' ? '[^/]+' : escapeStringRegexp(it)).join('\\.')}`);
    const [originAndPath, searchParams] = url.split('?');
    const normalizedURL = originAndPath.replace(/\/+/g, '/').concat(searchParams ? `?${searchParams}` : '');
    if (prefixRegex.test(normalizedURL)) {
      return normalizedURL.replace(prefixRegex, '');
    }
  }
  return undefined;
}
//# sourceMappingURL=extractPathFromURL.js.map