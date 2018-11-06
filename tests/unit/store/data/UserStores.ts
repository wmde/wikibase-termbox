import { Module } from 'vuex';
import Properties from '@/store/User/Properties';
import StateInterface from '@/store/User/StateInterface';
import * as MockData from '@/mock-data/data/en_lang_data.json';
import { getters } from '@/store/User/Getters';
import Dictionary from '@/common/interfaces/Dictionary';

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
