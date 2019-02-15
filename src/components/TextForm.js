import React, {Component} from 'react';

class TextForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            condition: this.props.condition,
            conditionValue: this.props.conditionValue || "",
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
                    <input type={'text'}
                           id={'conditionValue'}
                           value={this.state.conditionValue}
                           onChange={this.handleOnChange}
                    />
                    <label htmlFor={'questionText'}>Question: </label>
                    <input type={'text'}
                           id={'questionText'}
                           value={this.state.questionText}
                           onChange={this.handleOnChange}
                    />
                    <label htmlFor={'inputType'}>Type: </label>
                    <select id={'inputType'} value={this.state.inputType} onChange={this.handleOnChange}>
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

export default TextForm;