import React from 'react';
import { connect } from 'react-redux';


const GetName = (props) => {
  return <div className="GetName">
    <span>Name</span>
    <input type="text" />
   </div>;
}


export default connect(state=>state.GetName)(GetName);
