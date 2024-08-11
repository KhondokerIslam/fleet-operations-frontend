import Button from "../component/Button";
import {fetchData} from "./Fetch";
import React, {useEffect, useState} from "react";
import Input from "../component/Input";
import Enum from "../component/Enum";
import axios from "axios";

export const Add = () => {

    const initItem = {
        edit: false,
        id: "",
        regNo: "",
        modelName : "",
        vehicleSize : "",
        purchaseYear : "",
        purchaseCost : "",
        dailyMaxTravelDistance : "",
        yearlyTravelRange : "",
        fuelType : "",
        fuelConsumptionPerKm : "",
        vehicleType : ""
    }

    const [data, setData] = useState([]);
    const [view, setView] = useState([]);
    const [error, setError] = useState(null);
    const [item, setItem] = useState(initItem);

    const fetchItemData = async () => {
        try {
            const data = await fetchData();
            setData(data);
            setView(data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchItemData();

    }, []);

    const handleOnSearch = (e) => {

        const searchVal = e.target.value;

        const filteredData = [...data].filter( (item) => {

            return item.regNo.toString().toLowerCase().includes(searchVal.toString().toLowerCase());

        });

        setView( filteredData )
    }

    const sortDesc = (e) => {

        const columnName = e.target.dataset.id;

        const sortedData = [...data].sort((a, b) => { //[...data] creates a copy and sorts on the copy

            const val1 = String(a[columnName]);
            const val2 = String(b[columnName]);

            return val2.localeCompare( val1 );
        })

        setView(sortedData);

    }

    const sortAsc = (e) => {

        const columnName = e.target.dataset.id;

        const sortedData = [...data].sort((a, b) => { //[...data] creates a copy and sorts on the copy

            const val1 = String(a[columnName]);
            const val2 = String(b[columnName]);

            return val1.localeCompare( val2 );
        })

        setView(sortedData);

    }

    const handleOnChange = (e) => {
        setItem({
            ...item,
            //[e.target.name]: {value: e.target.value},
            [e.target.name]: e.target.value
        })
    }

    const initForEdit = (items) => {

       const initItem = {}

        for (const key in items) {

            initItem[key] = items[key] || '';
        }

        return initItem;
    }

    const editItem = (item) => {

        setItem({
            ...initForEdit(item),
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

        const {edit, id, regNo, modelName,  vehicleSize,
            purchaseYear,
            purchaseCost,
            dailyMaxTravelDistance,
            yearlyTravelRange,
            fuelType,
            fuelConsumptionPerKm,
            vehicleType} = item;

        var itemData ={}

        /*const itemData = Object.entries( { regNo, modelName} )
            .reduce((acc, [key, value]) => {
                acc[key] = value.value;
                return acc;
            }, {});*/

        itemData['id'] = item.id
        itemData['regNo'] = item.regNo
        itemData['modelName'] = item.modelName
        itemData['vehicleSize'] = item.vehicleSize
        itemData['purchaseYear'] = item.purchaseYear
        itemData['purchaseCost'] = item.purchaseCost
        itemData['dailyMaxTravelDistance'] = item.dailyMaxTravelDistance
        itemData['yearlyTravelRange'] = item.yearlyTravelRange
        itemData['fuelType'] = item.fuelType
        itemData['fuelConsumptionPerKm'] = item.fuelConsumptionPerKm
        itemData['vehicleType'] = item.vehicleType

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
                    required='required'
                    placeHolder="Enter Registration No"
                    callback={ handleOnChange }
                >

                </Input>

                <Input
                    id = 'modelName'
                    name='modelName'
                    type='text'
                    value={item.modelName}
                    placeHolder="Enter Model No"
                    callback={ handleOnChange } >

                </Input>

                <Input
                    id = 'vehicleSize'
                    name='vehicleSize'
                    type='number'
                    min='3'
                    value={item.vehicleSize}
                    placeHolder="Enter Vehicle Size (ft)"
                    callback={ handleOnChange } >

                </Input>

                <Input
                    id = 'purchaseYear'
                    name='purchaseYear'
                    type='number'
                    min='1886'
                    value={item.purchaseYear}
                    placeHolder="Enter Purchase Year"
                    callback={ handleOnChange } >

                </Input>

                <Input
                    id = 'purchaseCost'
                    name='purchaseCost'
                    type='number'
                    min='1'
                    value={item.purchaseCost}
                    placeHolder="Enter Purchase Cost (Tk)"
                    callback={ handleOnChange } >

                </Input>

                <Input
                    id = 'dailyMaxTravelDistance'
                    name='dailyMaxTravelDistance'
                    type='number'
                    min='1'
                    value={item.dailyMaxTravelDistance}
                    placeHolder="Enter Daily Max Travel Distance (km)"
                    callback={ handleOnChange } >

                </Input>

                <Input
                    id = 'yearlyTravelRange'
                    name='yearlyTravelRange'
                    type='number'
                    min='1'
                    value={item.yearlyTravelRange}
                    placeHolder="Enter Yearly Max Travel Distance (Km)"
                    callback={ handleOnChange } >

                </Input>

                <Enum
                    id = 'fuelType'
                    name='fuelType'
                    value={item.fuelType}
                    enumName='FuelType'
                    callback={ handleOnChange } >

                </Enum>

                <Input
                    id = 'fuelConsumptionPerKm'
                    name='fuelConsumptionPerKm'
                    type='number'
                    min='1'
                    value={item.fuelConsumptionPerKm}
                    placeHolder="Enter Fuel Consumption Per Km"
                    callback={ handleOnChange } >

                </Input>

                <Enum
                    id = 'vehicleType'
                    name='vehicleType'
                    value={item.vehicleType}
                    enumName='VehicleType'
                    callback={ handleOnChange } >

                </Enum>


                < Button type='button' name={item.edit ? 'Update': 'Add Vehicle'}
                         callback={() => postItem()}>

                </Button>


                < Button type='button' name={ 'Clear Field'}
                         callback={() => clearFields()}>

                </Button>

            </div>
            <h1>
                Vehicles List

                <Input
                    id = 'regSearch'
                    name='regNo'
                    type='text'
                    placeHolder="Search Reg No"
                    callback={ handleOnSearch } >

                </Input>

            </h1>
            <table>
                <thead>
                <tr>
                    <th>Vehicle ID <Button type='button' id="id" name="Desc" callback={ sortDesc } /> <Button type='button' id="id" name="Asc" callback={ sortAsc } /></th>
                    <th>Reg No <Button type='button' id="regNo" name="Desc" callback={ sortDesc } /> <Button type='button' id="regNo" name="Asc" callback={ sortAsc } /></th>
                    <th>Model No<Button type='button' id="modelName" name="Desc" callback={ sortDesc } /><Button type='button' id="modelName" name="Asc" callback={ sortAsc } /></th>
                </tr>
                </thead>
                <tbody>
                {
                    view.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.regNo ?? `N/A`}</td>
                            <td>{item.modelName ?? `N/A`}</td>
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