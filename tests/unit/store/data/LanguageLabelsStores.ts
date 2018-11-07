import { Module } from 'vuex';
import Properties from '@/store/LanguageLabels/Properties';
import * as MockData from '@/mock-data/data/en_lang_data.json';
import { getters } from '@/store/LanguageLabels/Getters';

const namespaced: boolean = false;

let state: Properties = {
	Labels: {},
};
export const emptyLanguageLabelsState: Properties = state;
export const emptyLanguageLabelsModule: Module<Properties, any> = {
	namespaced,
	state,
	getters,
};

state = {
	Labels: {
		en: MockData.default,
	},
};

export const filledLanguageLabelsState: Properties = state;
export const filledLanguageLabelsModule: Module<Properties, any> = {
	namespaced,
	state,
	getters,
};
