import React from "react"
import { withRouter } from "react-router-dom"
import Spinner from "./Spinner"
import ShareModal from "./ShareModal"
import {Card} from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { left } from "glamor"
import { Badge } from 'react-bootstrap'
import {MdDelete} from "react-icons/md"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { css } from "glamor"

toast.configure()
class BookMark extends React.Component {
    constructor(){
        super()
        this.state = {
            Loading: true,
            articlesList: []
        }
        this.Clicker = this.Clicker.bind(this)
    }
    componentDidMount() {
        var result = JSON.parse(localStorage.getItem('articles'))
        this.setState({articlesList:result,Loading:false})
    }

    handleClick(event) {
        event.stopPropagation()
        event.preventDefault()
    }

    DeleteBookMark(event,vals) {
        var idvalue = vals.id
        var temp = []
        var res = JSON.parse(localStorage.getItem("articles"))
        console.log(res)
        for(var i=0; i<res.length; i++){
            if (res[i].id != idvalue) {
                temp.push(res[i])
          }
         }
         localStorage.setItem("articles", JSON.stringify(temp))
         this.setState({articlesList:temp})
         toast("Removing" + " " + vals.title, {position:toast.POSITION.TOP_CENTER, hideProgressBar:true, className:css({color:"black"})})
         event.stopPropagation()
         event.preventDefault()
    }
    Clicker(event,val) {
        localStorage.setItem("filled", false)
        this.props.history.push({pathname:"/DetailedArticle",search:"id=" + val})
    }
    displayItem(props) {
        return(
            <Col style={{padding:"0.5%"}}>
            <Card onClick={(event) => this.Clicker(event,props.id)} style={{boxShadow:'0px 0px 12px #333',marginTop:'2%',width:'97%',cursor:'pointer'}}>
            <Card.Title style={{fontSize:"100%",fontStyle:'italic',paddingTop:"2%", paddingLeft:"6%",paddingRight:"6%"}}>
                  {props.title} <span onClick={this.handleClick}><ShareModal title={props.title} url={props.url} /> </span>
                  <span> <MdDelete onClick={(event) => this.DeleteBookMark(event,props)}> </MdDelete> </span>
            </Card.Title>
            <Card.Body style={{marginTop:'-1.75%'}}>
                <Card.Img src={props.imageURL} alt="" height="auto" width="auto" style={{objectFit:'cover',padding:
                    '1%', border:'solid 0.5px lightgray',float:'left', marginTop:"-4%"}}/>
                <span style={{float:'left', fontStyle:'italic'}}>{props.date}</span>
                <Card.Text style={{marginTop:"5%"}}>
                <span style={{float:'right'}}> {HandleBadge(props.sectionId)} {HandleBadge(props.source)} </span>
                </Card.Text>
                </Card.Body>
                </Card>
             </Col>

        )

    }
    render()
    {
     if(this.state.Loading == false){
         console.log(this.state.articlesList)
         if(this.state.articlesList === null ){
            return(<p style={{textAlign:'center', fontSize:'110%', marginTop:"1%"}}> You have no saved articles</p>)
            
        }
        else if(this.state.articlesList.length > 0){
            return (
                <div>
                <div style={{float:'left',fontSize:"190%",marginLeft:"2%"}}> Favorites </div>
                <div style={{clear:'both'}}>
                <Container fluid={true} style={{marginLeft:"0.8%"}}>
                <Row xl={4} xs={1} lg={4} md={4}>
                {this.state.articlesList.map(item => this.displayItem(item))}
                </Row>
                </Container>
                </div>
                </div>
                
            )
        }
       else{
           return(<p style={{textAlign:'center', fontSize:'110%', marginTop:"1%"}}> You have no saved articles</p>)
       }
     }
    
    else {
            return(<Spinner />)
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
    else if (secname === 'GUARDIAN') {
        color = '#1A2D4E'
        backColor = 'white'
        secname = 'GUARDIAN'
    }
    else if (secname === 'NYTIMES'){
        color = '#DDDDDD'
        backColor = 'black'
        secname = 'NYTIMES'
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





export default withRouter(BookMark)