import React, {Component} from "react";

export default class Input extends Component {
    constructor(props){
        super(props);
        this.state={}
    }


    render = () =>

        <div>

            <input
                id={this.props.id}
                name={this.props.name}
                className={this.props.className}
                type={this.props.type}
                value={this.props.value}
                placeholder={this.props.placeHolder}
                onChange={ (e => this.props.callback(e)) }
            >

            </input>

        </div>


}