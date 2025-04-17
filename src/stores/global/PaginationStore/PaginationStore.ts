
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = '_page';

export default class PaginationStore {
    private _page: number = 0;

    constructor() {
        makeObservable<PaginationStore, PrivateFields>(this, {
            _page: observable.ref,
            page: computed,
            setCurrentPage: action,
        });
    };

    setCurrentPage(currentPage: number) {
        this._page = currentPage;
    };

    get page(): number {
        return this._page;
    }
};