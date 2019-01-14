<template>
	<div class="wikibase-termbox">
		<LanguageIterator
			modifier="wikibase-termbox--primaryLanguage"
			:languages="primaryLanguageChain"
			:edit="primaryLanguageEdit"
			:isExpanded="primaryLanguageExpansion"
		/>
		<LanguageIterator
			modifier="wikibase-termbox--allLanguages"
			:languages="allLanguageChain"
			:showButtonLabel="message( MESSAGE_KEYS.ALL_LANGUAGES )"
			show="#"
			:isExpanded="allLanguageExpansion"
		/>
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import Component, { mixins } from 'vue-class-component';
import Messages, { MessagesMixin } from '@/components/mixins/Messages';
import LanguageIterator from '@/components/LanguageIterator.vue';
import {
	mapState,
	mapGetters,
} from 'vuex';
import {
	NS_ENTITY,
	NS_LINKS,
	NS_USER,
} from '@/store/namespaces';

interface TermboxBindings extends Vue, MessagesMixin {
	enteredLanguages: string[];
	isEditable: boolean;
	editLinkUrl: string;
}

@Component( {
	components: { LanguageIterator },
	computed: {
		...mapState( NS_LINKS, [ 'editLinkUrl' ] ),
		...mapState( NS_USER, [ 'primaryLanguage' ] ),
		...mapState( NS_ENTITY, [ 'isEditable' ] ),
		...mapGetters( NS_ENTITY, {
			enteredLanguages: 'getAllEnteredLanguageCodes',
		} ),
	},
} )
export default class TermBox extends ( mixins( Messages ) as VueConstructor<TermboxBindings> ) {
	public readonly primaryLanguageExpansion = true;
	public allLanguageExpansion = false;
	get primaryLanguageChain(): string[] {
		return [ this.primaryLanguage ];
	}

	get primaryLanguageEdit(): string {
		if ( this.isEditable ) {
			return this.editLinkUrl;
		} else {
			return '';
		}
	}

	get allLanguageChain(): string[] {
		return this.enteredLanguages.filter(
			( languageKey ) => languageKey !== this.primaryLanguage,
		);
	}
}
</script>

<style lang="scss">
</style>
