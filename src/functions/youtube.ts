'use strict'

import fs from 'fs'
import path from 'path'
import http from 'http'
import url from 'url'
import opn from 'open'
import destroyer from 'server-destroy'

import { google, Auth } from 'googleapis'
const youtube = google.youtube('v3')

/**
 * To use OAuth2 authentication, we need access to a a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.  To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.
 */
// const keyPath = path.join(__dirname, 'oauth2.keys.json')
// let keys = { redirect_uris: [''] }
// if (fs.existsSync(keyPath)) {
//   keys = keyPath.web
// }

/**
 * Create a new OAuth2 client with the configured keys.
 */
const oauth2Client = new google.auth.OAuth2(
  '530026573561-khulcc819v28bokjg7p3b3eknudkqhr5.apps.googleusercontent.com',
  '96CKDKtQKOhSl-8WcQw57kYZ',
  'http://localhost:3300/oauth2callback'
)
const scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl'
]

/**
 * Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
 */
async function authenticate(): Promise<Auth.OAuth2Client> {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' ')
    })
    const server = http.createServer(async (req: any, res) => {
      try {
        console.log(req.url)
        if (req.url.indexOf('/oauth2callback') > -1) {
          const qs = new url.URL(req.url, 'http://localhost:3300').searchParams
          res.end('Authentication successful! Please return to the console.')
          console.log(qs)
          const code = qs.get('code')
          if (code != null) {
            const { tokens } = await oauth2Client.getToken(code)
            oauth2Client.credentials = tokens
            server.destroy()
            resolve(oauth2Client)
          }
          throw new Error('no code')
        }
      } catch (e) {
        reject(e)
      }
    })
    server.listen(3300, () => {
      // open the browser to the authorize url to start the workflow
      opn(authorizeUrl, { wait: false }).then(cp => cp.unref())
    })
    destroyer(server)
  })
}

async function getLiveChatId(liveURL: string): Promise<string> {
  // google.options({ auth: authClient })
  const liveID = liveURL.replace('https://youtu.be/', '')
  console.log(liveID)
  const liveInfo = await youtube.liveBroadcasts.list({
    id: [liveID],
    part: ['snippet']
  })
  console.log(liveInfo)
  if (
    liveInfo.data.items &&
    liveInfo.data.items[0].snippet &&
    liveInfo.data.items[0].snippet.liveChatId
  ) {
    return liveInfo.data.items[0].snippet.liveChatId
  }
  return ''
}

async function sendMessage(liveURL: string): Promise<string> {
  const authClient = await authenticate()
  google.options({ auth: authClient })
  const liveChatId = await getLiveChatId(liveURL)
  const message = 'test message'
  const res = await youtube.liveChatMessages.insert({
    // The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the parameter value to snippet.
    part: ['snippet'],
    requestBody: {
      // etag: 'my_etag',
      // id: 'my_id',
      // kind: 'my_kind',
      snippet: {
        liveChatId: liveChatId,
        type: 'textMessageEvent',
        textMessageDetails: {
          messageText: message
        }
      }
    }
  })
  return 'OK'
}

export default sendMessage
