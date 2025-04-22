export interface ImagesApi {
    url: string
};

export interface ImagesModel {
    url: string
};

export const normalizeImages = (from: ImagesApi): ImagesModel => ({
    url: from.url
});