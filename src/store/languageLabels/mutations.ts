import { MutationTree } from 'vuex';
import Dictionary from '@/common/interfaces/Dictionary';
import {
	LANGUAGE_LABELS_INIT,
} from '@/store/languageLabels/mutationTypes';
import LanguageLabels from '@/store/languageLabels/LanguageLabels';
import Helper from '@/store/languageLabels/LanguageLabelsMutationHelper';

export const mutations: MutationTree<LanguageLabels> = {
	[LANGUAGE_LABELS_INIT] ( state: LanguageLabels, labels: Dictionary<Dictionary<string>> ): void {
		Helper.isDictionary( labels );
		state.labels = labels;
	},
};
