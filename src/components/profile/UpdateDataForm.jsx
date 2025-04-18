import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../index";
import { updateUserData, deleteUser, getCurrentUser } from "../../api/users"; 
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logout, login } from "../../store/authSlice"; 

function UpdateDataForm({ user, setShowPasswordForm }) {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state);
   
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, 
    } = useForm({
        defaultValues: {
            email: user?.email,
            first_name: user?.first_name,
            last_name: user?.last_name,
            id: user?.id,
        },
    });

    const {
        mutate: updateProfile,
        isPending: isUpdating,
        isError: isUpdateError,
        error: updateError,
    } = useMutation({
        mutationFn: updateUserData,
        onSuccess: async () => {

            try {
                const response = await getCurrentUser(user.id);
                const updatedUser = response.data.data;

                if (updatedUser) {
                    
                    dispatch(
                        login({
                            user: updatedUser,
                            token: user.token, 
                            id: updatedUser.id,
                            status: true,
                        })
                    );

                    
                    reset({
                        email: updatedUser.email,
                        first_name: updatedUser.first_name,
                        last_name: updatedUser.last_name,
                        id: updatedUser.id,
                    });
                    
                }
            } catch (error) {
                console.error("Failed to fetch updated user data:", error);
            }

            // Show success message
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 2000);
        },
    });

    const {
        mutate: deleteProfile,
        isPending: isDeleting,
        isError: isDeleteError,
        error: deleteError,
    } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            dispatch(logout());
            console.log("after deletion",userState.auth)
            navigate("/");
        },
    });

    const onSubmit = (data) => {
        updateProfile(data);
    };

    const handleDeleteProfile = () => {
        if (
            window.confirm(
                "Are you sure you want to delete your profile? This action cannot be undone."
            )
        ) {
            deleteProfile();
        }
    };

    return (
        <div>
            {showSuccessMessage && (
                <div className="alert alert-success">
                    <span>Profile updated successfully!</span>
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email:"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-error">{errors.email.message}</p>
                )}
                <div
                    className="tooltip tooltip-bottom w-full"
                    data-tip="Id cannot be modified">
                    <Input
                        label="Id:"
                        type="number"
                        disabled
                        {...register("id", {
                            required: "id is required",
                        })}
                    />
                </div>
                <Input
                    label="First Name:"
                    type="text"
                    {...register("first_name", {
                        required: "First Name is required",
                        minLength: {
                            value: 1,
                            message: "First Name must be at least 1 characters",
                        },
                    })}
                />
                {errors.first_name && (
                    <p className="text-error">{errors.first_name.message}</p>
                )}
                <Input
                    label="Last Name:"
                    type="text"
                    {...register("last_name", {
                        required: "Last Name is required",
                        minLength: {
                            value: 1,
                            message: "Last Name must be at least 1 characters",
                        },
                    })}
                />
                {errors.last_name && (
                    <p className="text-error">{errors.last_name.message}</p>
                )}

                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update Profile"}
                    </button>
                    <button
                        onClick={handleDeleteProfile}
                        className="btn btn-error"
                        disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete Profile"}
                    </button>
                </div>
            </form>

            {(isUpdateError || isDeleteError) && (
                <p className="text-error mt-2">
                    Error: {updateError?.message || deleteError?.message}
                </p>
            )}
        </div>
    );
}

export default UpdateDataForm;