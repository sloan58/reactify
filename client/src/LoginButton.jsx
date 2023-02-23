import React from "react";
import { useSanctum } from "react-sanctum";

const LoginButton = () => {
    const { authenticated, user, signIn } = useSanctum();

    const handleLogin = () => {
        const email = "marty@karmatek.io";
        const password = "secret";
        const remember = true;

        signIn(email, password, remember)
            .then(res => console.log(res))
            .catch(err => console.error(err));
    };

    if (authenticated === true) {
        return <h1>Welcome, {user.name}</h1>;
    } else {
        return <button onClick={handleLogin}>Sign in</button>;
    }
};

export default LoginButton;
