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
		/* To avoid the repitions of this code we have to turn off strictNullChecks
		 * see: https://github.com/Microsoft/TypeScript/issues/10642
		 * So far I could not find a way to disable this in inline-mode.
		 * This rule also applies, if you encapsulate the following pice of code in any sort of function or method.
		 */
		if ( typeof state.Entity === 'undefined' || !state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Id;
	},
	[ENTITY_GET_TYPE] ( state: StateInterface ): string {
		if ( typeof state.Entity === 'undefined' || !state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Type;
	},
	[ENTITY_GET_LABELS] ( state: StateInterface ): DictionaryInterface<string> {
		if ( typeof state.Entity === 'undefined' || !state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Labels;
	},
	[ENTITY_GET_DESCRIPTIONS] ( state: StateInterface ): DictionaryInterface<string> {
		if ( typeof state.Entity === 'undefined' || !state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Descriptions;
	},
	[ENTITY_GET_ALIASES] ( state: StateInterface ): DictionaryInterface<string[]> {
		if ( typeof state.Entity === 'undefined' || !state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		return state.Entity.Aliases;
	},
	[ENTITY_GET_LABEL_BY_LANGUAGE]: ( state: StateInterface ) => ( languageCode: string ): string => {
		let label: string = '';

		if ( typeof state.Entity === 'undefined' || !state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		if ( state.Entity.Labels.hasOwnProperty( languageCode ) ) {
			label = state.Entity.Labels[ languageCode ];
		}

		return label;
	},
	[ENTITY_GET_DESCRIPTION_BY_LANGUAGE]: ( state: StateInterface ) => ( languageCode: string ): string => {
		let description: string = '';

		if ( typeof state.Entity === 'undefined' || !state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		if ( state.Entity.Labels.hasOwnProperty( languageCode ) ) {
			description = state.Entity.Descriptions[ languageCode ];
		}

		return description;
	},
	[ENTITY_GET_ALIASES_BY_LANGUAGE]: ( state: StateInterface ) => ( languageCode: string ): string[] => {
		let aliases: string[] = [];

		if ( typeof state.Entity === 'undefined' || !state.Entity.IsInit ) {
			throw new NonInitilizedEntityException();
		}

		if ( state.Entity.Labels.hasOwnProperty( languageCode ) ) {
			aliases = state.Entity.Aliases[ languageCode ];
		}
		return aliases;
	},
};
