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

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, value, onChange, afterSlot, type = 'text', ...props }, ref) => {
  return <div className={classNames(styles.input, className)}>
    <input
      {...props}
      className={styles['input__my-input']}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {afterSlot && (
      <div
        className={styles['input__icon--container']}
      >
        {afterSlot}
      </div>
    )}
  </div>

});

export default Input;
