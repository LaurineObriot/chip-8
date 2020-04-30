const filename = process.argv.slice(2)[0]
const { CPU } = require('../classes/CPU')
const { RomBuffer } = require('../classes/RomBuffer')
const { TerminalCpuInterface } = require('../classes/interfaces/TerminalCpuInterface')
const cpuInterface = new TerminalCpuInterface()

const cpu = new CPU(cpuInterface)
const romBuffer = new RomBuffer(filename)

// cpu.load({ data: [0xd125] })
// this.I = 0
// cpu.registers[0x1] = 1
// cpu.registers[0x2] = 1
// cpu.step()
// cpu.interface.showDisplay()

cpu.load(romBuffer)

setInterval(() => {
    cpu.step()
}, 3)

setInterval(() => {
    cpu.tick()
}, 16)
