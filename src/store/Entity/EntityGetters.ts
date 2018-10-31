import { GetterTree } from 'vuex';
import EntityProperties from '@/store/Entity/EntityProperties';
import NonInitilizedEntityException from '@/store/Entity/exceptions/NonInitilizedEntityException';
import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import {
	ENTITY_GET_ID,
	ENTITY_GET_TYPE,
	ENTITY_GET_LABELS,
	ENTITY_GET_DESCRIPTIONS,
	ENTITY_GET_ALIASES,
	ENTITY_GET_LABEL_BY_LANGUAGE,
	ENTITY_GET_DESCRIPTION_BY_LANGUAGE,
	ENTITY_GET_ALIASES_BY_LANGUAGE,
} from '@/store/Entity/EntityMethodNames';
import StateInterface from '@/store/root/StateInterface';

export const getters: GetterTree<StateInterface, any> = {
	[ENTITY_GET_ID]: ( state: StateInterface ): string => {
		if ( 'undefined' === typeof state.Entity || false === state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Id;
	},
	[ENTITY_GET_TYPE] ( state: StateInterface ): string {
		if ( 'undefined' === typeof state.Entity || false === state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Type;
	},
	[ENTITY_GET_LABELS] ( state: StateInterface ): DictionaryInterface<string> {
		if ( 'undefined' === typeof state.Entity || false === state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Labels;
	},
	[ENTITY_GET_DESCRIPTIONS] ( state: StateInterface ): DictionaryInterface<string> {
		if ( 'undefined' === typeof state.Entity || false === state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Descriptions;
	},
	[ENTITY_GET_ALIASES] ( state: StateInterface ): DictionaryInterface<string[]> {
		if ( 'undefined' === typeof state.Entity || false === state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Aliases;
	},
	[ENTITY_GET_LABEL_BY_LANGUAGE]: ( state: StateInterface ) => ( LanguageCode: string ): string => {
		let Return: string = '';

		if ( 'undefined' === typeof state.Entity || false === state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		if ( state.Entity.Labels.hasOwnProperty( LanguageCode ) ) {
			Return = state.Entity.Labels[ LanguageCode ];
		}

		return Return;
	},
	[ENTITY_GET_DESCRIPTION_BY_LANGUAGE]: ( state: StateInterface ) => ( LanguageCode: string ): string => {
		let Return: string = '';

		if ( 'undefined' === typeof state.Entity || false === state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		if ( state.Entity.Labels.hasOwnProperty( LanguageCode ) ) {
			Return = state.Entity.Descriptions[ LanguageCode ];
		}

		return Return;
	},
	[ENTITY_GET_ALIASES_BY_LANGUAGE]: ( state: StateInterface ) => ( LanguageCode: string ): string[] => {
		let Return: string[] = [];

		if ( 'undefined' === typeof state.Entity || false === state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		if ( state.Entity.Labels.hasOwnProperty( LanguageCode ) ) {
			Return = state.Entity.Aliases[ LanguageCode ];
		}
		return Return;
	},
};
