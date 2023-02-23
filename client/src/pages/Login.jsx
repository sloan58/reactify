import { useSanctum } from "react-sanctum";
import { useState } from "react";
import GuestLayout from "../layout/GuestLayout.jsx";

const Login = () => {
    const initialState = {
        email: "",
        password: "",
        remember: false,
    };
    const { authenticated, user, signIn } = useSanctum();
    const [formData, setFormData] = useState(initialState);

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        });
    };
    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password, remember } = formData;
        signIn(email, password, remember)
            .then((res) => setFormData(initialState))
            .catch((err) => console.error(err));
    };

    return (
        <GuestLayout>
            <form className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                    {authenticated
                        ? `Hello, ${user.name}!`
                        : "Sign in to your account"}
                </h5>
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        onChange={handleOnChange}
                        value={formData.email}
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        onChange={handleOnChange}
                        type="password"
                        value={formData.password}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                onChange={handleOnChange}
                                name="remember"
                                id="remember"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                required
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Remember me
                        </label>
                    </div>
                    <a
                        href="#"
                        className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Lost Password?
                    </a>
                </div>
                {authenticated ? (
                    <button
                        onClick={handleLogout}
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login to your account
                    </button>
                )}
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{" "}
                    <a
                        href="#"
                        className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Create account
                    </a>
                </div>
            </form>
        </GuestLayout>
    );
};

export default Login;
