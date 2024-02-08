export const numberFormatter = new Intl.NumberFormat("en-US", {
    compactDisplay: "short",
    notation: "compact",
});

export const sizeFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "unit",
    unit: "byte",
    compactDisplay: "short",
    unitDisplay: "narrow",
});
