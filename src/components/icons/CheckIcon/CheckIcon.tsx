import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({ className, color, width = 24, height = 24, ...props }) => {

    return <Icon
        className={className}
        color={color}
        width={width}
        height={height}
        {...props}>
        <path
            d="M4 11.6129L9.87755 18L20 7"
            strokeWidth={2}
            fill='none'
        />
    </Icon>
};

export default CheckIcon;

