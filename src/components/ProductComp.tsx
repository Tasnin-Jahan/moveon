import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";
import Price from "../model/price";
import ProductDetails from "../model/products";
import Property from "../model/prop";
import PropertyValues from "../model/property_value";
import Sku from "../model/sku";
import Variation from "../model/variation";
import GalleryComp from "./GalleryComp";

const intialState = {
    colorTile: 'Black',
    sizeTitle: '39',
    discounted: 26.41,
    old: 30.22,
    title: '',

}


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'CHANGE_SIZE':
            return { ...state, discounted: action.discounted, old: action.old, sizeTitle: action.sizeTitle }
        case 'CHANGE_COLOR':
            return { ...state, discounted: action.discounted, old: action.old, colorTile: action.colorTile }
        default:
            return intialState

    }
}

const ProductComp = (props: any) => {

    const product: ProductDetails = props.product;
    const variation: Variation = product.variation;

    const colorProperty: Property = variation.props.find((prop) => prop.name == "Color")!;
    const sizeProperty: Property = variation.props.find((prop) => prop.name == "Shoe Size")!;
    const colorValues: PropertyValues[] = colorProperty.values!;
    const sizeValues: PropertyValues[] = sizeProperty.values!;

    const [colorId, setColor] = useState(771);
    const [sizeId, setSize] = useState(200000364);
    const [state, dispatch] = useReducer(reducer, intialState)

    const changeColor = (newColorId: number) => {
        setColor(newColorId);
        let sku: Sku = getSkuByProps();
        let colorValue: PropertyValues = getColor(colorId)!;
        let newState = {
            type: "CHANGE_COLOR",
            old: sku.price.old, discounted: sku.price.discounted, colorTile: colorValue.title

        }
        dispatch(newState)
    }


    const changeSize = (sizeId: number) => {
        setSize(sizeId);
        let sku: Sku = getSkuByProps();
        let sizeValue: PropertyValues = getSize(sizeId)!;
        let newState = {
            type: "CHANGE_SIZE",
            old: sku.price.old, discounted: sku.price.discounted, sizeTitle: sizeValue.title
        }
        dispatch(newState)
    }

    function getColor(colorId: number) {

        let colorProperty: Property = variation.props.find((prop) => prop.name == "Color")!;
        return colorProperty.values.find(coloProp => coloProp.id == colorId);

    }

    function getSize(sizeId: number) {
        let sizeProperty: Property = variation.props.find((prop) => prop.name == "Shoe Size")!;
        return sizeProperty.values.find(sizeProp => sizeProp.id == sizeId);
    }

    function getSkuByProps(): Sku {
        let sku: Sku = { id: 0, price: null!, props: null!, stock: 0 }
        variation.skus.find((skuItr) => {
            let prop: number[] = skuItr.props
            if (prop[0] == colorId && prop[1] == sizeId) {
                sku = skuItr;
            }
        })
        return sku;
    }

    return (
        <div>
            <Container style={{ marginTop: "150px" }}>
                <Row className="gx-2 gy-2 mt-2 mb-3">
                    <Col ><span>Old Price</span> <h3 style={{ display: "inline" }}>Rs.{state.old}</h3> <span>Discounted Price</span> <h3 style={{ display: "inline" }}>Rs.{state.discounted}</h3></Col>
                </Row>
                <Row>
                    <CardGroup className="justify-content-center">

                        {
                            colorValues.map((colorValue) => {
                                return <Card className="gy-3" onClick={() => changeColor(colorValue.id)}> <Card.Img variant="top" src={colorValue.image} />
                                    <Card.Body>
                                        <Card.Text>
                                            {colorValue.name}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            })
                        }

                    </CardGroup>
                </Row>
                <Row>
                    <Row xs="auto" className="mt-2 mb-2">
                        <h4 style={{ border: "2px solid burlywood", marginTop: "10px" }}><span>Size</span>{state.sizeTitle && state.sizeTitle}</h4>
                        {
                            sizeValues.map((sizeValue) => {
                                return <Col style={{ border: "2px solid burlywood" }} onClick={() => changeSize(sizeValue.id)}> <br />
                                    {sizeValue.name}
                                </Col>
                            })
                        }
                    </Row>
                </Row>
            </Container>

        </div>
    )
}

export default ProductComp