import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Login = () => {

    const {user, setUser} = useContext(UserContext);
    const navegate = useNavigate()
    const HandleClickLogin = () => {
        setUser(true);
        navegate('/');
    };
    return (
        <>
            <h1>Login</h1>
            <h2>{user ? 'En linea' : 'Offline'}</h2>
            <button onClick={HandleClickLogin}>Acceder</button>
        </>
    );
};

export default Login;