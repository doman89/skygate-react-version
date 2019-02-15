import React, {Component} from 'react';

class RadioForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            condition: this.props.condition,
            conditionValue: this.props.conditionValue || false,
            questionText: this.props.questionText || "",
            inputType: this.props.inputType,
            children: this.props.children,
            id: this.props.keyId,
        };
    };

    handleOnSubmit = event => {
        event.preventDefault();
    };

    handleOnChange = event => {
        event.stopPropagation();
        if(!this.state.children.length){
            this.setState({
                [event.target.id]: event.target.value,
            })
        }else{
            alert('You can not changed this field if existing any sub-forms!');
        }
    };

    updateParentState(updatedElement, id){
        const elements  = [...this.props.children];
        elements.splice(id, 1, updatedElement);
        this.setState({
            children: elements,
        })
    };

    handleOnClickDelete(event, id) {
        event.preventDefault();
        const elements = [...this.state.children];
        elements.splice(id, 1);
        this.setState({
            children: elements,
        })
    }


    render(){
        return (
            <>
                <form onSubmit={this.handleOnSubmit}>
                    <label htmlFor={'condition'}>Condition: </label>
                    <select id={'condition'}>
                        <option value={'equals'}>Equals</option>
                    </select>
                    <select id={'conditionValue'}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <label htmlFor={'questionText'}>Question: </label>
                    <input type={'text'} id={'questionText'} onChange={this.handleOnChange} value={''}/>
                    <label htmlFor={'inputType'}>Type: </label>
                    <select id={'inputType'}>
                        <option value={'text'}>Text</option>
                        <option value={'value'}>Number</option>
                        <option value={'radio'}>Yes / No</option>
                    </select>
                    <button onClick={(event) => this.props.handleOnClickAdd(event, this)}>Add Sub-Input</button>
                    <button onClick={(event) => this.props.handleOnClickDelete(event, this.props.id)}>Delete</button>
                </form>
                <ul>
                    {this.props.appendChildren(this)}
                </ul>
            </>
        )
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.state !== nextState) {
            this.props.updateParentState(nextState, this.props.id);
        }
    }
}

export default RadioForm;