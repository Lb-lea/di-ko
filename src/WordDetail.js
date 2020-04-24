import React from 'react';

class WordDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
    }  
    render() {
        return (
            <div>
                <p>{this.props.word.trad}</p>
                <p>{this.props.word.korean}</p>
                <p>{this.props.word.rate}</p>
            </div>
        );
    }
  }
export default WordDetail; 