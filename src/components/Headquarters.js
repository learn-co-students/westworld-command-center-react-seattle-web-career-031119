import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'

class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.


  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>

        <ColdStorage
          hosts={this.props.hosts}
          handleSelected={this.props.handleSelected}
          selected={this.props.selected}
        />

        </Grid.Column>
        <Grid.Column width={5}>
          <Details
            selected={this.props.selected}
            areas={this.props.areas}
            cleanName={this.props.cleanName}
            editSelected={this.props.editSelected}
          />
        </Grid.Column>
        <Grid.Column width={3}>

          <LogPanel toggleAll={this.props.toggleAll} log={this.props.log}/>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
