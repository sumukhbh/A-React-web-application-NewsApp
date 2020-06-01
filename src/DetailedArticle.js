import React from "react"
import { withRouter } from "react-router-dom"
import {Card,Container,Row,Col} from "react-bootstrap"
import Spinner from "./Spinner"
import {EmailShareButton,
    FacebookShareButton, TwitterShareButton} from "react-share"
import {EmailIcon,FacebookIcon,TwitterIcon} from "react-share"
import {FaRegBookmark, FaBookmark} from "react-icons/fa"
import CommentBox from "./CommentBox"
import {FaAngleDown, FaAngleUp} from "react-icons/fa"
import ReactTooltip from 'react-tooltip'
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { css } from "glamor"


toast.configure()
class DetailedArticle extends React.Component {
    constructor(){
        super()
    this.state = {
        Loading: true,
        article: [],
        init: true,
        fulldesc:false,
        bookmark: false
    }
    this.myRef = React.createRef()
    this.CommentHandler  = this.CommentHandler.bind(this)
}

      ScrollContent() {
         this.setState({
           fulldesc: !this.state.fulldesc
          }, this.ScrollArticle)
       }
    

      ScrollArticle() {
        if(this.state.fulldesc === false){
            window.scrollTo({top:0, left:1, behavior: 'smooth' })
        }
    
        if(this.state.fulldesc === true){
          console.log(this.myRef.current.getBoundingClientRect()["y"])
          window.scrollTo({top: this.myRef.current.getBoundingClientRect().top+window.scrollY+500, behavior: 'smooth'})
        }
}

    componentDidMount() {
        let articleId = window.location.search.substring(4,window.location.search.length)
        if(articleId.startsWith("https")){
        fetch("https://hw8-backend.azurewebsites.net/NYtimesdetailed?id="+articleId).then(response => response.json())
        .then(response => {
            const articles = response.result
         this.setState({ article: articles, Loading:false })
        })
        
    }
       else{
          fetch("https://hw8-backend.azurewebsites.net/guardiandetailed?id="+articleId).then(response => response.json())
          .then(response => {
          const articles = response.result
          this.setState({ article: articles, Loading:false })
        })
       }
    }

     Splitter(props) {
         let desc = props.description.split(".")
         let sliceval1 =  desc.slice(0,4).join(".")+"."
         let sliceval2 = desc.slice(4,).join(".") + "."
         if (this.state.init && desc.length > 4 ) {
            return(
             <div>
             <div> {sliceval1} </div>
             <FaAngleDown onClick={() => {this.setState({init:false});this.Splitter(props);this.ScrollContent()}} size={22} style={{float:"right"}}/>
             </div>
         )
     }
        else if(this.state.init && desc.length <= 4) {
            return(
            <div>
             <div> {sliceval1} </div>
            </div>
            )

        }
         else{
             return(
                 <div>
                 <div> {sliceval1} </div>
                 <div ref={this.myRef}> {sliceval2} </div>
                 <FaAngleUp onClick={() => {this.setState({init:true});this.Splitter(props);this.ScrollContent()}} size={22} style={{float:"right"}}/>
                 </div>
             )

         }

     }
       CommentHandler(val) {
           const substr = "https://"
           if(val.includes(substr)) {
               var newval = val.slice(8,)
               return newval
          }
          else {
              return val
          }

       }
       AddBookMark(vals) {
           var res = JSON.parse(localStorage.getItem("articles"))
           if (res === null){
               res = []
            }
           res.push(vals)
           localStorage.setItem("articles", JSON.stringify(res))
           this.setState({bookmark:true})
           toast("Saving" + " " + vals.title, {position:toast.POSITION.TOP_CENTER, hideProgressBar:true, className:css({color:"black"})})
           
       }

       DeleteBookMark(vals) {
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
            this.setState({bookmark:false})
            toast("Removing" + " " + vals.title, {position:toast.POSITION.TOP_CENTER, hideProgressBar:true, className:css({color:"black"})})
       }
        
        displayItem(props) {
            console.log(props)
            var bookMark = ""
            var newkey =  this.CommentHandler(props.id)
            var artLst = JSON.parse(localStorage.getItem("articles"))
            if (artLst == null || artLst.length === 0){
                bookMark = <span><span onClick={() =>this.AddBookMark(props)} style={{color:"red"}}> <FaRegBookmark size={20} data-tip="Bookmark" />
                     </span>
                     <ReactTooltip />
                     </span>
            }
            else {    
                for(var j=0;j<artLst.length;j++){
                
                if (artLst[j].id != props.id ) {
                 bookMark  =  <span onClick={() =>this.AddBookMark(props)} style={{color:"red"}}> <FaRegBookmark size={20} data-tip="Bookmark" />
                 <ReactTooltip />
                </span>
                }
                else{
                 bookMark = <span onClick={() => this.DeleteBookMark(props)} style={{color:"red"}}> <FaBookmark size={20} data-tip="Bookmark"/> 
                <ReactTooltip />
                </span>
                break
            }
        }
    }

            return(
                <Container fluid={true}>
                <Card style={{boxShadow:'0px 0px 12px #333', marginTop:'2%',width:'98%',cursor:'pointer'}}>
                <Row>
                <Col>
               <Card.Title style={{fontSize:"200%",fontStyle:'italic',paddingTop:"2%", paddingLeft:"2%",paddingRight:"2%"}}>
                  {props.title} 
                </Card.Title>
                </Col>
                </Row>
                <Card.Body style={{marginTop:'-1.75%'}}>
                <Row>
                <Col xs={5} lg={9} xl={9} sm={9} md={9}>
                <span style={{fontWeight:'550',fontStyle:'italic',marginTop:"-5%",marginLeft:"0.5%"}}>
                    {props.date}
                </span>
                </Col>
                 <Col xs={5} lg={2} sm={2} md={2} xl={2}>
                 <FacebookShareButton data-tip="Facebook" url={props.url} hashtag={"#CSCI_571_NewsApp"}><FacebookIcon size={30} round={true}></FacebookIcon></FacebookShareButton>
                 <TwitterShareButton data-tip="Twitter" url={props.url} hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={30} round={true}></TwitterIcon></TwitterShareButton>
                 <EmailShareButton data-tip="Email" url={props.url} subject={"#CSCI_571_NewsApp"}><EmailIcon size={30} round={true}></EmailIcon></EmailShareButton>
                 <ReactTooltip />
                </Col>
                <Col xs={2} lg={1} xl={1} sm={1} md={1}>
                    {bookMark} 
                </Col>
                </Row>
                <Row>
                <Card.Img src={props.imageURL} alt="" height="auto" width="auto" style={{objectFit:'cover',padding:
                    '0.2%', border:'solid 0.5px lightgray',float:'left', marginTop:"0.5%"}}/>
                </Row>
                <Row>
                <span> {this.Splitter(props)} </span>
                </Row>
                </Card.Body>
                </Card>
                <CommentBox vals={newkey}/>
                </Container>
            )
        
        }
        


    render() {

        if (this.state.article.length > 0) {
           
           return( 
               <div style={{marginBottom:'2%', marginLeft:"2%"}}>
               {this.state.article.map((item) => this.displayItem(item))}
               </div>
           )
        }
        else{
            return(<Spinner />)
        }
            
        
    }
}

export default withRouter(DetailedArticle)