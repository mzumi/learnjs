import AWS from 'aws-sdk'
import AWSService from '../aws_service'
import googleClientApi from 'google-client-api'

const POOL_ID = 'ap-northeast-1:3b211a99-4a6d-46fc-bde7-8de8cc8b0676'

export default class extends AWSService {
  async refresh () {
    const gapi = await googleClientApi()
    return gapi.auth2.getAuthInstance().signIn({
      prompt: 'login'
    }).then(userUpdate => {
      const creds = AWS.config.credentials
      const newToken = userUpdate.getAuthResponse().id_token
      creds.params.Logins['accounts.google.com'] = newToken

      return this.awsRefresh()
    })
  }

  awsRefresh () {
    return new Promise((resolve, reject) => {
      AWS.config.credentials.refresh(err => {
        if (err) {
          reject(err)
        } else {
          resolve(AWS.config.credentials.identityId)
        }
      })
    })
  }

  async authenticateByGoogle (googleUser) {
    const idToken = googleUser.getAuthResponse().id_token
    const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: POOL_ID,
      Logins: {
        'accounts.google.com': idToken
      }
    })

    AWS.config.update({
      credentials: credentials
    })

    const id = await this.awsRefresh()

    return {
      id: id,
      email: googleUser.getBasicProfile().getEmail(),
      refresh: this.refresh
    }
  }
}
