<script setup>
import Block from './Block.vue'

const props = defineProps({
    msg: Object
})

</script>

<template>
    <div v-for="output in msg.outputs" :key="output.title"
        class="rounded overflow-hidden mx-3 bg-gray-600 text-gray-200 text-left border-b border-gray-500 shadow-xl">
        <h3 class="text-sm font-bold py-1 md:py-2 px-2 md:px-4">Yozuk: {{ output.title }}</h3>
        <div v-for="metadata in output.metadata" :key="metadata">
            <div v-if="metadata.type === 'color'" class="bg-repeat h-4 md:h-6" :style="{
                'background-image': `linear-gradient(0deg, ${metadata.color}, ${metadata.color}), url(\'check.png\')`,
            }"></div>
        </div>
        <Block v-for=" block in output.blocks" :key="block" :block="block" />
    </div>
</template>
