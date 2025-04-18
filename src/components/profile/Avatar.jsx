import React from "react";
import { useSelector } from "react-redux";

function Avatar() {
    const avatar = useSelector((state) => state.auth.user?.avatar)
    return (
        <div  className="flex flex-col items-center">
            <div className="avatar mb-4 max-w-[150px] max-md:w-[70%] my-5">
                <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                        src={avatar || "https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"}
                        alt="Avatar"
                    />
                </div>
            </div>

            
        </div>
    );
}

export default Avatar;