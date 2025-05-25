import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function ToggleButton({enabledText,disabledText,customAction,customState}) {
  const [activo, setActivo] = useState(false);
    const handleOnChange = () =>{
        setActivo(!activo);
       customAction(!customState);
    }
  return (
   
      <Form.Check
      className='no-outline toogleButton-color fs-1 text-white'
        type="switch"
        id="custom-switch"
        
        checked={activo}
        onChange={handleOnChange}
      />

  );
}

export default ToggleButton;
