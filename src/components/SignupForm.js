import React, { Component } from 'react'
import caver from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'

import './SignupForm.scss'

class SignupForm extends Component {
  state = {
    privateKey: null,
    password : null,
    id : null,
    name : null,
    email : null,
  }

  generatePrivateKey = () => {
    const { privateKey } = caver.klay.accounts.create()
    this.setState({ privateKey })

    async function newID(password){
      console.log(password);
      const accounts = await caver.klay.getAccounts();
      const acc = accounts[0];
      caver.klay.unlockAccount(acc,'0000',30000);
      var privateKey  = await caver.klay.newAccount(password);
      console.log(privateKey);
      console.log(acc);
      
      caver.klay.sendTransaction({
            type: 'VALUE_TRANSFER',
            from: acc,//(await cav.klay.getCoinbase()),
            //gasPrice: cav.utils.toPeb('1', 'KLAY'),  //10000000
            gas: "250000",
            to: privateKey,
            value: caver.utils.toPeb('10', 'KLAY'),
      });
      console.log(privateKey);
      return privateKey;
    }
    newID(this.state.password);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { privateKey } = this.state

    return (
      <div className="SignupForm">
        <Input
          className="SignupForm__id"
          placeholder="id"
          name= 'id'
          label="id"
          onChange={this.handleChange}
        />
        <br/>
        <Input
          className="signupForm__password"
          type="password"
          name="password"
          label="password"
          onChange={this.handleChange}
        />
        <br/>
        <Input
          className="SignupForm__name"
          placeholder="id"
          name= 'name'
          label="name"
          onChange={this.handleChange}
        />
        <br/>
        <Input
          className="SignupForm__email"
          placeholder="id"
          name= 'email'
          label="email"
          type='email'
          onChange={this.handleChange}
        />
        <br/>
        
        <Button
          className="SignupForm__button"
          title="Generate Private key"
          onClick={this.generatePrivateKey}
        />
        <div>{this.state.id}</div>
        <div>{this.state.password}</div>
        <div>{this.state.name}</div>
        <div>{this.state.email}</div>
      </div>
    )
  }
}

export default SignupForm
