exports.handler = async function (context, event, callback) {
    let response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    response.appendHeader("Content-Type", "application/json");


    console.log('This has started');
    const jsforce = require('jsforce');
    var input = event.id;

    console.log('input is ', input);
    const conn = new jsforce.Connection();

    let logger = await login();
    console.log('This is the response from login: ', logger);
    var queryString = `SELECT accountID__c, dayMonth__c, frequency__c FROM Schedule__c where Name = '${input}'`;
    let sForceQuery = await sfdcQuery(queryString);

    let responseObj = {
        id: sForceQuery.Name,
        accountId: sForceQuery.accountDet__c,
        amount: sForceQuery.amount__c,
        currencyType: sForceQuery.currencyType__c
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