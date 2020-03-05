import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import AddItem from './addItem';
import cav from '../caver'
const resultcontract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const pollcontract = new cav.klay.Contract(DEPLOYED_ABI2, DEPLOYED_ADDRESS2);
var result=[];

class NewVote extends Component{
    constructor(props) {
        super(props);
        this.state = {
            check :false,
            information : [
				{name: "", votes: []}
			]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePoll=this.updatePoll.bind(this);
        this.voteform = this.voteform.bind(this);
    }

    updatePoll(){
        async function getpollItem(polltitle){
            var informations=[];
            const accounts = await cav.klay.getAccounts();
            const acc = accounts[0];
            cav.klay.personal.unlockAccount(acc,'0000',30000);

            console.log(await pollcontract.methods.getItem(polltitle).call());
            var item_list = await pollcontract.methods.getItem(polltitle).call();
            
            item_list.map((items,i)=>{
                var information = new Object();
                var ques = [];
                var item = items.toString().split('#');
                item.map((ans,i)=>{
                    if(i ==0){
                        information.name = ans;
                    }else{
                        ques.push(ans);
                    }
                })
                information.votes = ques;
                informations.push(information);
            })
        
            return (informations);
           }
        
        getpollItem(this.props.Title).then(informations=>this.setState({
            information : informations
        }));
    }
    handleChange(event) {    
       result[event.target.name] = event.target.value*1;
       console.log(result);
    }

    handleSubmit(event) { 
        event.preventDefault();
        
        
    async function getid(){
        var net = await cav.klay.net.getId();
        return net
    }

    async function getAccount(item,count){
        const accounts = await cav.klay.getAccounts();
        const acc = accounts[0];
        cav.klay.personal.unlockAccount(acc,'0000',30000);
        await resultcontract.methods.storeResult(count,item,acc).send({from: acc,gas : 250000});
        await resultcontract.methods.doit(acc).send({from: acc,gas : 250000});
        console.log(await resultcontract.methods.getResult(acc).call());
        var ischeck = await resultcontract.methods.check(acc).call();
        console.log(ischeck);
        
        return ischeck;
    }
    console.log(result);
    getid().then(net=>console.log(net));
    getAccount(result, result.length).then(_ischeck=>{
        this.setState({
            check : _ischeck
        })
    });
   
    }

    voteform(){
        return [ !this.state.check &&(<div key='jsm'>
            <button onClick={this.updatePoll}>Make your Vote</button>
            <form  onSubmit={this.handleSubmit}>
                {this.state.information.map((items,i)=>
                    <div key={i}>
                        <div key={items.name}>
                                <label>{i+1}. {items.name}</label>
                        </div>
                        {items.votes.map((item,j)=>
                           <div key={items.name+j}> <input type="radio" name={i} value={j+1} onChange={this.handleChange}/>{item}</div>
                        )}
                    </div> 
                    )}
                    <center><button type="submit">Make your choice</button></center>
            </form>
        </div>)]
    }
    
    render(){
        console.log(this.state.information);

        return(
            <div>
                {this.voteform()}
            </div>
        )
    }
}

export default NewVote