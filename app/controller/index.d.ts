import VideoShare from './video_share';
import User from './user';

declare module 'egg' {
    export interface IController {
        videoShare: VideoShare;
        user: User;
    }
}
