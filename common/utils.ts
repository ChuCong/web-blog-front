export const formatBillion = (val: String | Number | undefined) => {
    if (!val) return "0.000";
    const num = Number(String(val).replace(/\./g, ""));
    if (!num) return "0.000";
    const rounded = Math.ceil(num / 1_000_000) * 1_000_000;
    const ty = rounded / 1_000_000_000;
    return Number(ty.toFixed(3)).toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}

export const formatPrice = (val: string | number | undefined) => {
    if (!val) return "0";
    const num = Number(String(val).replace(/\./g, ""));
    if (!num) return "0";
    return Number(num).toLocaleString("en-US");
}

export const cleanParams = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    );
}