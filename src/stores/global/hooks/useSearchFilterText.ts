import { autorun } from "mobx";
import { useEffect } from "react";
import rootStore from "stores/global"

export const useSearchFilterText = (): void => {
    useEffect(() => {
        autorun(
            () => {
                if (rootStore.query.getParam('search'))
                    rootStore.searchText.setSearchText(String(rootStore.query.getParam('search') || ''));
            })
    }, [])
}