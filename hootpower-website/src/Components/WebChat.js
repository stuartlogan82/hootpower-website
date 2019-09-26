import React, { Component } from 'react';
import Chat from 'twilio-chat';
import { Chat as ChatUI } from '@progress/kendo-react-conversational-ui';
import * as base64 from 'base-64';

class WebChat extends Component {
  token;
  channelSid;
  channel;
  client;


  constructor(props) {
    super(props);
    this.bot = {
      id: 0
    };

    this.state = {
      error: null,
      isLoading: true,
      messages: [{
        author: this.bot,
        suggestedActions: [{
          value: "Submit Meter Reading",
          type: "reply"
        }]
      }]
    };

    this.user = {
      id: "",
      firstName: props.firstName
    };

    this.setupChatClient = this.setupChatClient.bind(this);
    this.messagesLoaded = this.messagesLoaded.bind(this);
    this.messageAdded = this.messageAdded.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleError = this.handleError.bind(this);
    this.twilioMessageToKendoMessage = this.twilioMessageToKendoMessage.bind(this);
    this.addSuggestions = this.addSuggestions.bind(this);

  }

  encodeFormData = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  componentDidMount() {
    console.log(this.user);
    fetch('https://iam.twilio.com/v1/Accounts/ACe521d5e94344b6e3cfa9befa02a3521b/Tokens', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ 'products': ['flex'] })
    })
      .then(res => res.json())
      .then(data => {
        let body = {
          "FlexFlowSid": "FO90bc940831c16d9703717f31373e2449",
          "ChatFriendlyName": "Webchat",
          "CustomerFriendlyName": this.user.firstName,
          "Identity": data.identity
        }
        this.user.id = data.identity;
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
          .then(client => {
            this.client = client;
            return client.getChannelBySid(data.sid)
          })
          .then(channel => {
            this.channel = channel;
            this.setState({ isLoading: false });
            channel.getMessages().then(this.messagesLoaded).then(this.addSuggestions);
            channel.on('messageAdded', message => {
              console.log(message.index);

              this.messageAdded(message)

              if (message.body.includes("Welcome to Hoot Power")) {
                this.addSuggestions();
              }
              if (message.body.includes("Is there anything else I can help you with?")) {
                this.addSuggestions();
              }
            });

            channel.sendMessage("ahoy");
          }
          )
      })
      .catch(this.handleError);

  }

  setupChatClient(client) {
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

  twilioMessageToKendoMessage(message) {
    console.log(this);
    console.log(message);
    let author = message.author;
    if (message.author === this.user.id) {
      author = this.user.firstName;
    }
    return {
      text: message.body,
      author: { id: message.author, name: author },
      timestamp: message.timestamp
    };
  }

  messagesLoaded(messagePage) {
    this.setState({
      messages: messagePage.items.map(this.twilioMessageToKendoMessage)
    });
  }

  messageAdded(message) {

    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        this.twilioMessageToKendoMessage(message)
      ]
    }));
  }

  sendMessage(event) {
    this.channel.sendMessage(event.message.text);
  }

  addSuggestions() {
    console.log("Add suggestions called");
    const suggestions = {
      author: this.bot,
      suggestedActions:
        [{
          value: "submit a meter reading",
          type: "reply"
        },
        {
          value: "I've moved house",
          type: "reply"
        },
        {
          value: "See my appointments",
          type: "reply"
        },
        {
          value: "Smart meter install",
          type: "reply"
        }]
    }
    let messages = this.state.messages
    messages.push(suggestions)
    messages.push()
    this.setState(prevState => ({
      ...prevState,
      messages
    }))
    console.log(this.state);
  }


  componentWillUnmount() {
    this.client.shutdown();
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.isLoading) {
      return <p>Loading chat...</p>;
    }

    if (this.user.id) {
      return (

        <ChatUI
          user={this.user}
          messages={this.state.messages}
          onMessageSend={this.sendMessage}

        />
      );
    } else {
      return null;
    }
  }
}
export default WebChat;