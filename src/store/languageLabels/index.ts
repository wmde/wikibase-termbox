import { Module } from 'vuex';
import LanguageLabels from '@/store/languageLabels/LanguageLabels';
import { getters } from '@/store/languageLabels/getters';
import { mutations } from '@/store/languageLabels/mutations';

const state: LanguageLabels = {
	labels: {},
};

const namespaced: boolean = false;

export const languageLabels: Module<LanguageLabels, any> = {
	namespaced,
	state,
	getters,
	mutations,
};
