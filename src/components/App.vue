<template>
	<section class="wikibase-entitytermsview">
		<TermBox :language="userLanguage" />

		<div v-for="language in allLanguagesButUserLanguage">
			<TermBox :language="language" />
		</div>
	</section>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import Component from 'vue-class-component';
import TermBox from './TermBox.vue';
import { Store, mapState, mapGetters } from 'vuex';
import { NS_ENTITY, NS_USER, NS_LANGUAGE } from '@/store/namespaces';
import { ENTITY_INIT } from '@/store/entity/actionTypes';
import { LANGUAGE_PREFERENCE } from '@/store/user/actionTypes';
import TermboxRequest from '@/common/TermboxRequest';
import { LANGUAGE_INIT } from '@/store/language/actionTypes';
import LanguageCollection from '@/datamodel/LanguageCollection';
import Language from '@/datamodel/Language';

interface AppBindings extends Vue {
	primaryLanguage: string;
	languages: LanguageCollection;

	getLanguageByCode( code: string ): Language;
}

@Component( {
	components: {
		TermBox,
	},
	computed: {
		...mapState( NS_LANGUAGE, [
			'languages',
		] ),
		...mapState( NS_USER, [
			'primaryLanguage',
		] ),
		...mapGetters( NS_LANGUAGE, {
			getLanguageByCode: 'getByCode',
		} ),
	},
} )

export default class App extends ( Vue as VueConstructor<AppBindings> ) {

	public static asyncData( store: Store<any>, request: TermboxRequest ): Promise<any> {
		return Promise.all( [
			store.dispatch( `${NS_LANGUAGE}/${LANGUAGE_INIT}` ),
			store.dispatch( `${NS_ENTITY}/${ENTITY_INIT}`, request.entityId ),
			store.dispatch( `${NS_USER}/${LANGUAGE_PREFERENCE}`, request.language ),
		] );
	}

	get allLanguagesButUserLanguage(): LanguageCollection {
		const { [ this.primaryLanguage ]: _, ...newData } = this.languages;
		return newData as LanguageCollection;
	}

	get userLanguage(): Language {
		return this.getLanguageByCode( this.primaryLanguage );
	}

}
</script>

<style lang="scss">
.wikibase-entitytermsview {
	@import '~reset-css/sass/_reset';
}
</style>
