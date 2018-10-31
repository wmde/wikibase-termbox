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

export const getters: GetterTree<StateInterface, any> = {
	[GET_LABEL] ( State: StateInterface, Getters: any ): string {
		const CurrentLanguage: string = Getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ];
		return Getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( CurrentLanguage );
	},
	[GET_DESCRIPTION] ( State: StateInterface, Getters: any ): string {
		const CurrentLanguage: string = Getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ];
		return Getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( CurrentLanguage );
	},
	[GET_LABEL] ( State: StateInterface, Getters: any ): string {
		const CurrentLanguage: string = Getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ];
		return Getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( CurrentLanguage );
	},
};
