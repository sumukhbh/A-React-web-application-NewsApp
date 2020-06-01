import React from "react"
import commentBox from "commentbox.io"

class CommentBox extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        var key = this.props.vals
        commentBox("5671765887942656-proj",{
            className: "commentbox",
            tlcParam: "tlc",
        createBoxUrl(boxId, pageLocation) {

                pageLocation.search = key
                pageLocation.hash = boxId
                return key
  
            }
    })
}


    render()
    {
        return(
            <div className="commentbox" id={this.props.vals} >
            </div>
        )
    }
}

export default CommentBox