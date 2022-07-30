<script setup>

const props = defineProps({
    msg: Object
})

</script>

<template>
    <div class="mx-3 px-2 md:px-4 py-2 md:py-4 text-left">
        <h3 class="text-sm font-bold">You</h3>
        <p>{{ msg.body.text }}</p>
    </div>
</template>
