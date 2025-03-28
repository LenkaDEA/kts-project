import React from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, value, onChange, afterSlot, ...props }, ref) => {
  const classes = classNames(
    styles.input_container,
    className
  );

  return <div
    className={classes}
  >
    <input
      {...props}
      className={styles.my_input}
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {afterSlot && (
      <div
        className={styles.icon_container}
      >
        {afterSlot}
      </div>
    )}
  </div>

});

export default Input;
