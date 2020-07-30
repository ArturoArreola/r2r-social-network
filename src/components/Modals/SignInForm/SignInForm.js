import React, { useState } from "react";
import { values, size } from "lodash";
import { Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCheckCircle , faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { validateEmail } from '../../../utils/validations';
import { logInApi, setTokenApi } from '../../../api/auth';
import "./SignInForm.scss";

export default function SignInForm(props) {


    const { setShowModal, setRefreshCheckLogin } = props;
    const [formData, setFormData] = useState(initialFormValues());
    const [ signInLoading, setSignInLoading] = useState(false);
    const onSubmit = e => {
        e.preventDefault();
        console.log('Inside SignUpForm -> ', formData);

        let validCount = 0
        values (formData).some(value => {
            value && validCount++
            return null
        });
        console.log("Valid Count -> " , validCount);

        if(validCount !== size(formData)){
            toast.warning(<div><FontAwesomeIcon icon={faExclamationTriangle} /> Please provide information to log in</div>, toastValues());
        } else {
            if(!validateEmail(formData.email)){
                toast.warning(<div><FontAwesomeIcon icon={faExclamationTriangle} /> Invalid email address</div>, toastValues());
            } else {
                setSignInLoading(true);
                logInApi(formData).then( response => {
                    if(response.message){
                        toast.warning(<div><FontAwesomeIcon icon={faExclamationTriangle} /> {response.message}</div>, toastValues());
                    } else {
                        console.log(response.token);
                        setTokenApi(response.token);
                        setRefreshCheckLogin(true);
                        toast.success(<div><FontAwesomeIcon icon={faCheckCircle} /> Successful login</div>, toastValues());
                    }
                }). catch(()=> {
                    toast.error(<div><FontAwesomeIcon icon={faTimesCircle} /> There was an error with server, please try again later.</div>, toastValues());
                }). finally(() => {
                    setSignInLoading(false);
                })
            }
        }

    }

// Esto sólo sirve para formularios donde únicamente hay campos input.
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    return(
        <div className="sign-in-form">
            <h2>Sign in to R2R Social</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" name="email" defaultValue={formData.email} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" name="password" defaultValue={formData.password} />
                </Form.Group>
                <Form.Group className="actionButtons">
                    <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" >
                        {!signInLoading ? "Sign in" : <Spinner animation="border" />}
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}


function initialFormValues() {
    return{
        email:          "",
        password:       ""
    }
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