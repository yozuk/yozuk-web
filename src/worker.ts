import { Yozuk } from '@yozuk/yozuk-wasm/web'
import registerWebworker from 'webworker-promise/lib/register'

const yo = new Yozuk()

registerWebworker(async (message, emit) => {
    switch (message[0]) {
        case 'exec':
            return await yo.exec(message[1], message[2]);
        case 'randomSuggests':
            return await yo.random_suggests(message[1]);
        case 'setSuggestsStreams':
            return await yo.set_suggests_streams(message[1]);
        case 'suggests':
            return await yo.suggests(message[1], message[2]);
    }
});