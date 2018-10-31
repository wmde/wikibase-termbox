import Vue from 'vue';
import Vuex, { StoreOptions, Module } from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import { mutations } from '@/store/Language/LanguageMutations';
import {
	LANGUAGE_INIT,
} from '@/store/Language/LanguageMethodNames';
import InvalidLanguageStripperException from '@/store/Language/exceptions/InvalidLanguageStripperException';
import {
	EmptyLanguageState as state,
	FilledLanguageStripper as Stripper,
} from '../data/LanguageStores';

Vue.use( Vuex );
const namespaced = true;

const StoreBundle: StoreOptions<StateInterface> = {
	state,
	mutations,
};

describe( '/store/Language/LanguageMutations.ts', () => {
	it( 'it throws an error on initilization if an invalid stripper is given', () => {
		expect( () => {
			const EmptyStore = new Vuex.Store<StateInterface>( StoreBundle );
			EmptyStore.commit( `${ LANGUAGE_INIT }`, '' );
		} ).toThrow( InvalidLanguageStripperException );

		expect( () => {
			const EmptyStore = new Vuex.Store<StateInterface>( StoreBundle );
			EmptyStore.commit( `${ LANGUAGE_INIT }`, [] );
		} ).toThrow( InvalidLanguageStripperException );

		expect( () => {
			const EmptyStore = new Vuex.Store<StateInterface>( StoreBundle );
			EmptyStore.commit( `${ LANGUAGE_INIT }`, {} );
		} ).toThrow( InvalidLanguageStripperException );
	} );

	it( 'it sets the initial data', () => {
		function init() {
			const Store = new Vuex.Store<StateInterface>( StoreBundle );
			Store.commit(
				`${ LANGUAGE_INIT }`,
				Stripper,
			);
			return 'undefined' === typeof Store.state.Language ?
				false : Store.state.Language.IsInit;
		}

		expect( init() ).toBeTruthy();
	} );

	it( 'contains data after initializing', () => {
		function init() {
			const Store = new Vuex.Store<StateInterface>( StoreBundle );
			Store.commit(
				`${ LANGUAGE_INIT }`,
				Stripper,
			);
			if ( 'undefined' === typeof Store.state.Language ) {
				return [];
			}

			return [
				Store.state.Language.Primary,
				Store.state.Language.More,
				Store.state.Language.All,
				Store.state.Language.Labels,
				Store.state.Language.IsInit,
			];
		}

		expect( init() ).toStrictEqual( [
			Stripper.getPrimaryLanguage(),
			Stripper.getMoreLanguages(),
			Stripper.getAllLanguages(),
			Stripper.getLabels(),
			true,
		] );
	} );
} );
