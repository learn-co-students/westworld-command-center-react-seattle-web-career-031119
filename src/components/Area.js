import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = ({area, hosts, selectedHost, hostClick}) => (

  <div className='area' id={area.name}>
    <h3 className='labels'>{area.name.split("_").map(name => name.charAt(0).toUpperCase()+name.slice(1)).join(" ")}</h3>
    <HostList hosts={hosts.filter(host => host.area === area.name)}
              selectedHost={selectedHost}
              hostClick={hostClick}/>
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
