import { GetterTree } from 'vuex';
import Properties from '@/store/LanguageLabels/Properties';

export const getters: GetterTree<Properties, any> = {
	getLabels( state: Properties ) {
		return state.Labels;
	},
	getLabelsByLanguageKey: ( state ) => ( languageKey: string ) => {
		const keys = Object.keys( state.Labels );
		if ( keys.indexOf( languageKey ) === -1 ) {
			return [];
		}

		return state.Labels[ languageKey ];
	},
};
