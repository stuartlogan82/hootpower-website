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
    var queryString = `SELECT comments__c, Customer__c, description__c, Employee__c, jobDate__c, status__c, timeSlot__c, type__c FROM Job__c where Customer__c = '${input}'`;
    let sForceQuery = await sfdcQuery(queryString);

    let responseObj = {
        id: sForceQuery.refNumber__c,
        description: sForceQuery.description__c,
        employeeID: sForceQuery.Employee__c,
        customerID: sForceQuery.Customer__c,
        type: sForceQuery.type__c,
        jobDate: sForceQuery.jobDate__c,
        timeSlot: sForceQuery.timeSlot__c,
        status: sForceQuery.status__c,
        comments: sForceQuery.comments__c
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