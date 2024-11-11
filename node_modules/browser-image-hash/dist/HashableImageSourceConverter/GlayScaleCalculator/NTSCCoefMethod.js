export default function NTSCCoefMethod(r, g, b) {
    return (Math.round((2 * r + 4 * g + b) / 7));
}
;
