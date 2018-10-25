<template>
  <div class="termbox-placeholder">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LanguageSpecificTerm from '@/components/lib/LanguageSpecificTerm';

@Component
export default class TermBox extends Vue {
	public currentTerm: LanguageSpecificTerm;

	constructor() {
		super();
		this.currentTerm = new LanguageSpecificTerm(
			this.$store.state.languageKey,
			this.$store.state.termData,
		);
	}
}
</script>

<style lang="scss">
.termbox-placeholder {
    background: #ccc;
    width: 100%;
    height: 100px;
}
</style>
