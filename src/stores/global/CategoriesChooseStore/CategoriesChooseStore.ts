
import { action, makeObservable, observable } from "mobx";

type PrivateFields = '_categories';

export default class CategoriesChooseStore {
    private _categories: string[] = [];

    constructor() {
        makeObservable<CategoriesChooseStore, PrivateFields>(this, {
            _categories: observable.ref,
            setCategoriesChoose: action
        });

        const urlParam = new URLSearchParams(window.location.search);
        this._categories = urlParam.get('categories')?.split(',') || [];
    };

    setCategoriesChoose(value: string[]) {
        if (this._categories !== value) {
            this._categories = value;
        }
    };

    getCategoriesChoose(): string[] {
        return this._categories;
    }
};