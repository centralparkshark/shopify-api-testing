export default function tamData(shopifySKU) {
    const items = [
        {
            sku: "22189",
            qty: 400,
        },
        {
            sku: "22125",
            qty: 534,
        },
        {
            sku: "22351",
            qty: 88,
        },
        {
            sku: "15670",
            qty: 904,
        }
    ]
    const foundObj = items.find((item) => item.sku == shopifySKU)
    if (foundObj) {
        return foundObj
    } else {
        console.log("No item found.")
        return null;
    }
}