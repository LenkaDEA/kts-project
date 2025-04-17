
import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = '_categories' | '_isActive';

export default class CategoriesChooseStore {
    private _categories: string[] = [];

    private _isActive: boolean = false;

    constructor() {
        makeObservable<CategoriesChooseStore, PrivateFields>(this, {
            _categories: observable.ref,
            _isActive: observable,
            categories: computed,
            isActive: computed,
            setCategoriesChoose: action,
            setActive: action
        });

        const urlParam = new URLSearchParams(window.location.search);
        this._categories = urlParam.get('categories')?.split(',') || [];
    };

    setCategoriesChoose(value: string[]) {
        if (this._categories !== value) {
            this._categories = value;
        }
    };

    setActive(state: boolean) {
        this._isActive = state;
    }

    get categories(): string[] {
        return this._categories;
    }
    get isActive(): boolean {
        return this._isActive;
    }

    areArraysEqual(a: string[], b: string[]): boolean {
        if (a && b)
            return a.length === b.length && a.every((v, i) => v === b[i]);
        else
            return false;
    }
};