import { Module } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import EntityProperties from '@/store/Entity/EntityProperties';
import { getters } from '@/store/Entity/EntityGetters';
import * as MockData from '@/mock-data/data/Q64_data.json';
import StateInterface from '@/store/root/StateInterface';

const namespaced: boolean = true;
export const emptyEntityStripper: EntityStripper = new EntityStripper( { id: 'Q123', type: 'item' } );
export const filledEntityStripper: EntityStripper = new EntityStripper( MockData.default );

let entityValue: EntityProperties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
	IsInit: false,
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
	IsInit: true,
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
