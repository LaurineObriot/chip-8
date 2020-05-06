const blessed = require('blessed')
const { CpuInterface } = require('./CpuInterface')
const { DISPLAY_HEIGHT, DISPLAY_WIDTH, COLOR } = require('../../data/constants')
const keyMap = require('../../data/keyMap')

class TerminalCpuInterface extends CpuInterface {
  	constructor() {
    	super()

		this.blessed = blessed
		this.screen = blessed.screen()
		this.screen.title = 'Chip8.js'

		this.color = blessed.helpers.attrToBinary({ fg: COLOR })
	    this.frameBuffer = this.createFrameBuffer()
		this.display = this.blessed.box(this.createDisplay())
		this.soundEnabled = false
		this.keys = 0
		this.keyPressed = undefined

		this.screen.key(['escape', 'C-c'], () => {
	        process.exit(0)
	    })

		this.screen.on('keypress', (_, key) => {
			this.keyPressed = this.mapKey(key)
	    })

	    setInterval(() => {
	        this.keys = 0
	    }, 100)	}

	mapKey(key) {
		let keyMask

    	if (keyMap.includes(key.full)) {
			keyMask = 1 << keyMap.indexOf(key.full)

      		this.keys = this.keys | keyMask

			return keyMap.indexOf(key.full)
		}
	}

	createDisplay() {
        return {
	        parent: this.screen,
	        top: 'center',
	        left: 'center',
	        width: DISPLAY_WIDTH,
	        height: DISPLAY_HEIGHT,
	        style: {
	            bg: 'black',
	        },
        }
	}

	renderDisplay() {
		this.clearScreen()

	    this.screenRepresentation.forEach((row, x) => {
		    row.forEach((col, y) => {
		  		this.blessed.box({
				parent: this.display,
				top: y,
				left: x,
				width: 1,
				height: 1,
				style: {
				    bg: this.screenRepresentation[y][x] ? 'green' : 'black',
				},
		    })
		})
	})

	  this.screen.render()
	}


	clearScreen() {
        this.display.detach()
        this.display = this.blessed.box(this.createDisplay())
	}

	createFrameBuffer() {
        let frameBuffer = []
	  	for (let i = 0; i < DISPLAY_WIDTH; i++) {
			frameBuffer.push([])
			for (let j = 0; j < DISPLAY_HEIGHT; j++) {
				frameBuffer[i].push(0)
			}
	  	}
		return frameBuffer
	}

	clearDisplay() {
		this.frameBuffer = this.createFrameBuffer()
		this.screen.clearRegion(0, DISPLAY_WIDTH, 0, DISPLAY_HEIGHT)
	}


	drawPixel(x, y, value) {
	    // If collision, will return true
		const collision = this.frameBuffer[y][x] & value
	    // Will XOR value to position x, y
		this.frameBuffer[y][x] ^= value
		if (this.frameBuffer[y][x]) {
	        this.screen.fillRegion(this.color, '█', x, x + 1, y, y + 1)
		} else {
      		this.screen.clearRegion(x, x + 1, y, y + 1)
    	}
	}

	waitKey() {
		return this.keyPressed
	  }

	  resetKey() {
	    this.keyPressed = undefined
    }

	getKeys() {
		return this.keys
	}

	enableSound() {
        this.soundEnabled = true
    }

	disableSound() {
      	this.soundEnabled = false
    }
}

module.exports = {
  TerminalCpuInterface,
}
