import { Module } from 'vuex';
import Properties from '@/store/User/Properties';
import { getters } from '@/store/User/Getters';

const namespaced: boolean = false;

let state: Properties = {
	PrimaryLanguage: '',
};

export const emptyUserState: Properties = state;

export const emptyUserModule: Module<Properties, any> = {
	namespaced,
	state,
	getters,
};

state = {
	PrimaryLanguage: 'de',
};

export const filledUserState: Properties = state;

export const filledUserModule: Module<Properties, any> = {
	namespaced,
	state,
	getters,
};
