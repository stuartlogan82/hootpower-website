import React, { Component } from 'react';
import Chat from 'twilio-chat';
import { Chat as ChatUI } from '@progress/kendo-react-conversational-ui';
import * as base64 from 'base-64';

class WebChat extends Component {
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
      .then(data => data.token)
      .then(token => {
        let body = {
          "FlexFlowSid": "FO03d6165fb26ff67cf016259be62f1542",
          "Identity": "Jon",
          "CustomerFriendlyName": "Jon",
          "ChatFriendlyName": "Connected to: Jonathan",
          "ChatUserFriendlyName": "Jon"
        }


        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode("token:" + token));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return fetch('https://flex-api.twilio.com/v1/WebChannels', {
          headers: headers,
          method: 'POST',
          body: this.encodeFormData(body)
        })
      })
      .then(res => {
        console.log(res.json())
      }
      )
      //.then(this.setupChatClient)
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