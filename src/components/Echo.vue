<script setup>

const props = defineProps({
    msg: Object
})

</script>

<template>
    <div class="w-full px-4 py-2 md:px-6 md:py-4 text-left">
        <h3 class="text-sm font-bold">You</h3>
        <p>{{ msg.body.text }}</p>
    </div>
</template>