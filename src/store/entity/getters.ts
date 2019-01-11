import { GetterTree } from 'vuex';
import Entity from '@/store/entity/Entity';
import TermList from '@/datamodel/TermList';
import AliasesList from '@/datamodel/AliasesList';
import Term from '@/datamodel/Term';

export const getters: GetterTree<Entity, any> = {
	id( state: Entity ): string {
		return state.id;
	},
	labels( state: Entity ): TermList {
		return state.labels;
	},
	descriptions( state: Entity ): TermList {
		return state.descriptions;
	},
	aliases( state: Entity ): AliasesList {
		return state.aliases;
	},
	getLabelByLanguage: ( state: Entity ) => ( languageCode: string ): Term | null => {
		return state.labels[ languageCode ] || null;
	},
	getDescriptionByLanguage: ( state: Entity ) => ( languageCode: string ): Term | null => {
		return state.descriptions[ languageCode ] || null;
	},
	getAliasesByLanguage: ( state: Entity ) => ( languageCode: string ): Term[] | null => {
		return state.aliases[ languageCode ] || null;
	},
	getAvailableLanguageKeys: ( state: Entity ): string[] => {
		const labelKeys = Object.keys( state.labels );
		const descriptionKeys = Object.keys( state.descriptions );
		const aliasKeys = Object.keys( state.aliases );
		const unionKeys: string[] = [
			...new Set( [
					...labelKeys,
					...descriptionKeys,
					...aliasKeys,
			] ),
		];

		unionKeys.sort( ( key1, key2 ) => {
			key1 = key1.toLowerCase();
			key2 = key2.toLowerCase();
			return ( key1 < key2 ) ? -1 : ( key1 > key2 ) ? 1 : 0;
		} );

		return unionKeys;
	},
};
