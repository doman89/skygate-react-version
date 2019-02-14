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

    handleOnChangeQuestion = event => {
        if(!this.state.children.length) {
            this.setState({
                questionText: event.target.value,
            })
        }else{
            alert('You can not changed this field if existing any sub-forms!');
        }
    };

    handleOnChangeType = event => {
        if(!this.state.children.length) {
            this.setState({
                inputType: event.target.value,
            })
        }else{
            alert('You can not changed this field if existing any sub-forms!');
        }
    };

    handleOnClickAdd = () => {
        const tempDatabase = this.state.children ? [...this.state.children] : null;
        const tempId = Date.now();
        switch (this.state.inputType) {
            case 'text':
                tempDatabase.push({
                    conditionAnswer: '',
                    questionText: '',
                    inputType: 'text',
                    children: [],
                    id: tempId});
                break;
            case 'value':
                tempDatabase.push({
                    conditionAnswer: 0,
                    questionText: '',
                    inputType: 'value',
                    children: [],
                    id: tempId});
                break;
            case 'radio':
                tempDatabase.push({
                    conditionAnswer: true,
                    questionText: '',
                    inputType: 'radio',
                    children: [],
                    id: tempId});
                break;
        }
        this.setState({
            children: tempDatabase,
        })

    };

    appendChildren = () => {
        if(this.state.children.length) {
            const elements = this.state.children.map(child => {
                switch (child.inputType) {
                    case 'text':
                        return (
                            <li key={child.id}>
                                <TextForm keyId={child.id}/>
                            </li>
                        );
                    case 'value':
                        return <li key={child.id}><ValueForm/></li>;
                    case 'radio':
                        return <li key={child.id}><RadioForm/></li>;
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

    render(){
        const {children} = this.state;
        const {id} = this.props;
        return (
            <>
                <form onSubmit={this.handleOnSubmit}>
                    <label htmlFor={'question'}>Question: </label>
                    <input type={'text'}
                           id={'question'}
                           onChange={this.handleOnChangeQuestion}
                           value={this.state.questionText}
                    />
                    <label htmlFor={'type'}>Type: </label>
                    <select id={'type'}
                            onChange={this.handleOnChangeType}
                            value={this.state.inputType}
                    >
                        <option value='text'>Text</option>
                        <option value='value'>Number</option>
                        <option value='radio'>Yes / No</option>
                    </select>
                    <button onClick={this.handleOnClickAdd}>Add Sub-Input</button>
                    <button onClick={(event) => this.props.handleDeleteMainForm(event, id, children)}>Delete</button>
                </form>
                <ul>
                    {this.appendChildren()}
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