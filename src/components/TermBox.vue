<template>
  <div class="termbox-placeholder">
	  {{itemId}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// tslint:disable-next-line
'#if DEV === true';
import EntityMockup from '@/components/lib/mwObject';
const mw = new EntityMockup();
// tslint:disable-next-line
'#endif';

@Component
export default class TermBox extends Vue {
	public itemId: string = '';

	constructor() {
		super();
		this.itemId = this.accessEntityData();
	}

	public accessEntityData() {
		 return mw.config.get( 'wbEntity' ).default.id;
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
