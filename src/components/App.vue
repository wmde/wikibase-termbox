<template>
  <div id="app">
    {{getMessage()}}
    <TermBox/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TermBox from './TermBox.vue';

@Component( {
  components: {
    TermBox,
  },
} )
export default class App extends Vue {
	public getMessage() {
		let Return = '';
		// tslint:disable-next-line
		'#if DEV === true';
		Return = 'Hallo Welt!';
		// tslint:disable-next-line
		'#else';
		Return = 'Hello world!';
		// tslint:disable-next-line
		'#endif';
		return Return;
	}
}
</script>

<style lang="scss">
</style>
