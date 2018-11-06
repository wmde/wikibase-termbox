import { MutationTree } from 'vuex';
import {
	LANGUAGE_INIT,
} from '@/store/User/Mutation.Types';
import StateInterface from '@/store/User/StateInterface';
import InvalidLanguageValueException from '@/store/User/exceptions/InvalidLanguageValueException';

export const mutations: MutationTree<StateInterface> = {
	[LANGUAGE_INIT] ( state: StateInterface, language: string ): void {
		if ( typeof language !== 'string' || language.length < 2 ) {
			throw new InvalidLanguageValueException();
		}

		state.User.PrimaryLanguage = language;
	},
};
