import { autorun } from "mobx";
import { useEffect } from "react";
import rootStore from "stores/global";

export const useCategoriesChooseStore = (): void => {
    useEffect(() => {
        autorun(
            () => {
                console.log(String(rootStore.query.getParam('categories') || ''), rootStore.categories.getCategoriesChoose().join(','))
                // if (String(rootStore.query.getParam('categories') || '') != rootStore.categories.getCategoriesChoose().join(','))
                if (rootStore.query.getParam('categories')
                    // && (String(rootStore.query.getParam('categories') || '') !== rootStore.categories.getCategoriesChoose().join(',')) //не работает
                )
                    rootStore.categories.setCategoriesChoose(String(rootStore.query.getParam('categories') || '').split(','));
            }
        )
    }, [])
};