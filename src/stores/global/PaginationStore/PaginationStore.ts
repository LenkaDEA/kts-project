
import { action, makeObservable, observable } from "mobx";

type PrivateFields = '_page';

export default class PaginationStore {
    private _page: number = 1;

    constructor() {
        makeObservable<PaginationStore, PrivateFields>(this, {
            _page: observable.ref,
            setCurrentPage: action
        });

        const urlParam = new URLSearchParams(window.location.search);
        this._page = Number(urlParam.get('page')) || 1;
    };

    setCurrentPage(currentPage: number) {
        this._page = currentPage;
    };

    getCurrentPage(): number {
        return this._page;
    }
};