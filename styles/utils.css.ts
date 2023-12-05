import { style, globalStyle, styleVariants } from '@vanilla-extract/css'

export const scrollBox = style({
  height: '500vh',
  overflowX: 'hidden',
})

export const mainView = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '99.2vw',
  height: '100vh',
  backgroundColor: 'black',
  overflow: 'hidden'
})

export const header = style({
  position: 'relative',
  willChange: 'height',
  backgroundColor: 'black',
  width: '100%',
  height: '40vh',
  borderBottom: '2px solid',
  display: 'flex',
  paddingTop: '3vw',
  zIndex: 2,
  overflow: 'hidden'
})

export const button = style({
  width: '5.5vw',
  height: '2.5vw',
  marginLeft: '3vw',
  border: '2px solid',
  borderRadius: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export const intro = style({
  position: 'absolute',
  bottom: '10%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const introText = style({
  width: '400px',
  textAlign: 'right',
  fontSize: '2vw',
  padding: '1vw'
})

export const body = style({
  position: 'relative',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
})

export const heading = style({
  fontSize: '6vw',
  marginTop: '38vh',
})

export const projectContainer = style({
  display: 'flex',
  width: '100vw',
  height: '50vh',
  marginTop: '2vh',
  justifyContent: 'space-evenly'
})

export const projectBox = style({
  position: 'relative',
  width: '20vw',
  height: '20vw',
  marginLeft: '2vw',
  border: '2px solid',
  borderRadius: 60,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
})

export const text = style({
  fontSize: '2vw',
  textAlign: 'center',
  flexWrap: 'wrap',

  selectors: {
   [`${projectBox} > &`] : {
    fontSize: '2.5vw',
    color: 'white',
    marginLeft: '10%',
    marginBottom: '4%'
   }
  }
})