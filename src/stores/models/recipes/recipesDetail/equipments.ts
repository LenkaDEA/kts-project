export interface EquipmentsApi {
    id: number,
    name: string
};

export interface EquipmentsModel {
    id: number,
    name: string
};

export const normalizeEquipments = (from: EquipmentsApi): EquipmentsModel => ({
    id: from.id,
    name: from.name
});