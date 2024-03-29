<script setup>
import Echo from './Echo.vue'
import Result from './Result.vue'
import Error from './Error.vue'
import NoCommand from './NoCommand.vue'
import { ref, reactive, inject } from 'vue'
import { runCommand, randomSuggests, setSuggestsStreams, suggests as getSuggests } from "../yozuk";

let counter = 0;

const command = ref();
const loading = ref(false);
const chatHistory = reactive([]);
const files = reactive([]);
const suggests = reactive([]);

const timeoutHandler = setTimeout(() => {
  if (!loading.value) {
    loading.value = true;
  }
}, 500)

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
  runCommand(value, sentFiles).then((data) => {
    chatHistory.push({ ...data, id: counter++ });
    setTimeout(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
  });
  command.value.value = "";
  setTimeout(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  updateFile();
}

function addFile(event) {
  files.push(...event.target.files);
  event.target.value = "";
  updateFile();
}

function removeFile(file) {
  const index = files.indexOf(file);
  if (index !== -1) {
    files.splice(index, 1);
  }
  updateFile();
}

async function updateFile() {
  await setSuggestsStreams(files);
  await updateSuggests();
}

async function updateSuggests() {
  if (command.value.value.length > 0 || files.length > 0) {
    let newSuggests = await getSuggests(command.value.value, 8);
    suggests.splice(0);
    suggests.push(...newSuggests);
  } else {
    let newSuggests = await randomSuggests(8);
    suggests.splice(0);
    suggests.push(...newSuggests);
  }
}

function onWheel(event) {
  event.currentTarget.scrollLeft += event.deltaY * 2.0;
}

window.addEventListener('load', (event) => {
  randomSuggests(8).then((items) => {
    suggests.push(...items);
    loading.value = false;
    clearTimeout(timeoutHandler);
  });
  if (window.location !== window.parent.location) {
    command.value.focus();
  }
});

</script>

<template>
  <div class="hidden md:flex fixed inset-0 right-1/2 flex-col border-r bg-gray-300 border-gray-300">
    <div class="grow"></div>
    <div class="grow-0">
      <h1 class="text-6xl text-gray-900 font-bold">Yozuk</h1>
      <h2 class="text-3xl text-gray-500 mt-4 px-6">A secure, portable and smart bot for <span
          class="underline">programmers.</span></h2>
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
  <div class="chatbox static md:absolute top-0 right-0 left-1/2 pb-20">
    <div v-if="!$iframeMode" class="md:hidden flex flex-col py-6 bg-gray-300">
      <div class="grow"></div>
      <div class="grow-0">
        <h1 class="text-5xl text-gray-900 font-bold">Yozuk</h1>
        <h2 class="text-2xl text-gray-500">A secure, portable and smart bot for <span
            class="underline">programmers.</span></h2>
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
      <div v-if="!$iframeMode" class="flex items-center w-full py-4 bg-gray-100 text-gray-500 text-sm font-bold">
        <p class="grow"></p>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="feather feather-lock">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <p class="ml-2">Your inputs will never be sent to the server.</p>
        <p class="grow"></p>
      </div>
      <div class="rounded mt-4 mx-3 py-2 bg-gray-600 text-gray-200 text-left shadow-xl">
        <h3 class="text-sm font-bold px-2 md:px-4">Yozuk</h3>
        <p class="px-2 md:px-4 py-1 md:py-3">👋Hi, I'm your personal assistant.
          <br>If you have no idea what to say, try the suggested commands below!
        </p>
      </div>
      <div v-if="loading" class=" mt-4 mx-3 py-2">
        <svg class="animate-spin feather feather-loader mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        <h2>Loading...</h2>
      </div>
      <div v-for="msg in chatHistory" :key="msg.id">
        <Echo v-if="msg.type === 'echo'" :msg="msg" />
        <div class="fadein">
          <Result v-if="msg.type === 'ok'" :msg="msg" />
          <Error v-if="msg.type === 'fail'" :msg="msg" />
          <NoCommand v-if="msg.type === 'no_command'" />
        </div>
      </div>
    </div>
    <div class="commandbox fixed left-0 md:left-1/2 right-0 bottom-0">
      <div class="cover-gradient"></div>
      <div class="cover-bg">
        <div @wheel="onWheel" class="suggestbox mb-2 px-3 text-left whitespace-nowrap overflow-x-scroll">
          <button v-for="item in suggests" :key="item" @click="run(item)" class="
          inline-block
          whitespace-nowrap
          text-ellipsis
          overflow-hidden
          bg-gray-100
          text-gray-800
          border
          border-gray-500
          mr-2
          px-2.5
          py-0.5
          rounded-full
              ">
            {{ item }}</button>
        </div>
        <div class="px-3 pb-3">
          <div class="w-full bg-gray-300 rounded border border-gray-500 shadow-lg">
            <div v-if="files.length > 0" class="py-2 mx-2 flex border-b border-gray-500">
              <button v-for="file in files" :key="file.name" @click="removeFile(file)" style="max-width: 180px" class="
                inline-block
                whitespace-nowrap
                text-ellipsis
                overflow-hidden
                bg-gray-100
                text-gray-800
                border
                border-gray-500  
                mr-2
                px-2.5
                py-0.5
                rounded
              ">
                {{ file.name }}</button>
            </div>
            <div class="w-full flex py-1 px-3">
              <input ref="command" @input="updateSuggests" v-on:keyup.enter="run($refs.command.value)"
                placeholder=" Command..." class="
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
              <input type="file" ref="file" @change="addFile" style="display: none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.suggestbox {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.suggestbox::-webkit-scrollbar {
  display: none;
}

.cover-bg {
  background-color: #ebebeb;
}

.cover-gradient {
  height: 10px;
  background: linear-gradient(0deg, rgba(235, 235, 235, 1) 50%, rgba(235, 235, 235, 0) 100%);
}

#yozuk-logo {
  max-width: 15rem;
  max-height: 15rem;
}

.chatbox #yozuk-logo {
  max-width: 10rem;
  max-height: 10rem;
}

.fadein {
  opacity: 0;
  transform: translateY(2em);
  animation: fadeInAnimation ease 0.4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes fadeInAnimation {
  0% {
    opacity: 0;
    transform: translateY(2em);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

h1,
h2,
button {
  font-family: 'Barlow Condensed', sans-serif;
}
</style>
