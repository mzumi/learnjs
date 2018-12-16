import AWS from 'aws-sdk'
const REGION = 'ap-northeast-1'

export default class {
  constructor () {
    AWS.config.update({region: REGION})
  }
}
