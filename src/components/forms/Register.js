import React, {useState} from 'react'
import { 
    Container,
    Row,
    Col,
    Form,
    Button 
} from 'react-bootstrap'
import Swal from 'sweetalert2'

function Register(){
    const [user, setUser] = useState({})

    let onChangeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    let onSubmitHandler = (e) => {
            e.preventDefault()
            fetch(`${process.env.REACT_APP_API_URL}/auth/register/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if(data.errors){
                    Swal.fire(JSON.stringify(data.errors))
                }else{
                    Swal.fire(data.msg)
                }
            })
            setUser({})
            e.target.reset()
    }


    return(
        <Container>
            <Row>
                <Col md="6">
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group>
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control type="text" name="fullname" onChange={onChangeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={onChangeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={onChangeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="password2" onChange={onChangeHandler}/>
                        </Form.Group>
                        <Button type="submit" variant="success">Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register