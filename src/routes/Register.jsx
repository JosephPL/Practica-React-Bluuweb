import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";

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
        const {code, message} = erroresFirebase(error.code);
        setError(code, {
          message 
        })
      }
    };

  return (
    <>
        <Title text='Register'/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput type="email" placeholder="Ingrese email" label='Ingresa tu correo' error={errors.email} {...register('email', {
              required ,
              pattern: patternEmail
            })}></FormInput>
            <FormError error={errors.email}/>
            
            <FormInput type="password" placeholder="Ingrese password" label='Ingresa tu password' error={errors.password}{...register('password', {
              minLength,
              validate: validateTrim
            })}></FormInput>
            <FormError error={errors.password}/>

            <FormInput type="password" placeholder="Repita el password" label='Repite el password' error={errors.repassword}{...register('repassword',{
              validate: validateEquals(getValues('password'))
            })}></FormInput>
            <FormError error={errors.repassword}/>
            <Button text='Register' type='submit'/>
        </form>
    </>
  );
};

export default Register;