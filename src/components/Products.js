import React, {useState} from 'react'
import { BsCartPlusFill } from "react-icons/bs";
import Swal from 'sweetalert2'
import {Modal, Button} from 'react-bootstrap'
import EditProduct from '../components/forms/EditProduct'

function Products({data, getProducts}){
    let [cartItem, setCartItem] = useState({})
    let [editing, setEditing] = useState(false)
    
    let onChangeHandler = (e) => {
        setCartItem({...cartItem, [e.target.name]:e.target.value})
    }

    // let editChangeHandler = (e) => {
    //     setEditItem({...editItem, [e.target.name]:e.target.value})
    // }

    let deleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
                  method: 'DELETE',
                  headers: {"x-auth-token": localStorage.getItem('token')}
              })
              .then(res => res.json())
              .then(data =>{
                    getProducts()
                    Swal.fire(
                        'Deleted!',
                        data.msg,
                        'success'
                      )
              })
              .catch(err => Swal.fire(err.msg))
            }
          })
    }

    let onSubmitHandler = (e, id) => {
        cartItem.itemId = id
        fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
            method: "POST",
            headers: {
                "x-auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data => Swal.fire(data.msg))
    }

    // let editSubmitHandler = (e, id) => {
    //     // fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
    //     e.preventDefault()
    //     console.log(id)
    // }

    // let handleClose = () => setShow(false)
    // let handleShow = () => setShow(true)

        let showProducts = 
        // data.length ?  <h2>No Products to Show</h2>
        // :
         data.map(product => {
            
            return(
                <div className="col-md-4">
                    <div className="card">
                        <img src={`${process.env.REACT_APP_API_URL}/${product.image.split('/')[2]}`} alt="product image"/>
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <strong>RM: {product.price}</strong>
                            <form onSubmit={(e) => onSubmitHandler(e, product._id)}>
                                <div className="input-group">
                                    <input type="number" className="form-control" 
                                    name="quantity" onChange={onChangeHandler}/>
                                    <input type="hidden" className="form-control" name="itemId" value={product._id} />
                                    <button className="btn btn-success" type="submit"><BsCartPlusFill /></button>
                                </div>
                            </form>
    
                            {
                                localStorage.hasOwnProperty('token') && JSON.parse(localStorage.getItem('userData')).isAdmin === true ?
                                <div className="my-3">
                                    {
                                        editing ? 
                                        <EditProduct product={product}  data={data} setEditing={setEditing}/> :
                                        <></>
                                    }
                                     {/* <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Edit Product</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form encType="multipart/form-data" onSubmit={(e) => editSubmitHandler(e, product._id)}>
                                                <label>Name</label>
                                                <div>
                                                    <input type="text" 
                                                    name="name" className="form-control" 
                                                    value={editItem.name} onChange={() => editChangeHandler(product._id)}/>
                                                </div>
                                                <label>Quantity</label>
                                                <div>
                                                    <input type="number" 
                                                    name="quantity" className="form-control" 
                                                    value={editItem.quantity} onChange={editChangeHandler}/>
                                                </div>
                                                <label>Price</label>
                                                <div>
                                                    <input type="number" 
                                                    name="price" className="form-edittrol" 
                                                    value={editItem.price} onChange={editChangeHandler}/>
                                                </div>
                                                <label>Description</label>
                                                <div>
                                                    <input type="text" 
                                                    name="description" className="form-control" 
                                                    value={editItem.description} onChange={editChangeHandler}/>
                                                </div>
                                                <label>Category</label>
                                                <div>
                                                    <input type="text" 
                                                    name="category" className="form-control" 
                                                    value={editItem.category} onChange={editChangeHandler}/>
                                                </div>
                                                <label>Image</label>
                                                {/* <div>
                                                    <input type="file" 
                                                    name="image" className="form-control" 
                                                    onChange={onChangeHandler}/>
                                                </div> */}
                                            {/* </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Save Changes
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>  */}
                                    <button className="btn btn-warning" onClick={()=> setEditing(!editing)} >
                                        {editing? "Cancel" :"Edit"}
                                    </button>

                                    <button className="btn btn-danger" onClick={() => deleteHandler(product._id)}>Delete</button>
                                </div>
                                :
                                <></>
                            }
    
                        </div>
                    </div>
                </div>
            )
        })
       

    return(
        <div className="container my-5">
            <h2>All Products</h2>
            <div className="row">
                {data.length ? showProducts : <h2>No Products Shown</h2>}
            </div>
        </div>
    )
}

export default Products