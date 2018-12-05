export const APP_NAME = 'hahaha';
export const VerifyCodeState = {
    Created: -1,
    Success: 1,
    Expired: -2,
};

export const VerifyCodeType = {
    SMSRegister: 'sms_register',
    SMSLogin: 'sms_login',
    SMSInviteRegister: 'sms_invite_register',
};

export const LoginType = {
    PASSWORD_LOGIN: 'password',
    SMS_LOGIN: 'sms',
};

export const TIME_SECONDS = {
    ONE_HOUR: 60 * 60,
    ONE_DAY: 60 * 60 * 24,
    ONE_WEEK: 60 * 60 * 24 * 7,
};
