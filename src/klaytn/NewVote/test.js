import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import AddItem from './addItem';

class NewVote extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
    
        this.handleChangeFile = this.handleChangeFile.bind(this);
        
    }
      
    handleChangeFile = (file) => {
        var reader = new FileReader();
        
        reader.onload = (file2) => {
            var poll_items = JSON.parse(file2.target.result);
            console.log(poll_items);
            for(var i =0; i< poll_items.length; i++){
                
                var itemStr = JSON.stringify(poll_items[i]);
                // var que = itemStr.replace('[','').replace(']','').split(',');
                // var ans = que[0].replace("\"",'').replace("\"",'');
                // for(var j = 1; j < que.length;j++){
                //     var que2 = que[j].replace("\"","").replace("\"","");
                //     this.setState({
                //         value : this.state.value.concat(que2)
                //     })
                // }
                this.setState({
                    value : this.state.value.concat(itemStr)
                })
                console.log(itemStr);   
            }
        }
        reader.readAsText(file);
        
    }
    
 
    render(){
       // const valueList = this.state.value;
        
        return(
            <div>
                <p>여론조사 항목 : <input type='file' id="regpoll_items" onChange={ e=>
                this.handleChangeFile(e.target.files[0])}></input></p>
                
                <div>{this.props.value}</div>
            </div>
        )
    }
}

export default NewVote