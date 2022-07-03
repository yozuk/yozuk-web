<script setup>
import Echo from './Echo.vue'
import Result from './Result.vue'
import Error from './Error.vue'
import { ref, reactive } from 'vue'
import { runCommand } from "../yozuk";

let counter = 0;

const command = ref();
const loading = ref(1);
const chatHistory = reactive([]);
const files = reactive([]);

runCommand("version info").then((res) => {
  chatHistory.push({ type: 'echo', body: { text: 'version info' }, id: counter++ });
  chatHistory.push({ ...res, id: counter++ });
})
runCommand("BLDdqP~BS16_Efr to qr").then((res) => {
  chatHistory.push({ type: 'echo', body: { text: '100 words dummy text' }, id: counter++ });
  chatHistory.push({ ...res, id: counter++ });
})
runCommand("TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA").then((res) => {
  chatHistory.push({ type: 'echo', body: { text: '100000 uuid' }, id: counter++ });
  chatHistory.push({ ...res, id: counter++ });
  console.log(res)
})


function run(value) {
  if (value.length === 0 && files.length === 0) {
    return;
  }
  let sentFiles = files.splice(0, files.length);
  chatHistory.push({
    type: "echo",
    body: {
      text: value,
      files: sentFiles,
    },
    id: counter++,
  });
  loading.value++;
  runCommand(value, sentFiles).then((data) => {
    loading.value--;
    chatHistory.push({ ...data, id: counter++ });
    setTimeout(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
  });
  command.value.value = "";
  setTimeout(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
}

function addFile(event) {
  files.push(...event.target.files);
  event.target.value = "";
}

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
        <Error v-if="msg.type === 'fail'" :msg="msg" />
      </div>
    </div>
    <div class="commandbox fixed left-0 md:left-1/2 right-0 bottom-0 px-3 pb-3">
      <div class="w-full flex py-1 px-3 bg-gray-300 rounded border border-gray-500 shadow-lg">
        <input ref="command" v-on:keyup.enter="run($refs.command.value)" placeholder=" Command..." class="
                appearance-none
                w-full
                outline-none
                text-gray-800
                leading-tight
                bg-transparent
              " type="text" aria-label="Command" />
        <button @click="$refs.file.click()" class="
                text-gray-700
                rounded-full
                text-xs
                p-2.5
                text-center
                inline-flex
                items-center
              ">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-paperclip">
            <path
              d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48">
            </path>
          </svg>
        </button>
        <button :disabled="chatHistory.length === 0" @click="run($refs.command.value)" class="
                text-gray-700
                rounded-full
                text-xs
                p-2.5
                text-center
                inline-flex
                items-center
              ">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="feather feather-send">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
        <input type="file" ref="file" @change="addFile" style="display: none" />
      </div>
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
