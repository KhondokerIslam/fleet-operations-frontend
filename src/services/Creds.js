import {useNavigate} from "react-router-dom";
import Button from "../component/Button";

export const Creds = () => {

    const navigate = useNavigate();

    const handleCallBack = (e) => {

        if( e.target.value === "login" ) {

            navigate('/login')
        }
        else{

            navigate('/signup')
        }
    }

    return (

        <div>
            <Button
                type='button'
                name='Sign up'
                value='register'
                callback={ handleCallBack }
                >

            </Button>

            <Button
                type='button'
                name='Login'
                value='login'
                callback={ handleCallBack }
                >

            </Button>
        </div>
    )


}