import React from 'react';
import MainForm from './MainForm';

const FormsList = props => {

    const formBuilder = () =>{
        const liList = props.database.map((element, index) => {
            return (
                <li key={element.id} className={'app-list__element app-list__element--main'}>
                    <MainForm
                        questionText={element.questionText}
                        inputType={element.inputType}
                        children={element.children}
                        keyId={element.id}
                        id={index}
                        handleOnClickDelete={props.handleOnClickDelete}
                        updateDatabase={props.updateDatabase}
                    />
                </li>)});
        return liList;
    };

    return (
        <ul className={'app-list'}>
            {formBuilder()}
        </ul>
    )
};

export default FormsList;