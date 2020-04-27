const filename = process.argv.slice(2)[0]
const { RomBuffer } = require('./classes/RomBuffer')
const { CPU } = require('./classes/CPU')
const romBuffer = new RomBuffer(filename)

cpu.load(romBuffer)
cpu.run()
