Meteor.methods({

  sendPropertyEmail: function(emailData , mailObject , template) {
    //emaildata is an object coming from the client
    let mail = mailObject;
    mail.from = mailObject.from;
    mail.name = mailObject.name;
    mail.to = mailObject.to //this should be an array
    mail.subject = mailObject.subject;

    let emailTemplate = template;
    let emaildata = emailData;
    let body = EmailGenerator.generateHtml(emailTemplate , emailData);

    Meteor.call("sendMailgunEmail",
                mail.from,
                mail.name,
                mail.to,
                mail.subject,
                body);
            }
});