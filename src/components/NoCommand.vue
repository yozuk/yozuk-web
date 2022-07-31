<script setup>

const props = defineProps({
    msg: Object
})

</script>

<template>
    <div class="rounded mx-3 bg-red-700 text-gray-200 text-left border-b border-red-500 shadow-xl">
        <h3 class="text-sm font-bold py-1 md:py-2 px-2 md:px-4">Yozuk</h3>
        <p class="px-2 md:px-4 mb-2">Sorry, I can't understand your request.</p>
    </div>
</template>