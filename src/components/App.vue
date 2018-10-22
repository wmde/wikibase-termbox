<template>
  <div id="app">
    {{message}}
	{{accessEntityData()}}
    <TermBox/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// tslint:disable-next-line
'#if DEV === true';
import EntityMockup from './lib/mwObject';
const mw = new EntityMockup();
// tslint:disable-next-line
'#endif';
import TermBox from './TermBox.vue';

@Component( {
  components: {
    TermBox,
  },
} )
export default class App extends Vue {
	public message = 'Hello world!';

	public accessEntityData() {
		console.log( mw.config );
	}
}
</script>

<style lang="scss">
</style>
