export interface DirectionsApi {
    id: number,
    description: string
};

export interface DirectionsModel {
    id: number,
    description: string
};

export const normalizeDirections = (from: DirectionsApi): DirectionsModel => ({
    id: from.id,
    description: from.description
});