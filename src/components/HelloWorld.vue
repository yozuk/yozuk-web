<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <img id="yozuk-logo" alt="Yozuk logo" src="./../assets/logo.svg" />
  </div>
</template>

<style scoped>
#yozuk-logo {
  max-width: 15rem;
  max-height: 15rem;
}
</style>
