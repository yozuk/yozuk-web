<script setup>
import Block from './Block.vue'

const props = defineProps({
    msg: Object
})

</script>

<template>
    <div v-for="output in msg.outputs" :key="output.title"
        class="rounded overflow-hidden mx-3 pt-2 bg-gray-600 text-gray-200 text-left border-b border-gray-500 shadow-xl">
        <h3 class="text-sm font-bold px-2 md:px-4 mb-2">Yozuk: {{ output.title }}</h3>
        <Block v-for=" block in output.blocks" :key="block" :block="block" />
    </div>
</template>