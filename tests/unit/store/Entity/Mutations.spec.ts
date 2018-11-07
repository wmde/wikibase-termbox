import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import Properties from '@/store/Entity/Properties';
import { mutations } from '@/store/Entity/Mutations';
import { getters } from '@/store/Entity/Getters';
import {
	ENTITY_INIT,
} from '@/store/Entity/Mutation.Types';
import {
	emptyEntityState as state,
	filledEntityStripper as stripper,
} from '../data/EntityStores';
import InvalidEntitystripperException from '@/store/Entity/exceptions/InvalidEntityStripperException';

Vue.use( Vuex );

const storeOps: StoreOptions<Properties> = {
	state,
	mutations,
	getters,
};

describe( '/store/Entity/Mutations.ts', () => {
	it( 'it throws an error on initilization if an invalid object is given', () => {
		expect( () => {
			const store = new Vuex.Store<Properties>( storeOps );
			store.commit( ENTITY_INIT, '' );
		} ).toThrow( InvalidEntitystripperException );

		expect( () => {
			const store = new Vuex.Store<Properties>( storeOps );
			store.commit( ENTITY_INIT, [] );
		} ).toThrow( InvalidEntitystripperException );

		expect( () => {
			const store = new Vuex.Store<Properties>( storeOps );
			store.commit( ENTITY_INIT, {} );
		} ).toThrow( InvalidEntitystripperException );
	} );

	it( 'it contains data after initilization', () => {
		function init() {
			const store = new Vuex.Store<Properties>( storeOps );
			store.commit( ENTITY_INIT, stripper );
			if ( typeof store.state === 'undefined' ) {
				return [];
			}

			return [
				store.state.Id,
				store.state.Type,
				store.state.Labels,
				store.state.Descriptions,
				store.state.Aliases,
			];
		}

		expect( init() ).toStrictEqual( [
			stripper.getId(),
			stripper.getType(),
			stripper.getLabels(),
			stripper.getDescriptions(),
			stripper.getAliases(),
		] );
	} );
} );
