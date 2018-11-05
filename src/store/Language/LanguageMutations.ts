import { MutationTree } from 'vuex';
import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import LanguageProperties from '@/store/Language/LanguageProperties';
import {
	LANGUAGE_INIT,
} from '@/store/Language/LanguageMethodNames';
import StateInterface from '@/store/root/StateInterface';
import LanguageStripper from '@/store/Language/LanguageStripper';
import LanguageMutationHelper from '@/store/Language/LanguageMutationHelper';

export const mutations: MutationTree<StateInterface> = {
	[LANGUAGE_INIT] (
		state: StateInterface,
		tupel: LanguageStripper,
	): void {
		LanguageMutationHelper.isLanguageStipper( tupel );
		state.Language = {
			Primary: tupel.getPrimaryLanguage(),
			More: tupel.getMoreLanguages(),
			All: tupel.getAllLanguages(),
			Labels: tupel.getLabels(),
			IsInit: true,
		};
	},
};
