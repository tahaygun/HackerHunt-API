import React, { Component } from 'react';
import api from '../utils/api';
import '../index.css';
import View from './View';

function Selecttopic(props) {
    var topics = ['development', 'system', 'tools', 'data-science','blockchain' ,'mobile', 'list','social','visual','open-source'];
    return(
      <ul className="topics">
      {topics.map(function(topic){
        return(
        <li key={topic} 
            onClick={props.onSelect.bind(null,topic)}
            style = {topic === props.selectedtopic ? {color:'#d0021b'} :null }
        > 
             {topic}
        </li> 
        )
      })}
    </ul>
    )
  }

  function Sortingtypes(props) {
    var types = ['trending', 'date', 'votes', 'comments'];
      return(
            <ul className="sortingType" > 
                {types.map(function(type) {
                    return (
                        <li key={type} 
                              onClick={props.onSelect.bind(null,type)}
                              style = {type === props.selectedtype ? {color:'#d0021b'} :null }
                        > 
                        {type}
                        </li>
                    )
                })}
            </ul>
      )
  }

function name(params) {
    
}


class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            selectedTopic: "development",
            sortingType:'trending',
            result: null
        };
        this.updateTopic = this.updateTopic.bind(this);
        this.updateSortType = this.updateSortType.bind(this);
    }
    componentDidMount(){
        this.updateTopic(this.state.selectedTopic);
    }
    updateTopic(topic) {
        this.setState(function () {
            return {
                selectedTopic:topic
            }
        });
        api.getResult(topic, this.state.sortingType)
        .then(function(result){
          this.setState(function(){
              return{
                result: result
              }
          })
        }.bind(this));
      }

      updateSortType(type){
        this.setState(function () {
            return{
                sortingType: type
            }
        });
        api.getResult(this.state.selectedTopic, type)
        .then(function(result){
          this.setState(function(){
              return{
                result: result
              }
          })
        }.bind(this));

    }

    render() {
        return (
            
            <div>
                <Selecttopic
                onSelect= {this.updateTopic}
                selectedtopic={this.state.selectedTopic}
                 />
                <Sortingtypes 
                onSelect= {this.updateSortType}
                selectedtype={this.state.sortingType}
                />
             {
              !this.state.result ?<div>Loading</div> : <View
              result={this.state.result}
               />
             } 
            </div>
        );
    }
}





export default App;
