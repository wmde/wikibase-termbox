import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import Properties from '@/store/LanguageLabels/Properties';
import { mutations } from '@/store/LanguageLabels/Mutations';
import * as Mockup from '@/mock-data/data/en_lang_data.json';
import {
	LANGUAGE_LABELS_INIT,
} from '@/store/LanguageLabels/Mutation.Types';
import {
	emptyLanguageLabelsState as state,
} from '../data/LanguageLabelsStores';

Vue.use( Vuex );

const storeBundle: StoreOptions<Properties> = {
	state,
	mutations,
};

describe( '/store/LanguageLabels/Mutations.ts', () => {
	it( 'throw a error if invalid LanguageLabels are provided', () => {
		expect( () => {
			const emptyStore = new Vuex.Store<Properties>( storeBundle );
			emptyStore.commit( `${ LANGUAGE_LABELS_INIT }`, [] );
		} ).toThrowError( 'The given value is not dictionary' );

		expect( () => {
			const emptyStore = new Vuex.Store<Properties>( storeBundle );
			emptyStore.commit( `${ LANGUAGE_LABELS_INIT }`, { en: 'a' } );
		} ).toThrow( 'The given dictionary contains invalid value' );
	} );

	it( 'contains data after initializing', () => {
		function init() {
			const store = new Vuex.Store<Properties>( storeBundle );
			store.commit(
				`${ LANGUAGE_LABELS_INIT }`,
				{ en: Mockup.default },
			);

			return [
				store.state.Labels,
			];
		}

		expect( init() ).toStrictEqual( [ { en: Mockup.default } ] );
	} );
} );
