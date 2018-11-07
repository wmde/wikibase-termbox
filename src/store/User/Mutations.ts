import { MutationTree } from 'vuex';
import {
	LANGUAGE_INIT,
} from '@/store/User/Mutation.Types';
import Properties from '@/store/User/Properties';
import InvalidLanguageValueException from '@/store/User/exceptions/InvalidLanguageValueException';

export const mutations: MutationTree<Properties> = {
	[LANGUAGE_INIT] ( state: Properties, language: string ): void {
		if ( typeof language !== 'string' || language.length < 2 ) {
			throw new InvalidLanguageValueException();
		}

		state.PrimaryLanguage = language;
	},
};
