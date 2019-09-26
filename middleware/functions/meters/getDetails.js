exports.handler = async function (context, event, callback) {
    let response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
    response.appendHeader("Content-Type", "application/json");


    console.log('This has started');
    const jsforce = require('jsforce');
    var input = event.mpan;

    console.log('input is ', input);
    const conn = new jsforce.Connection();

    let logger = await login();
    console.log('This is the response from login: ', logger);
    var queryString = `SELECT Name, Id, mpan__c, type__c FROM Meter__c where mpan__c = '${input}'`;
    let results = await sfdcQuery(queryString);
    response.setBody(results);
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
        var records = [];
        return new Promise(function (resolve, reject) {
            var query = conn.query(qs)
                .on("record", function (record) {
                    let responseObj = {
                        name: record.Name,
                        mpan: record.mpan__c,
                        type: record.type__c,
                        meterId: record.Id
                    };
                    records.push(responseObj);
                })
                .on("end", function () {
                    console.log("total in database : " + query.totalSize);
                    console.log("total fetched : " + query.totalFetched);
                    resolve(records);
                })
                .on("error", function (err) {
                    console.error(err);
                    resolve(err);
                })
                .run({ autoFetch: true, maxFetch: 1000 }); // synonym of Query#execute();
        })
    }
};