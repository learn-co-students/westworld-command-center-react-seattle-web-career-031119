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

  dummyLogs = () => {
    // This is just to show you how this should work. But where should the log data actually get stored?
    // And where should we be creating logs in the first place?
    // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
    // Just remember to import it

    let logs = []

    logs.unshift(Log.warn("This is an example of a warn log"))
    logs.unshift(Log.notify("This is an example of a notify log"))
    logs.unshift(Log.error("This is an example of an error log"))

    return logs
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

        // {/* Button below is the Activate All/Decommisssion All button */}
        <Button onClick={this.handleActivate}
          fluid
          color={(this.state.active) ? "red" : "green" }
          // {/* This isn't always going to be the same color...*/}
          content={(this.state.active) ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
          // {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
        />
      </Segment>
    )
  }
}

export default LogPanel
