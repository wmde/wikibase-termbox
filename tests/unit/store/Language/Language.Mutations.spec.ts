import Vue from 'vue';
import Vuex, { StoreOptions, Module } from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import { mutations } from '@/store/Language/LanguageMutations';
import {
	LANGUAGE_INIT,
} from '@/store/Language/LanguageMethodNames';
import InvalidLanguagestripperException from '@/store/Language/exceptions/InvalidLanguageStripperException';
import {
	emptyLanguageState as state,
	filledLanguageStripper as stripper,
} from '../data/LanguageStores';

Vue.use( Vuex );
const namespaced = true;

const storeBundle: StoreOptions<StateInterface> = {
	state,
	mutations,
};

describe( '/store/Language/LanguageMutations.ts', () => {
	it( 'it throws an error on initilization if an invalid stripper is given', () => {
		expect( () => {
			const emptyStore = new Vuex.Store<StateInterface>( storeBundle );
			emptyStore.commit( `${ LANGUAGE_INIT }`, '' );
		} ).toThrow( InvalidLanguagestripperException );

		expect( () => {
			const emptyStore = new Vuex.Store<StateInterface>( storeBundle );
			emptyStore.commit( `${ LANGUAGE_INIT }`, [] );
		} ).toThrow( InvalidLanguagestripperException );

		expect( () => {
			const emptyStore = new Vuex.Store<StateInterface>( storeBundle );
			emptyStore.commit( `${ LANGUAGE_INIT }`, {} );
		} ).toThrow( InvalidLanguagestripperException );
	} );

	it( 'it sets the initial data', () => {
		function init() {
			const store = new Vuex.Store<StateInterface>( storeBundle );
			store.commit(
				`${ LANGUAGE_INIT }`,
				stripper,
			);
			return typeof store.state.Language === 'undefined' ?
				false : store.state.Language.IsInit;
		}

		expect( init() ).toBeTruthy();
	} );

	it( 'contains data after initializing', () => {
		function init() {
			const store = new Vuex.Store<StateInterface>( storeBundle );
			store.commit(
				`${ LANGUAGE_INIT }`,
				stripper,
			);
			if ( typeof store.state.Language === 'undefined' ) {
				return [];
			}

			return [
				store.state.Language.Primary,
				store.state.Language.More,
				store.state.Language.All,
				store.state.Language.Labels,
				store.state.Language.IsInit,
			];
		}

		expect( init() ).toStrictEqual( [
			stripper.getPrimaryLanguage(),
			stripper.getMoreLanguages(),
			stripper.getAllLanguages(),
			stripper.getLabels(),
			true,
		] );
	} );
} );
