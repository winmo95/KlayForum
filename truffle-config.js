const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const PrivateKeyConnector = require('connect-privkey-to-provider')

const NETWORK_ID = '7777'

const URL = 'ws://203.250.77.120:8652'

const PRIVATE_KEY = '0x05cf8e329054487f453bfdb956d9607770833e209d061e8d3a12a62d27cb47d4'

module.exports = {
  networks: {
    klaytn: {
      websockets: true,
      provider : new PrivateKeyConnector(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: '8500000',
      gasPrice: null,
    },
  },

  // Specify the version of compiler, we use 0.5.6
  compilers: {
    solc: {
      version: '0.5.6',
    },
  },
}
