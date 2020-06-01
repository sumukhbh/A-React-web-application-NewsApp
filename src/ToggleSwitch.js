import React from "react"
import Switch from "react-switch"

class ToggleSwitch extends React.Component {
    constructor() {
        super();
        this.state = { checked: true };
        this.handleChange = this.handleChange.bind(this);
      }

     
      handleChange(checked) {
        console.log(checked)
        this.setState({ checked })
        console.log('Inside Handle' + this.state.checked)
        if(checked){
          // localStorage.setItem('selected','guardian');
          this.props.updateSelectedSwitch(true)
        }
        else{
          // localStorage.setItem('selected', 'NYtimes');
          this.props.updateSelectedSwitch(false)
         
        }
      }
     
      render() {
        console.log(this.state.checked)
        return (
          <React.Fragment>
            <Switch
             onChange={this.handleChange} 
             checked={localStorage.getItem('selected') === 'true'} 
             checkedIcon={false} 
             uncheckedIcon = {false}
             height = {20}
             width = {40}
             onColor= "#2693e6"/>
          </React.Fragment>
        );
      }
    }

export default ToggleSwitch