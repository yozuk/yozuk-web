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

function splitText(data, highlights) {
    let sections = [];
    let offset = 0;
    if (highlights) {
        for (const highlight of highlights) {
            const text = data.slice(offset, highlight.range.start);
            if (text.length > 0) {
                sections.push({ text, value: false });
            }
            sections.push({ text: data.slice(highlight.range.start, highlight.range.end), value: true });
            offset = highlight.range.end;
        }
    } else {
        while (true) {
            const pos = data.indexOf('\n', offset);
            if (pos < 0) break;
            sections.push({ text: data.slice(offset, pos), value: true });
            sections.push({ text: '\n', value: false });
            offset = pos + 1;
        }
    }
    const text = data.slice(offset);
    if (text.length > 0) {
        sections.push({ text, value: true });
    }
    return sections;
}
</script>

<template>
    <div>
        <div class="px-2 md:px-4 py-2 md:py-4 bg-gray-800"
            v-if="block.type === 'data' && block.media_type.startsWith('image/')">
            <img class="rounded" :src="`data:${block.media_type};base64, ${encode(block.data)}`">
        </div>
        <div class="px-2 md:px-4 py-1 md:py-3 bg-gray-800"
            v-else-if="block.type === 'data' && typeof block.data === 'string' && block.data.length < 4096">
            <pre class="whitespace-pre-wrap break-all"><code><span 
                v-for="section in splitText(block.data, block.highlights)" 
                :key="section.text"
                :class="{ 'opacity-60': !section.value, 'select-all': true }"
                >{{ section.text }}</span></code></pre>
        </div>
        <div class="px-2 md:px-4 py-2 md:py-4 bg-gray-800" v-else-if="block.type === 'data'">
            <button class="w-full font-bold px-1 md:px-2 py-2 md:py-4 text-gray-700 bg-gray-200 rounded"
                @click="downloadFile(block)">{{
                        file_name(block)
                }} ({{ prettyBytes(block.data.length || block.data.byteLength) }})</button>
        </div>
        <div class="px-2 md:px-4 mb-2 text-sm" v-else-if="block.type === 'comment'">
            <p>{{ block.text }}</p>
        </div>
    </div>
</template>

<style scoped>
code {
    font-family: 'Iosevka Web', monospace;
}
</style>