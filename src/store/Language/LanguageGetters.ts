import { GetterTree } from 'vuex';
import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import LanguageProperties from '@/store/Language/LanguageProperties';
import NonInitilizedLanguageException from '@/store/Language/exceptions/NonInitilizedLanguageException';
import {
	LANGUAGE_GET_LABELS,
	LANGUAGE_GET_PRIMARY_LANGUAGE,
} from '@/store/Language/LanguageMethodNames';
import StateInterface from '@/store/root/StateInterface';

export const getters: GetterTree<StateInterface, any> = {
	[LANGUAGE_GET_LABELS] ( state: StateInterface ): DictionaryInterface<string> {
		/* To avoid the repitions of this code we have to turn off strictNullChecks
		 * see: https://github.com/Microsoft/TypeScript/issues/10642
		 * So far I could not find a way to disable this in inline-mode.
		 * This rule also applies, if you encapsulate the following pice of code in any sort of function or method.
		 */
		if ( 'undefined' === typeof state.Language || false === state.Language.IsInit ) {
			throw new NonInitilizedLanguageException();
		}
		return state.Language.Labels;
	},
	[LANGUAGE_GET_PRIMARY_LANGUAGE] ( state: StateInterface ): string {
		 if ( 'undefined' === typeof state.Language || false === state.Language.IsInit ) {
			 throw new NonInitilizedLanguageException();
		 }
		 return state.Language.Primary;
	},
};
