import Input from "../component/Input";
import {useState} from "react";
import Button from "../component/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Signup = () => {

    const navigate = useNavigate();

    const initItem = {
        username: '',
        password: ''
    }

    const [item, setItem] = useState(initItem)
    const [error, setError] = useState(false)

    const handleCallback = (e) => {

       setItem(
           {
               ...item,
               [e.target.name]: e.target.value
           }
       )
    }

    const handleSubmitCallBack = async () => {

        axios
            .post("http://localhost:8080/user/signup", item, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(
                navigate('/')
            )
            .catch( (error) => {
                setError(error.message)
                console.log(error.message)
            })
    }

    if ( error ){
        return error;
    }

    return (
        <div>
            <Input
                id='username'
                name='username'
                type='text'
                value={item.username}
                required='required'
                placeHolder="Enter Email"
                callback={handleCallback}
            >
            </Input>

            <Input
                id='password'
                name='password'
                type='password'
                value={item.password}
                required='required'
                placeHolder="Enter Password"
                callback={handleCallback}
            >

            </Input>

            <Button
                type='button'
                name='Register'
                callback={handleSubmitCallBack}
                >

            </Button>

        </div>

    )
}