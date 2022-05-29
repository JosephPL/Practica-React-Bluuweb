export const formValidate = () => {
    return {
        required: {
            value: true,
            message: 'Campo obligatorio'
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: 'Formato de email incorrecto'
        },
        patternUrl: {
            value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: 'Formato url incorrecto'
        },
        minLength:{
            value: 6,
            message: 'Minímo 6 carácteres'
        },
        validateTrim: {
            trim: v => {
                if(!v.trim()){
                  return 'No seas Payaso!, escribe algo';
                }
                return true;
            } 
        },
        validateEquals(value){
            return {
                equals: (v) => v === value || 'No coinciden los passwords'
            }    
        }   
    }
};