import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function ToggleButton({enabledText,disabledText,customAction,customState}) {
  const [activo, setActivo] = useState(false);
    const handleOnChange = () =>{
        setActivo(!activo);
       customAction(!customState);
    }
  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={activo ? `${enabledText}` : `${disabledText}`}
        checked={activo}
        onChange={handleOnChange}
      />
    </Form>
  );
}

export default ToggleButton;
