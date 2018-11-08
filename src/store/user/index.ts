import { Module } from 'vuex';
import User from '@/store/user/User';
import { getters } from '@/store/user/getters';
import { mutations } from '@/store/user/mutations';

const state: User = {
	PrimaryLanguage: '',
};

const namespaced: boolean = true;

export const user: Module<User, any> = {
	namespaced,
	state,
	getters,
	mutations,
};
