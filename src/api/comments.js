import { get, post } from './index.js';
import { COMMENTS } from './urls.js';

export const getCommentsByArticleId = function(id){
    return get(`${COMMENTS}?article_id=${id}`)
}

export const getCommentsByUserId = function(id){
    return get(`${COMMENTS}?user_id=${id}`)
}

export const saveComment = function(comment){
    return post(COMMENTS,comment);
}
