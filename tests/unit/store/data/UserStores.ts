import { Module } from 'vuex';
import Properties from '@/store/User/Properties';
import StateInterface from '@/store/User/StateInterface';
import { getters } from '@/store/User/Getters';

const namespaced: boolean = false;

let user: Properties = {
	PrimaryLanguage: '',
};

let state: StateInterface = {
	User: user,
};

export const emptyUserState: StateInterface = state;

export const emptyUserModule: Module<StateInterface, any> = {
	namespaced,
	state,
	getters,
};

user = {
	PrimaryLanguage: 'de',
};

state = {
	User: user,
};

export const filledUserState: StateInterface = state;

export const filledUserModule: Module<StateInterface, any> = {
	namespaced,
	state,
	getters,
};
