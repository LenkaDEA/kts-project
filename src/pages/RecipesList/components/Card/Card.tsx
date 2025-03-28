import React from 'react';
import Text from 'components/Text';
import classNames from 'classnames';

import styles from './Card.module.scss';

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
    className,
    image,
    captionSlot,
    title,
    subtitle,
    contentSlot,
    onClick,
    actionSlot
}) => {
    return (
        <div
            className={classNames(styles.card_parant, className)}
            onClick={onClick}>
            <img
                className={styles.card_image}
                src={image} />
            <div className={styles.card_content}>
                <div className={styles.card_description}>
                    {captionSlot ? <Text view='p-14' color='secondary'>{captionSlot}</Text> : null}

                    <Text
                        view='p-20'
                        color='primary'
                        maxLines={2}
                    >
                        {title}
                    </Text>

                    <Text
                        view='p-16'
                        color='secondary'
                        maxLines={3}
                    >
                        {subtitle}
                    </Text>
                </div>

                <div
                    className={styles.card_contaner_lower}
                >
                    {contentSlot ? <Text view='p-18' weight='bold' color='accent'>{contentSlot}</Text> : null}
                    {actionSlot}
                </div>
            </div>
        </div>
    );
};

export default Card;
