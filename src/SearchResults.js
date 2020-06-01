import React from "react"
import { withRouter } from "react-router-dom"
import Spinner from "./Spinner"
import ShareModal from "./ShareModal"
import {Card} from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { Badge } from 'react-bootstrap'

class SearchResults extends React.Component {
    constructor() {
        super()
        this.state = {
            Loading: true,
            articlesList: [],
            artList: [],
            articleId: ""

        }
        this.Clicker = this.Clicker.bind(this)
    }

    componentDidMount() {
        var artret = window.location.search.substring(4,window.location.search.length)
        console.log(artret)
        this.setState({articleId: artret})
        console.log(this.state.articleId)
        if (localStorage.getItem('selected') === "true"){
        fetch("https://hw8-backend.azurewebsites.net/guardiansearch?id="+artret).then(response => response.json())
        .then(response => {
            const articles = response.result
            console.log(articles)
         this.setState({articlesList:articles, Loading:false })
        })
    }
    else{

        fetch("https://hw8-backend.azurewebsites.net/NYtimessearch?id="+artret).then(response => response.json())
        .then(response => {
            const articles = response.result
            console.log(articles)
         this.setState({artList: articles, Loading:false })
        })
      }
    }

      rerender(nextProps) {
      var artret = nextProps.location.search.substring(4,nextProps.location.search.length)
      console.log(artret)
      this.setState({articleId: artret})
      console.log(this.state.articleId)
      if (localStorage.getItem('selected') === "true"){
      fetch("https://hw8-backend.azurewebsites.net/guardiansearch?id="+artret).then(response => response.json())
      .then(response => {
          const articles = response.result
          console.log(articles)
       this.setState({articlesList:articles, Loading:false })
      })
    }
    else {
      fetch("https://hw8-backend.azurewebsites.net/NYtimessearch?id="+artret).then(response => response.json())
      .then(response => {
          const articles = response.result
          console.log(articles)
       this.setState({artList: articles, Loading:false })
      })
    }
    }

    
    componentWillReceiveProps(nextProps,nextContext)
    {
        var query = nextProps.location.search.substring(4,nextProps.location.search.length);
        if(query!=this.state.articleId)
        {
            this.rerender(nextProps);
        }
    }

    handleClick(event) {
        event.stopPropagation()
        event.preventDefault()
    }
     
      Clicker(event,val) {
        localStorage.setItem("searchkey", true)
        localStorage.setItem("filled", false)
        this.props.history.push({pathname:"/DetailedArticle",search:"id=" + val})
       }

      displayItem(props) {
        return(
            <Col style={{paddingLeft:"0.5%",paddingBottom:"1%"}}>
            <Card onClick={(event) => this.Clicker(event,props.id)} style={{boxShadow:'0px 0px 12px #333',marginTop:'2%',width:'99%',cursor:'pointer'}}>
            <Card.Title style={{fontSize:"100%",fontStyle:'italic',paddingTop:"2%", paddingLeft:"6%",paddingRight:"6%"}}>
                  {props.title} <span onClick={this.handleClick}><ShareModal title={props.title} url={props.url} /> </span>
            </Card.Title>
            <Card.Body style={{marginTop:'-1.75%'}}>

                <Card.Img src={props.imageURL} alt="" height="auto" width="auto" style={{objectFit:'cover',padding:
                    '1%', border:'solid 0.5px lightgray',float:'left', marginTop:"-4%"}}/>
                <span style={{float:'left', fontStyle:'italic',marginTop:"2%"}}>{props.date}</span>
                <Card.Text style={{marginTop:"5%"}}>
                <span style={{float:'right',marginTop:"3%"}}> {HandleBadge(props.sectionId)} </span>
                </Card.Text>
                </Card.Body>
                </Card>
            </Col>
            
             

        )

    }

    render()
    { 
            if(this.state.articlesList.length > 0 || this.state.artList.length > 0) {
                if(localStorage.getItem('selected') === 'true'){
            
                    return (
                          <div>
                          <div style={{float:'left',fontSize:"190%",marginLeft:"2%"}}> Results </div>
                         <Container fluid={true} style={{marginLeft:"1%", clear:'both'}} className= "Search-Page">
                         <Row xl={4} xs={1} lg={4} md={4}>
                        {this.state.articlesList.map(item => this.displayItem(item))}
                        </Row>
                         </Container>
    
                         </div>
                        )
                }
                else{
                    return(
                    <div>
                    <div style={{float:'left',fontSize:"190%",marginLeft:"2%"}}> Results </div>
                   <Container fluid={true} style={{marginLeft:"1%", clear:'both'}}>
                   <Row xl={4} xs={1} lg={4} md={4}>
                       {this.state.artList.map(item => this.displayItem(item))}
                    </Row>
                   </Container>
                   </div>
                  )
            }
        }
        else{
            return(<Spinner />)
        }
    }
}

function HandleBadge(secname) {
    let color = ""
    let backColor = ""
    console.log(secname)

    if (secname === "world"){
        color = "#7C4EFF"
        backColor = "white"
        secname = "WORLD"
     }
    else if (secname === "politics") {
        color = "#419488"
        backColor = "white"
        secname = "POLITICS"
    }
    else if (secname === "business") {
        color = "#5EA4EE"
        backColor = "white"
        secname = "BUSINESS"
    }

    else if (secname === "technology") {
        color = "#CCCC00"
        backColor  = "black"
        secname = "TECHNOLOGY"
    }

    else if (secname === "sport" || secname=== "sports") {
        color = "#FF9930"
        backColor = "black"
        secname = "SPORTS"

    }
    else {
        color = "#6E757C"
        backColor = "white"
        secname = secname.toUpperCase()
     }
    

    return(
        <Badge style={{color:backColor, backgroundColor:color}}> {secname} </Badge>
    )

}

export default withRouter(SearchResults)