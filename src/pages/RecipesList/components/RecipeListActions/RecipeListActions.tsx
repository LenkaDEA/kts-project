import React from "react";

import styles from './RecipeListActions.module.scss';
import Input from "components/Input";
import Button from "components/Button";
import SearchIcon from "components/icons/SearchIcon";
import MultiDropdown, { Option } from "components/MultiDropdown";

const RecipeListActions: React.FC = () => {
    return (<div>
        <div className={styles[`recipe-list-actions__search-container`]}>
            <Input
                className={styles[`recipe-list-actions__search-container__input`]}
                value="Enter dishes"
                onChange={() => console.log("onChange: Input recipe")}
            >
            </Input>
            <Button><SearchIcon /></Button>
        </div>

        <div className={styles[`recipe-list-actions__categories`]}>
            <MultiDropdown
                options={[
                    { key: 'first', value: 'Завтраки' },
                    { key: 'second', value: 'Обеды' },
                    { key: 'thrird', value: 'Ужины' }
                ]}
                value={[{ key: 'first', value: 'Зактраки' }]}
                onChange={(value: Option[]) => console.log('Выбрано:', value)}
                getTitle={() => 'Categories'}
            />
        </div>
    </div>);
}

export default RecipeListActions;