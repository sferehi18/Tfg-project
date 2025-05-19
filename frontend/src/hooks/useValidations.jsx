
export function useFormValidations(){
    const usernameValidations = {
        required: "Porfavor inserta un usuario valido"

    };
    const passwordValidations = {
        required:"Porfavor inserta una contraseña valida"
    };

    const emailValidations = {
        required:"Porfavor inserta un correo",
                 pattern: {
            value: /^\S+@\S+$/i,
            message: "Correo no válido",
                },
    }



    return {usernameValidations,passwordValidations,emailValidations};
}