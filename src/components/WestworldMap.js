import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


const WestworldMap = props => {

  return (
    <Segment id="map" >
      {props.areas.map(area => <Area key={area.id}
                                     area={area}
                                     hosts={props.hosts}
                                     selectedHost={props.selectedHost}
                                     hostClick={props.hostClick}/>)}
    </Segment>
  )
}

export default WestworldMap
