import React, { Component } from 'react';
import api from '../utils/api';
class View extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: this.props.result
        }
    }
    
    render() {
        return (
         <div>
            {this.props.result.map(function (data) {
                return (
                <ul className="results" key={data.id}>
                    <li className="title" ><a target="_blank" href={data.link}>{data.title}</a></li>
                    <li  >{data.desc}</li>
                    <li className="commentarea">
                        <a target="_blank"   title="Votes and comments"  href={"https://news.ycombinator.com/item?id="+data.id}>
                        <img width="15"                     src="https://i.imgur.com/kOge0.png" alt="votes"/> 
                        {data.votes} &nbsp;&nbsp; 

                        <img width="15" src="https://cdn4.iconfinder.com/data/icons/vectory-basic/40/comment_baloon-512.png" alt="comments"/>
                        {data.comments}
                        </a>
                        &nbsp;&nbsp; <span className="author" >by {data.author}</span> 
                        </li>
                        <li className="date">{api.timeConverter(data.date)}</li>
                </ul>
                )
            })}
         </div>   
          
        )
    }
}
export default View;

