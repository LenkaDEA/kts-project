import { autorun } from "mobx";
import { useEffect } from "react";
import rootStore from "stores/global";

export const useCategoriesChooseStore = (): void => {
    useEffect(() => {
        autorun(
            () => {
                if (rootStore.query.getParam('categories'))
                    rootStore.categories.setCategoriesChoose(String(rootStore.query.getParam('categories') || '').split(','));
            }
        )
    }, [])
};