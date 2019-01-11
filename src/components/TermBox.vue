<template>
	<div>
		<PrimaryLanguage/>
		<InAllLanguages/>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PrimaryLanguage from '@/components/PrimaryLanguage.vue';
import InAllLanguages from '@/components/InAllLanguages.vue';

@Component( {
	components: {
		PrimaryLanguage,
		InAllLanguages,
	},
} )
export default class TermBox extends Vue {}
</script>

<style lang="scss">
</style>
