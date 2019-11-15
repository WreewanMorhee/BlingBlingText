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
          `<span style="display: inline-block">${word}</span>`
      )
      .join("")

    if (loop_mode) {
      set_infinite_energy()
    } else {
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

    const css_data = set_style(true)
    Array.from(element.children).forEach((element, index) => {
      // TweenLite.to(element, 0.2, {
      //   ease: Bounce.easeInOut,
      //   css: {
      //     transform: "translateX(50px) rotate(30deg)",
      //     color: 'red'
      //   },
      //   // css_data,
      //   delay: index * energy / 10000,
      // })
      TweenLite.to(element, 0.2, {
        css: {
          x: "translateX(50px)",
          color: 'red'
        },
        delay: index * energy / 10000,
      })
    })

    setTimeout(() => {
      const css_data = set_style(false)
      Array.from(element.children).forEach((element, index, array) => {
      console.warn(css_data, 'css_data')
        // TweenLite.to(element, 0.2, {
        //   ease: Bounce.easeInOut,
        //   css: {
        //     transform: "translateX(50px) rotate(30deg)",
        //     color: ''
        //   },
        //   // css_data,
        //   delay: index * energy / 10000,
        // })
        TweenLite.to(element, 0.2, {
          css: {
            x: "",
            color: ''
          },
          delay: index * energy / 10000,
        })

        if (array.length === index + 1) {
          set_can_turn_on(true)
        }
      })
    }, 2000)
  }
}))

const logicBox4 = withHandlers(() => ({
  set_style: ({current_config}) => (is_current) => {
    let css_data = {}

    Object.keys(current_config).forEach((style_key) => {
      if (is_current) {
        css_data[style_key] = current_config[style_key]
      } else {
        css_data[style_key] = ''
      }
    })

    return css_data
  }
}))


const stateBox1 = withState('can_turn_on', 'set_can_turn_on', true)

import React, { useEffect } from 'react'
import { TimelineMax, TweenLite, Power0, Bounce } from 'gsap'
import { compose, withHandlers, withState, mapProps } from 'recompose'

export default compose(
  mapProps(
    ({
      element,
      event_type,
      energy,
      capacity,
      loop_interval,
      current_config
    }) => ({
      element,
      event_type: event_type === 'hover' ? 'mouseenter' : event_type,
      energy,
      capacity,
      loop_interval,
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
