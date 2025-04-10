export interface IngradientsApi {
    id: number,
    name: string,
    amount: number,
    unit: string
};

export interface IngradientsModel {
    id: number,
    name: string,
    amount: number,
    unit: string
};

export const normalizeIngradients = (from: IngradientsApi): IngradientsModel => ({
    id: from.id,
    name: from.name,
    amount: from.amount,
    unit: from.unit
});