import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import EntityProperties from '@/store/Entity/EntityProperties';
import StateInterface from '@/store/root/StateInterface';
import * as MockData from '@/mock-data/data/Q64_data.json';
import { mutations } from '@/store/Entity/EntityMutations';
import {
	ENTITY_INIT,
} from '@/store/Entity/EntityMethodNames';
import InvalidEntityStripperException from '@/store/Entity/exceptions/InvalidEntityStripperException';

const Entity: EntityProperties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
	IsInit: false,
};
const state: StateInterface = {
	Entity,
};

const Stripper = new EntityStripper( '{"id":"Q123", "type":"item", "labels":{"en":{"language":"en","value":"Berlin"},"ru":{"language":"ru","value":"\u0411\u0435\u0440\u043b\u0438\u043d"},"fr":{"language":"fr","value":"Berlin"} }, "descriptions":{"en":{"language":"en","value":"capital city of Germany"},"it":{"language":"it","value":"capitale della Germania"},"es":{"language":"es","value":"ciudad capital de Alemania"},"de":{"language":"de","value":"Hauptstadt und Land der Bundesrepublik Deutschland"},"fr":{"language":"fr","value":"capitale et ville-\u00c9tat de l\'Allemagne"} }, "aliases":{"zh":[{"language":"zh","value":"\u67cf\u6797\u5e02"}],"zh-hans":[{"language":"zh-hans","value":"\u67cf\u6797\u5e02"}],"zh-hant":[{"language":"zh-hant","value":"\u67cf\u6797\u5e02"}],"zh-cn":[{"language":"zh-cn","value":"\u67cf\u6797\u5e02"} ] } }' );

Vue.use( Vuex );

const StoreOps: StoreOptions<StateInterface> = {
	state,
	mutations,
};

describe( '/store/Entity/EntityMutations.ts', () => {
	it( 'it throws an error on initilization if an invalid object is given', () => {
		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( ENTITY_INIT, {} );
		} ).toThrow( InvalidEntityStripperException );
	} );

	it( 'it sets the initial data', () => {
		function init() {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( ENTITY_INIT, Stripper );
			return 'undefined' === typeof Store.state.Entity ?
				false : Store.state.Entity.IsInit;
		}
		expect( init() ).toBeTruthy();
	} );

	it( 'it contains data after initilization', () => {
		function init() {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( ENTITY_INIT, Stripper );
			if ( 'undefined' === typeof Store.state.Entity ) {
				return [];
			}

			return [
				Store.state.Entity.Id,
				Store.state.Entity.Type,
				Store.state.Entity.Labels,
				Store.state.Entity.Descriptions,
				Store.state.Entity.Aliases,
				Store.state.Entity.IsInit,
			];
		}

		expect( init() ).toStrictEqual( [
			Stripper.getId(),
			Stripper.getType(),
			Stripper.getLabels(),
			Stripper.getDescriptions(),
			Stripper.getAliases(),
			true,
		] );
	} );
} );
