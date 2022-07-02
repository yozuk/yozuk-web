<script setup>
import { encode } from "base64-arraybuffer";

const props = defineProps({
    block: Object
})

</script>

<template>
    <div class="my-2">
        <div v-if="block.type === 'data' && block.media_type.startsWith('image/')">
            <img class="rounded" :src="`data:${block.media_type};base64, ${encode(block.data)}`">
        </div>
        <div v-else-if="block.type === 'data'">
            <pre class="whitespace-pre-wrap"><code>{{ block.data }}</code></pre>
        </div>
        <div v-else-if="block.type === 'comment'">
            <p>{{ block.text }}</p>
        </div>
    </div>
</template>