<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, provide } from 'vue'

const selectedLang = ref<'ru' | 'kz'>('ru')
provide('selectedLang', selectedLang)
</script>

<template>
  <RouterView />
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
