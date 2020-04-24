import React from 'react';
import dic from "./data/dic.json"
import Cookies from 'universal-cookie';

class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.rightAnswer = this.rightAnswer.bind(this);
    const cookies = new Cookies();
    var progress_cookie = cookies.get('progress')
    if(!progress_cookie){
      progress_cookie = dic
    }
    var progress_id = dic.sort((a, b) => (a.rate < b.rate) ? -1 : 1)
    progress_id.length = Math.min(progress_id.length, props.nb);
    progress_id = progress_id.map(word => word.id);
    this.state = { value: '', card_id: 0, show_answer: false, progress: progress_id };
  }

  handleChange(event) { this.setState({ value: event.target.value }); }
  showAnswer(event) {
    this.setState({ value: this.state.value, card_id: this.state.card_id, show_answer: true })
    event.preventDefault();
  }
  rightAnswer(event) {
    if(this.state.progress.length > this.state.card_id +1){  
      dic.find(x => x.id === this.state.progress[this.state.card_id]).history.shift()
      dic.find(x => x.id === this.state.progress[this.state.card_id]).history.push(1)
      dic.find(x => x.id === this.state.progress[this.state.card_id]).rate =
      dic.find(x => x.id === this.state.progress[this.state.card_id]).history.reduce((a, b) => a + b, 0) / 10
      const cookies = new Cookies();
      cookies.set('progress', dic);
      this.setState({ value: this.state.value, card_id: this.state.card_id + 1, show_answer: false })
    } 

    event.preventDefault();
  }
  wrongAnswer(event) {
    if(this.state.progress.length >this.state.card_id+1){ 
      dic.find(x => x.id === this.state.progress[this.state.card_id]).history.shift()
      dic.find(x => x.id === this.state.progress[this.state.card_id]).history.push(0)
      dic.find(x => x.id === this.state.progress[this.state.card_id]).rate =
      dic.find(x => x.id === this.state.progress[this.state.card_id]).history.reduce((a, b) => a + b, 0) / 10
      const cookies = new Cookies();
      cookies.set('progress', dic); 
      this.setState({ value: this.state.value, card_id: this.state.card_id + 1, show_answer: false })
    }

    
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <p>{this.state.card_id}/{this.state.progress.length}</p>
        <p>{dic.find(x => x.id === this.state.progress[this.state.card_id]).trad}</p>
        <button onClick={this.showAnswer}>  show</button>
        <div className="answer" style={{ display: this.state.show_answer ? 'block' : 'none' }}>
          <p>{dic.find(x => x.id === this.state.card_id).korean}</p>
          <button className="wrong" onClick={this.wrongAnswer}>  X</button>
          <button className="right" onClick={this.rightAnswer}>  V</button>
        </div>

      </div>


    );
  }
}
export default Flashcard; 