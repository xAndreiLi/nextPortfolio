import * as React from "react"
import { SVGProps, Ref, forwardRef } from "react"

const BodySvg = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width={1440}
    height={1748}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="m455.957 9.52 533.138 6.037C1169.38 17.599 1305.67 179.456 1277 357.456l-3.8 23.576a1005.053 1005.053 0 0 0 25.84 435.794l84.17 294.754c90.29 316.2-147.14 630.92-475.976 630.92H531.88c-328.573 0-565.962-314.25-476.149-630.31l84.623-297.787a1005.017 1005.017 0 0 0 26.061-430.919l-5.213-33.132C132.826 170.011 273.409 7.452 455.957 9.519Z"
      stroke="#fff"
      strokeWidth={10}
    />
    <path
      d="M543 1112.09h-68v-65.59h490v65.59h-79.066l-.551.13a762.99 762.99 0 0 1-333.213 1.76l-8.104-1.77-.527-.12H543Z"
      stroke="#fff"
      strokeWidth={10}
    />
    <circle cx="652" cy="1080" r="8" fill="#fff" strokeWidth={5} />
    <circle cx="679" cy="1080" r="8" fill="#fff" strokeWidth={5} />
    <circle cx="707" cy="1080" r="8" fill="#fff" strokeWidth={5} />
    <circle cx="734" cy="1080" r="8" fill="#fff" strokeWidth={5} />
    <circle cx="762" cy="1080" r="8" fill="#fff" strokeWidth={5} />
    <circle cx="789" cy="1080" r="8" fill="#fff" strokeWidth={5} />
  </svg>
)

const ForwardRef = forwardRef(BodySvg)
export default ForwardRef
