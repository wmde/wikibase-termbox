<template>
  <div class="termbox-placeholder">
    <p>({{entityId}}) {{primaryLabel.value}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { NS_ENTITY, NS_USER } from '@/store/namespaces';

@Component
export default class TermBox extends Vue {
	get userLanguage() {
		return this.$store.getters[ `${NS_USER}/primaryLanguage` ];
	}

	get primaryLabel() {
		return this.$store.getters[ `${NS_ENTITY}/getLabelByLanguage` ]( this.userLanguage );
	}

	get entityId () {
		return this.$store.getters[ `${NS_ENTITY}/id` ];
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
