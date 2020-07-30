import React, { useState } from 'react';
import { values, size } from "lodash";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { validateEmail } from '../../../utils/validations';
import { signUpApi } from '../../../api/auth';
import "./SignUpForm.scss";

export default function SignUpForm(props) {
    
    const { setShowModal } = props;
    const [ formData, setFormData ] = useState(initialFormValues());
    const [ signUpLoading, setSignUpLoading] = useState(false);
    const [ disableButton, setDisableButton] = useState( false);

    // Validaciones para formulario y Control de llenado de las campos
    const onSubmit = e => {
        e.preventDefault();
        console.log('Inside SignUpForm -> ' , formData);

        let validCount = 0
        values (formData).some(value => {
            value && validCount++
            return null
        });
        console.log("Valid Count -> " , validCount);

        if(validCount !== size(formData)){
            toast.warning(<div><FontAwesomeIcon icon={faExclamationTriangle} /> Please provide information to create your account.</div>, toastValues());
        } else {
            if(!validateEmail(formData.email)){
                toast.warning(<div><FontAwesomeIcon icon={faExclamationTriangle} /> Invalid email address.</div>, toastValues());
            } else if(formData.password !== formData.repeatPassword){
                toast.warning("");
                toast.warning(<div><FontAwesomeIcon icon={faExclamationTriangle} /> Passwords don't match.</div>, toastValues());
            } else if(size(formData.password) < 6){
                toast.warning(<div><FontAwesomeIcon icon={faExclamationTriangle} /> Passwords must contain 6 or more characters.</div>, toastValues());
            } else {

                setSignUpLoading(true);
                setDisableButton(true);
                signUpApi(formData).then(response => {
                    if(response.code){
                        toast.error(<div><FontAwesomeIcon icon={faTimesCircle} /> ${response.message}</div>, toastValues());
                    } else {
                        toast.success(<div><FontAwesomeIcon icon={faCheckCircle} /> Registration successful.</div>, toastValues());
                        setShowModal(false);
                        setFormData(initialFormValues());
                    }
                }). catch(() => {
                    toast.error(<div><FontAwesomeIcon icon={faTimesCircle} /> There was an error with your registration, please try again later.</div>, toastValues());
                }).finally(()=> {
                    setSignUpLoading(false);
                    setDisableButton(false);
                });
            }
        }
    };

    // Esto sólo sirve para formularios donde únicamente hay campos input.
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="sign-up-form">
            <h2>Join Now</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Name" name="nombre" defaultValue={formData.nombre} />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Last Name" name="apellidos" defaultValue={formData.apellidos} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" name="email" defaultValue={formData.email}/>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder="Password" name="password" defaultValue={formData.password} />
                        </Col>
                        <Col>
                            <Form.Control type="password" placeholder="Confirm Password" name="repeatPassword" defaultValue={formData.repeatPassword} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="actionButtons">
                    <Button variant="outline-secondary" disabled={disableButton}  onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" >
                        {!signUpLoading ? "Submit" : <Spinner animation="border" />}
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

function initialFormValues() {
    return{
        nombre:         "",
        apellidos:      "",
        email:          "",
        password:       "",
        repeatPassword: ""
    };
}

function toastValues(){
    return {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
}