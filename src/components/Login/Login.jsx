import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validationLogin from "../../common/Validation/validationLogin";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/actions/actions";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [errorLogin, setErrorLogin] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value
        });

        validateField(name, value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validationLogin(loginData);
        setErrorLogin(validationErrors);

        if (Object.values(validationErrors).some(error => error !== '')) {
            toast.error('Invalid Credentials');
            return;
        }

        const loginSuccess = await dispatch(loginUser(loginData));
        if (loginSuccess) {
            navigate('/products');
        } else {
            toast.error('Login Failed');
        }
    };

    const validateField = (fieldName, value) => {
        const fieldError = validationLogin({
            ...loginData,
            [fieldName]: value
        })[fieldName];

        setErrorLogin({
            ...errorLogin,
            [fieldName]: fieldError
        });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-700">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                {errorLogin.email && <p style={{ color: "red" }}>{errorLogin.email}</p>}
                                <input value={loginData.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                {errorLogin.password && <p style={{ color: "red" }}>{errorLogin.password}</p>}
                                <input value={loginData.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
