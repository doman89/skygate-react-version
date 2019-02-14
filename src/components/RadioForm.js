import React, {Component} from 'react';

class RadioForm extends Component{
    render(){
        return (
            <>
                <form onSubmit={this.handleOnSubmit}>
                    <label htmlFor={'condition'}>Condition: </label>
                    <select id={'condition'}>
                        <option value={'equals'}>Equals</option>
                    </select>
                    <select id={'yes-no'}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <label htmlFor={'question'}>Question: </label>
                    <input type={'text'} id={'question'} onChange={this.handleOnChange} value={''}/>
                    <label htmlFor={'type'}>Type: </label>
                    <select id={'type'}>
                        <option value={'text'}>Text</option>
                        <option value={'number'}>Number</option>
                        <option value={'yes-no'}>Yes / No</option>
                    </select>
                    <button onClick={this.handleOnClickAdd}>Add Sub-Input</button>
                    <button onClick={(event) => this.props.handleDeleteMainForm(event, this.props.id)}>Delete</button>
                </form>
                <ul>

                </ul>
            </>
        )
    }
}

export default RadioForm;