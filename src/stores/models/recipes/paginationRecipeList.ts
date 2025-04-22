export interface PaginationRecipeListApi {
    page: number,
    pageCount: number,
    pageSize: number,
    total: number
};

export interface PaginationRecipeListModel {
    page: number,
    pageCount: number,
    pageSize: number,
    total: number
};

export const normalizePaginationRecipeList = (from: PaginationRecipeListApi): PaginationRecipeListModel => ({
    page: from.page,
    pageCount: from.pageCount,
    pageSize: from.pageSize,
    total: from.total
});