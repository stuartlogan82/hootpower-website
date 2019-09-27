exports.handler =  async function(context, event, callback) {
    let response = new Twilio.Response();
     response.appendHeader("Access-Control-Allow-Origin", "*");
     response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST GET");
     response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
     response.appendHeader("Content-Type", "application/json");
     
   
   console.log('This has started');
   const jsforce = require('jsforce');

   //get the input data
   try{
    var status = '';
    var employeeId = event.employeeId;
    var customerId = event.customerId;
    var type = event.type;
    var description = event.description;
    var timeSlot = event.timeSlot;
    var date = event.date;
    if((!event.status)||(event.status === '')){
        status = 'open';
    }
    else{
        status = event.status;
    }
    var date = event.date;
   }
   catch(err){
       console.log('Error experienced in input assignment: ',err)
       response.setStatusCode(500);
       response.setBody({error: err});
       callback(null, response);
   }

   //have got input now log into SFDC
   const conn = new jsforce.Connection();
   let logger = await login();

   //create the new meter reading record
   let insertObject = {};
   insertObject.Employee__c	 = employeeId;
   insertObject.Customer__c	= customerId;
   insertObject.type__c	= type;
   insertObject.description__c = description;
   insertObject.timeSlot__c	= timeSlot;
   insertObject.status__c = status;
   insertObject.jobDate__c = date;

   let job = await jobCreate(insertObject);
   if(job === 'failed'){
       //The insert failed
       let logOut = await logout();
        let responseObj = {
            jobID: 'failed'
        }
        response.setStatusCode(500);
        response.setBody(responseObj);
        callback(null, response);
   }
   //construct the response
   let responseObj = {
    jobID: job
   };
   response.setStatusCode(200);
   response.setBody(responseObj);
   callback(null, response);
   
   function login(){
       return new Promise(function(resolve, reject){
           const uName = context.SFDC_USER;
           const token = context.SFDC_TOKEN;
           const oldpword = context.SFDC_PWORD;
           const pWord = oldpword+token;
           conn.login(uName, pWord, function(err, userInfo){
             if(err) { console.log('This is the error from the login attempt: '+err)}
             console.log('In the login function, here is access token: '+conn.accessToken);
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
   
function jobCreate(inp){
    return new Promise(function(resolve, reject){
        conn.sobject("Job__c").create(inp, function(err, ret) {
            if (err || !ret.success) { 
              console.error('There has been a failure in the SFDC task creation request, here is the error: '+err);
              resolve('failed'); 
            }
            console.log("Created task record id : " + ret.id);
            resolve(ret.id);
          });
    })
}

   //Create a date reference for the SFDC record (dd-mm-yyyy format)
function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [day, month, year].join('/');
  }
 
   
};