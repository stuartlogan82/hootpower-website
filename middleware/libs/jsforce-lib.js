const jsforce = require('jsforce');
const conn = new jsforce.Connection();

export function login() {
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

export function logout() {
    return new Promise(function (resolve, reject) {
        conn.logout(function (err) {
            if (err) { return console.error(err); }
            console.log('Logout');
            resolve('success');
        });
    })
}

export function sfdcQuery(qs) {
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