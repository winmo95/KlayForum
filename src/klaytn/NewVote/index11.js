import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import cav from '../caver';
import { async } from 'q';
const caver = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);

class NewVote extends Component{
  constructor() {
    super();
    
    this.state = {
      first : '',
      sec : ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    if(event.target.name == 'first'){
      this.setState({
        first: event.target.value
      });
    }else{
      this.setState({
        sec: event.target.value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var item = [];
    item.push(this.state.first);
    item.push(this.state.sec);
      
   async function getid(){
     var net = await cav.klay.net.getId();
     return net
   }

   async function getAccount(item){
    const accounts = await cav.klay.getAccounts();
    const acc = accounts[0];
    cav.klay.personal.unlockAccount(acc,'0000',30000);
    await caver.methods.storeItem(2,item).send({from: acc,gas : 250000});
    console.log(await caver.methods.getItem().call())
    return acc;
   }
  
   getid().then(net=>console.log(net));
   getAccount(item);
    alert(`You chose ${this.state.first}, ${this.state.sec}`);
  }

  render(){
    return(
      <div className='container'>
        <form  onSubmit={this.handleSubmit}>
          <div>
            <label>울산시에서 추진하고 있는 노인복지정책에 대하여 알고 계십니까?</label>
          </div>
          <div>
            <input type="radio" name="first" value="1" onChange={this.handleChange}/> 알고있다
            <input type="radio" name="first" value="2" onChange={this.handleChange}/> 모른다
          </div>
          <br/>
          <div>
            <label>주요 추진 사업인 돌봄서비스와 기초연금 인상에 대하여 어떻게 생각하십니까?</label>
          </div>
          <div>
            <input type="radio" name="sec" value="1" onChange={this.handleChange}/> 찬성한다
            <input type="radio" name="sec" value="2" onChange={this.handleChange}/> 반대한다
            <input type="radio" name="sec" value="3" onChange={this.handleChange}/> 잘모르겠다
          </div>
          <br/>
          <center><button type="submit">Make your choice</button></center>
        </form>
      </div>
    )
  }
}

export default NewVote