import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'

class WestworldMap extends Component {

  render() {
    return (
      <Segment id="map" >
        {this.props.areas.map(area => {
          return <Area key={area.id} area={area} cleanName={this.props.cleanName}
          hosts={this.props.hosts} handleSelected={this.props.handleSelected}
          selected={this.props.selected}/>
        })}
      </Segment>
    )
  }
}

export default WestworldMap
