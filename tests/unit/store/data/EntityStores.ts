import { Module } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import EntityProperties from '@/store/Entity/EntityProperties';
import { getters } from '@/store/Entity/EntityGetters';
import * as MockData from '@/mock-data/data/Q64_data.json';
import StateInterface from '@/store/root/StateInterface';

const namespaced = true;
export const EmptyEntityStripper = new EntityStripper( { id: 'Q123', type: 'item' } );
export const FilledEntityStripper = new EntityStripper( MockData.default );

let EntityValue: EntityProperties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
	IsInit: false,
};

let state: StateInterface = {
	Entity: EntityValue,
};

export const EmptyEntityState = state;
export const EmptyEntityModule: Module<StateInterface, any> = {
	namespaced,
    state,
	getters,
};

EntityValue = {
	Id: FilledEntityStripper.getId(),
	Type: FilledEntityStripper.getType(),
	Labels: FilledEntityStripper.getLabels(),
	Descriptions: FilledEntityStripper.getDescriptions(),
	Aliases: FilledEntityStripper.getAliases(),
	IsInit: true,
};

state = {
	Entity: EntityValue,
};

export const FilledEntityState = state;

export const FilledEntityModule = {
        namespaced,
        state,
        getters,
};
