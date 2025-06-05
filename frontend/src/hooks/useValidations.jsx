
export function useFormValidations(){
    const usernameValidations = {
        required: "Porfavor inserta un usuario valido"

    };
    const passwordValidations = {
        required:"Porfavor inserta una contraseña valida",
          /*minLength: {
            value: 8,
            message: 'La contraseña debe tener al menos 8 caracteres'
          },
          validate: {
            hasUpperCase: (value) =>
              /[A-Z]/.test(value) || 'Debe contener al menos una letra mayúscula',
            hasLowerCase: (value) =>
              /[a-z]/.test(value) || 'Debe contener al menos una letra minúscula',
            hasNumber: (value) =>
              /\d/.test(value) || 'Debe contener al menos un número',
            hasSpecialChar: (value) =>
              /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Debe contener un carácter especial'
          }*/
        };

   

    const subjectValidations = {
        required: "Porfavor inserta un nombre de asignatura valido",
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres"
        },
        maxLength:{
            value: 17,
            message: "El nombre debe tener menos de 17 caracteres"
        }
            
    }

     const topicValidations = {
        required: "Porfavor inserta un nombre de tema valido",
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres"
        },
        maxLength:{
            value: 17,
            message: "El nombre debe tener menos de 17 caracteres"
        }
        
            
    }

     const eventValidations = {
        required: "Porfavor inserta un nombre de evento valido",
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres"
        },
        maxLength:{
            value: 10,
            message: "El nombre debe tener menos de 10 caracteres"
        }
        
            
    }

    const emailValidations = {
        required: 'El correo electrónico es obligatorio',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Porfavor inserta un correo electrónico (Tucuenta@dominio.com)'
          }
    }



    return {usernameValidations,passwordValidations,
        emailValidations,subjectValidations,topicValidations,eventValidations,passwordValidations};
}