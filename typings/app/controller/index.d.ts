// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportVideoShare from '../../../app/controller/video_share';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
    videoShare: ExportVideoShare;
  }
}
