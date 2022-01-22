import React from 'react';

const Avatar = (props) => {
    return (
        <div>
            <div className="px-6 flex items-center flex-no-wrap">
                <a tabIndex="0" className="focus:outline-none  w-24 h-24 bg-cover bg-center rounded-md">
                    <img src={props.src} alt="profile"
                         className="h-full w-full overflow-hidden object-cover rounded-full border-2 border-white dark:border-gray-700 shadow"/>
                    <h1 className="text-center text-2xl uppercase text-dota_grey2 font-bold mt-4">{props.name}</h1>
                </a>
            </div>
        </div>
    );
};

export default Avatar;
