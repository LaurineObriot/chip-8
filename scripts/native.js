const r = require('raylib')
const fs = require('fs')
const fileContents = fs.readFileSync(process.argv.slice(2)[0])
const { CPU } = require('../classes/CPU')
const { RomBuffer } = require('../classes/RomBuffer')
const { NativeCpuInterface } = require('../classes/interfaces/NativeCpuInterface')
const cpuInterface = new NativeCpuInterface()
const { DISPLAY_HEIGHT, DISPLAY_WIDTH } = require('../data/constants')
const nativeKeyMap = require('../data/nativeKeyMap')

const cpu = new CPU(cpuInterface)
const romBuffer = new RomBuffer(fileContents)

cpu.load(romBuffer)

const multiplier = 10
const screenWidth = DISPLAY_WIDTH * multiplier
const screenHeight = DISPLAY_HEIGHT * multiplier

r.InitWindow(screenWidth, screenHeight, 'Chip8.js')
r.SetTargetFPS(60)
r.ClearBackground(r.BLACK)

while (!r.WindowShouldClose()) {
  	let timer = 0

  	if (timer % 5 === 0) {
    	cpu.tick()
    	timer = 0
  	}

	const rawKeyPressed = r.GetKeyPressed()
    const keyPressed = nativeKeyMap.find(key => rawKeyPressed === key)

	if (keyPressed) {
      	cpu.interface.keyPressed = cpu.interface.mapKey(keyPressed)
    } else {
		cpu.interface.clearKeys()
    }

    cpu.step()

	r.BeginDrawing()

	cpu.interface.frameBuffer.forEach((y, i) => {
      	y.forEach((x, j) => {
        	if (x) {
          		r.DrawRectangleRec(
            	{
		            x: j * multiplier,
		            y: i * multiplier,
		            width: multiplier,
		            height: multiplier,
            	},
            	r.GREEN
          		)
        	} else {
          		r.DrawRectangleRec(
            	{
		            x: j * multiplier,
		            y: i * multiplier,
		            width: multiplier,
		            height: multiplier,
            	},
            	r.BLACK
          		)
        	}
      	})
    })

	r.EndDrawing()
}

r.CloseWindow()
