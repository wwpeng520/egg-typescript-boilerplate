import User from './user';
import UserInfo from './user_info';
import VideoShare from './video_share';
import VerifyCode from './verify_code';

declare module 'egg' {
    export interface IService {
        user: User;
        userInfo: UserInfo;
        videoShare: VideoShare;
        verifyCode: VerifyCode;
    }
}
