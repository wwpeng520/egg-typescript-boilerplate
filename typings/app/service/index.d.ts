// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportSms from '../../../app/service/sms';
import ExportUser from '../../../app/service/user';
import ExportUserInfo from '../../../app/service/user_info';
import ExportVerifyCode from '../../../app/service/verify_code';
import ExportVideoShare from '../../../app/service/video_share';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    sms: ExportSms;
    user: ExportUser;
    userInfo: ExportUserInfo;
    verifyCode: ExportVerifyCode;
    videoShare: ExportVideoShare;
  }
}
