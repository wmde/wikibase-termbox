import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import LanugageProperties from '@/store/Language/LanguageProperties';
import StateInterface from '@/store/root/StateInterface';
import * as MockData from '@/mock-data/data/en_lang_data.json';
import { mutations } from '@/store/Language/LanguageMutations';
import {
	LANGUAGE_INIT,
} from '@/store/Language/LanguageMethodNames';
import InvalidLanguageTupleException from '@/store/Language/exceptions/InvalidLanguageTupelException';

const Language: LanugageProperties = {
	Primary: '',
	More: [],
	All: [],
	Labels: {},
	IsInit: false,
};
const state: StateInterface = {
	Language,
};

const TestTuple: [ Array<string>, number, any ] = [
	[ 'en', 'ru', 'gr', 'it', 'zh' ],
	3,
	MockData.default
];	

Vue.use( Vuex );

const StoreOps: StoreOptions<StateInterface> = {
	state,
	mutations,
};

describe( '/store/Language/LanguageMutations.ts', () => {
	it( 'it throws an error on initilization if an invalid tuple is given', () => {
		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( LANGUAGE_INIT, {} );
		} ).toThrow( InvalidLanguageTupleException );

		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( LANGUAGE_INIT, [] );
		} ).toThrow( InvalidLanguageTupleException );

		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( LANGUAGE_INIT, [ 123, ['as', 'asd'] ] );
		} ).toThrow( InvalidLanguageTupleException );

		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( LANGUAGE_INIT, [ ['as', 'asd', 123], 2 ] );
		} ).toThrow( InvalidLanguageTupleException );

		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( LANGUAGE_INIT, [ ['as', 'asd', 'rz'], -2 ] );
		} ).toThrow( InvalidLanguageTupleException );

		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( LANGUAGE_INIT, [ ['as', 'asd', 'rz'], 0.2 ] );
		} ).toThrow( InvalidLanguageTupleException );

		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( LANGUAGE_INIT, [ ['as', 'asd', 'rz'], 1, [ 'asd', 'asdad' ] ] );
		} ).toThrow( InvalidLanguageTupleException );
	} );

	it( 'it sets the initial data', () => {
		function init() {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( LANGUAGE_INIT, TestTuple );
			return 'undefined' === typeof Store.state.Language ?
				false : Store.state.Language.IsInit;
		}
		
		expect( init() ).toBeTruthy();
	} );

	it( 'contains data after initializing', () => {
		function init() {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( LANGUAGE_INIT, TestTuple );
			if ( 'undefined' === typeof Store.state.Language ) {
				return [];
			}
			
			return [
				Store.state.Language.Primary,
				Store.state.Language.More,
				Store.state.Language.All,
				Store.state.Language.Labels,
				Store.state.Language.IsInit
			];
		}

		expect( init() ).toStrictEqual( [
			"en",
			[ 'en', 'ru', 'gr' ],
			[ 'en', 'ru', 'gr', 'it', 'zh' ],
			MockData.default,
			true
		] );

	} );
} );
