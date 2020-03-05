import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isValidPrivateKey, checkValidKeystore } from 'utils/crypto'
import Input from 'components/Input'
import Button from 'components/Button'

import * as authActions from '../frontend/App/authAction'

import caver from '../klaytn/caver'
import './LoginForm.scss'

class LoginForm extends Component {
  state = {
    accessType: 'keystore',
    keystore: '',
    password: '',
    warningMessage: '',
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      password : e.target.value,
    })
  }

  handleChangeKey = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = (event) => {
     // console.log(event.target.result);
      console.log(checkValidKeystore(event.target.result));
      if(!checkValidKeystore(event.target.result)){
        alert(`유효하지 않은 keystore 파일입니다.`);
        return;
      }
      this.setState({
        keystore : event.target.result
      });
    }
  }

  handleLogin = () => {
    try{
      const { login } = this.props
      const privateKey = caver.klay.accounts.decrypt(this.state.keystore, this.state.password).privateKey;
      console.log(privateKey);
      login(privateKey);
    }catch(e){
      alert('비밀번호가 일치하지 않습니다.')
    }
    // console.log(this.state.password);
    // const { login } = this.props
    // const { privateKey } = this.state
    // isValidPrivateKey(privateKey)
    //   ? login(privateKey)
    //   : this.setState({ warningMessage: '* Invalid Private Key' })
  }

  render() {
    const { warningMessage } = this.state
    return (
      <div className="LoginForm">
      <Input
          className="LoginForm__fileinput"
          type="file"
          name="jsonfile"
          label="Login with Private Key"
          onChange={this.handleChangeKey}
          err={warningMessage}
        />
        <Input
          className="LoginForm__input"
          type="password"
          name="privateKey"
          label="password"
          placeholder="0x2c4078447..."
          onChange={this.handleChange}
          err={warningMessage}
        />
        <Button
          className="LoginForm__button"
          title="Log in"
          onClick={this.handleLogin}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (privateKey) => dispatch(authActions.login(privateKey)),
})

export default connect(null, mapDispatchToProps)(LoginForm)
