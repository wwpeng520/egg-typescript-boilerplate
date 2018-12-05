// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaike from '../../../app/model/baike';
import ExportConfig from '../../../app/model/config';
import ExportGtpPic from '../../../app/model/gtp_pic';
import ExportUser from '../../../app/model/user';
import ExportUserInfo from '../../../app/model/user_info';
import ExportVerifyCode from '../../../app/model/verify_code';
import ExportVideoShare from '../../../app/model/video_share';
import ExportVideoTutorialEpisode from '../../../app/model/video_tutorial_episode';
import ExportVideoTutorialSeries from '../../../app/model/video_tutorial_series';

declare module 'sequelize' {
  interface Sequelize {
    Baike: ReturnType<typeof ExportBaike>;
    Config: ReturnType<typeof ExportConfig>;
    GtpPic: ReturnType<typeof ExportGtpPic>;
    User: ReturnType<typeof ExportUser>;
    UserInfo: ReturnType<typeof ExportUserInfo>;
    VerifyCode: ReturnType<typeof ExportVerifyCode>;
    VideoShare: ReturnType<typeof ExportVideoShare>;
    VideoTutorialEpisode: ReturnType<typeof ExportVideoTutorialEpisode>;
    VideoTutorialSeries: ReturnType<typeof ExportVideoTutorialSeries>;
  }
}
