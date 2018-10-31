import { Module } from 'vuex';
import EntityProperties from '@/store/Entity/EntityProperties';
import { getters } from '@/store/Entity/EntityGetters';
import { mutations } from '@/store/Entity/EntityMutations';
import StateInterface from '@/store/root/StateInterface';

const EntityInit: EntityProperties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
	IsInit: false,
};

const state: StateInterface = {
	Entity: EntityInit,
};

const namespaced: boolean = true;

export const Entity: Module<StateInterface, any> = {
	namespaced,
    state,
	getters,
    mutations,
};
