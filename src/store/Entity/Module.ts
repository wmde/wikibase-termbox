import { Module } from 'vuex';
import Properties from '@/store/Entity/Properties';
import { getters } from '@/store/Entity/Getters';
import { mutations } from '@/store/Entity/Mutations';

const state: Properties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
};

const namespaced: boolean = true;

export const entity: Module<Properties, any> = {
	namespaced,
	state,
	getters,
	mutations,
};
