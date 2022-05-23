import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

const Register = () => {
    const navegate = useNavigate();
    const { registerUser } = useContext(UserContext)
    const {required , patternEmail, minLength, validateTrim, validateEquals} = formValidate();

    const { register, handleSubmit, formState: {errors}, getValues, setError} = useForm({
      defaultValues: {
        email: 'test@test.com',
        password: '123456',
        repassword: '123456'
      }
    });

    const onSubmit = async ({email, password}) => {
      try{
        await registerUser (email, password);
        navegate('/');
      }catch (error) {
        console.log(error.code);
        setError('firebase', {
          message: erroresFirebase(error.code)
        })
      }
    };

  return (
    <>
        <h1>Register</h1>
        <FormError error={errors.firebase}/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput type="email" placeholder="Ingrese email" {...register('email', {
              required ,
              pattern: patternEmail
            })}></FormInput>
            <FormError error={errors.email}/>
            
            <FormInput type="password" placeholder="Ingrese password" {...register('password', {
              minLength,
              validate: validateTrim
            })}></FormInput>
            <FormError error={errors.password}/>

            <FormInput type="password" placeholder="Repita el password" {...register('repassword',{
              validate: validateEquals(getValues)
            })}></FormInput>
            <FormError error={errors.repassword}/>
            <button type="submit">Register</button>
        </form>
    </>
  );
};

export default Register;