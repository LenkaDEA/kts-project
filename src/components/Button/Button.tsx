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

  const classes: string = classNames(
    styles.my_button,
    isDisabledByLoading && styles.disabled_by_loading,
    className);

  const isButtonDisabled = loading || disabled;

  return <button
    {...props}
    className={classes}
    disabled={isButtonDisabled}
  >
    <div className='my_button_contaner'>
      {loading ? <Loader className='loader_color_text' size='s' /> : null}
      <Text view='button'>
        {children}
      </Text>
    </div>

  </button>
};

export default Button;
