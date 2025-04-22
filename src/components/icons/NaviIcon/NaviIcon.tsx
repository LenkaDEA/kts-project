import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const NaviIcon: React.FC<IconProps> = ({ className, color, width = 32, height = 32, ...props }) => {

    return <Icon
        className={className}
        color={color}
        width={width}
        height={height}
        {...props}>
        <path
            d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
            strokeWidth={2}
            fill='none'
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit={10}
        />
    </Icon>
};

export default NaviIcon;



