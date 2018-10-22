<template>
  <div id="app">
    {{message}}
<<<<<<< HEAD
=======
	{{accessEntityData()}}
>>>>>>> Add mw-object-mockup in dev mode
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
<<<<<<< HEAD
	public message: string = '';

	constructor() {
		super();
		this.message = this.getMessage();
	}

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
=======
	public message = 'Hello World!';

	public accessEntityData() {
		console.log( mw.config );
>>>>>>> Add mw-object-mockup in dev mode
	}
}
</script>

<style lang="scss">
</style>
