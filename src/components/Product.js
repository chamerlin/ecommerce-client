import React from 'react'
import { Card, Button } from 'react-bootstrap'

function Product( {data} ) {
    return (
        <Card>
            <Card.Img src={`${process.env.REACT_APP_API_URL}/${data.image.split('/')[2]}`} />
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>{data.description}</Card.Text>
                <Card.Text>{data.price}</Card.Text>
                <form>
                    <div>
                        <input type="number" name="quantity" className="form-control"/>
                        <Button variant="primary">Add to Cart</Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    )
}

export default Product