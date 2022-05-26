import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Login = () => {

    const {loginUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navegate = useNavigate();
    const {required , patternEmail, minLength, validateTrim} = formValidate();

    const { register, handleSubmit, formState: {errors}, setError} = useForm({
        defaultValues: {
          email: 'test@test.com',
          password: '123456'
        }
      });

    const onSubmit = async ({email, password}) => {
        try{
          setLoading(true);
          await loginUser (email, password);
          navegate('/');
        }catch (error) {
          console.log(error.code);
          const {code, message} = erroresFirebase(error.code);
        setError(code, {
          message 
        })
        }finally{
          setLoading(false);
        }
    };

    return (
        <>
            <Title text='Login'/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput label='Ingreasa tu correo' type="email" placeholder="Ingrese email" error={errors.email}{...register('email', {
                required ,
                pattern: patternEmail
                })}></FormInput>
                <FormError error={errors.email}/>

                <FormInput label='Ingresa el password' type="password" placeholder="Ingrese password" error={errors.password}{...register('password', {
              minLength,
              validate: validateTrim
            })}></FormInput>
            <FormError error={errors.password}/>
            {
              loading ? <ButtonLoading/> : <Button text='Login' type='submit'/>
            }
            </form>
        </>
    );
};

export default Login;