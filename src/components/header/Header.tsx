import React from 'react';
import './Header.scss';

interface HeaderProps {
    onClear?: () => void;
}
const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    return (
        <div className="header">
            <div className="header-button" onClick={props.onClear}>
                <span>
                    Clear
                </span>
            </div>
        </div>
    );
};

export default Header;