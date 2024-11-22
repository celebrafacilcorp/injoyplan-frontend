import {create} from 'zustand';
import { get } from '../utils/fetch';
import { Banner,IResponse } from '../interfaces/banner';

export interface IBannersState {
    getBanners: () => void;
    banners: Banner[];
}

export const useBannersStore = create<IBannersState>((set, _get) => ({
    banners: [],
    getBanners: async () => {
        try {
            const resp: IResponse = await get(`eventos/getBannerActivos/true`);
            console.log(resp)
            if (resp.HEADER.CODE === 200) {
                set({ banners: resp.RESPONSE });
            } else {
                set({ banners: [] })
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
}));