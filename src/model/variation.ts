import Property from "./prop"
import Sku from "./sku"

interface Variation{
    skus : Sku[],
    props : Property[]

}

export default Variation