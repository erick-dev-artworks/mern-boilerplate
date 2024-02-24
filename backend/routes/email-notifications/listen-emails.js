const listCollection = require('../../connectors/listCollection')
const nodemailer = require('nodemailer');
const configuration = require('../../configuration');
const signalSuccess = require('./emails/welcome');
const signalSuccess2 = require('./emails/verify-code');
const signalChangePW = require('./emails/change-pw');
const signalChangePWSuccess = require('./emails/change-pw-success')
const signalChangePWVerify = require('./emails/change-pw-verify');
const verifyNewDevice = require('./emails/verify-device');
const newEmailChange = require('./emails/new-emailchange')

async function completeEmailForms(username, notificationtype, data){
  try{
    var currentNotifications = []
    if(notificationtype !== 'changepw'){
      currentNotifications = await listCollection('usersEMAIL', username)
  
    }
  
    var transporter  = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: configuration[0]['emailServer'],
          pass: configuration[0]['emailPw']
      }
    });
  
  
    if(notificationtype == 'verify-email-change'){
      var output = await newEmailChange(data)
      var mailOptions = {
        from: `<youremail@gmail.com>`,
        to: username,
        subject: 'New Email Request - Verify !',
        text: 'Description ',
        html: output,
      };
    
      transporter.sendMail(mailOptions, async function(error, info) {
        if (error){
          // console.log(error);
        } else {
          // console.log('Email sent: ' + info.response);
        }
      });
    }
    if(notificationtype == 'device-new'){
      var output = await verifyNewDevice(data)
      var mailOptions = {
        from: `<youremail@gmail.com>`,
        to: username,
        subject: 'New Device - Verify !',
        text: 'Description ',
        html: output,
      };
    
      transporter.sendMail(mailOptions, async function(error, info) {
        if (error){
          // console.log(error);
        } else {
          // console.log('Email sent: ' + info.response);
        }
      });
    }
    if(notificationtype == 'pwcode'){
      var output = await signalChangePWVerify(data)
      var mailOptions = {
        from: `<youremail@gmail.com>`,
        to: username,
        subject: 'Reset Password - Verify !',
        text: 'Description ',
        html: output,
      };
    
      transporter.sendMail(mailOptions, async function(error, info) {
        if (error){
          // console.log(error);
        } else {
          // console.log('Email sent: ' + info.response);
        }
      });
    }
  
    if(notificationtype == 'pwsuccess'){
      var output = await signalChangePWSuccess(data)
      var mailOptions = {
        from: `<youremail@gmail.com>`,
        to: username,
        subject: 'Reset Password - Success !',
        text: 'Description ',
        html: output,
      };
    
      transporter.sendMail(mailOptions, async function(error, info) {
        if (error){
          // console.log(error);
        } else {
          // console.log('Email sent: ' + info.response);
        }
      });
    }
      if(notificationtype == 'changepw'){
        var output = await signalChangePW(data)
        var mailOptions = {
          from: `<youremail@gmail.com>`,
          to: username,
          subject: 'Reset Password !',
          text: 'Description ',
          html: output,
        };
      
        transporter.sendMail(mailOptions, async function(error, info) {
          if (error){
            // console.log(error);
          } else {
            // console.log('Email sent: ' + info.response);
          }
        });
      }
      if(notificationtype == 'welcome'){
          if(currentNotifications.length > 0){
              if(currentNotifications[0].emailverification.length > 0 & currentNotifications[0].isEnabled === "true"){
                var output = await signalSuccess(data)
                var mailOptions = {
                  from: `<youremail@gmail.com>`,
                  to: currentNotifications[0].email,
                  subject: 'Welcome to Bitblock!',
                  text: 'Description ',
                  html: output,
                };
              
                transporter.sendMail(mailOptions, async function(error, info) {
                  if (error){
                    // console.log(error);
                  } else {
                    // console.log('Email sent: ' + info.response);
                  }
                });      
        
              }     
          }    
      }
      if(notificationtype == 'verify'){
          if(currentNotifications.length > 0){
              if(currentNotifications[0].emailverification.length > 0 & currentNotifications[0].isEnabled === "true"){
                var output = await signalSuccess2(data)
                var mailOptions = {
                  from: `<youremail@gmail.com>`,
                  to: currentNotifications[0].email,
                  subject: 'Welcome to Bitblock!',
                  text: 'Description ',
                  html: output,
                };
              
                transporter.sendMail(mailOptions, async function(error, info) {
                  if (error){
                    // console.log(error);
                  } else {
                    // console.log('Email sent: ' + info.response);
                  }
                });      
        
              }     
          }    
      }
  } catch(e){
    if(e !== undefined){
      return 1
    }
  }
    
}

module.exports = completeEmailForms
