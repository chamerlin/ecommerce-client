import React, {useState, useEffect} from 'react'
import {Accordion} from 'react-bootstrap'

function Orders() {
    let [orders, setOrders] = useState([])

    let getOrders = () => {
        fetch(`${process.env.REACT_APP_API_URL}/orders`,{
            method: "GET",
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => setOrders(data))
    }
    console.log()

    useEffect( () => {
        getOrders()
    }, [])

    let showOrders = 
        orders.length ?
        orders.map(order => {
            return(
                <Accordion.Item eventKey={order._id}>
                    <Accordion.Header>{order.purchased_date}</Accordion.Header>
                    <Accordion.Body>
                        {
                            order.items.map(item => {
                                return(
                                    <div>
                                        <h2>{item.name}</h2>
                                        <h6>Price: {item.price}</h6>
                                        <h6>Quantity: {item.quantity}</h6>
                                        <h6>Subtotal: {item.subtotal}</h6>
                                    </div>
                                )
                            })
                        }
                        <h6>RM{order.total}</h6>
                        {/* <h2>{order.items.map(item => item.name + \n)}</h2>
                        <h6>Price: {order.items.map(item => "RM" + item.price)}</h6>
                        <h6>Quantity: {order.items.map(item => item.quantity)}</h6>
                        <h6>Subtotal: {order.items.map(item => item.subtotal)}</h6>
                        <h4>Total: RM{order.total}</h4> */}
                    </Accordion.Body>
                </Accordion.Item>
            )
        }) :
        <h2>No orders to show</h2>
    

    return(
        <div className="container py-5">
            <Accordion>
                {showOrders}
            </Accordion>
        </div>
    )
}

export default Orders