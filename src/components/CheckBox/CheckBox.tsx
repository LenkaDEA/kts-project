import React from 'react';
import classNames from 'classnames';

import CheckIcon from 'components/icons/CheckIcon';
import styles from './CheckBox.module.scss';


export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ className, onChange, disabled = false, checked = false, ...props }) => {
  const [isValue, setTrue] = React.useState(checked);

  const handleClick = () => {
    setTrue(value => !value)
  }

  if (!disabled) {
    onChange(isValue);
  }


  return (
    <div className={classNames(className, styles.checkbox, disabled && styles.checkbox__disabled)}>
      <input
        {...props}
        className={classNames('checkbox__input')}
        onChange={handleClick}
        disabled={disabled}
        checked={checked}
        type='checkbox'
      />
      {isValue &&
        <CheckIcon
          width={40}
          height={40}
          className={classNames('checkbox__input_icon')}
          color={!disabled ? 'accent' : 'secondary'}
        />
      }
    </div>

  );
};

export default CheckBox;
