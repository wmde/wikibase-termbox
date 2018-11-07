import { GetterTree } from 'vuex';
import Dictionary from '@/common/interfaces/Dictionary';
import StateInterface from '@/store/Entity/Properties';

export const getters: GetterTree<StateInterface, any> = {
	getId( state: StateInterface ): string {
		return state.Id;
	},
	getType( state: StateInterface ): string {
		return state.Type;
	},
	getLabels( state: StateInterface ): Dictionary<string> {
		return state.Labels;
	},
	getDescriptions( state: StateInterface ): Dictionary<string> {
		return state.Descriptions;
	},
	getAliases( state: StateInterface ): Dictionary<string[]> {
		return state.Aliases;
	},
	getLabelByLanguage: ( state: StateInterface ) => ( languageCode: string ): string => {
		let label: string = '';

		if ( state.Labels.hasOwnProperty( languageCode ) ) {
			label = state.Labels[ languageCode ];
		}

		return label;
	},
	getDescriptionByLanguage: ( state: StateInterface ) => ( languageCode: string ): string => {
		let description: string = '';

		if ( state.Labels.hasOwnProperty( languageCode ) ) {
			description = state.Descriptions[ languageCode ];
		}

		return description;
	},
	getAliasesByLanguage: ( state: StateInterface ) => ( languageCode: string ): string[] => {
		let aliases: string[] = [];

		if ( state.Labels.hasOwnProperty( languageCode ) ) {
			aliases = state.Aliases[ languageCode ];
		}
		return aliases;
	},
};
