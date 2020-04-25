let fs = require('fs')
let filename = process.argv.slice(2)[0]
let { RomBuffer } = require('./classes/RomBuffer')
let { Disassembler } = require('./classes/Disassembler')

let romBuffer = new RomBuffer(filename, fs)

// console.log('RomBuffer - dump')
// console.log(romBuffer.dump())

let disassembler = new Disassembler()
// let decodedInstruction = disassembler.disassemble(0x8ab2)

// console.log('\nDisassembler - disassemble')
// console.log(decodedInstruction)
// console.log('\nDisassembler - format')
// console.log(disassembler.format(decodedInstruction))
// console.log('\nDisassembler - dump')
// console.log(disassembler.dump(romBuffer.data))
