import {create} from 'zustand';
import { get } from '../utils/fetch';
import { Category, IResponse } from '../interfaces/category';

export interface ICategoriesState {
    getCategories: () => void;
    categories: Category[];
    categoriesRelations: any
    getCategoriesRelations: (id: number) => void
    countsCategories: any
    getCategoriesCount: () => void
    categoryInfo: any
    getValueCategory: (value: any) => void
}

export const useCategoriesState = create<ICategoriesState>((set, _get) => ({
    categoryInfo: null,
    countsCategories: null,
    categoriesRelations: [],
    categories: [],
    getValueCategory: (category: any) => {
        set({
            categoryInfo: category
        })
    },
    getCategories: async () => {
        try {
            const resp: IResponse = await get(`eventos/getCantEventXCategoria`);
            if (resp.HEADER.CODE === 200) {
                set({ categories: resp.RESPONSE });
            } else {
                set({ categories: [] })
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
    getCategoriesRelations: async (idEvent: number) => {
        try {
            const resp: IResponse = await get(`eventos/listar_evento_relacionado_por_categoria/${idEvent}`);
            console.log(resp)
            if (resp.HEADER.CODE === 200) {
                set({ categoriesRelations: resp.RESPONSE });
            } else {
                set({ categoriesRelations: [] })
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
    getCategoriesCount: async () => {
        try {
            const resp: IResponse = await get(`eventos/getCantEventXCategoria/true`);
            console.log(resp)
            if (resp.HEADER.CODE === 200) {
                set({ countsCategories: resp.RESPONSE });
            } else {
                set({ countsCategories: [] })
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
}));
