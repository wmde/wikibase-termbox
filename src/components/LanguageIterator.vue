<template>
	<div 
		class="wikibase-termbox"
		:class="modifier"
	>
		<div v-if="isNotPrimary" class="wikibase-termbox__switch">
			<a :href="show" @click.prevent="displaySwitch()">{{ showButtonLabel }}</a>
		</div>
		<div v-if="showLanguages">
			<div class="wikibase-termbox__languages" v-for="language in languages">
				<Fingerprint 
					:language="language"
					:isModified="isModified"
				/>
			</div>
			<div class="wikibase-termbox__actions">
				<EditPen :href="edit" v-if="isEditable"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import Component from 'vue-class-component';
import Fingerprint from '@/components/Fingerprint.vue';
import EditPen from '@/components/EditPen.vue';

interface LanguageIteratorBindings extends Vue {
	modifier: string;
	languages: string[];
	showButtonLabel: string;
	isExpanded: boolean;
	show: string;
	edit: string;
}
@Component( {
	components: {
		Fingerprint,
		EditPen,
	},
	props: {
		modifier: {
			type: String,
			required: true,
		},
		languages: {
			type: Array,
			required: true,
		},
		showButtonLabel: {
			type: String,
			default: '',
			required: false,
		},
		isExpanded: {
			type: Boolean,
			default: false,
			required: false,
		},
		show: {
			type: String,
			default: '',
			required: false,
		},
		edit: {
			type: String,
			default: '',
			required: false,
		},
	},
} )
export default class LanguageIterator extends ( Vue as VueConstructor<LanguageIteratorBindings> ) {
	public expandIsInit = false;
	public expand = false;
	get showLanguages(): boolean {
		this.initExpand();
		if ( this.expand && this.languages.length > 0 ) {
			return true;
		} else {
			return false;
		}
	}

	public displaySwitch() {
		this.initExpand();
		this.expand = !( this.expand );
	}

	get isModified(): boolean {
		return !this.isNotPrimary;
	}

	get isNotPrimary(): boolean {
		return this.show.length !== 0;
	}

	get isEditable(): boolean {
		return this.edit.length !== 0;
	}

	private initExpand() {
		if ( !this.expandIsInit ) {
			this.expand = this.isExpanded;
			this.expandIsInit = true;
		}
	}
}
</script>

<style lang="scss">
</style>
