<script setup>
import { encode } from "base64-arraybuffer";
import { extension } from 'mime-types';
import prettyBytes from 'pretty-bytes';
import download from "js-file-download";

const props = defineProps({
    block: Object
})

function file_name(block) {
    return block.file_name || `data.${extension(block.media_type) || 'bin'}`
}

function downloadFile(block) {
    const filename = file_name(block);
    download(block.data, filename);
}
</script>

<template>
    <div>
        <div class="px-2 md:px-4 py-3" v-if="block.type === 'data' && block.media_type.startsWith('image/')">
            <img class="rounded" :src="`data:${block.media_type};base64, ${encode(block.data)}`">
        </div>
        <div class="px-2 md:px-4 py-3 bg-gray-800"
            v-else-if="block.type === 'data' && typeof block.data === 'string' && block.data.length < 4096">
            <pre class="whitespace-pre-wrap break-all"><code>{{ block.data }}</code></pre>
        </div>
        <div class="px-2 md:px-4 py-3" v-else-if="block.type === 'data'">
            <button class="w-full font-bold px-2 py-4 text-gray-700 bg-gray-200 rounded" @click="downloadFile(block)">{{
                    file_name(block)
            }} ({{ prettyBytes(block.data.length || block.data.byteLength) }})</button>
        </div>
        <div class="px-2 md:px-4 my-2" v-else-if="block.type === 'comment'">
            <p>{{ block.text }}</p>
        </div>
    </div>
</template>