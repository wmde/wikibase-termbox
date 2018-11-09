<template>
	<div>
		requested entity "{{requestContext.entity}}" in "{{requestContext.language}}"
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
	public requestContext = {
		entity: null,
		language: null,
	};
}
</script>

<style lang="scss">
</style>
