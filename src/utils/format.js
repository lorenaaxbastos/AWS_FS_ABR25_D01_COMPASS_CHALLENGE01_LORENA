export const titleCase = (str) => {
    return str
        .trim()
        .split(/\s+/)
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
};

// FIX
export const priceFormatBR = (value) => {
    if (typeof value !== "string" && typeof value !== "number") return "";

    let str = String(value).replace(/r\$/i, "").trim();

    if (/[^0-9.,]/.test(str)) return "";

    const lastComma = str.lastIndexOf(",");
    const lastDot = str.lastIndexOf(".");

    let decimalSep = "";
    if (lastComma > lastDot) decimalSep = ",";
    else if (lastDot > lastComma) decimalSep = ".";

    let integerPart = str;
    let decimalPart = "";

    if (decimalSep) {
        const parts = str.split(decimalSep);
        if (parts.length > 2) return "";
        integerPart = parts[0];
        decimalPart = parts[1];

        if (decimalPart.length > 2) {
            decimalPart = Math.round(parseFloat("0." + decimalPart) * 100)
                .toString()
                .padStart(2, "0");
        }
    }

    const thousandSep = decimalSep === "," ? "." : ",";

    const groups = integerPart.split(thousandSep);
    for (let i = 1; i < groups.length; i++) {
        if (groups[i].length !== 3) return "";
    }

    const cleanedInteger = integerPart.split(thousandSep).join("");

    const normalized = cleanedInteger + (decimalPart ? "." + decimalPart : "");
    const num = parseFloat(normalized);

    if (isNaN(num)) return "";

    return `R$ ${num.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};
