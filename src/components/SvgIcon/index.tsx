import React from 'react'
import './svg.scss'

interface Props {
  svgClass?: string
  svgName: string
}

const SvgIcon = (props: Props) => {
  return (
    <svg className={props.svgClass + ' svg'} aria-hidden="true" v-on="$listeners">
      <use xlinkHref={'#icon-' + props.svgName} />
    </svg>
  )
}
export default SvgIcon
