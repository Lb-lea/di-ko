import React from 'react';
import dic from "./data/dic.json"
import Cookies from 'universal-cookie';
import WordDetail from './WordDetail'
class Dictionnary extends React.Component {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      const cookies = new Cookies();
      let progress_cookie= cookies.get('progress')
      if(!progress_cookie){
        progress_cookie = dic
        cookies.set('progress', dic);
      }
      this.state = {progress: progress_cookie};
    }
  
    handleChange(event) {    this.setState({value: event.target.value});  }
    handleSubmit(event) {
        
        event.preventDefault();
    }
  
    render() {
      return (
        <div>{this.state.progress.map((item, key) =>
            <WordDetail word={item} key={item.id} />
        )}
        </div>
      );
    }
  }
export default Dictionnary; 