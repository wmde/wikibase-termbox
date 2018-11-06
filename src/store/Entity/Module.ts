import { Module } from 'vuex';
import Properties from '@/store/Entity/Properties';
import { getters } from '@/store/Entity/Getters';
import { mutations } from '@/store/Entity/Mutations';
import StateInterface from '@/store/Entity/StateInterface';

const entityInit: Properties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
};

const state: StateInterface = {
	Entity: entityInit,
};

const namespaced: boolean = false;

export const entity: Module<StateInterface, any> = {
	namespaced,
	state,
	getters,
	mutations,
};
