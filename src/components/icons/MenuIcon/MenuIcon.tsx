import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const MenuIcon: React.FC<IconProps> = ({ className, color, width = 32, height = 32, ...props }) => {

    return <Icon
        className={className}
        color={color}
        width={width}
        height={height}
        {...props}>
        <path
            d="M4 6L28 6"
            strokeWidth={3}
            fill='none'
            strokeLinecap='round'
        />
        <path
            d="M4 26L28 26"
            strokeWidth={3}
            fill='none'
            strokeLinecap='round'
        />
        <path
            d="M4 16L28 16"
            strokeWidth={3}
            fill='none'
            strokeLinecap='round'
        />
    </Icon>
};

export default MenuIcon;