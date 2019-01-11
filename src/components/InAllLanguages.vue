<template>
	<div class="wikibase-termbox wikibase-termbox--inAllLanguages">
		<div class="wikibase-termbox__switch">
			<a :href="link" @click.prevent="showAllLanguagesSwitch()">{{ message( MESSAGE_KEYS.ALL_LANGUAGES ) }}</a>
		</div>
		<div v-if="showAllLanguages">
			<div>
				<div v-for="language in allLanguagesLanguageKeys">
					<Dab :modifier="modifier" :language="language" />
				</div>
			</div>
			<div class="wikibase-termbox__actions">
				<EditPen :href="editLinkUrl" v-if="isEditable && showAllLanguages"></EditPen>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import Component, { mixins } from 'vue-class-component';
import Messages, { MessagesMixin } from '@/components/mixins/Messages';
import Dab from '@/components/Dab.vue';
import {
	mapState,
	mapGetters,
} from 'vuex';
import {
	NS_ENTITY,
	NS_LINKS,
	NS_USER,
} from '@/store/namespaces';
import { TermModifiers } from '@/common/TermModifiers';
import EditPen from '@/components/EditPen.vue';

interface InAllLanguagesBindings extends Vue, MessagesMixin {
	entityLanguageKeys: string[];
}

@Component( {
	components: {
		Dab,
		EditPen,
	},
	computed: {
		...mapState( NS_LINKS, [ 'editLinkUrl' ] ),
		...mapState( NS_USER, [ 'primaryLanguage' ] ),
		...mapState( NS_ENTITY, [ 'isEditable' ] ),
		...mapGetters( NS_ENTITY, {
			entityLanguageKeys: 'getAvailableLanguageKeys',
		} ),
	},
} )
export default class InAllLanguages extends ( mixins( Messages ) as VueConstructor<InAllLanguagesBindings> ) {
	public link = 'place-holder-link';
	public readonly modifier = TermModifiers.ALL_LANGUAGES;
	public allLanguagesSwitch = false;
	public allLanguagesLanguageKeysLock = false;
	public allLanguagesLanguageKeys: string[] = [];

	get showAllLanguages(): boolean {
		this.setAlLanguagesLanguageKeys();

		if ( this.allLanguagesSwitch && this.allLanguagesLanguageKeys.length > 0 ) {
			this.setAlLanguagesLanguageKeys();
			return true;
		} else {
			return false;
		}
	}

	public showAllLanguagesSwitch() {
		this.allLanguagesSwitch = !( this.allLanguagesSwitch );
	}

	private setAlLanguagesLanguageKeys() {
		if ( !this.allLanguagesLanguageKeysLock ) {
			this.allLanguagesLanguageKeys = this.getLanguageKeys();
			this.allLanguagesLanguageKeysLock = true;
		}
	}

	private getLanguageKeys(): string[] {
		return this.entityLanguageKeys.filter(
			( languageKey ) => languageKey !== this.primaryLanguage,
		);
	}
}
</script>

<style lang="scss">
</style>
