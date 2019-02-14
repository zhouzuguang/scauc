import { post ,get } from './index';
import { FEEDBACKS }from './urls';


export const postFeedBack = function(feedBack){
    return post(FEEDBACKS,feedBack);
}

export const getFeedBacks = function(query){
    return get(FEEDBACKS+query);
}
