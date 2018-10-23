<template>
  <div class="termbox-placeholder">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TermObjectWrapper from './lib/termObjectWrapper';

declare const mw: any;

@Component
export default class TermBox extends Vue {
	public currentTerm: TermObjectWrapper;

	constructor() {
		super();
		this.currentTerm = new TermObjectWrapper( mw.config.get( 'wbEntity' ) );
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
