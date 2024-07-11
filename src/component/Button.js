import React, {Component} from 'react';

export default class Button extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    render = () =>
        <div>

            <button type={this.props.type}
                    className={this.props.className}
                    onClick={this.props.callback}
                    data-id={this.props.id}
            >
                {this.props.name}

            </button>

        </div>

}