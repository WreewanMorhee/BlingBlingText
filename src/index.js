const App = ({className, ...props}) => {
  console.warn(className, 'className')
  const comp_list = Array.from(document.querySelectorAll(className))

  return (
    <>
      {
        comp_list.map((ele, index) => (
          <BlingBlingText
            key={`index-${index + 1}`}
            element={ele}
            {...props}
          />
        ))
      }
    </>
  )
}

import React from 'react'
import ReactDOM from 'react-dom'
import BlingBlingText from './BlingBlingText'

export const init = props => {
  const container = document.createElement("DIV")
  // container.id = "bling-bling-text"
  document.body.appendChild(container)
// document.getElementById('bling-bling-text')

  ReactDOM.render(<App {...props} />, container)
}
