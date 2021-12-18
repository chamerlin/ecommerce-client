import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
// import Product from './components/Product'
import TopNav from './components/partials/Navbar'
import Register from './components/forms/Register'
import Login from './components/forms/Login'
import Cart from './components/Cart'
import AddProduct from './components/forms/AddProducts'
import Products from './components/Products'
import Orders from './components/Orders'
import { BiSearchAlt2 } from "react-icons/bi";


function App() {
  const [ products, setProducts ] = useState([])
  const [token, setToken] = useState("")
  const [userData, setUserData] = useState({})
  const [keyword, setKeyword] = useState("")

  let getProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
    .then(res => res.json())
    .then(data => setProducts(data))
  }

  let searchedProducts = (e) => {
    setKeyword(e.target.value)
    if(keyword === "") return setProducts()
    else {
      fetch(`${process.env.REACT_APP_API_URL}/products/search/${keyword}`)
      .then(res => res.json())
      .then(data => setProducts(data))
    }
  }

  let handleLogin = (data) => {
    let decoded = jwt_decode(data)
    setToken(data)
    setUserData(decoded)

    localStorage.setItem('userData', JSON.stringify(decoded))
    localStorage.setItem('token', data)
  }

  let handleLogout = (data) => {
    setToken()
    setUserData()
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
  }

  useEffect( () => {
    getProducts()
  }, [])

  // let showProducts = products.map(product => <Product key={product._id} data={product}/>)

  return (
    <div className="App">
      <TopNav handleLogout={handleLogout}/>
       {/* only show the add product if you are an admin and you are logged in */}
        {
          localStorage.hasOwnProperty('token') && JSON.parse(localStorage.getItem('userData')).isAdmin === true ?
            <AddProduct products={products} getProducts={getProducts}/> :
            <></>
        }

        <div>
          <input type="text" className="mt-4 ms-5 col-md-8" onChange={searchedProducts} placeholder="Search for products..."/> 
          <button><BiSearchAlt2 /></button>
        </div>
        
      <Routes>
        <Route path="/" element={<Products  data={products} getProducts={getProducts}/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
      </Routes>
    </div>
  );
}

export default App;
