<template>
	<div class="wikibase-termbox wikibase-termbox--primaryLanguage">
		<div>
			<Dab :modifier="modifier" :language="primaryLanguage"/>
		</div>
		<div class="wikibase-termbox__actions">
			<EditPen :href="editLinkUrl" v-if="isEditable"></EditPen>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import {
	NS_ENTITY,
	NS_LINKS,
	NS_USER,
} from '@/store/namespaces';
import { TermModifiers } from '@/common/TermModifiers';
import EditPen from '@/components/EditPen.vue';
import Dab from '@/components/Dab.vue';

@Component( {
	components: {
		Dab,
		EditPen,
	},
	computed: {
		...mapState( NS_LINKS, [ 'editLinkUrl' ] ),
		...mapState( NS_USER, [ 'primaryLanguage' ] ),
		...mapState( NS_ENTITY, [ 'isEditable' ] ),
	},
} )
export default class PrimaryLanguage extends Vue {
	public readonly modifier: string = TermModifiers.PRIMARY_LANGUAGE;
}
</script>

<style lang="scss">
</style>
