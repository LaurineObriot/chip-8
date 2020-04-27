describe('decoded instructions test', () => {
  const { CPU } = require('../classes/CPU')
  const cpu = new CPU()

  beforeEach(() => {
    cpu.reset()
  })

  test.skip('test decoder 02: CLS', () => {})

  test('test decoder 03: RET', () => {
    cpu.load({ data: [ 0x00ee ] })
    cpu.SP = 2
    cpu.stack[2] = 0xf
    cpu.test()

    expect(cpu.PC).toBe(0xf)
    expect(cpu.SP).toBe(0x1)
  })

  test('test decoder 04: 1nnn - JP addr', () => {
    cpu.load({ data: [ 0x1333 ] })
    cpu.test()

    expect(cpu.PC).toBe(0x333)
  })

  test('test decoder 05: 2nnn - CALL addr', () => {
    cpu.load({ data: [ 0x2062 ] })
    const PC = cpu.PC
    cpu.test()

	expect(cpu.SP).toBe(0)
    expect(cpu.stack[cpu.SP]).toBe(PC + 2)
    expect(cpu.PC).toBe(0x062)
  })

  test('test decoder 06: 3xkk - SE Vx, byte', () => {
    cpu.load({ data: [ 0x3abb ] })
    cpu.test()

    expect(cpu.PC).toBe(0x202)

    cpu.load({ data: [ 0x3abb ] })
    cpu.registers[0xa] = 0xbb
    cpu.test()

    expect(cpu.PC).toBe(0x204)
  })

  test('test decoder 07: 4xkk - SNE Vx, byte', () => {
    cpu.load({ data: [ 0x4acc ] })
    cpu.test()

    expect(cpu.PC).toBe(0x204)

    cpu.load({ data: [ 0x4acc ] })
    cpu.registers[0xa] = 0xcc
    cpu.test()

    expect(cpu.PC).toBe(0x202)
  })

  test('test decoder 08: 5xy0 - SE Vx, Vy', () => {
    cpu.load({ data: [ 0x5ab0 ] })
    cpu.test()

    expect(cpu.PC).toBe(0x204)

    cpu.load({ data: [ 0x5ab0 ] })
    cpu.registers[0xa] = 0x5
    cpu.test()

    expect(cpu.PC).toBe(0x202)
  })

  test('test decoder 09: 6xkk - LD Vx, byte', () => {
    cpu.load({ data: [ 0x6abb ] })
	cpu.registers[0xa] = 0x10
    cpu.test()

    expect(cpu.registers[0xa]).toBe(0xbb)
  })

  test('test decoder 10: 7xkk - ADD Vx, byte', () => {
    cpu.load({ data: [ 0x7abb ] })
	cpu.registers[0xa] = 0x10
    cpu.test()

	expect(cpu.registers[0xa]).toBe(0x10 + 0xbb)
  })

  test('test decoder 11: 8xy0 - LD Vx, Vy', () => {
    cpu.load({ data: [ 0x8ab0 ] })
	cpu.registers[0xb] = 0x8
	cpu.test()

	expect(cpu.registers[0xa]).toBe(0x8)
  })

  test('test decoder 12: 8xy1 - OR Vx, Vy', () => {
	cpu.load({ data: [ 0x8ab1 ] })
	cpu.registers[0xa] = 0x3
	cpu.registers[0xb] = 0x4
	cpu.test()

	expect(cpu.registers[0xa]).toBe(0x7)
  })

  test('test decoder 13: 8xy2 - AND Vx, Vy', () => {
	cpu.load({ data: [ 0x8ab2 ] })
	cpu.registers[0xa] = 0x3
	cpu.registers[0xb] = 0x4
    cpu.test()

    expect(cpu.registers[0xa]).toBe(0)
  })

  test('test decoder 14: 8xy3 - XOR Vx, Vy', () => {
    cpu.load({ data: [ 0x8ab3 ] })
    cpu.registers[0xa] = 0x3
    cpu.registers[0xb] = 0x4
    cpu.test()

    expect(cpu.registers[0xa]).toBe(0x7)
  })

  test('test decoder 15: 8xy4 - ADD Vx, Vy', () => {
    cpu.load({ data: [ 0x8ab4 ] })
    cpu.registers[0xa] = 0x3
    cpu.registers[0xb] = 0x4
    cpu.test()

    expect(cpu.registers[0xa]).toBe(0x7)
    expect(cpu.registers[0xf]).toBe(0)

    cpu.load({ data: [ 0x8ab4 ] })
    cpu.registers[0xa] = 0xff
    cpu.registers[0xb] = 0xff
    cpu.test()

    expect(cpu.registers[0xa]).toBe(0xfe)
    expect(cpu.registers[0xf]).toBe(1)
  })

  test('test decoder 16: 8xy5 - SUB Vx, Vy', () => {
    cpu.load({ data: [ 0x8ab5 ] })
    cpu.registers[0xa] = 0x4
    cpu.registers[0xb] = 0x2
    cpu.test()

    expect(cpu.registers[0xa]).toBe(2)
    expect(cpu.registers[0xf]).toBe(1)

    cpu.load({ data: [ 0x8ab5 ] })
    cpu.registers[0xa] = 0x2
    cpu.registers[0xb] = 0x3
    cpu.test()

    expect(cpu.registers[0xa]).toBe(255)
    expect(cpu.registers[0xf]).toBe(0)
  })

  test('test decoder 17: 8xy6 - SHR Vx {, Vy}', () => {
    cpu.load({ data: [ 0x8ab6 ] })
    cpu.registers[0xa] = 0x3
    cpu.registers[0xb] = 0x4
    cpu.test()

    expect(cpu.registers[0xa]).toBe(0x3 >> 1)
  })

  test('test decoder 18: 8xy7 - SUBN Vx, Vy', () => {
    cpu.load({ data: [ 0x8ab7 ] })
    cpu.registers[0xa] = 0x3
    cpu.registers[0xb] = 0x2
    cpu.test()

    expect(cpu.registers[0xa]).toBe(255)
    expect(cpu.registers[0xf]).toBe(0)

    cpu.load({ data: [ 0x8ab7 ] })
    cpu.registers[0xa] = 0x2
    cpu.registers[0xb] = 0x3
    cpu.test()

    expect(cpu.registers[0xa]).toBe(1)
    expect(cpu.registers[0xf]).toBe(1)
  })

  test('test decoder 19: 8xyE - SHL Vx, {, Vy}', () => {
    cpu.load({ data: [ 0x8abe ] })
    cpu.registers[0xa] = 0x3
    cpu.test()

    expect(cpu.registers[0xa]).toBe(0x3 << 1)
    expect(cpu.registers[0xf]).toBe(0)
  })

  test('test decoder 20: 9xy0 - SNE Vx, Vy', () => {
    cpu.load({ data: [ 0x9ab0 ] })
    cpu.registers[0xa] = 0x3
    cpu.registers[0xb] = 0x4
    cpu.test()

    expect(cpu.PC).toBe(0x204)

    cpu.load({ data: [ 0x9ab0 ] })
    cpu.registers[0xa] = 0x3
    cpu.registers[0xb] = 0x3
    cpu.test()

    expect(cpu.PC).toBe(0x202)
  })

  test('test decoder 21: Annn - LD I, addr', () => {
    cpu.load({ data: [ 0xa999 ] })
    cpu.test()

    expect(cpu.I).toBe(0x999)
  })

  test('test decoder 22: Bnnn - JP V0, addr', () => {
    cpu.load({ data: [ 0xb300 ] })
    cpu.registers[0] = 0x2
    cpu.test()

    expect(cpu.PC).toBe(0x2 + 0x300)
  })

  test.skip('test decoder 23: Cxkk - RND Vx, byte', () => {
    // untestable
  })

  test.skip('test decoder 24: Dxyn - DRW Vx, Vy, nibble', () => {
    // cpu.load({ data: [ 0xdab2 ] })
    // cpu.registers[0xa] = 0
    // cpu.registers[0xb] = 0
    // cpu.I = 0x300
    // cpu.memory[0x300] = 0b11110000
    // cpu.memory[0x301] = 0b11100000
    // cpu.test()
    // expect(cpu.memory[0x300]).toBe(0)
    // I'll get back to this one
  })

  test.skip('test decoder 25: Ex9E - SKP Vx', () => {
    // todo
  })

  test.skip('test decoder 26: ExA1 - SKNP Vx', () => {
    // todo
  })

  test('test decoder 27: Fx07 - LD Vx, DT', () => {
    cpu.load({ data: [ 0xfa07 ] })
    cpu.DT = 0xf
    cpu.test()

    expect(cpu.registers[0xa]).toBe(0xf)
  })

  test.skip('test decoder 28: Fx0A - LD Vx, K', () => {
    // todo
  })

  test('test decoder 29: Fx15 - LD DT, Vx', () => {
    cpu.load({ data: [ 0xfb15 ] })
    cpu.registers[0xb] = 0xf
    cpu.test()

    expect(cpu.DT).toBe(0xf)
  })

  test('test decoder 30: Fx18 - LD ST, Vx', () => {
    cpu.load({ data: [ 0xfa18 ] })
    cpu.registers[0xa] = 0xf
    cpu.test()

    expect(cpu.ST).toBe(0xf)
  })

  test('test decoder 31: Fx1E - ADD I, Vx', () => {
    cpu.load({ data: [ 0xfa1e ] })
    cpu.I = 0xe
    cpu.registers[0xa] = 0xf
    cpu.test()

    expect(cpu.I).toBe(0xe + 0xf)
  })

  test.skip('test decoder 32: Fx29 - LD F, Vx', () => {
    // todo
  })

  test('test decoder 33: Fx33 - LD B, Vx', () => {
    cpu.load({ data: [ 0xfa33 ] })
    cpu.registers[0xa] = 0x7b
    cpu.I = 0x300
    cpu.test()

    expect(cpu.memory[0x300]).toBe(1)
    expect(cpu.memory[0x301]).toBe(2)
    expect(cpu.memory[0x302]).toBe(3)
  })

  test('test decoder 34: Fx55 - LD [I], Vx', () => {
    cpu.load({ data: [ 0xfb55 ] })
    cpu.I = 0x202
    for (let i = 0; i <= 0xf; i++) {
      cpu.registers[i] = i
    }
    cpu.test()

    expect(cpu.memory[cpu.I + 0xb]).toBe(0xb)
  })

  test('test decoder 35: Fx65 - LD Vx, [I]', () => {
    cpu.load({ data: [ 0xfa65 ] })
    cpu.I = 0x202
    for (let i = 0; i <= 0xf; i++) {
      cpu.registers[i] = i
    }
    cpu.test()

    expect(cpu.registers[0xb]).toBe(0xb)
  })

  test.skip('test data word', () => {
    cpu.load({ data: [ 0x5154 ] })
    // todo
  })
})
