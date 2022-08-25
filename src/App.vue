<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Main from './components/Main.vue'
</script>

<template>
  <Main />
</template>

<style>
body {
  background-color: #ebebeb;
}

* {
  scroll-behavior: smooth;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

p>a {
  text-decoration: underline;
}

::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border: 0px none #ffffff;
}

::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}

::-webkit-scrollbar-thumb:active {
  background: #1f2937;
}

::-webkit-scrollbar-track {
  background: #d1d5db;
  border: 0;
} 

::-webkit-scrollbar-corner {
  background: transparent;
}

@media (min-width: 768px) {
  ::-webkit-scrollbar {
    width: 8px;
  }
}
</style>