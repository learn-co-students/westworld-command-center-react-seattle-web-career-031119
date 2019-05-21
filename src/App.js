import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestWorldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
import { Log } from './services/Log'

const API_URL = 'http://localhost:3000/'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      hosts: [],
      areas: [],
      selectedHost: {},
      logs: []
    }

    fetch(API_URL + 'hosts')
    .then(res => res.json())
    .then(hosts => this.setState({hosts}))

    fetch(API_URL + 'areas')
    .then(res => res.json())
    .then(areas => this.setState({areas}))

    this.selectHost = this.selectHost.bind(this)
    this.editHost = this.editHost.bind(this)
    this.activateAll = this.activateAll.bind(this)
    this.addLog = this.addLog.bind(this)
  }

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.

  selectHost(selectedHost){
    this.setState({selectedHost})
  }

  decomissionedHosts(){
    return this.state.hosts.filter(host => host.active === false)
  }

  activeHosts(){
    return this.state.hosts.filter(host => host.active === true)
  }

  editHost(alteredHost){
    const editedHosts = this.state.hosts.map(host => {
      if(host.id === alteredHost.id){
        return alteredHost
      }
      return host
    })
    this.setState({hosts: editedHosts})
  }

  activateAll(){
    console.log("GO")
    const hostsActive = this.state.hosts.map(host => {
      return {...host, active: true}
    })
    this.setState({hosts: hostsActive})
    this.addLog('warn', "Activating all hosts!")
  }

  addLog(style, text){
    //styles are warn, notify, and error
    this.setState({logs: [...this.state.logs, Log[style](text)]})
  }

  render(){
    return (
      <Segment id='app'>
        <WestWorldMap
          areas={this.state.areas}
          hosts={this.activeHosts()}
          selectedHost={this.state.selectedHost}
          hostClick={this.selectHost}/>
        <Headquarters hosts={this.decomissionedHosts()}
          allHosts={this.state.hosts}
          selectedHost={this.state.selectedHost}
          hostClick={this.selectHost}
          areas={this.state.areas}
          editHost={this.editHost}
          activateAll={this.activateAll}
          logs={this.state.logs}
          addLog={this.addLog}/>
      </Segment>
    )
  }
}

export default App;
