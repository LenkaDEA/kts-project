import React from "react";

import styles from './RecipeActions.module.scss';
import Button from "components/Button";
import PrinterIcon from "components/icons/PrinterIcon";
import Text from "components/Text";

const RecipeActions: React.FC = ({ }) => {


    return (<div className={styles.actions}>
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