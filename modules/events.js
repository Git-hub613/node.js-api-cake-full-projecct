import {EventEmitter} from 'events';

const events = new EventEmitter();


events.on("hello",()=>{
    console.log("hello world my name is roshan sardar village name is hardiya")
})


events.emit("hello")