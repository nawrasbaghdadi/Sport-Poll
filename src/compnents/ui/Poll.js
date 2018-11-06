import React from 'react';
import '../../stylesheets/poll.css';
import  { Services } from '../../service';
import ShowMessage from './ShowMessage';

class Poll extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          voted : (localStorage['voted']) ? 
           JSON.parse(localStorage.getItem('voted')) : [],
          data : null,
          current : null,
          randomArr : [],
          message : '',
          selected: 0
    
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        
        this.onMouseOut = this.onMouseOut.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.onKeyPress = this.onKeyPress.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.handleChange = this.handleChange.bind(this);
}
componentDidMount(){
    const dd = Services.getPoll();
    dd.then((res) => {
      const random  = this.randomVote(0,res.length-1)
      this.setState({data:res,current:res[random],randomArr:[...this.state.randomArr,random]});
    })
  }

  randomVote(min ,max){
    ///remove the random , and get any new one
    const rand = Services.random(min,max);
     if(this.state.randomArr.indexOf(rand) === -1){
        return rand;
     }else{
        const x = this.state.randomArr.length-1;
        if(max === x){
            return -1;
          }
        else{
          return this.randomVote(min ,max);
        }
     }
  }

handleSubmit(e){
    const voted = this.state.voted;
    let selected = null;
    if( document.querySelector('input[name="poll"]:checked') != null ){
       selected = document.querySelector('input[name="poll"]:checked').value;
     } else{
      this.setState({message:'Please Select one option'});
      return;
    }
    const vote  = {
      vote : this.state.current,
      selected : selected
    }
    
    const randomVote = this.randomVote(0,this.state.data.length -1);
    if(this.state.voted.length != this.state.data.length ){
      voted.push(vote);
      localStorage.setItem('voted', JSON.stringify(voted));
      this.setState({voted: voted});
      document.querySelector('input[name="poll"]:checked').checked= false;
      if(randomVote != -1){
        this.setState({current : this.state.data[randomVote]});
        this.setState({randomArr: [...this.state.randomArr,randomVote]})
      }else{
        this.setState({message:'Nice!! you finished the whole Votes ..'});
      }
    }else{
      this.setState({message:'You already finish all the votes for today , results saved in LocalStorege'});
    }
}

handleChange(e){
  this.setState({
    selected:e.target.value
  })
}

handleMouseOver(target){
  const arr = Array.from(target.closest('.choices').querySelectorAll('div'));
  arr.map((item)=>{
    if(target.classList.contains('a') && item.classList.contains('a')){
      while (item.classList.length > 0) {
        item.classList.remove(item.classList.item(0));
     }
     item.classList.add('a');
     item.classList.add('wins');
     target.closest('.choices').querySelector('.b').classList.add('loses');
     target.closest('.choices').querySelector('.d').classList.add('loses');
    }else  if(target.classList.contains('b') && item.classList.contains('b')){
      while (item.classList.length > 0) {
        item.classList.remove(item.classList.item(0));
     }
     item.classList.add('b');
     item.classList.add('wins');
     target.closest('.choices').querySelector('.a').classList.add('loses');
     target.closest('.choices').querySelector('.d').classList.add('loses');
    }else if(target.classList.contains('d') && item.classList.contains('d')){
      while (item.classList.length > 0) {
        item.classList.remove(item.classList.item(0));
     }
     item.classList.add('d');
     item.classList.add('wins');
     target.closest('.choices').querySelector('.a').classList.add('loses');
     target.closest('.choices').querySelector('.b').classList.add('loses');
    }   
  })
  
}
handleMouseOut(target){
  const arr = Array.from(target.closest('.choices').querySelectorAll('div'));
    arr.map((item)=>{
      if(item.classList.contains('a') ){
        while (item.classList.length > 0) {
          item.classList.remove(item.classList.item(0));
       }
       item.classList.add('a');
      }else if(item.classList.contains('d')){
          while (item.classList.length > 0) {
            item.classList.remove(item.classList.item(0));
       }
       item.classList.add('d');
      }else if(item.classList.contains('b')){
        while (item.classList.length > 0) {
          item.classList.remove(item.classList.item(0));
     }
     item.classList.add('b');
    }
    })
}
handleKeyDown(key){
  const SysKeys = ['a','b','d','Enter'];
  if(SysKeys.indexOf(key) > -1){
    const ele = document.querySelector(`.${key}`)
      if(key.toLowerCase() === 'a'){
        ele.focus();
      }else if(key.toLowerCase() === 'b'){
        ele.focus();
      }else if(key.toLowerCase() === 'd'){
        ele.focus();
      }else if(key.toLowerCase() === 'enter'){
        ele.focus();
        this.handleSubmit();
        return;
      }
    ele.querySelector('input').checked = true;
    this.handleMouseOver(ele)
  }
}
onMouseOver(e){
  Services.debounce(this.handleMouseOver,250)(e.target);
}
onMouseOut(e){
  Services.debounce(this.handleMouseOut,250)(e.target);
}
onKeyPress(e){
  Services.debounce(this.handleKeyDown,250)(e.key);
}

  render(){
    if (!this.state.data ) {
      return <div className="loading"> </div>
    }
    const currentIsVoted = this.state.voted.find(obj => obj.vote.id === this.state.current.id)
    const current = (currentIsVoted) ? currentIsVoted.vote : this.state.current;
    const selectedOption = (currentIsVoted) ? currentIsVoted.selected :'';
    const teamA = current.homeName;
    const teamB = current.awayName;
    const sport = current.sport;
    const flag = current.country;
    const gameStatus = current.state;
    const group = current.group;
    const gameState = {
          'NOT_STARTED':'Not Started yet',
          'STARTED': '🔥Already Started',
           'FINISHED': 'Sorry!! you missed it'
          };
    const randomMsg = ['Good Luck' , 'finger crossed 🤞' , 'Yes, Lest\'s go! 🏃','who cares..✌️','i will have it'];
      
    
      return (
        <section className={`main-container ${sport && sport.toLowerCase()}`} onKeyPress={this.onKeyPress} tabIndex="0">
        <div  className="info">
            <div>
              <span className="label">Game Status </span>
              <span className="data">{gameState[gameStatus]}</span>
            </div>
            <div>
              <span>Country</span>
              <span>{flag}
              </span>
              <span className={`flag ${flag && flag.toLowerCase()}`}></span>
            </div>
            <div>
              <span>Group</span> 
              <span>
                {group}
              </span>
            </div>
            <div>
            <span>Game</span> 
            <span>
              {sport}
            </span>
          </div>
        </div>
        <div className="choices" id="choices"> 
        
          <div className="a" onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseOut} tabIndex="1">
            <input type="radio" name="poll" value="1" id="a-win" 
                    defaultChecked= {selectedOption === "1"}
                    onChange={this.handleChange}  required/>
            <label htmlFor="a-win">
              <h2>{teamA} <span className="mod-icon"></span></h2>
            </label>
            <span>home</span>
            <span className="icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path d="M12.42 28.678l-12.433-12.238 6.168-6.071 6.265 6.167 13.426-13.214 6.168 6.071-19.594 19.285zM3.372 16.441l9.048 8.905 16.208-15.953-2.782-2.739-13.426 13.214-6.265-6.167-2.782 2.739z"></path>
                </svg>
            </span>
           
          </div>
          <div className="d" onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseOut} tabIndex="2">
            <input type="radio" name ="poll" value="2" id="draw" 
                    defaultChecked= {selectedOption === "2"}
                    onChange={this.handleChange} required/>
            <label htmlFor="draw">
              <h2>Draw <span className="mod-icon"></span></h2>
            </label>
            <span className="icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <path d="M12.42 28.678l-12.433-12.238 6.168-6.071 6.265 6.167 13.426-13.214 6.168 6.071-19.594 19.285zM3.372 16.441l9.048 8.905 16.208-15.953-2.782-2.739-13.426 13.214-6.265-6.167-2.782 2.739z"></path>
              </svg>
            </span>
          </div>
          <div className="b" onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseOut} tabIndex="3">
            <input type="radio" name ="poll" value="3" id="b-win" 
            defaultChecked= {selectedOption === "3"} 
                    onChange={this.handleChange} required/>
              <label htmlFor="b-win">
                <h2>{teamB} <span className="mod-icon"></span></h2>
              </label>
            <span>away</span>
            <span className="icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <path d="M12.42 28.678l-12.433-12.238 6.168-6.071 6.265 6.167 13.426-13.214 6.168 6.071-19.594 19.285zM3.372 16.441l9.048 8.905 16.208-15.953-2.782-2.739-13.426 13.214-6.265-6.167-2.782 2.739z"></path>
              </svg>
            </span>
          </div>
        </div>
        <button className="btn-submit Enter" type="submit" onClick={this.handleSubmit} tabIndex="4">
          Vote... <span className="random">{randomMsg[Services.random(0,4)]}</span>
      </button>
      <ShowMessage msg={this.state.message} />
        </section>
      )
  }
}

export default Poll;