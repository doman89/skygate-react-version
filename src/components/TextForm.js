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
                [event.target.dataset.id]: event.target.value,
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

    handleOnClickDelete = (event ,id, that) => {
        event.preventDefault();
        if(!that.state.children.length) {
            const elements = [...this.state.children];
            elements.splice(id, 1);
            this.setState({
                children: elements,
            })
        }else{
            alert('You can not changed this field if existing any sub-forms!');
        }
    };

    render(){
        return (
            <>
                <form onSubmit={this.handleOnSubmit} className={'app-list__element__form'}>
                    <div className={'app-list__element__form__firstLine'}>
                        <label htmlFor={`condition${this.state.id}`}>Condition: </label>
                        <select id={`condition${this.state.id}`} className={'app-input'}>
                            <option value={'equals'}>Equals</option>
                        </select>
                        <input type={'text'}
                               id={`conditionValue${this.state.id}`}
                               data-id={'conditionValue'}
                               value={this.state.conditionValue}
                               onChange={this.handleOnChange}
                               className={'app-input'}
                        />
                    </div>
                    <div className={'app-list__element__form__secondLine'}>
                        <label htmlFor={`questionText${this.state.id}`}>Question: </label>
                        <input type={'text'}
                               id={`questionText${this.state.id}`}
                               data-id={'questionText'}
                               value={this.state.questionText}
                               onChange={this.handleOnChange}
                               className={'app-input'}
                        />
                    </div>
                    <div className={'app-list__element__form__thirdLine'}>
                        <label htmlFor={`inputType${this.state.id}`}>Type: </label>
                        <select id={`inputType${this.state.id}`}
                                data-id={'inputType'}
                                value={this.state.inputType}
                                onChange={this.handleOnChange}
                                className={'app-input'}
                        >
                            <option value={'text'}>Text</option>
                            <option value={'value'}>Number</option>
                            <option value={'radio'}>Yes / No</option>
                        </select>
                    </div>
                    <div className={'app-list__element__form__fourthLine'}>
                        <button onClick={(event) => this.props.handleOnClickAdd(event, this)}
                                className={'app-btn'}
                                data-content={'Add Sub-Input'}
                        >Add Sub-Input</button>
                        <button onClick={(event) => this.props.handleOnClickDelete(event, this.props.id, this)}
                                className={'app-btn'}
                                data-content={'Delete'}
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

export default TextForm;