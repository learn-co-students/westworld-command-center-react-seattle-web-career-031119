import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = (props) => {

  return(
    <Card.Group itemsPerRow={6}>
      {props.hosts.map(host => <Host selectedHost={props.selectedHost} key={host.id} host={host}  hostClick={props.hostClick}/>)}
    </Card.Group>
  )
}

export default HostList
