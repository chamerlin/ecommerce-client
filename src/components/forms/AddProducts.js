import React, {useState} from 'react'
import Swal from 'sweetalert2'

function AddProduct({ getProducts }){
    let [product, setProduct] = useState({})
    // let [image, setImage] = useState({file:null})

    let onChangeHandler = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }

    let onSubmitHandler = (e) => {
        e.preventDefault()
        let allData = new FormData()
        let imageData = document.getElementById('img').files[0]

        
        allData.append('name', product.name)
        allData.append('quantity', product.quantity)
        allData.append('price', product.price)
        allData.append('description', product.description)
        allData.append('category', product.category)
        allData.append('image', imageData)

        fetch(`${process.env.REACT_APP_API_URL}/products`, {
            method: "POST",
            headers: {
                "x-auth-token": localStorage.getItem('token'),
            },
            body: allData
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(data.msg)
            getProducts()
            e.target.reset()
        })
    }

    // let imageChangeHandler = (e) => {
    //     e.preventDefault()
    //     setImage({file:e.target.files[0]})
    // }

    return(
        <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
            <h2>ADD PRODUCTS</h2>
            <label>Product Name</label>
            <div>
                <input type="text" name="name" className="form-control" onChange={onChangeHandler}/>
            </div>
            <label>Quantity</label>
            <div>
                <input type="number" name="quantity" className="form-control" onChange={onChangeHandler} />
            </div>
            <label>Price</label>
            <div>
                <input type="number" name="price" className="form-control" onChange={onChangeHandler} />
            </div>
            <label>Description</label>
            <div>
                <input type="text" name="description" className="form-control" onChange={onChangeHandler} />
            </div>
            <label>Category</label>
            <div>
                <input type="text" name="category" className="form-control" onChange={onChangeHandler} />
            </div>
            <label>Add Images</label>
            <div>
                <input type="file" name="image" id="img" className="form-control"/>
            </div>
            <button>Add Product</button>
        </form>
    )
}

export default AddProduct