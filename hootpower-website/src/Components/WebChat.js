import React, { Component } from 'react';
import Chat from 'twilio-chat';
import { Chat as ChatUI } from '@progress/kendo-react-conversational-ui';
import * as base64 from 'base-64';

class WebChat extends Component {
  token;
  channelSid;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      messages: []
    };

  }

  encodeFormData = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  componentDidMount() {
    fetch('https://iam.twilio.com/v1/Accounts/ACe521d5e94344b6e3cfa9befa02a3521b/Tokens', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ 'products': ['flex'] })
    })
      .then(res => res.json())
      .then(data => {
        let body = {
          "FlexFlowSid": "FO90bc940831c16d9703717f31373e2449",
          "ChatFriendlyName": "Webhchat",
          "CustomerFriendlyName": "Customer",
          "Identity": data.identity
        }

        this.token = data.token;
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode("token:" + data.token));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return fetch('https://flex-api.twilio.com/v1/WebChannels', {
          headers: headers,
          method: 'POST',
          body: this.encodeFormData(body)
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Chat.create(this.token)
          .then(client => client.getChannelBySid(data.sid))
          .then(channel => {
            channel.on('messageAdded', message => console.log(message));
            channel.sendMessage("Hello Matthias");
          }
          )
      })
      .catch(this.handleError);

  }

  setupChatClient(client, channelSid) {
    this.client = client;
    console.log("CLIENT>>>> " + client);
    this.client
      .getChannelByUniqueName('general')
      .then(channel => channel)
      .catch(error => {
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: 'general' });
        } else {
          this.handleError(error);
        }
      })
      .then(channel => {
        this.channel = channel;
        return this.channel.join().catch(() => { });
      })
      .then(() => {
        // Success!
      })
      .catch(this.handleError);
  }
  handleError(error) {
    console.error(error);
    // this.setState({
    //   error: 'Could not load chat.'
    // });
  }

  render() {
    return <div>Success Chat Loaded</div>
  }
}

export default WebChat;