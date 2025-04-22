import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const PrinterIcon: React.FC<IconProps> = ({ className, color, width = 24, height = 24, ...props }) => {

    return <Icon
        className={className}
        color={color}
        width={width}
        height={height}
        {...props}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            fill='none'
            d="M7 18h-.8c-1.12 0-1.68 0-2.1-.22a2 2 0 0 1-.88-.87C3 16.48 3 15.92 3 14.8v-4.6c0-1.12 0-1.68.22-2.1a2 2 0 0 1 .87-.88C4.52 7 5.08 7 6.2 7H7m10 11h.8c1.12 0 1.68 0 2.1-.22a2 2 0 0 0 .88-.87c.22-.43.22-.99.22-2.11v-4.6c0-1.12 0-1.68-.22-2.1a2 2 0 0 0-.87-.88C19.48 7 18.92 7 17.8 7H17M7 11h.01M17 7V4.6c0-.56 0-.84-.1-1.05a1 1 0 0 0-.45-.44C16.24 3 15.96 3 15.4 3H8.6c-.56 0-.84 0-1.05.1a1 1 0 0 0-.44.45C7 3.76 7 4.04 7 4.6V7m10 0H7m1.6 14h6.8c.56 0 .84 0 1.05-.1a1 1 0 0 0 .44-.45c.11-.21.11-.49.11-1.05v-2.8c0-.56 0-.84-.1-1.05a1 1 0 0 0-.45-.44c-.21-.11-.49-.11-1.05-.11H8.6c-.56 0-.84 0-1.05.1a1 1 0 0 0-.44.45C7 15.76 7 16.04 7 16.6v2.8c0 .56 0 .84.1 1.05a1 1 0 0 0 .45.44c.21.11.49.11 1.05.11Z"
        />
    </Icon>
};

export default PrinterIcon;
