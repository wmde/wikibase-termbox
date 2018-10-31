import { Module } from 'vuex';
import LanguageProperties from '@/store/Language/LanguageProperties';
import { getters } from '@/store/Language/LanguageGetters';
import { mutations } from '@/store/Language/LanguageMutations';
import StateInterface from '@/store/root/StateInterface';

const LanguageInit: LanguageProperties = {
	Primary: '',
	More: [],
	All: [],
	Labels: {},
	IsInit: false,
};

const state: StateInterface =  {
	Language: LanguageInit,
};

const namespaced: boolean = true;

export const Language: Module<StateInterface, any> = {
	namespaced,
    state,
	getters,
    mutations,
};
