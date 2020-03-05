/**
 * caver-js library helps making connection with klaytn node.
 * You can connect to specific klaytn node by setting 'rpcURL' value.
 * default rpcURL is 'https://api.baobab.klaytn.net:8651'.
 */
import Caver from 'caver-js'

const config = {
    rpcURL: 'ws://203.250.77.120:8652'
  }

const caver = new Caver(config.rpcURL)

export default caver
