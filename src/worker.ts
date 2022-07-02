import { Yozuk } from '@yozuk/yozuk-wasm/web'
import registerWebworker from 'webworker-promise/lib/register'

const yo = new Yozuk()

registerWebworker(async (message, emit) => {
    switch (message[0]) {
        case 'exec':
            const result = await yo.exec(message[1], message[2])
            return result
    }
});