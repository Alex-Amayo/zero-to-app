import Hash from "./Hash";
export default function HexadecimalToHash(source) {
    if (!/^[0-9a-f]+$/i.test(source)) {
        throw new TypeError('Not hexadecimal.');
    }
    var binaryNumber = source.split('').map(function (row) { return parseInt(row, 16).toString(2).padStart(4, '0'); }).join('');
    return new Hash(binaryNumber);
}
