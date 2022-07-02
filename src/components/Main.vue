<script setup>
import Echo from './Echo.vue'
import Result from './Result.vue'
import { ref, reactive } from 'vue'
import { runCommand } from "../yozuk";

let counter = 0;
const chatHistory = reactive([]);

runCommand("version info").then((res) => {
  chatHistory.push({ type: 'echo', body: { text: 'version info' }, id: counter++ });
  chatHistory.push({ ...res, id: counter++ });
  console.log(chatHistory)
})
runCommand("10 uuid").then((res) => {
  chatHistory.push({ type: 'echo', body: { text: '10 uuid' }, id: counter++ });
  chatHistory.push({ ...res, id: counter++ });
  console.log(chatHistory)
})

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
    <div class="mb-20">
      <div v-for="msg in chatHistory" :key="msg.id">
        <Echo v-if="msg.type === 'echo'" :msg="msg" />
        <Result v-if="msg.type === 'ok'" :msg="msg" />
      </div>
    </div>
    <div class="commandbox fixed left-0 md:left-1/2 right-0 bottom-0 px-3 pb-3">
      <input ref="command" placeholder="Command..." class="
                bg-gray-300
                appearance-none
                rounded
                w-full
                py-3
                px-3
                text-gray-800
                leading-tight
                focus:outline-none
                border
                border-gray-500
                shadow-lg
              " type="text" aria-label="Command" />
    </div>
  </div>
</template>

<style scoped>
* {
  scroll-behavior: smooth;
}

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
