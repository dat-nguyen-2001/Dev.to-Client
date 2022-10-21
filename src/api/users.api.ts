const axios = require('axios').default;

async function getUserInfo (username: string) {
    const user = await axios.get(`http://localhost:4000/users/${username}`);
    return user;
};

const signIn = async (email: string, password: string) => {
    const res = await axios.post('http://localhost:4000/users/signin', { email, password })
        .catch(() => {
            alert('Invalid credentials!');
            return null
        });
    const token = res.data.accessToken;
    return token;
};

const signUp = async (email: string, password: string) => {
    const result = await axios.post('http://localhost:4000/users/signup', { email, password })
    if(!result) return false;
    return true;
};

const changeProfilePicture = async (username: string, url: string) => {
    await axios.post('http://localhost:4000/users/profile', {username, url})
}

const likeArticle = async(articleId: number) => {
    await axios.post('http://localhost:4000/likes', {articleId}, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
}

const getLikedArticles = async() => {
    const res = await axios.get('http://localhost:4000/likes', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
    return res.data
}

const commentOnArticle = async(content: string, articleId: number) => {
    await axios.post('http://localhost:4000/comments', {content, articleId}, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
}

const usersApi = {commentOnArticle, getUserInfo, signIn, signUp, changeProfilePicture, likeArticle, getLikedArticles}

export default usersApi