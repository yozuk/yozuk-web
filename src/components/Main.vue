<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="hidden md:flex fixed inset-0 right-1/2 flex-col border-r bg-gray-300 border-gray-300">
    <div class="grow"></div>
    <div class="grow-0">
      <h1 class="text-6xl text-gray-900 font-bold">Yozuk</h1>
      <h2 class="text-4xl text-gray-500">Chatbot for <span class="underline">programmers</span></h2>
    </div>
    <div class="grow-0 my-8">
      <img id="yozuk-logo" class="mx-auto" alt="Yozuk logo" src="./../assets/logo.svg" />
    </div>
    <div class="grow-0"><a target="_blank" href="https://docs.yozuk.com/">
        <button class="text-2xl mx-2 px-3 py-1 border-2 bg-gray-200 border-gray-600 rounded">Documentation</button></a>
      <a target="_blank" href="https://github.com/yozuk/yozuk"><button
          class="text-2xl mx-2 px-3 py-1 border-2 border-gray-600 text-gray-100 bg-gray-500 rounded">GitHub</button></a>
    </div>
    <div class=" grow">
    </div>
  </div>
  <div class="chatbox static md:absolute top-0 right-0 left-1/2">
    <div class="md:hidden flex flex-col py-6 bg-gray-300">
      <div class="grow"></div>
      <div class="grow-0">
        <h1 class="text-5xl text-gray-900 font-bold">Yozuk</h1>
        <h2 class="text-2xl text-gray-500">Chatbot for <span class="underline">programmers</span></h2>
      </div>
      <div class="grow-0 my-3">
        <img id="yozuk-logo" class="mx-auto" alt="Yozuk logo" src="./../assets/logo.svg" />
      </div>
      <div class="grow-0"><a target="_blank" href="https://docs.yozuk.com/">
          <button
            class="text-2xl mx-2 px-2 py-1 border-2 bg-gray-200 border-gray-600 rounded">Documentation</button></a>
        <a target="_blank" href="https://github.com/yozuk/yozuk"><button
            class="text-2xl mx-2 px-2 py-1 border-2 border-gray-600 text-gray-100 bg-gray-500 rounded">GitHub</button></a>
      </div>
      <div class=" grow">
      </div>
    </div>
  </div>
</template>

<style scoped>
#yozuk-logo {
  max-width: 15rem;
  max-height: 15rem;
}

.chatbox #yozuk-logo {
  max-width: 10rem;
  max-height: 10rem;
}

h1,
h2,
button {
  font-family: 'Barlow Condensed', sans-serif;
}
</style>
