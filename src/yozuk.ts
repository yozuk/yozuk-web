import Worker from './worker?worker'
import WebworkerPromise from 'webworker-promise';

const worker = new WebworkerPromise(new Worker());

export async function runCommand(command: string, files: File[] = []) {
    const buffers = await Promise.all(files.map((file) => file.arrayBuffer()))
    const streams = buffers.map((data) => {
        const array = new Uint8Array(data)
        return { array, buffer: array.buffer }
    })
    const arrays = streams.map(({ array }) => array);
    const bufs = streams.map(({ buffer }) => buffer);
    try {
        const result = await worker.postMessage(["exec", command, arrays], bufs)
        return result
    } catch (err) {
        return {
            type: "fail",
            outputs: [
                {
                    blocks: [
                        {
                            text: "Oopsy, something went wrong. I can't handle your request.",
                            media_type: "text/plain",
                            type: "comment",
                        },
                    ],
                },
            ],
        }
    }
}