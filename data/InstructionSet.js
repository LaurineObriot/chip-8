const INSTRUCTION_SET = [
  	{
	    key: 2,
	    id: 'CLS',
	    name: 'CLS',
	    mask: 0xffff,
	    pattern: 0x00e0,
	    arguments: [],
  	},
  	{
	    key: 3,
	    id: 'RET',
	    name: 'RET',
	    mask: 0xffff,
	    pattern: 0x00ee,
	    arguments: [],
  	},
  	{
	    key: 4,
	    id: 'JP_ADDR',
	    name: 'JP',
	    mask: 0xf000,
	    pattern: 0x1000,
	    arguments: [{ mask: 0x0fff, shift: 0, type: 'A' }],
  	},
  	{
	    key: 5,
	    id: 'CALL_ADDR',
	    name: 'CALL',
	    mask: 0xf000,
	    pattern: 0x2000,
	    arguments: [{ mask: 0x0fff, shift: 0, type: 'A' }],
  	},
  	{
	    key: 6,
	    id: 'SE_VX_NN',
	    name: 'SE',
	    mask: 0xf000,
	    pattern: 0x3000,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
  	},
  	{
	    key: 7,
	    id: 'SNE_VX_NN',
	    name: 'SNE',
	    mask: 0xf000,
	    pattern: 0x4000,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
  	},
  	{
	    key: 8,
	    id: 'SE_VX_VY',
	    name: 'SE',
	    mask: 0xf00f,
	    pattern: 0x5000,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 9,
	    id: 'LD_VX_NN',
	    name: 'LD',
	    mask: 0xf000,
	    pattern: 0x6000,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
  	},
  	{
	    key: 10,
	    id: 'ADD_VX_NN',
	    name: 'ADD',
	    mask: 0xf000,
	    pattern: 0x7000,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
  	},
  	{
	    key: 11,
	    id: 'LD_VX_VY',
	    name: 'LD',
	    mask: 0xf00f,
	    pattern: 0x8000,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 12,
	    id: 'OR_VX_VY',
	    name: 'OR',
	    mask: 0xf00f,
	    pattern: 0x8001,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 13,
	    id: 'AND_VX_VY',
	    name: 'AND',
	    mask: 0xf00f,
	    pattern: 0x8002,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 14,
	    id: 'XOR_VX_VY',
	    name: 'XOR',
	    mask: 0xf00f,
	    pattern: 0x8003,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 15,
	    id: 'ADD_VX_VY',
	    name: 'ADD',
	    mask: 0xf00f,
	    pattern: 0x8004,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 16,
	    id: 'SUB_VX_VY',
	    name: 'SUB',
	    mask: 0xf00f,
	    pattern: 0x8005,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 17,
	    id: 'SHR_VX_VY',
	    name: 'SHR',
	    mask: 0xf00f,
	    pattern: 0x8006,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 18,
	    id: 'SUBN_VX_VY',
	    name: 'SUBN',
	    mask: 0xf00f,
	    pattern: 0x8007,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 19,
	    id: 'SHL_VX_VY',
	    name: 'SHL',
	    mask: 0xf00f,
	    pattern: 0x800e,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 20,
	    id: 'SNE_VX_VY',
	    name: 'SNE',
	    mask: 0xf00f,
	    pattern: 0x9000,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00f0, shift: 4, type: 'R' }],
  	},
  	{
	    key: 21,
	    id: 'LD_I_ADDR',
	    name: 'LD',
	    mask: 0xf000,
	    pattern: 0xa000,
	    arguments: [{ mask: 0x0000, shift: 0, type: 'I' }, { mask: 0x0fff, shift: 0, type: 'A' }],
  	},
  	{
	    key: 22,
	    id: 'JP_V0_ADDR',
	    name: 'JP',
	    mask: 0xf000,
	    pattern: 0xb000,
	    arguments: [{ mask: 0x0000, shift: 0, type: 'V0' }, { mask: 0x0fff, shift: 0, type: 'A' }],
  	},
  	{
	    key: 23,
	    id: 'RND_VX_NN',
	    name: 'RND',
	    mask: 0xf000,
	    pattern: 0xc000,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x00ff, shift: 0, type: 'NN' }],
  	},
  	{
	    key: 24,
	    id: 'DRW_VX_VY_N',
	    name: 'DRW',
	    mask: 0xf000,
	    pattern: 0xd000,
	    arguments: [
	      	{ mask: 0x0f00, shift: 8, type: 'R' },
	      	{ mask: 0x00f0, shift: 4, type: 'R' },
	      	{ mask: 0x000f, shift: 0, type: 'N' },
    	],
  	},
  	{
	    key: 25,
	    id: 'SKP_VX',
	    name: 'SKP',
	    mask: 0xf0ff,
	    pattern: 0xe09e,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }],
  	},
  	{
	    key: 26,
	    id: 'SKNP_VX',
	    name: 'SKNP',
	    mask: 0xf0ff,
	    pattern: 0xe0a1,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }],
  	},
  	{
	    key: 27,
	    id: 'LD_VX_DT',
	    name: 'LD',
	    mask: 0xf00f,
	    pattern: 0xf007,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x0000, shift: 0, type: 'DT' }],
  	},
  	{
	    key: 28,
	    id: 'LD_VX_N',
	    name: 'LD',
	    mask: 0xf00f,
	    pattern: 0xf00a,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x0000, shift: 0, type: 'K' }],
  	},
  	{
	    key: 29,
	    id: 'LD_DT_VX',
	    name: 'LD',
	    mask: 0xf0ff,
	    pattern: 0xf015,
	    arguments: [{ mask: 0x0000, shift: 0, type: 'DT' }, { mask: 0x0f00, shift: 8, type: 'R' }],
  	},
  	{
	    key: 30,
	    id: 'LD_ST_VX',
	    name: 'LD',
	    mask: 0xf0ff,
	    pattern: 0xf018,
	    arguments: [{ mask: 0x0000, shift: 0, type: 'ST' }, { mask: 0x0f00, shift: 8, type: 'R' }],
  	},
  	{
	    key: 31,
	    id: 'ADD_I_VX',
	    name: 'ADD',
	    mask: 0xf0ff,
	    pattern: 0xf01e,
	    arguments: [{ mask: 0x0000, shift: 0, type: 'I' }, { mask: 0x0f00, shift: 8, type: 'R' }],
  	},
  	{
	    key: 32,
	    id: 'LD_F_VX',
	    name: 'LD',
	    mask: 0xf0ff,
	    pattern: 0xf029,
	    arguments: [{ mask: 0x0000, shift: 0, type: 'I' }, { mask: 0x0f00, shift: 8, type: 'R' }],
  	},
  	{
	    key: 33,
	    id: 'LD_B_VX',
	    name: 'LD',
	    mask: 0xf0ff,
	    pattern: 0xf033,
	    arguments: [{ mask: 0x0000, shift: 0, type: 'B' }, { mask: 0x0f00, shift: 8, type: 'R' }],
  	},
  	{
	    key: 34,
	    id: 'LD_I_VX',
	    name: 'LD',
	    mask: 0xf0ff,
	    pattern: 0xf055,
	    arguments: [{ mask: 0x0000, shift: 0, type: '[I]' }, { mask: 0x0f00, shift: 8, type: 'R' }],
  	},
  	{
	    key: 35,
	    id: 'LD_VX_I',
	    name: 'LD',
	    mask: 0xf0ff,
	    pattern: 0xf065,
	    arguments: [{ mask: 0x0f00, shift: 8, type: 'R' }, { mask: 0x0000, shift: 0, type: '[I]' }],
  	},
  	{
	    key: 36,
	    id: 'DW',
	    name: 'DW',
	    mask: 0x0000,
	    pattern: 0x0000,
	    arguments: [{ mask: 0xffff, shift: 0, type: 'DW' }],
  	},
]

module.exports = {
  	INSTRUCTION_SET,
}
