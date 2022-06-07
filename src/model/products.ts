import Gallery from "./gallery"
import Variation from "./variation"

interface ProductDetails {
    id: string,
    title: string,
    link: string,
    image: string,
    gallery: Gallery[],
    ratings_count: number,
    ratings_average: number,
    variation: Variation
}

export default ProductDetails