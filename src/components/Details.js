import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'


const Details = (props) => {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  const isEmpty = (obj) => {
    for(var key in obj) {
       if(obj.hasOwnProperty(key))
           return false;
   }
   return true;
   //https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
 }

  const renderSomething = () => (<Image size='medium' src={Images.westworldLogo}/>)

  return(
    <Segment id="details" className="HQComps">
      {
        (isEmpty(props.selected))
        ? renderSomething()
        : <HostInfo host={props.selected} areas={props.areas}
          cleanName={props.cleanName} editSelected={props.editSelected}/>
      }
    </Segment>
  )
}

export default Details
