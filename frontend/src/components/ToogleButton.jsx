import React, { useEffect, useState } from 'react';
import { use } from 'react';
import { Form } from 'react-bootstrap';

function ToggleButton({enabledText,disabledText,setState,state}) {

  
  return (
   
      <Form.Check
      className='no-outline toogleButton-color fs-3 text-white'
        type="switch"
        id="custom-switch"
        label={state ? enabledText : disabledText}
        checked={state}
        onChange={ setState}
      />

  );
}

export default ToggleButton;
