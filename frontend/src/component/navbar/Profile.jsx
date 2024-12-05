
import React from "react";

const bioString = ["This is my first time using the chat app","Hello everyOne","best app for chatting", "God bless everyOne" ];
const randomBio = Math.floor(Math.random() * bioString.length)
const randomstring = bioString[randomBio];

const Profile = ({ user }) => {
  return (
    <>
      <div className="border rounded-lg p-4 max-w-md mx-auto bg-[rgb(19,26,35)] text-white ">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg sm:text-2xl font-bold">{user?.fullName}</h1>
          <img
            className="rounded-full w-24 h-24 sm:w-32 sm:h-32"
            src={
              user?.profileImg
                ? `http://localhost:8000/uploads/${user?.profileImg}`
                : "/avatar-placeholder.png"
            }
            alt={user ? user.fullName[0] : "G"}
          />
        </div>
        <div className="mt-6">
          <div className="flex gap-2">
            <h1 className="font-semibold">Username:</h1>
            <span>{user?.userName}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <h1 className="font-semibold">Bio:</h1>
            <span>{randomstring}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
