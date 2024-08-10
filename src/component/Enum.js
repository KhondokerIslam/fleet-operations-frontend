import React, {useEffect} from "react";
import axios from "axios";

export const Enum = ({ fieldName, enumName }) => {

    const [enumClass, setEnumClass] = React.useState({});

    useEffect(() => {

        axios
            .post( "http://localhost:8080/api/enum", enumName, {
                headers: {
                    "Content-Type": "application/json"
                }
            } )
            .then( response => {
                setEnumClass( response.data )
            } )
            .catch( (error) => {

                console.log(error)
            })

    }, []);

    return (
        <div>

        </div>

    )
}