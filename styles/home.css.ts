import { style, globalStyle, styleVariants } from '@vanilla-extract/css'

export const homeContainer = style({
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: 'black',
	minHeight: '100vh',
	overflow: 'hidden'
})

export const block = style({
	display: 'flex',
	flexDirection: 'column',
	width: '70%',
	height: '101vh',
	justifyContent: 'center',
	paddingLeft: '15vw',
	paddingRight: '15vw',
})

export const blocks = styleVariants({
	art: [block, { background: 'blue' }]
})

export const introText = style({
	fontSize: '10vh',
	margin: 0,
	color: 'whitesmoke'
})

