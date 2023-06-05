import { style, globalStyle } from '@vanilla-extract/css'

export const headerContainer = style({
	position: 'fixed',
	display: 'flex',
	flexDirection: 'row',
	width: '70vw',
	minHeight: '10vh',
	top: '65vh',
	backgroundColor: 'black',
	paddingLeft: '15vw',
	paddingRight: '15vw',
})
globalStyle(`${headerContainer} p`, {
	fontSize: '7vh',
	color: 'grey',
	marginRight: '5vw'
})