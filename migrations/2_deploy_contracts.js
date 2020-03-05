const fs = require('fs')
const AdditionGame = artifacts.require('./AdditionGame.sol')
const Voteitem = artifacts.require('./Voteitem.sol')

module.exports = function (deployer) {
  deployer.deploy(AdditionGame)
  .then(()=>{
      if(AdditionGame._json){
          fs.writeFile('deployedABI',JSON.stringify(AdditionGame._json.abi),
            (err) =>{
                if(err) throw err;
                console.log('파일에 ABI 입력 성공');
            }
          )

          fs.writeFile('deployedAddress',AdditionGame.address,
             (err) =>{
                if(err) throw err;
                console.log('파일에 주소 입력 성공');
            }
          )
      }
  })

  deployer.deploy(Voteitem)
  .then(()=>{
      if(AdditionGame._json){
          fs.writeFile('deployedABI2',JSON.stringify(Voteitem._json.abi),
            (err) =>{
                if(err) throw err;
                console.log('파일에 ABI2 입력 성공');
            }
          )

          fs.writeFile('deployedAddress2',Voteitem.address,
             (err) =>{
                if(err) throw err;
                console.log('파일에 주소 2 입력 성공');
            }
          )
      }
  })
}
