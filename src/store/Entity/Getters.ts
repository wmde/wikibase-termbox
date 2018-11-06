import { GetterTree } from 'vuex';
import Dictionary from '@/common/interfaces/Dictionary';
import StateInterface from '@/store/Entity/StateInterface';

export const getters: GetterTree<StateInterface, any> = {
	getId( state: StateInterface ): string {
		return state.Entity.Id;
	},
	getType( state: StateInterface ): string {
		return state.Entity.Type;
	},
	getLabels( state: StateInterface ): Dictionary<string> {
		return state.Entity.Labels;
	},
	getDescriptions( state: StateInterface ): Dictionary<string> {
		return state.Entity.Descriptions;
	},
	getAliases( state: StateInterface ): Dictionary<string[]> {
		return state.Entity.Aliases;
	},
	getLabelByLanguage: ( state: StateInterface ) => ( languageCode: string ): string => {
		let label: string = '';

		if ( state.Entity.Labels.hasOwnProperty( languageCode ) ) {
			label = state.Entity.Labels[ languageCode ];
		}

		return label;
	},
	getDescriptionByLanguage: ( state: StateInterface ) => ( languageCode: string ): string => {
		let description: string = '';

		if ( state.Entity.Labels.hasOwnProperty( languageCode ) ) {
			description = state.Entity.Descriptions[ languageCode ];
		}

		return description;
	},
	getAliasesByLanguage: ( state: StateInterface ) => ( languageCode: string ): string[] => {
		let aliases: string[] = [];

		if ( state.Entity.Labels.hasOwnProperty( languageCode ) ) {
			aliases = state.Entity.Aliases[ languageCode ];
		}
		return aliases;
	},
};
