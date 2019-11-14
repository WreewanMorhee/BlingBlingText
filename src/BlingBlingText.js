const BlingBlingText = ({set_span_to_text}) => {
  useEffect(() => {
    set_span_to_text()
  }, [])

  return null
}


const logicBox1 = withHandlers(() => ({
  set_span_to_text: ({
    element,
    loop_mode,
    set_infinite_energy,
    event_type,
    turn_on_current
  }) => () => {
    element.innerHTML = element.textContent
      .split("")
      .map(
        word =>
          `<span style="transition: .2s linear; display: inline-block">${word}</span>`
      )
      .join("")

    if (loop_mode) {
      set_infinite_energy()
    } else {
      console.warn(element, event_type, 'asdfasd')
      element.addEventListener(event_type, turn_on_current)
    }
  }
}))

const logicBox2 = withHandlers(() => ({
  set_infinite_energy: ({turn_on_current, loop_interval}) => () => {
    setInterval(turn_on_current, loop_interval)
  }
}))

const logicBox3 = withHandlers(() => ({
  turn_on_current: ({can_turn_on, element, set_style, energy, capacity, set_can_turn_on}) => () => {
    if (!can_turn_on) return

    set_can_turn_on(false)
    Array.from(element.children).forEach((element, index) => {
      setTimeout(() => {
        set_style(element, true)
      }, index * energy)
    })

    setTimeout(() => {
      Array.from(element.children).forEach((element, index, array) => {
        setTimeout(() => {
          set_style(element, false)

          if (array.length === index + 1) {
            set_can_turn_on(true)
          }
        }, index * energy)
      })
    }, capacity)
  }
}))

const logicBox4 = withHandlers(() => ({
  set_style: ({current_config}) => (element, is_current) => {
    Object.keys(current_config).forEach((style_key) => {
      if (is_current) {
        element.style[style_key] = current_config[style_key]
      } else {
        element.style[style_key] = ''
      }
    })
  }
}))


const stateBox1 = withState('can_turn_on', 'set_can_turn_on', true)

import React, { useEffect } from 'react'
import { compose, withHandlers, withState, mapProps } from 'recompose'
// import { Power0, TimelineMax } from 'gsap'

export default compose(
  mapProps(
    ({
      element,
      event_type,
      energy,
      capacity,
      loopInterval,
      current_config
    }) => ({
      element,
      event_type: event_type === 'hover' ? 'mouseenter' : event_type,
      energy: 100000 / energy,
      capacity,
      loopInterval,
      loop_mode: !event_type,
      current_config
    })
  ),
  stateBox1,
  logicBox4,
  logicBox3,
  logicBox2,
  logicBox1,
)(BlingBlingText)
