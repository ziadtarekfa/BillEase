export default function formatCurrency(amount?: number) {
    amount ??= 0;
    return new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
    }).format(amount);
}
