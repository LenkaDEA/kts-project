import React, { useEffect, useState, useMemo } from "react";

import styles from './RecipeListActions.module.scss';
import Input from "components/Input";
import Button from "components/Button";
import SearchIcon from "components/icons/SearchIcon";
import MultiDropdown, { Option } from "components/MultiDropdown";

import { useLocalStore } from "stores/local/LocalStore";
import CategoriesStore from "stores/local/CategoriesStore";
import { reaction } from "mobx";
import rootStore from "stores/global"
import { observer } from "mobx-react-lite";
import { CategoriesTypeModel } from "stores/models/recipes";

export type RecipeListActionsProps = {
    /** Вызывается при клике на чекбокс */
    onChangeSearch: (value: string) => void;
    onChangeCategories: (value: string[]) => void;
    categoriesKeys: string[];
};

const RecipeListActions: React.FC<RecipeListActionsProps> = ({ onChangeSearch, onChangeCategories, categoriesKeys }) => {

    const [isEnterValue, setIsEnterValue] = useState<boolean>(false);
    const [categoriesItems, setCategoriesItems] = useState<Option[]>([{ key: "default", value: "default" }]);


    const [searchQuery, setSearchQuery] = React.useState<string>('');
    useEffect(() => {
        onChangeSearch(searchQuery);
    }, [searchQuery]);


    const [categoriesValue, setCategoriesValue] = React.useState<Option[]>([]);
    useEffect(() => {
        onChangeCategories(categoriesValue.map((item: Option) => item.key));
    }, [categoriesValue]);

    const handleInputClick = () => {
        setIsEnterValue(true);
        if (searchQuery === '')
            setSearchQuery('');
    };

    const categoriesStore = useLocalStore(() => new CategoriesStore());

    useEffect(() => {
        const updateCategories = reaction(
            () => ({
                data: categoriesStore.list.data
            }),
            ({ data }) => {
                setCategoriesItems(data.map((item: CategoriesTypeModel) => ({
                    key: item.id,
                    value: item.title
                })));
            }
        );
        return () => updateCategories();
    }, [categoriesStore]);

    useEffect(() => {
        categoriesStore.getCategories();
    }, [categoriesStore]);

    const initialCategoriesValue = useMemo(
        () => categoriesKeys
            .map(key => categoriesItems.find(item => item.key == key))
            .filter((item): item is Option => !!item),
        [categoriesKeys, categoriesItems]
    );

    useEffect(() => {
        if (JSON.stringify(initialCategoriesValue) !== JSON.stringify(categoriesValue)) {
            setCategoriesValue(initialCategoriesValue);
        }
    }, [initialCategoriesValue]);

    return (<div>
        <div className={styles[`actions`]}>
            <Input
                className={styles[`actions__input`]}
                value={isEnterValue
                    ? String(rootStore.query.getParam('search') ?? '')
                    : "Введи значение!"}
                onChange={(val: string) => {
                    setSearchQuery(val);
                    rootStore.query.setSearch(`search=${val}`);
                }}
                onClick={handleInputClick}
            >
            </Input>
            <Button><SearchIcon /></Button>
        </div>

        <div className={styles[`actions__categories`]}>
            <MultiDropdown
                options={categoriesItems}
                value={categoriesValue}
                onChange={(val: Option[]) => {
                    const keys: string[] = val.map((option) => option.key);
                    setCategoriesValue(val);
                    rootStore.query.setSearch(`categories=${keys.join(",")}`);
                }}
                getTitle={(values: Option[]) => values.length === 0 ? 'Выберите категорию' : `Выбрано: ${values.length}`}
            />
        </div>
    </div>);
}

export default observer(RecipeListActions);