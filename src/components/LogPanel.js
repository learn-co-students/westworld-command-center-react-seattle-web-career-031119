import React, {Component} from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'


class LogPanel extends Component {
  constructor() {
    super()
    this.state={
      active: false
    }
  }

  handleActivate = (ev) => {
    this.setState({
      active: !this.state.active
    }, () => this.props.toggleAll(this.state.active))
  }

  render() {
    return(
      <Segment className="HQComps" id="logPanel">
        <pre>
          {this.props.log.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
        </pre>

        <Button onClick={this.handleActivate}
          fluid
          color={(this.state.active) ? "red" : "green" }
          content={(this.state.active) ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
        />
      </Segment>
    )
  }
}

export default LogPanel
