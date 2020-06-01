import React from "react"
import Share from "./Share"
import {MdShare} from "react-icons/md"


class ShareModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.Close =  this.Close.bind(this)
    }
    handleClick() {
        this.setState({show:!this.state.show})
     }
    
    Close() {
        this.setState({show:!this.state.show})
    
    }
    render(){
        console.log(this.props.url)
        return(
            <span>
            <MdShare onClick={() => {this.handleClick()}}></MdShare> 
            <Share select={this.state.show} hide={() => this.Close()} title={this.props.title} url={this.props.url}/>
            </span>
        )
    }


}


export default ShareModal