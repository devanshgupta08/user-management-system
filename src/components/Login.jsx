import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as loginApi } from "../api/users";
import { setUser } from "../util/getUser";
import { Input, Logo } from "./index";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isSettingUser, setIsSettingUser] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (formData) => {
        try {
            const response = await loginApi({
                email: formData.email,
                password: formData.password,
            });

            const email = formData.email; 

            if (email) {
                setIsSettingUser(true);
                try {
                    const user = await setUser(email);
                    dispatch({
                        type: "auth/login",
                        payload: { token:user.token, user, id: user.id }
                    });
                    navigate("/users");
                } catch (err) {
                    console.error("Failed to fetch user profile:", err);
                    setIsError(true);
                    setError(err);
                } finally {
                    setIsSettingUser(false);
                }
            } else {
                console.error("Email not provided in the request data.");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setIsError(true);
            setError(err);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <div className="card w-full max-w-lg bg-base-200 shadow-xl">
                <div className="card-body">
                    <div className="mb-1 flex justify-center">
                        <Logo width="100%" />
                    </div>
                    <h2 className="text-center text-2xl font-bold">
                        Login to your account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Please enter a valid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-error text-sm">{errors.email.message}</p>
                        )}

                        <div className="relative">
                            <Input
                                label="Password:"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 text-2xl"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? (
                                    <AiOutlineEyeInvisible />
                                ) : (
                                    <AiOutlineEye />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-error text-sm">{errors.password.message}</p>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSettingUser}
                        >
                            {isSettingUser ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {isError && (
                        <p className="text-error text-sm mt-2">
                            Login failed:{" "}
                            {error?.response?.data?.error ||
                                "Please check your credentials and try again."}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;