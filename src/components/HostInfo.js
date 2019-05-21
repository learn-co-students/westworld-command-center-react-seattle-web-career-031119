import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  constructor(props) {
    super(props)

    let areas = props.areas.map(area => {
      return {key: area.name, text: this.props.cleanName(area.name), value: area.name}
    })

    this.state = {
      options: areas,
      value: props.host.area
    }
  }

  handleChange = (e, {value}) => {
    this.setState({value})
    this.props.editSelected(this.props.host, {area: value})
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }

  toggle = (ev) => {
    console.log("The radio button fired");
    let boo = true
    if (this.props.host.active) {
      boo = false
    }
    this.props.editSelected(this.props.host, {active: boo})
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.host.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.host.firstName} | { (this.props.host.gender === 'Male')? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={(this.props.host.active) ? "Active" : "Decommissioned"}
                  checked={(this.props.host.active)}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.host.area}
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
