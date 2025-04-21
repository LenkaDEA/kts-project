import React, { useEffect } from "react";

import styles from './RecipeListActions.module.scss';
import Input from "components/Input";
import Button from "components/Button";
import MultiDropdown, { Option } from "components/MultiDropdown";

import { useLocalStore } from "stores/local/LocalStore";
import CategoriesStore from "stores/local/CategoriesStore";
import rootStore from "stores/global"
import { observer } from "mobx-react-lite";
import { Meta } from "utils/meta";
import ClearFiltersIcon from "components/icons/ClearFiltersIcon";


const RecipeListActions: React.FC = () => {

    const categoriesStore = useLocalStore(() => new CategoriesStore());

    const currentSearchText = rootStore.searchText.searchText;
    const categoryKeys = rootStore.categories.categories;

    useEffect(() => {
        categoriesStore.getCategories();
    }, [categoriesStore]);

    const allCategories: Option[] = categoriesStore.list.data.map(item => ({
        key: item.id,
        value: item.title,
    }));

    const selectedCategories: Option[] = categoryKeys
        .map((key) => allCategories.find((option) => option.key == key))
        .filter((option): option is Option => option !== undefined);

    return (<div>
        <div className={styles[`actions`]}>
            <Input
                className={styles[`actions__input`]}
                value={rootStore.searchText.searchText
                }
                placeholder="Search on FoodClient"
                onChange={(val: string) => {
                    rootStore.searchText.setSearchText(val);
                    rootStore.recipesList.setMeta(Meta.loading);
                }}
            >
            </Input>
            <Button onClick={() => {
                currentSearchText !== '' && rootStore.searchText.setSearchText('');
                categoryKeys.length > 0 && rootStore.categories.setCategoriesChoose([]);
            }}
            ><ClearFiltersIcon /></Button>
        </div>

        <div className={styles[`actions__categories`]}>
            <MultiDropdown
                options={categoriesStore.list.data.map(item => ({
                    key: item.id,
                    value: item.title,
                }))}
                value={selectedCategories}
                onChange={(val: Option[]) => {
                    rootStore.categories.setCategoriesChoose(val.map((option) => option.key));
                    rootStore.recipesList.setMeta(Meta.loading);
                }}
                getTitle={(values: Option[]) => values.length === 0 ? 'Select a category' : `Select: ${values.length}`}
            />
        </div>
    </div >);
}

export default observer(RecipeListActions);