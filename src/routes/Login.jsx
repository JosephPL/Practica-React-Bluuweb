import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Login = () => {

    const [email, setEmail] = useState('test01@test.com');
    const [password, setPassword] = useState('123456');

    const {loginUser} = useContext(UserContext);
    const navegate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Procesando el form : ', email , password);
        try{
            await loginUser(email , password);
            console.log('Usuario logeado');
            navegate('/');
        }catch (error) {
            console.log(error.code);
        }
    }

    return (
        <>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Ingrese email" value={email}
                onChange={e => setEmail(e.target.value)} />

                <input type="password" placeholder="Ingrese password" value={password}
                onChange={e => setPassword(e.target.value)} />

                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;