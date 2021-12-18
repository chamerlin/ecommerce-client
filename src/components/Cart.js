import React, { useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import StripeCheckout from 'react-stripe-checkout'

function Cart() {
    let [cartItems, setCartItems] = useState({})
    // let [newQuantity, setNewQuantity] = useState({})

    let getCart = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cart`, {
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => setCartItems(data))
    }

    useEffect (() => {
        getCart()
    }, [])

    let onChangeHandler = (e) => {
        e.target.parentElement.requestSubmit()

        //new quantity
        let newQuantity = e.target.value
        //itemId
        let itemId = e.target.nextElementSibling.value

        fetch(`${process.env.REACT_APP_API_URL}/cart/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "quantity": newQuantity
            })
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(data.msg) 
            getCart()
        })
    }

    let onSubmitHandler = (e) => {
        e.preventDefault()
    }
    //delete single item in a cart
    let deleteHandler = (itemId) => {
        Swal.fire({
            "title": "Are you sure?",
            "text": "You won't be able to revert this!",
            'icon': "warning",
            'showCancelButton': true,
            'confirmButtonColor': "#3085d6",
            'cancelButtonColor': '#d33',
            'confirmButtonText': "Yes, delete it!"
         }).then(result => {
             if(result.isConfirmed){
                 fetch(`${process.env.REACT_APP_API_URL}/cart/${itemId}`,{
                     method: "DELETE",
                     headers: {
                         "x-auth-token": localStorage.getItem('token')
                     }
                 })
                 .then(res => res.json())
                 .then(data => {
                     Swal.fire('Deleted!', data.msg , 'success')
                     getCart()
                 })
             }
         })
    }

    let emptyCart = () => {
        Swal.fire({
            "title": "Are you sure?",
            "text": "You won't be able to revert this!",
            'icon': "warning",
            'showCancelButton': true,
            'confirmButtonColor': "#3085d6",
            'cancelButtonColor': '#d33',
            'confirmButtonText': "Yes, delete it!"
         }).then(result => {
             if(result.isConfirmed){
                 fetch(`${process.env.REACT_APP_API_URL}/cart`,{
                     method: "DELETE",
                     headers: {
                         "x-auth-token": localStorage.getItem('token')
                     }
                 })
                 .then(res => res.json())
                 .then(data => {
                     Swal.fire('Deleted!', data.msg , 'success')
                     getCart()
                 })
             }
         })
    }

    let displayCartItems = cartItems.items?.map( item => {
        return(
            <tr key={item.itemId}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                    <form onSubmit={onSubmitHandler}>
                        <input type="number" name="quantity"
                        value={item.quantity}
                        onChange={onChangeHandler}/>
                        <input type="hidden" name="itemId"
                        value={item.itemId}/>
                    </form>
                </td>
                <td>{item.price * item.quantity}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteHandler(item.itemId)}>Delete</button>
                </td>
            </tr>
        )
      }) 
      
      let userData = JSON.parse(localStorage.getItem('userData'))

      let tokenHandler = (token, addresses) => {
        fetch(`${process.env.REACT_APP_API_URL}/orders`, {
            method: "POST",
            headers: {"x-auth-token": localStorage.getItem('token')}
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(data.msg)
        })
      }
      
    return (
        <div>
            {
            cartItems.length !== 0 && cartItems.msg !== "Your cart is empty" ?
                <div className="container">
                    <h2>My Cart</h2>
                    <table className="table table-responsive">
                        <thead className="thead-dark">
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayCartItems}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total: {cartItems.total}</td>
                                <td>
                                    <StripeCheckout 
                                    stripeKey="pk_test_51K3uZWCSiqqSoRMORrKsUBGN6GES9bCIVGap0oTa2FuhacuL6z3zz0c547uc7kO37mcLIHXhuAxTYgEHlUC6yOuy00WeZLzCGM"
                                    amount={cartItems.total * 100}
                                    currency="MYR"
                                    name="Your Cart"
                                    email={userData.email}
                                    token={tokenHandler}
                                    />
                                </td>
                                <td><button onClick={emptyCart} className="btn btn-danger">Empty Cart</button></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            :
            <h2>Your Cart is Empty</h2>
            }
        </div>
    )
}

export default Cart