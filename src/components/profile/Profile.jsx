import React, { useState } from "react";
import UpdateDataForm from "./UpdateDataForm";
import Avatar from "./Avatar.jsx";
import { useSelector } from "react-redux";

function Profile({className}) {
	const user = useSelector((state) => state.auth.user)
	return (
		<div className={`px-4 my-20 ${className}`}>
			
				<>
					<h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
					<Avatar user={user} />
					<UpdateDataForm user={user} />
				</>
			
		</div>
	);
}

export default Profile;
