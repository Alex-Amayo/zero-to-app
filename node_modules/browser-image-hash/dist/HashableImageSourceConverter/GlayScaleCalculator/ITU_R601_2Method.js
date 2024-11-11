export default function ITU_R601_2Method(r, g, b) {
    return Math.round((r * 299 / 1000 + g * 587 / 1000 + b * 114 / 1000));
}
;
