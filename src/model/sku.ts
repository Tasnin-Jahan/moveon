import Price from "./price"

interface Sku {
    id: number,
    price: Price
    props: number[],
    stock: number
}

export default Sku