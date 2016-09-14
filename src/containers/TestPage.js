import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUpload from '../components/common/ImageUpload';


class TestPage extends Component {
  constructor(props, context){
    super(props, context);
  }
  
  render (){
    return(
      <div className="test">
       <ImageUpload/>
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(TestPage);
