import { Module } from 'vuex';
import Properties from '@/store/User/Properties';
import { getters } from '@/store/User/Getters';
import { mutations } from '@/store/User/Mutations';
import StateInterface from '@/store/User/StateInterface';

const userInit: Properties = {
	PrimaryLanguage: '',
};

const state: StateInterface = {
	User: userInit,
};

const namespaced: boolean = false;

export const user: Module<StateInterface, any> = {
	namespaced,
	state,
	getters,
	mutations,
};
