import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const inArea = (hosts, area) => {
  let hostsInArea = hosts.filter(host => {
    if ((host.area === area.name) && (host.active)){
      return host
    }
  })
  return hostsInArea
}

const Area = (props) => (

  <div className='area' id={props.area.name}>
    <h3 className='labels'>{props.cleanName(props.area.name)}</h3>

    <HostList hosts={inArea(props.hosts, props.area)} handleSelected={props.handleSelected}
      selected={props.selected}/>

  </div>

)

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
