import React from 'react';
import MainForm from './MainForm';

const FormsList = props => {

    const formBuilder = () =>{
      const liList = props.database.map((element, index) => {
          return (
          <li key={element.id}>
              <MainForm
              questionText={element.questionText}
              inputType={element.inputType}
              children={element.children}
              keyId={element.id}
              id={index}
              handleDeleteMainForm={props.deleteElement}
              updateDatabase={props.updateDatabase}
              />
          </li>)});
        return liList;
    };

    return (
        <ul>
            {formBuilder()};
        </ul>
    )
};

export default FormsList;