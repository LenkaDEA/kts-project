import { autorun } from "mobx";
import { useEffect } from "react";
import rootStore from "stores/global";

export const usePaginationStore = (): void => {
    useEffect(() => {
        const dispose = autorun(() => {
            const pageParam = rootStore.query.getParam('page');
            if (pageParam) {
                rootStore.pagination.setCurrentPage(Number(pageParam));
            }
        });
        return () => dispose();
    }, []);
};