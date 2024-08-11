import React, {Component} from "react";
import axios from "axios";

export default class Enum extends Component {

    constructor(props){

        super(props);
        this.state={

            enumItemList: []
        }

        this.fetchEnumList();
    }

    fetchEnumList = async () => {

        axios
            .post( "http://localhost:8080/api/enum", this.props.enumName, {
                headers: {
                    "Content-Type": "application/json"
                }
            } )
            .then( response => {

                this.setState({enumItemList: response.data});
            } )
            .catch( (error) => {

                console.log(error)
            })
    };



    render = () => (
        <div>

            <select
                value={this.props.value}
                id={this.props.id}
                name={this.props.name}
                onChange={ (e) => this.props.callback(e) }
                >
                <option value=''>---Select---</option>
                {
                    this.state.enumItemList.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))
                }

            </select>


        </div>

    )
}