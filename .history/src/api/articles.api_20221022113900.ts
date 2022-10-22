const axios = require('axios').default;

const getArticles = async () => {
    const res = await axios.get('https://devtobackend.herokuapp.com/articles')
    return res.data;
};

const getArticlesByTag = async function (tag: string) {
    const res = await axios.get(`https://devtobackend.herokuapp.com/articles?tag=${tag}`)
    return res.data
}

const getArticlesBySearch = async function (search: string) {
    const res = await axios.get(`https://devtobackend.herokuapp.com/articles?search=${search}`)
    return res.data
}

const getArticlesByUser = async function (username: string) {
    const res = await axios.get(`http://devtobackend.herokuapp.com/articles/${username}`)
    return res.data
}


const createArticle = async function (title: string, content: string, tags: string, coverImage: string) {
    await axios.post('http://devtobackend.herokuapp.com/articles/create', {title, content, tags, coverImage}, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
}

const calMinuteRead = (content: string) => {
    const wordsCount = content.split(" ").length;
    // Assume that an average person read 200 words per minute
    return Math.ceil(wordsCount/200)
}

const saveArticle = async(id: number) => {
    await axios.put(`http://devtobackend.herokuapp.com/articles/save/${id}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
}

const articlesApi = {getArticles,getArticlesByTag, getArticlesBySearch, getArticlesByUser ,createArticle, calMinuteRead, saveArticle}
export default articlesApi