import React from "react"
import { withRouter } from "react-router-dom"
import {Card,Badge,Container,Row,Col} from 'react-bootstrap'
import TextTruncate from "react-text-truncate"
import Spinner from "./Spinner"
import ShareModal from "./ShareModal"


class Home extends React.Component {
     constructor() {
        super()
        this.state = {
            Loading :true,
            article_list: [],
            art_list: [],
            clicked: false
        }
        this.Clicker = this.Clicker.bind(this)
    }


    componentDidMount() {
        console.log('HOME :');
        this.props.vals(false)
        fetch("https://hw8-backend.azurewebsites.net/guardianhome").then(response => response.json())
        .then(response => {
            const articles = response.result
            console.log(articles)
            this.setState({ article_list: articles, Loading:false })
        })
    
   
        fetch("https://hw8-backend.azurewebsites.net/NYtimeshome").then(response => response.json())
        .then(response => {
            const articles = response.result
            console.log(articles)
            this.setState({ art_list: articles, Loading:false })
        })


    }

    hideSwitch() {
        this.props.vals(true)
        console.log("hide switch")
    }
        
    Clicker(event,val) {
        this.hideSwitch()
        localStorage.setItem("filled", false)
        if (localStorage.getItem('selected') === "true") {
            this.props.history.push({pathname:"/DetailedArticle",search:"id=" + val})
        }
        else{
            this.props.history.push({pathname:"/DetailedArticle",search:"id=" + val})
        }
    
    }

    handleClick(event) {
        event.stopPropagation()
        event.preventDefault()
    }

    displayItem(props) {
        return(
            <Container fluid={true}>
            <Card onClick={(event) => this.Clicker(event,props.id)} style={{boxShadow:'0px 0px 12px #333', marginTop:'2%',cursor:'pointer'}}>
            <Row>
            <Card.Body>
                <Col xl={3} xs={12} lg={3} md={3} sm={3}>
                <Card.Img src={props.imageURL} alt="" height="auto" width="auto" style={{objectFit:'cover',padding:
                '1%', border:'solid 0.5px lightgray',float:'left'}}/>
                </Col>
                <Col xl={9} xs={12} lg={9} sm={9} md={9} style={{float:'right'}}>
                        <Card.Title style={{fontweight:'bold',fontStyle:'italic'}}>
                        {props.title} <span onClick={this.handleClick}><ShareModal title={props.title} url={props.url} /> </span>
                        </Card.Title>
                        <TextTruncate style={{fontSize:"98%"}} line={3} text={props.description}/>
                        <Card.Text style={{marginTop:"2%"}}>
                            <span style={{fontWeight:'550',fontStyle:'italic'}}>{props.date}</span>
                            <span style={{float:'right'}}>{HandleBadge(props.sectionId)}</span>
                        </Card.Text>
                 </Col>
            </Card.Body>
            </Row>
             </Card>
            </Container>
        )
    
    }
    render() {
    console.log("Source ", localStorage.getItem('selected'));
    if(this.state.article_list.length>0){
            if (localStorage.getItem('selected') === 'true') {
                return(
                       <div style={{marginBottom:"3%"}}>
                        {this.state.article_list.map(item => this.displayItem(item))}
                       </div>
                        )
                    }
            else {
                    return(
                        <div style={{marginBottom:"3%"}}>
                        {this.state.art_list.map(item => this.displayItem(item))}
                        </div>
                    )
                }
            }
    else{
        return(
            <Spinner />)
        }
    }
}


    function HandleBadge(secname) {
        let color = ""
        let backColor = ""

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



export default withRouter(Home)