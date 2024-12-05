import React from 'react';

interface AvatarProps {
    src: string;
}

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
    return (
        <div className="mr-2 p-1 h-fit rounded-full border border-gray-600">
            <img width={36} height={36} src={props.src} alt={props.src + 'avatar'} />
        </div>
    );
};

export default Avatar;