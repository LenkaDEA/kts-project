import React from 'react';
import classNames from 'classnames';
import Text from 'components/Text';
import Loader from 'components/Loader';

import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Дополнительный класс */
  className?: string;
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ className = '', loading = false, children, disabled = false, ...props }) => {
  const isDisabledByLoading = loading && !disabled;
  const isButtonDisabled = loading || disabled;

  return <button
    {...props}
    className={classNames(
      styles['my-button'],
      isDisabledByLoading && styles['my-button__disabled-by-loading'],
      className)}
    disabled={isButtonDisabled}
  >
    <div className='my-button--contaner'>
      {loading ? <Loader size='s' /> : null}
      <Text view='button'>
        {children}
      </Text>
    </div>

  </button>
};

export default Button;
