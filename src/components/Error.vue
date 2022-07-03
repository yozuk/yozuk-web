<script setup>
import Block from './Block.vue'

const props = defineProps({
    msg: Object
})

</script>

<template>
    <div v-for="output in msg.outputs" :key="output.title"
        class="rounded overflow-hidden mx-3 py-2 bg-red-700 text-gray-200 text-left border-b border-red-500 shadow-xl">
        <h3 class="text-sm font-bold px-2 md:px-4">Yozuk: {{ output.title }}</h3>
        <Block v-for="block in output.blocks" :key="block" :block="block" />
    </div>
</template>