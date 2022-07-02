import Worker from './worker?worker'
import WebworkerPromise from 'webworker-promise';

const worker = new WebworkerPromise(new Worker());

export function runCommand() {
    console.log(worker);
}