import { Module } from 'vuex';
import Properties from '@/store/LanguageLabels/Properties';
import { getters } from '@/store/LanguageLabels/Getters';
import { mutations } from '@/store/LanguageLabels/Mutations';

const state: Properties = {
	Labels: {},
};

const namespaced: boolean = false;

export const languageLabels: Module<Properties, any> = {
	namespaced,
	state,
	getters,
	mutations,
};
