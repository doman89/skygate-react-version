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
                <form onSubmit={this.handleOnSubmit} className={'app-list__element__form'}>
                    <div className={'app-list__element__form__firstLine'}>
                        <label htmlFor={'condition'}>Condition: </label>
                        <select id={'condition'} className={'app-input'}>
                            <option value={'equals'}>Equals</option>
                        </select>
                        <select id={'conditionValue'}
                                className={'app-input'}
                                value={this.state.conditionValue}
                                onChange={this.handleOnChange}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className={'app-list__element__form__secondLine'}>
                        <label htmlFor={'questionText'}>Question: </label>
                        <input type={'text'} id={'questionText'}
                               onChange={this.handleOnChange}
                               value={this.state.questionText}
                               className={'app-input'}
                        />
                    </div>
                    <div className={'app-list__element__form__thirdLine'}>
                        <label htmlFor={'inputType'}>Type: </label>
                        <select id={'inputType'}
                                className={'app-input'}
                                value={this.state.inputType}
                                onChange={this.handleOnChange}
                        >
                            <option value={'text'}>Text</option>
                            <option value={'value'}>Number</option>
                            <option value={'radio'}>Yes / No</option>
                        </select>
                    </div>
                    <div className={'app-list__element__form__fourthLine'}>
                        <button onClick={(event) => this.props.handleOnClickAdd(event, this)}
                                className={'app-btn'}
                        >Add Sub-Input</button>
                        <button onClick={(event) => this.props.handleOnClickDelete(event, this.props.id)}
                                className={'app-btn'}
                        >Delete</button>
                        </div>
                </form>
                <ul className={'app-list'}>
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