import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
 
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
 
  render() {
    return (
      <div className="sweet-loading" style={{marginTop:"20%",textAlign:'center'}}>
        <BounceLoader
          css={override}
          size={50}
          color={"#123abc"}
          loading={this.state.loading}
        />
        <p style={{fontWeight:"bold"}}>Loading</p>
      </div>
    );
  }
}

export default Spinner