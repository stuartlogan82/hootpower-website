exports.handler = async function (context, event, callback) {
  let response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");


  console.log('This has started');
  const jsforce = require('jsforce');
  var input = event.phNumber;
  var plus = '+';

  console.log('input is ', input);
  const conn = new jsforce.Connection();

  plus += input;
  console.log('This is the new input: ', plus);

  let logger = await login();
  console.log('This is the response from login: ', logger);
  var queryString = `SELECT Name, firstName__c, lastName__c, postCode__c, Address__c, accountDet__c, emailAddress__c FROM Customer__c where phNumber__c = '${plus}'`;
  let sForceQuery = await sfdcQuery(queryString);

  console.log('This is the first Name: ', sForceQuery.firstName__c);

  let responseObj = {
    custID: sForceQuery.Name,
    firstName: sForceQuery.firstName__c,
    lastName: sForceQuery.lastName__c,
    postCode: sForceQuery.postCode__c,
    address: sForceQuery.Address__c,
    emailAddress: sForceQuery.emailAddress__c,
    accountID: sForceQuery.accountDet__c
  };
  response.setBody(responseObj);
  logger = await logout();
  callback(null, response);

  function login() {
    return new Promise(function (resolve, reject) {
      const uName = context.SFDC_USER;
      const token = context.SFDC_TOKEN;
      const oldpword = context.SFDC_PWORD;
      const pWord = oldpword + token;
      conn.login(uName, pWord, function (err, userInfo) {
        if (err) { console.log('This is the error from the login attempt: ' + err) }
        console.log('In the login function, here is access token: ' + conn.accessToken);
        resolve('success');
      });
    })
  }

  function logout() {
    return new Promise(function (resolve, reject) {
      conn.logout(function (err) {
        if (err) { return console.error(err); }
        console.log('Logout');
        resolve('success');
      });
    })
  }

  function sfdcQuery(qs) {
    return new Promise(function (resolve, reject) {
      var records = [];
      conn.query(qs, function (err, result) {
        if (err) {
          console.error('There has been a failure with the SFDC query, message is: ' + err);
          resolve(err);
        }
        console.log("ID: " + result.records[0].firstName__c);
        resolve(result.records[0]);
      });
    })
  }


};




