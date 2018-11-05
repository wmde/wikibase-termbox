import {GetterTree} from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import {
	GET_LABEL,
	GET_DESCRIPTION,
	GET_ALIASES,
} from '@/store/root/MethodNames';
import {
	LANGUAGE_GET_PRIMARY_LANGUAGE,
} from '@/store/Language/LanguageMethodNames';
import {
	ENTITY_GET_LABEL_BY_LANGUAGE,
	ENTITY_GET_ALIASES_BY_LANGUAGE,
	ENTITY_GET_DESCRIPTION_BY_LANGUAGE,
} from '@/store/Entity/EntityMethodNames';
import {
	NS_ENTITY,
	NS_LANGUAGE,
} from '@/store/root/Namespaces';

export const rootGetters: GetterTree<StateInterface, any> = {
	[GET_LABEL] ( state: StateInterface, getters: any ): string {
		const currentLanguage: string = getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ];
		return getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( currentLanguage );
	},
	[GET_DESCRIPTION] ( state: StateInterface, getters: any ): string {
		const currentLanguage: string = getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ];
		return getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( currentLanguage );
	},
	[GET_ALIASES] ( state: StateInterface, getters: any ): string {
		const currentLanguage: string = getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ];
		return getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( currentLanguage );
	},
};
