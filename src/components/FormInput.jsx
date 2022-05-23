import { forwardRef } from "react";

const FormInput = forwardRef(({type, placeholder, onChange, onBlur, name}, ref) => {
    return (
        <>
            <input type={type} placeholder={placeholder} onChange={onChange} onBlur={onBlur} name={name}ref={ref}/>
        </>
    )
});

export default FormInput;