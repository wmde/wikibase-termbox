import { Module } from 'vuex';
import Properties from '@/store/User/Properties';
import { getters } from '@/store/User/Getters';
import { mutations } from '@/store/User/Mutations';

const state: Properties = {
	PrimaryLanguage: '',
};

const namespaced: boolean = false;

export const user: Module<Properties, any> = {
	namespaced,
	state,
	getters,
	mutations,
};
