import { Module } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import EntityProperties from '@/store/Entity/Properties';
import { getters } from '@/store/Entity/Getters';
import * as MockData from '@/mock-data/data/Q64_data.json';
import StateInterface from '@/store/Entity/StateInterface';

const namespaced: boolean = false;
export const emptyEntityStripper: EntityStripper = new EntityStripper( { id: 'Q123', type: 'item' } );
export const filledEntityStripper: EntityStripper = new EntityStripper( MockData.default );

let entityValue: EntityProperties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
};

let state: StateInterface = {
	Entity: entityValue,
};

export const emptyEntityState: StateInterface = state;
export const emptyEntityModule: Module<StateInterface, any> = {
	namespaced,
	state,
	getters,
};

entityValue = {
	Id: filledEntityStripper.getId(),
	Type: filledEntityStripper.getType(),
	Labels: filledEntityStripper.getLabels(),
	Descriptions: filledEntityStripper.getDescriptions(),
	Aliases: filledEntityStripper.getAliases(),
};

state = {
	Entity: entityValue,
};

export const filledEntityState: StateInterface = state;

export const filledEntityModule: Module<StateInterface, any> = {
	namespaced,
	state,
	getters,
};
