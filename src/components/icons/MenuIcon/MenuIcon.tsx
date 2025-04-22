import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const MenuIcon: React.FC<IconProps> = ({ className, color, width = 24, height = 24, ...props }) => {

    return <Icon
        className={className}
        color={color}
        width={width}
        height={height}
        {...props}>
        <path
            d="M3 5L12 5L21 5"
            strokeWidth={2}
            fill='none'
            strokeLinecap='round'
        />
        <path
            d="M3 19L21 19"
            strokeWidth={2}
            fill='none'
            strokeLinecap='round'
        />
        <path
            d="M3 12L21 12"
            strokeWidth={2}
            fill='none'
            strokeLinecap='round'
        />
    </Icon>
};

export default MenuIcon;
