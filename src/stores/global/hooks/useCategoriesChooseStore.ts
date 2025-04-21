import { autorun } from "mobx";
import { useEffect } from "react";
import rootStore from "stores/global";

export const useCategoriesChooseStore = (): void => {
    useEffect(() => {
        autorun(
            () => {
                rootStore.categories.setCategoriesChoose(rootStore.query.getParam('categories')
                    ? String(rootStore.query.getParam('categories')).split(',')
                    : []);
            }
        )
    }, [])
};