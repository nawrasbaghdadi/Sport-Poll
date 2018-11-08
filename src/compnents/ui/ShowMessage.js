import React from 'react';
import '../../stylesheets/ShowMessage.css'

const ShowMessage =  (props) =>{
  const show = props.msg ? 'show'  : '';
   return  <div className={`show-message ${show}`} onClick={props.onClick}> <p>System Message : {props.msg} </p> <a href="#" className="hide" onClick={removeClass}>x</a></div>;
}
function removeClass(e){
  document.querySelector('.show-message').classList.remove('show');
}


export default  ShowMessage;