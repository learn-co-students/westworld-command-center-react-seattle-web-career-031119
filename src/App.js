import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
import { Log } from './services/Log'

class App extends Component {
  constructor() {
    super()
    this.state = {
      hosts: [],
      areas: [],
      selected: {},
      log: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/hosts')
    .then(res => res.json())
    .then(hosts => {this.setState({hosts})
    })

    fetch('http://localhost:4000/areas')
    .then(res => res.json())
    .then(areas => this.setState({areas}))
  }

  handleSelected = (selected) =>  {
    this.setState({selected})
  }

  cleanName = (areaName) => {
    let ar = areaName.split('_')
    ar = ar.map(string => string.charAt(0).toUpperCase() + string.slice(1))
    return ar.join(' ')
  }

  editSelected = (selected, attr) => {

    if(('area' in attr) && (this.checkAreaFull(attr.area))) {
      return
    }

    let selectedCopy = {
      ...this.state.selected,
      ...attr
    }

    let hostsCopy = [...this.state.hosts].map(host => {
      return (host.id === selectedCopy.id) ? selectedCopy : host
    })

    if ('area' in attr) {
      this.addLog('notify', `${selectedCopy.firstName} set in area ${this.cleanName(selectedCopy.area)}`)
    } else if ('active' in attr) {
      if (selectedCopy.active) {
        this.addLog('warn', `Activated ${selectedCopy.firstName}`)
      } else {
        this.addLog('notify', `Decommissioned ${selectedCopy.firstName}`)
      }
    }

    this.setState({
      selected: selectedCopy,
      hosts: hostsCopy,
    })
  }

  toggleAll = (active) => {
    let hostsCopy = [...this.state.hosts]
    hostsCopy.forEach(host => host.active = active)

    if (active) {
      this.addLog('warn', 'Activating all hosts!')
    } else {
      this.addLog('notify', 'Decommissiong all hosts.')
    }

    this.setState({
      hosts: hostsCopy,
    })
  }

  checkAreaFull = (area) => {
    let count = 1
    this.state.hosts.map(host => {
      if (host.area === area) {
        count += 1
      }
    })

    let areaOb = this.state.areas.find(a => a.name === area)
    let isFull = false
    if (areaOb.limit < count) {
      isFull = true
      this.addLog('error', `Too many hosts. Cannot add ${this.state.selected.firstName} to ${this.cleanName(area)}`)
    }
    return isFull
  }

  addLog = (type, data) => {
    let newLog = Log[type](data)
    this.setState({
      log: [newLog, ...this.state.log]
    })
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap
          hosts={this.state.hosts}
          areas={this.state.areas}
          selected={this.state.selected}
          handleSelected={this.handleSelected}
          cleanName={this.cleanName}
        />
        <Headquarters
          hosts={this.state.hosts}
          areas={this.state.areas}
          handleSelected={this.handleSelected}
          selected={this.state.selected}
          cleanName={this.cleanName}
          editSelected={this.editSelected}
          toggleAll={this.toggleAll}
          log={this.state.log}
        />
      </Segment>
    )
  }
}

export default App;
