import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import Properties from '@/store/User/Properties';
import { mutations } from '@/store/User/Mutations';
import {
	LANGUAGE_INIT,
} from '@/store/User/Mutation.Types';
import {
	emptyUserState as state,
} from '../data/UserStores';
import InvalidLanguageValueException from '@/store/User/exceptions/InvalidLanguageValueException';

Vue.use( Vuex );

const storeBundle: StoreOptions<Properties> = {
	state,
	mutations,
};

describe( '/store/User/Mutations.ts', () => {
		expect( () => {
			const emptyStore = new Vuex.Store<Properties>( storeBundle );
			emptyStore.commit( `${ LANGUAGE_INIT }`, {} );
		} ).toThrow( InvalidLanguageValueException );

		expect( () => {
			const emptyStore = new Vuex.Store<Properties>( storeBundle );
			emptyStore.commit( `${ LANGUAGE_INIT }`, 'e' );
		} ).toThrow( InvalidLanguageValueException );
	} );

it( 'contains data after initializing', () => {
		function init() {
			const store = new Vuex.Store<Properties>( storeBundle );
			store.commit(
				`${ LANGUAGE_INIT }`,
				'de',
			);

			return [
				store.state.PrimaryLanguage,
			];
		}

		expect( init() ).toStrictEqual( [ 'de' ] );
	} );
