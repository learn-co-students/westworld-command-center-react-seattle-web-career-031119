import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'
import Details from './Details'


class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>

        <ColdStorage hosts={this.props.hosts} selectedHost={this.props.selectedHost} hostClick={this.props.hostClick}/>

        </Grid.Column>
        <Grid.Column width={5}>
          <Details selectedHost={this.props.selectedHost}
                   areas={this.props.areas}
                   editHost={this.props.editHost}
                   allHosts={this.props.allHosts}
                   addLog={this.props.addLog}/>
        </Grid.Column>
        <Grid.Column width={3}>

        <LogPanel activateAll={this.props.activateAll} logs={this.props.logs} />

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
