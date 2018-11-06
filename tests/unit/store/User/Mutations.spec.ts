import Vue from 'vue';
import Vuex, { StoreOptions, Module } from 'vuex';
import StateInterface from '@/store/User/StateInterface';
import { mutations } from '@/store/User/Mutations';
import {
	LANGUAGE_INIT,
} from '@/store/User/Mutation.Types';
import {
	emptyUserState as state,
} from '../data/UserStores';
import InvalidLanguageValueException from '@/store/User/exceptions/InvalidLanguageValueException';

Vue.use( Vuex );
const namespaced: boolean = true;

const storeBundle: StoreOptions<StateInterface> = {
	state,
	mutations,
};

describe( '/store/Language/LanguageMutations.ts', () => {
		expect( () => {
			const emptyStore = new Vuex.Store<StateInterface>( storeBundle );
			emptyStore.commit( `${ LANGUAGE_INIT }`, {} );
		} ).toThrow( InvalidLanguageValueException );

		expect( () => {
			const emptyStore = new Vuex.Store<StateInterface>( storeBundle );
			emptyStore.commit( `${ LANGUAGE_INIT }`, 'e' );
		} ).toThrow( InvalidLanguageValueException );
	} );

it( 'contains data after initializing', () => {
		function init() {
			const store = new Vuex.Store<StateInterface>( storeBundle );
			store.commit(
				`${ LANGUAGE_INIT }`,
				'de',
			);

			return [
				store.state.User.PrimaryLanguage,
			];
		}

		expect( init() ).toStrictEqual( [ 'de' ] );
	} );
