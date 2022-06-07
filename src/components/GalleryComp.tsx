import { Card, CardGroup } from "react-bootstrap";
import Gallery from "../model/gallery";

function GalleryComp(props: any) {
    const galleries: Gallery[] = props.gallery
    return (
        <CardGroup className="justify-content-center">

            {
                galleries.map(gal => {
                    return <Card style={{ marginTop: "250px" }}> <Card.Img variant="top" src={gal.url} />

                    </Card>
                })
            }

        </CardGroup>
    )

}

export default GalleryComp