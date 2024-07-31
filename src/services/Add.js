import Button from "../component/Button";
import {fetchData} from "./Fetch";
import React, {useEffect, useState} from "react";
import Input from "../component/Input";
import axios from "axios";

export const Add = () => {

    const initItem = {
        edit: false,
        id: "",
        regNo: "",
        chassisNo : ""
    }

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [item, setItem] = useState(initItem);

    const fetchItemData = async () => {
        try {
            const data = await fetchData();
            setData(data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchItemData();

    }, []);

    const sortDesc = (e) => {

        const columnName = e.target.dataset.id;

        const sortedData = [...data].sort((a, b) => { //[...data] creates a copy and sorts on the copy

            const val1 = String(a[columnName]);
            const val2 = String(b[columnName]);

            return val2.localeCompare( val1 );
        })

        console.log( "After sorting: ", sortedData);

        setData(sortedData);

    }

    const handleOnChange = (e) => {
        setItem({
            ...item,
            //[e.target.name]: {value: e.target.value},
            [e.target.name]: e.target.value
        })
    }

    const editItem = (item) => {

        setItem({
            ...item,
            edit: true
        })
    }

    const deleteItem = (val) => {

        console.log(val  )

        axios
            .delete( `http://localhost:8080/api/item/${val}` )
            .then( (response) => {

                fetchItemData();
            })
            .catch( (error) => {

                setError(error.message);
            } )
    }

    const postItem = ()  => {

        const {edit, id, regNo, chassisNo} = item;

        var itemData ={}

        /*const itemData = Object.entries( { regNo, chassisNo} )
            .reduce((acc, [key, value]) => {
                acc[key] = value.value;
                return acc;
            }, {});*/

        itemData['id'] = item.id
        itemData['regNo'] = item.regNo
        itemData['chassisNo'] = item.chassisNo

        axios
            .post( "http://localhost:8080/api/vehicle", itemData )
            .then( (response) => {
                fetchItemData()
            })
            .catch( (error) => {

                setError(error.message);
            } )
    }

    const clearFields = () => {

        setItem(initItem)
    }

    if (error) return `Error: ${error}`;

    return (

        <div>
            <div>
                <Input
                    id = 'regNo'
                    name='regNo'
                    type='text'
                    value={item.regNo}
                    placeHolder="Enter Registration No"
                    callback={ handleOnChange }
                >

                </Input>

                <Input
                    id = 'chassisNo'
                    name='chassisNo'
                    type='text'
                    value={item.chassisNo}
                    placeHolder="Enter Chassis No"
                    callback={ handleOnChange } >

                </Input>


                < Button type='button' name={item.edit ? 'Update': 'Add Vehicle'}
                         callback={() => postItem()}>

                </Button>


                < Button type='button' name={ 'Clear Field'}
                         callback={() => clearFields()}>

                </Button>

            </div>
            <h1>Vehicles List</h1>
            <table>
                <thead>
                <tr>
                    <th>Vehicle ID <Button type='button' id="id" name="sortDesc" callback={ sortDesc } /></th>
                    <th>Reg No <Button type='button' id="regNo" name="sortDesc" callback={ sortDesc } /></th>
                    <th>Chassis No<Button type='button' id="chassisNo" name="sortDesc" callback={ sortDesc } /></th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.regNo ?? `N/A`}</td>
                            <td>{item.chassisNo ?? `N/A`}</td>
                            <td><Button type='button' name="Delete" id={item.id} callback={ () => deleteItem(item.id) } /></td>
                            <td><Button type='button' name="Edit" id={item.id} callback={ () => editItem(item) } /></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}