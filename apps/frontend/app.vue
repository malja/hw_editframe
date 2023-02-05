<template>
  <VApp :theme="theme">
    <VAppBar>
      <VSpacer />
      <VBtn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="switchTheme">Theme</VBtn>
    </VAppBar>
    <VMain>
      <NuxtPage />
    </VMain>
  </VApp>
</template>

<script lang="ts" setup>
const theme = ref('light')

function switchTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
