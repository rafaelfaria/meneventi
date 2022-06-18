const { forgotPasswordTemplate } = require('./templates/forgot-password');
const { verificationTemplate } = require('./templates/verification');
const { createUserTemplate } = require('./templates/created-user');

exports.handler = async (event, context) => {
  try {
		let { request, triggerSource } = event;
		let { userAttributes } = request;

		switch(triggerSource) {
      case 'CustomMessage_AdminCreateUser':
				event.response.emailSubject = 'Welcome to the Meneventi';
				event.response.emailMessage =  createUserTemplate(event, userAttributes);
      break;
			case 'CustomMessage_ResendCode':
			case 'CustomMessage_SignUp':
        event.response.smsMessage = 'Welcome to Meneventi. Your verification code is ' + event.request.codeParameter;
				event.response.emailSubject = 'Meneventi - Verification Code';
				event.response.emailMessage =  verificationTemplate(event, userAttributes);
			break;
			case 'CustomMessage_ForgotPassword':
				event.response.emailSubject = 'Meneventi - Forgot Password';
 				event.response.emailMessage =  forgotPasswordTemplate(event, userAttributes);
			break;
		}

    console.log('new...');
    console.log(event);

    context.done(null, event);

    return event;
	} catch (err) {
		console.log(err);
	}
};