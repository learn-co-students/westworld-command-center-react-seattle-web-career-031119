import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  const selectedClass = () => {
    return (props.selected === props.host) ? "host selected" : "host"
  }

  return(
    <Card
      className= {selectedClass()}

      onClick={() => props.handleSelected(props.host)}
      image={props.host.imageUrl}
      raised
    />
  )
}

export default Host
