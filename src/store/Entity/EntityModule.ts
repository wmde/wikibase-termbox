import { Module } from 'vuex';
import EntityProperties from '@/store/Entity/EntityProperties';
import { getters } from '@/store/Entity/EntityGetters';
import { mutations } from '@/store/Entity/EntityMutations';
import StateInterface from '@/store/root/StateInterface';

const entityInit: EntityProperties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
	IsInit: false,
};

const state: StateInterface = {
	Entity: entityInit,
};

const namespaced: boolean = true;

export const entity: Module<StateInterface, any> = {
	namespaced,
	state,
	getters,
	mutations,
};
