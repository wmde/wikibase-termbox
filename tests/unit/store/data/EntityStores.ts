import { Module } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import Properties from '@/store/Entity/Properties';
import { getters } from '@/store/Entity/Getters';
import * as MockData from '@/mock-data/data/Q64_data.json';

const namespaced: boolean = false;
export const emptyEntityStripper: EntityStripper = new EntityStripper( { id: 'Q123', type: 'item' } );
export const filledEntityStripper: EntityStripper = new EntityStripper( MockData.default );

let state: Properties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
};

export const emptyEntityState: Properties = state;
export const emptyEntityModule: Module<Properties, any> = {
	namespaced,
	state,
	getters,
};

state = {
	Id: filledEntityStripper.getId(),
	Type: filledEntityStripper.getType(),
	Labels: filledEntityStripper.getLabels(),
	Descriptions: filledEntityStripper.getDescriptions(),
	Aliases: filledEntityStripper.getAliases(),
};

export const filledEntityState: Properties = state;

export const filledEntityModule: Module<Properties, any> = {
	namespaced,
	state,
	getters,
};
