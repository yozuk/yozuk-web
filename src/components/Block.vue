<script setup>

const props = defineProps({
    block: Object
})

</script>

<template>
    <div class="my-2">
        <div v-if="block.type === 'data'">
            <pre><code>{{ block.data }}</code></pre>
        </div>
        <div v-else-if="block.type === 'comment'">
            <p>{{ block.text }}</p>
        </div>
    </div>
</template>