import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import AsyncSelect from 'react-select/async'
import {FaRegBookmark} from 'react-icons/fa'
import ToggleSwitch from './ToggleSwitch'
import {withRouter} from "react-router-dom"
import {Link, NavLink} from "react-router-dom"
import { NavItem } from "react-bootstrap"
import ReactTooltip from "react-tooltip"
import {FaBookmark} from "react-icons/fa"
import _ from "lodash"
import axios from "axios"
class NavigationBar extends React.Component {
   constructor(){
     super()
     this.state = {
       selected : true,
       hidden: false,
       searchvalue: ""
     }
     this.handleCheck = this.handleCheck.bind(this);
     this.updateSelectedSwitch = this.updateSelectedSwitch.bind(this)
     this.Searcher = this.Searcher.bind(this)
   }

   handleCheck(check){
     this.props.checkValue(check);
   }
   displaySwitch(){
     console.log("hide:", this.props.hide);
     if(localStorage.getItem('hide') === "false"){
       return (
        <React.Fragment>
        <NavItem style={{marginRight:'1.5%',color:"whitesmoke"}}>NYTimes</NavItem>
        <ToggleSwitch updateSelectedSwitch={this.updateSelectedSwitch}/>
        <NavItem style={{marginLeft:'1%',color:"whitesmoke"}}>Guardian</NavItem>
        </React.Fragment>
       )
     }
   }

   componentDidMount() {
     console.log("In Mount")
     localStorage.setItem("searchkey",false)
     localStorage.setItem('filled', false)
    }

    componentWillReceiveProps() {
      if (localStorage.getItem("searchkey") === "true"){
        this.setState({searchvalue: ""})
      }

    }
   

   updateSelectedSwitch(val){
     console.log(val)
     this.setState({selected: val})
     localStorage.setItem('selected',val)
     this.handleCheck(val);
    }

    HandleBookmark() {
      localStorage.setItem('hide', true);
      this.setState({filled:true})
      this.props.history.push({pathname:"/BookMark"})
    }
     
    handleSearchChange(query,callback) 
    {
       
          axios.get(
            `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${query}`,
            {
              headers: {
                "Ocp-Apim-Subscription-Key": "e075690357ef4b5ea9f84303a5e99939"
              }
            })
            .then(function(response){
             var data= response.data.suggestionGroups[0].searchSuggestions;
             let options= data.map(function(result){
               return{
                 value:result.url,
                 label:result.displayText
               }
             })
             callback(options)
            })
    }

    Searcher(searchvalue) {
      localStorage.setItem('hide', true)
      this.setState({searchvalue})
      localStorage.setItem("searchkey", false)
      localStorage.setItem("filled", false)
      this.props.history.push({pathname:"/SearchResults", search:"id=" + searchvalue.label})
    }
    render(){
      const style = {
        control: base => ({
          ...base,
          border: 0,
          boxShadow: "none"
        })
      };
    
      var filledbookmark = ""
      if(localStorage.getItem('filled') == 'false') {
        filledbookmark = <div style={{color:'whitesmoke'}}>
        <FaRegBookmark data-tip="Bookmark" data-place="bottom" onClick={() => this.HandleBookmark()} />
        <ReactTooltip/>
      </div>
     }
     else {
      filledbookmark = <div style={{color:'whitesmoke'}}>
      <FaBookmark data-tip="Bookmark" data-place="bottom" />
    </div>

     }
        return(
            <Navbar collapseOnSelect bg='dark' expand="lg" variant="dark" className="nav-name">
            <AsyncSelect styles={style} className="nav-search"
              cacheOptions={true}
              loadOptions = {_.debounce((query,callback) => this.handleSearchChange(query,callback), 1000, {
              leading: true
              })}
              placeholder= "Enter keyword .." onChange={this.Searcher}
              value = {this.state.searchvalue}/>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" defaultActiveKey="/">
                <Nav.Link as={NavLink} exact to="/" onClick={()=> {this.setState({hidden:false});localStorage.setItem('hide', false);localStorage.setItem('searchkey', true);localStorage.setItem('filled', false);}} href="/" activeStyle={{color:"white"}} style={{color:"lightgray"}}>Home</Nav.Link>
                <Nav.Link as={NavLink} to="/World" onClick={()=> {this.setState({hidden:false}); localStorage.setItem('searchkey', true);localStorage.setItem("filled", false);}} href="/World" activeStyle={{color:"white"}} style={{color:"lightgray"}}>World</Nav.Link>
                <Nav.Link as={NavLink} to="/Politics" href="/Politics" onClick={()=> {this.setState({hidden:false});localStorage.setItem('searchkey', true);localStorage.setItem("filled", false);}} activeStyle={{color:"white"}} style={{color:"lightgray"}}>Politics</Nav.Link>
                <Nav.Link as={NavLink} to="/Business" href="/Business" onClick={()=> {this.setState({hidden:false});localStorage.setItem('searchkey', true);localStorage.setItem("filled", false);}} activeStyle={{color:"white"}} style={{color:"lightgray"}}>Business</Nav.Link>
                <Nav.Link as={NavLink} to="/Technology" href="/Technology"onClick={()=> {this.setState({hidden:false});localStorage.setItem('searchkey', true);localStorage.setItem("filled", false);}} activeStyle={{color:"white"}} style={{color:"lightgray"}}>Technology</Nav.Link>
                <Nav.Link as={NavLink} to="/Sports" href="/Sports" onClick={()=> {this.setState({hidden:false});localStorage.setItem('searchkey', true);localStorage.setItem("filled", false);}}activeStyle={{color:"white"}} style={{color:"lightgray"}}>Sports</Nav.Link>
              </Nav> 
                <Nav.Link as={NavLink} to="/BookMark" href="/BookMark" onClick={() =>{this.setState({searchvalue:""});localStorage.setItem("filled", true)}} activeStyle={{Color:"white"}} style={{paddingLeft:0}}>
                      {filledbookmark}
                </Nav.Link>
                  {
                    this.displaySwitch()
                  }
            </Navbar.Collapse>
          </Navbar>
        )

    }
}

export default withRouter(NavigationBar)