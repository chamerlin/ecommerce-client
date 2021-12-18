import React, {useState} from 'react'
import Swal from 'sweetalert2'

function EditProduct({setEditing, product}) {
    let [cartItem, setCartItem] = useState({
        id: product._id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
    })
    // let [image, setImage] = useState({file: product.image})
    // let [show, setShow] = useState(false)

    let onChangeHandler = (e) => {
        setCartItem({...cartItem, [e.target.name]: e.target.value})
    }


    // let imageChangeHandler = (e) => {
    //     e.preventDefault()
    //     setImage({file:e.target.files[0]})
    // }

    let onSubmitHandler = (e, id) => {
        e.preventDefault()
        let allData = new FormData()
      
        let imageData = document.getElementById('img').files[0]
        
        allData.append('name', cartItem.name)
        allData.append('quantity', cartItem.quantity)
        allData.append('price', cartItem.price)
        allData.append('description', cartItem.description)
        allData.append('category', cartItem.category)
        allData.append('image', imageData)
        // console.log(imageData)
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
            body: allData
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(data.msg)
            setEditing(false)
        })
    }

    return(
                <form encType="multipart/form-data" onSubmit={(e) => onSubmitHandler(e, product._id)}> 
                    {JSON.stringify(cartItem)}
                    <label>Name</label>
                    <div>
                        <input type="text" 
                        name="name" className="form-control" 
                        value={cartItem.name} onChange={onChangeHandler}/>
                    </div>
                    <label>Quantity</label>
                    <div>
                        <input type="number" 
                        name="quantity" className="form-control" 
                        value={cartItem.quantity} onChange={onChangeHandler}/>
                    </div>
                    <label>Price</label>
                    <div>
                        <input type="number" 
                        name="price" className="form-control" 
                        value={cartItem.price} onChange={onChangeHandler}/>
                    </div>
                    <label>Description</label>
                    <div>
                        <input type="text" 
                        name="description" className="form-control" 
                        value={cartItem.description} onChange={onChangeHandler}/>
                    </div>
                    <label>Category</label>
                    <div>
                        <input type="text" 
                        name="category" className="form-control" 
                        value={cartItem.category} onChange={onChangeHandler}/>
                    </div>
                    <label>Image</label>
                    <div>
                        <input type="file" 
                        name="image" id="img" className="form-control" 
                        onChange={imageChangeHandler}/>
                    </div>
                    <button className="my-3">Save Changes</button>
                </form>
    )
}

export default EditProduct