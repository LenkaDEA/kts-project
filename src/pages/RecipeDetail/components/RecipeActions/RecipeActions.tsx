import React from "react";

import styles from './RecipeActions.module.scss';
import LikeIcon from "components/icons/LikeIcon";
import Button from "components/Button";
import PrinterIcon from "components/icons/PrinterIcon";
import Text from "components/Text";

const RecipeActions: React.FC = ({ }) => {


    return (<div className={styles.actions}>
        <Button>
            <div className={styles.actions__button}>
                <LikeIcon />
                <Text>Save</Text>
            </div>
        </Button>

        <Button
            onClick={() => {
                window.print()
            }}>
            <div className={styles.actions__button}>
                <PrinterIcon />
                <Text>Print</Text>
            </div>
        </Button>
    </div>);
};

export default RecipeActions;