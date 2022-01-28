import React from 'react';

const ProfileCard = (props) => {
    return (
        <div>
            <div key={props.key}
                 onClick={props.onClick}
                 className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-coolGray-900 dark:text-coolGray-100 cursor-pointer">
                <img src={`${props.src}`} alt=""
                     className="w-16 h-16 mx-auto rounded-full dark:bg-coolGray-500"/>
                <div
                    className="space-y-4 text-center divide-y divide-coolGray-700">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">{props.name}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
