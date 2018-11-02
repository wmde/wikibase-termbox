import { Module } from 'vuex';
import LanguageProperties from '@/store/Language/LanguageProperties';
import { languageGetters as getters } from '@/store/Language/LanguageGetters';
import { mutations } from '@/store/Language/LanguageMutations';
import StateInterface from '@/store/root/StateInterface';

const languageInit: LanguageProperties = {
	Primary: '',
	More: [],
	All: [],
	Labels: {},
	IsInit: false,
};

const state: StateInterface =  {
	Language: languageInit,
};

const namespaced: boolean = true;

export const language: Module<StateInterface, any> = {
	namespaced,
	state,
	getters,
	mutations,
};
