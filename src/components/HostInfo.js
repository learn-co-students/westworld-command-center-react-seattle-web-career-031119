import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentHostId: -1,
      active: this.props.host.active
    }
  }

  static getDerivedStateFromProps(props, state){

    if(props.host.id !== state.currentHostId) {
      return {
        currentHostId: props.host.id,
        options: props.areas.map(area => {
          return {key: area.name,
                  text: area.name.split("_").map(name => name.charAt(0).toUpperCase()+name.slice(1)).join(" "),
                  value: area.name
                }
          }),
        value: props.host.area,
        active: props.host.active
      }
    }
    return null

  }

  formatName(area){
    return area.name.split("_").map(name => name.charAt(0).toUpperCase()+name.slice(1)).join(" ")
  }

  handleChange = (ev, {value}) => {
    const hostsInArea = this.props.allHosts.filter(host => host.area === value)
    const area = this.props.areas.find(area => area.name === value)
    if(hostsInArea.length < area.limit){
      this.props.addLog('notify', `${this.props.host.firstName} set in area ${this.formatName(area)}`)
      this.setState({value: value})
      this.props.editHost({
        ...this.props.host,
        active: this.state.active,
        area: value
      })
    } else {
      this.props.addLog('error', `Too many hosts. Cannot add ${this.props.host.firstName} to ${this.formatName(area)}`)
    }
  }

  toggle = (ev, data) => {
    this.state.active ? this.props.addLog('notify', `Decomissioned ${this.props.host.firstName}`) :
                        this.props.addLog('warn', `Activated ${this.props.host.firstName}`)
    this.setState({active: data.checked})
    this.props.editHost({
      ...this.props.host,
      active: data.checked,
      area: this.state.value
    })
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={ this.props.host.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.host.firstName + " " + this.props.host.lastName} |
                { this.props.host.gender === "male" ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={this.state.active ? "Active" : "Decomissioned"}
                  checked={this.state.active}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.state.value}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
