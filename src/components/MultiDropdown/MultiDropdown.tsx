import React from 'react';
import classNames from 'classnames';

import styles from './MultiDropdown.module.scss';


import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import Text from 'components/Text';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className = '',
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredOptions = options.filter(option =>
    option.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleInputClick = () => {
    if (isOpen) setSearchQuery('');
  };

  const handleDivClick = () => {
    if (!disabled) {
      setIsOpen(state => !state);
    }
  }

  let title = value.length > 0 ? getTitle(value) : '';
  const placeholder = getTitle(value);

  const handleSelectValue = (selectedOption: Option) => {
    const isSelected = value.some(option => option.key === selectedOption.key);
    let newValue: Option[] = [];

    if (isSelected) {
      newValue = value.filter(option => option.key !== selectedOption.key);
    } else {
      newValue = [...value, selectedOption];
    }
    onChange(newValue);
  };

  return (
    <div
      ref={wrapperRef}
      className={classNames(className, styles[`multi-dropdown`])}
      onClick={handleDivClick}>
      <Input
        value={isOpen || value.length === 0 ? searchQuery : title}
        onChange={(val: string) => isOpen && setSearchQuery(val)}
        onClick={handleInputClick}
        placeholder={placeholder}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
        {...props}
      />
      {isOpen && !disabled && (
        <ul className={classNames(styles[`multi-dropdown__my-ul`])}>
          {filteredOptions.map(option => {
            const isSelected = value.some(v => v.key === option.key);
            return (
              <li
                key={option.key}
                className={classNames(styles[`multi-dropdown__my-ul_my-li`])}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectValue(option);
                }}
              >
                <Text view="p-16" color={isSelected ? 'accent' : 'primary'}>
                  {option.value}
                </Text>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;