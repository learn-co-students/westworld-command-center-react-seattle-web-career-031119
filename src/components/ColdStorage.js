import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react'
import HostList from './HostList'


class ColdStorage extends Component {

  filterHosts = (hosts) => {
    let newHosts = hosts.filter(host => {
      if (!host.active) {
        return host
      }
    })
    return newHosts
  }

  render() {
    return(
      <Segment.Group className="HQComps">

        <Segment compact>
          <h3 className="labels">ColdStorage</h3>
        </Segment>
        <Segment compact>

          <HostList
            hosts={this.filterHosts(this.props.hosts)}
            handleSelected={this.props.handleSelected}
            selected={this.props.selected}
          />

        </Segment>
      </Segment.Group>
    )
  }
}

export default ColdStorage
