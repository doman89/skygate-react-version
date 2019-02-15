import React, {Component} from 'react';
import TextForm from "./TextForm";
import ValueForm from "./ValueForm";
import RadioForm from "./RadioForm";

class MainForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            questionText: this.props.questionText,
            inputType: this.props.inputType,
            children: this.props.children,
            id: this.props.keyId,
        }
    }

    handleOnSubmit = event => {
        event.preventDefault();
    };

    handleOnChange = event => {
        if(!this.state.children.length) {
            this.setState({
                [event.target.dataset.state]: event.target.value,
            })
        }else{
            alert('You can not changed this field if existing any sub-forms!');
        }
    };

    handleOnClickAdd(event, that){
        event.preventDefault();
        const isNotMainForm = that.__proto__.constructor !== MainForm;
        if(that.state.questionText && (isNotMainForm ? that.state.conditionValue : true)) {
            const tempDatabase = that.state.children ? [...that.state.children] : null;
            const tempId = Date.now();
            const element = {
                conditionAnswer: '',
                questionText: '',
                inputType: '',
                children: [],
                id: tempId
            };
            switch (that.state.inputType) {
                case 'text':
                    element.inputType = 'text';
                    break;
                case 'value':
                    element.inputType = 'value';
                    break;
                case 'radio':
                    element.inputType = 'radio';
                    break;
                default:
                    break;
            }
            tempDatabase.push(element);
            that.setState({
                children: tempDatabase,
            })
        }else{
            alert('Fields condition and question can not be empty.');
        }

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

    appendChildren(that){
        if(that.props.children.length) {
            const elements = that.props.children.map((child, index) => {
                switch (that.state.inputType) {
                    case 'text':
                        return (
                            <li key={child.id} className={'app-list__element'}>
                                <TextForm keyId={child.id}
                                          condition={child.condition}
                                          conditionValue={child.conditionValue}
                                          questionText={child.questionText}
                                          inputType={child.inputType}
                                          children={child.children}
                                          id={index}
                                          updateParentState={that.updateParentState.bind(that)}
                                          appendChildren={this.appendChildren}
                                          handleOnClickAdd={this.handleOnClickAdd}
                                          handleOnClickDelete={that.handleOnClickDelete.bind(that)}
                                />
                            </li>
                        );
                    case 'value':
                        return (
                            <li key={child.id} className={'app-list__element'}>
                                <ValueForm keyId={child.id}
                                           condition={child.condition}
                                           conditionValue={child.conditionValue}
                                           questionText={child.questionText}
                                           inputType={child.inputType}
                                           children={child.children}
                                           id={index}
                                           updateParentState={that.updateParentState.bind(that)}
                                           appendChildren={this.appendChildren}
                                           handleOnClickAdd={this.handleOnClickAdd}
                                           handleOnClickDelete={that.handleOnClickDelete.bind(that)}
                                />
                            </li>
                        );
                    case 'radio':
                        return (
                            <li key={child.id} className={'app-list__element'}>
                                <RadioForm keyId={child.id}
                                           condition={child.condition}
                                           conditionValue={child.conditionValue}
                                           questionText={child.questionText}
                                           inputType={child.inputType}
                                           children={child.children}
                                           id={index}
                                           updateParentState={that.updateParentState.bind(that)}
                                           appendChildren={this.appendChildren}
                                           handleOnClickAdd={this.handleOnClickAdd}
                                           handleOnClickDelete={that.handleOnClickDelete.bind(that)}
                                />
                            </li>
                        );
                    default:
                        return null;
                }
            });
            return elements;
        }
        else{
            return null;
        }

    };

    updateParentState(updatedElement, id){
        const elements  = [...this.props.children];
        elements.splice(id, 1, updatedElement);
        this.setState({
            children: elements,
        })
    };

    render(){
        const {id} = this.props;
        return (
            <>
                <form onSubmit={this.handleOnSubmit} className={'app-list__element__form'}>
                    <div className={'app-list__element__form__firstLine'}>
                        <label htmlFor={`questionText${this.state.id}`}>Question: </label>
                        <input type={'text'}
                               data-state={'questionText'}
                               id={`questionText${this.state.id}`}
                               onChange={this.handleOnChange}
                               value={this.state.questionText}
                               className={'app-input'}
                        />
                    </div>
                    <div className={'app-list__element__form__secondLine'}>
                    <label htmlFor={`inputType${this.state.id}`}>Type: </label>
                        <select id={`inputType${this.state.id}`}
                                data-state={'inputType'}
                                className={'app-input'}
                                onChange={this.handleOnChange}
                                value={this.state.inputType}
                        >
                            <option value='text'>Text</option>
                            <option value='value'>Number</option>
                            <option value='radio'>Yes / No</option>
                        </select>
                    </div>
                    <div className={'app-list__element__form__thirdLine'}>
                        <button onClick={(event) => this.handleOnClickAdd(event, this)}
                                className={'app-btn'}
                                data-content={'Add Sub-Input'}
                        >Add Sub-Input</button>
                        <button onClick={(event) => this.props.handleOnClickDelete(event, id)}
                                className={'app-btn'}
                                data-content={'Delete'}
                        >Delete</button>
                    </div>
                </form>
                <ul className={'app-list'}>
                    {this.appendChildren(this)}
                </ul>
            </>
        );
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.state !== nextState) {
            this.props.updateDatabase(nextState, this.props.id);
        }
    }
}

export default MainForm;