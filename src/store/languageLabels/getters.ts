import { GetterTree } from 'vuex';
import LanguageLabels from '@/store/languageLabels/LanguageLabels';

export const getters: GetterTree<LanguageLabels, any> = {
	labels( state: LanguageLabels ) {
		return state.labels;
	},
	getLabelsByLanguageKey: ( state ) => ( languageKey: string ) => {
		const keys = Object.keys( state.labels );
		if ( keys.indexOf( languageKey ) === -1 ) {
			return [];
		}

		return state.labels[ languageKey ];
	},
};
