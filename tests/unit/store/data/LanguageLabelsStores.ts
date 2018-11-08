import { Module } from 'vuex';
import LanguageLabels from '@/store/languageLabels/LanguageLabels';
import * as MockData from '@/mock-data/data/en_lang_data.json';
import { getters } from '@/store/languageLabels/getters';

const namespaced: boolean = false;

let state: LanguageLabels = {
	labels: {},
};
export const emptyLanguageLabels: LanguageLabels = state;
export const emptyLanguageLabelsModule: Module<LanguageLabels, any> = {
	namespaced,
	state,
	getters,
};

state = {
	labels: {
		en: MockData.default,
	},
};

export const filledLanguageLabels: LanguageLabels = state;
export const filledLanguageLabelsModule: Module<LanguageLabels, any> = {
	namespaced,
	state,
	getters,
};
