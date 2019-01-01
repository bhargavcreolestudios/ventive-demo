import * as React from 'react'
import { Component } from 'react'
import { Button } from 'semantic-ui-react'
import * as uuid from 'uuid'


export class FileButton extends Component {
    constructor(props) {
        super(props)
        this.id = uuid.v1()
    }

    render() {
        return (
            <div>                
                    <Button
                        icon="upload"
                        as="label"
                        label={{
                          basic: true,
                          content: 'Select Video'
                        }}
                        labelPosition="left"
                        htmlFor={this.id} />                
                    <input
                        hidden
                        id={this.id}
                        accept="video/*"
                        type="file"
                        onChange={this._onChangeFile} />
              
            </div>
        );
    }

    _onChangeFile = () => {
        const fileButton = document.getElementById(this.id)
        const file = fileButton ? fileButton.files[0] : null
        if (this.props.onSelect) {
            this.props.onSelect(file)
        }
    }
}

export default FileButton