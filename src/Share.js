import React from  "react"
import {EmailShareButton,
    FacebookShareButton, TwitterShareButton} from "react-share"
import {EmailIcon,FacebookIcon,TwitterIcon} from "react-share"
import Modal from 'react-bootstrap/Modal'
import {Card,Container,Row,Col} from 'react-bootstrap'

class Share extends React.Component {
    constructor(props){
        super(props)
    }
   render() {
        console.log(this.props.url)
    return (
        <Modal show={this.props.select} onHide={this.props.hide}>
        <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p style={{textAlign:'center', fontWeight:'500',fontSize:'20px'}}> Share via </p>
              <Container fluid={true}>
              <Row>
              <Col><FacebookShareButton url={this.props.url} hashtag={"#CSCI_571_NewsApp"}><FacebookIcon size={50} round={true} style={{marginLeft:"60%"}}></FacebookIcon></FacebookShareButton></Col>
              <Col><TwitterShareButton url={this.props.url} hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={50} round={true} style={{marginLeft:"60%"}}></TwitterIcon></TwitterShareButton></Col>
              <Col><EmailShareButton url={this.props.url} subject={"#CSCI_571_NewsApp"}><EmailIcon size={50} round={true} style={{marginLeft:"60%"}}></EmailIcon></EmailShareButton></Col>
            </Row>
            </Container>
            </Modal.Body>
        </Modal>
     
    );
  }
}
  


export default Share