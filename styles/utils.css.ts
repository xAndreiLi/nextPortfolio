import { style, globalStyle, styleVariants } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'black',
  overflow: 'hidden',
  height: '100vh',
})

export const prxLayer = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  willChange: 'transform',
})
