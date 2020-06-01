import React from 'react'
import './App.css'
import NavigationBar from "./NavigationBar"
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./Home"
import World from "./World"
import Politics from "./Politics"
import Business from "./Business"
import Technology from "./Technology"
import Sports from "./Sports"
import DetailedArticle from "./DetailedArticle"
import BookMark from "./BookMark"
import { BrowserRouter, 
  Route, 
  Switch } from 'react-router-dom';
import SearchResults from "./SearchResults"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      checked: this.readlocalStorage(),
      hide: false
    }
    this.hideSwitch = this.hideSwitch.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  readlocalStorage() {
    if (localStorage.getItem('selected')) {
        return localStorage.getItem('selected') === 'true'
    }
    else{
      localStorage.setItem('selected',"true")
      return localStorage.getItem('selected') === 'true'
    }
  }

  hideSwitch=(value) => {
    console.log(value);
    this.setState({hide:value});
    localStorage.setItem("hide", value)
  }
  handleCheck = (value) => {
    console.log(value)
    this.setState({checked:value});
  }

  render() {
  return (
    <div className="App">
      <BrowserRouter>

          <NavigationBar checkValue = {this.handleCheck} hide={this.state.hide}/>
          <Switch>
            <Route exact path="/" ><Home vals={this.hideSwitch}/></Route>
            <Route exact path="/World"> <World vals={this.hideSwitch} /> </Route>
            <Route exact path="/Politics"> <Politics vals={this.hideSwitch} /> </Route>
            <Route exact path="/Business"> <Business vals={this.hideSwitch} /> </Route>
            <Route exact path="/Technology"> <Technology vals={this.hideSwitch} /> </Route>
            <Route exact path="/Sports"> <Sports vals={this.hideSwitch}/> </Route>
            <Route exact path="/DetailedArticle"><DetailedArticle /></Route>
            <Route exact path= "/BookMark" vals={this.hideSwitch}><BookMark /></Route>
            <Route exact path = "/SearchResults" vals={this.hideSwitch}><SearchResults /></Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
  }
}

export default App;
