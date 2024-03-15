import 'dotenv/config'

let CORS_WHITELIST = null
let IPS_ALLOW = null

if (!process.env.CORS_WHITELIST) {
  CORS_WHITELIST = btoa("*")
} else {
  CORS_WHITELIST = btoa(process.env.CORS_WHITELIST.split(','))
}

if (!process.env.IPS_ALLOW) {
  IPS_ALLOW = "[['190.0.0.0', '190.255.255.255'],['200.0.0.0', '200.255.255.255']]"
} else {
  IPS_ALLOW = JSON.parse(process.env.IPS_ALLOW.replace(/'/g, '"'))
}

const config = {
  whiteList: {
    corsAllow: CORS_WHITELIST,
    ipsAllow: IPS_ALLOW
  }
}

export { config }
