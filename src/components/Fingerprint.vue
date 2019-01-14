<template>
	<div 
		class="wikibase-termbox-fingerprint" 
		:class="modifier()">
		<span class="wikibase-termbox-fingerprint__language">{{ languageName }}</span>
		<h2 class="wikibase-termbox-fingerprint__label">{{ label }}</h2>
		<p class="wikibase-termbox-fingerprint__description">{{ description }}</p>
		<ul v-if="hasAliases" class="wikibase-termbox-fingerprint__aliases">
			<li v-for="alias in aliases"
				class="wikibase-termbox-fingerprint__alias"
				:data-separator="message( MESSAGE_KEYS.ALIAS_SEPARATOR )">{{ alias.value }}</li>
		</ul>
		<p class="wikibase-termbox-fingerprint__aliases wikibase-termbox-fingerprint__aliases--placeholder" v-else>?</p>
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import Component, { mixins } from 'vue-class-component';
import Messages, { MessagesMixin } from './mixins/Messages';
import {
	mapState,
	mapGetters,
} from 'vuex';
import {
	NS_ENTITY,
	NS_LANGUAGE,
	NS_USER,
} from '@/store/namespaces';
import Term from '@/datamodel/Term';
interface EntityBindings {
	entityLabel: ( languageCode: string ) => Term;
	entityDescription: ( languageCode: string ) => Term;
	entityAliases: ( languageCode: string ) => Term[];
}
interface FingerprintBindings extends Vue, EntityBindings, MessagesMixin {
	language: string;
	isModified: boolean;
	getLanguageTranslation( language: string, inLanguage: string ): string;
}
@Component( {
	props: {
		language: {
			type: String,
			required: true,
		},
		isModified: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	computed: {
		...mapState( NS_USER, [ 'primaryLanguage' ] ),
		...mapGetters( NS_ENTITY, {
			entityLabel: 'getLabelByLanguage',
			entityDescription: 'getDescriptionByLanguage',
			entityAliases: 'getAliasesByLanguage',
		} ),
		...mapGetters( NS_LANGUAGE, {
			getLanguageTranslation: 'getTranslationByCode',
		} ),
	},
} )
export default class Fingerprint extends ( mixins( Messages ) as VueConstructor<FingerprintBindings> ) {
	public modifier (): string {
		if ( this.isModified ) {
			return 'wikibase-termbox-fingerprint--primaryLanguage';
		} else {
			return '';
		}
	}

	get label(): string {
		const label: Term = this.entityLabel( this.language );
		if ( label === null ) {
			return '???';
		} else {
			return label.value;
		}
	}
	get description(): string {
		const description: Term = this.entityDescription( this.language );
		if ( description === null ) {
			return '??';
		} else {
			return description.value;
		}
	}
	get hasAliases(): boolean {
		return !( this.entityAliases( this.language ) == null );
	}
	get aliases(): Term[] {
		const aliases: Term[] =  this.entityAliases( this.language );
		if ( aliases === null ) {
			return [];
		} else {
			return aliases;
		}
	}
	get languageName(): string {
		const name = this.getLanguageTranslation( this.language, this.primaryLanguage );
		if ( name === null ) {
			return '????';
		} else {
			return name;
		}
	}
}
</script>

<style lang="scss">
</style>
