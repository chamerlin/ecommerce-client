import React, {useState} from 'react'
import { 
    Container,
    Row,
    Col,
    Form,
    Button 
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'

function Login( {handleLogin} ){
    let navigate = useNavigate()
    let [user, setUser] = useState({})

    let onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    let onSubmitHandler = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire(data.msg)
            handleLogin(data.token)
            navigate("/")
        })
    }
    
    return(
        <Container>
            <Row>
                <Col md="6">
                    <Form method="POST" onSubmit={onSubmitHandler}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={onChangeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={onChangeHandler}/>
                        </Form.Group>
                        <Button type="submit" variant="success">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login