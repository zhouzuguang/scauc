import { get, post , put , del} from './index.js';
import { ARTICLES } from './urls.js';

export const getArticle = function(id){
    return get(`${ARTICLES}?_id=${id}`)
}

export const postArticle = function(data){
    return post(ARTICLES,data);
}

export const getArticles = function(query){
    return get(ARTICLES + query);
}

export const deleteArticle = function(id){
    return del(ARTICLES + '/' + id)
}

export const updateArticle = function(id,data){
    return put(ARTICLES + '/' + id,data)
}

export const updateByArticleId = function(id,article){
        return put(ARTICLES + '/' +id,article);
}
