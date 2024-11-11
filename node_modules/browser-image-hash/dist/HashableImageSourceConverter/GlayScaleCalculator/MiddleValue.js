export default function MiddleValue(r, g, b) {
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    return (Math.floor((max + min) / 2));
}
;
