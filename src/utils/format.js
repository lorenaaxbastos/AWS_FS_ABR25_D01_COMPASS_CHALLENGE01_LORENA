export const titleCase = (str) => {
    return str
        .trim()
        .split(/\s+/)
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
};

export const priceFormatUS = (value) => {
    const str = String(value).trim();

    if (/[^0-9.,]/.test(str)) return "";

    const num = parseFloat(str.replace(",", "."));

    if (isNaN(num)) return "";

    return `U$ ${num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};
