import React from 'react'

import { useParams } from "react-router-dom";
// import getUserInfo from "../utils/getUserInfo";
import { useState, useEffect } from 'react'
import Layout from "../components/Layout";
import ArticleBlock from "../components/ArticleBlock";
import usersApi from "../api/users.api";
import articlesApi from "../api/articles.api";

const axios = require('axios').default;

const { getArticlesByUser } = articlesApi;
const { getUserInfo, changeProfilePicture, getLikedArticles } = usersApi

function User() {

  // Get the user info
  let { username } = useParams();
  const [profile_pic, setProfilePic] = useState<string>('');
  const [articles, setArticles] = useState<any[]>([]);
  //Get all the articles liked by current user
  const [likedArticles, setLikedArticles] = useState<number[]>([])

  useEffect(() => {
    username !== undefined && getUserInfo(username).then(data => {
      const userFound = data.data[0]
      setProfilePic(userFound.profile_pic);
      getArticlesByUser(userFound.username).then(res => setArticles(res))
      // Fetch articles liked by current user
      getLikedArticles().then(data => setLikedArticles(data))
    })
  }, [])

  //Handle preview and upload image to Cloudinary
  const [url, setUrl] = useState<string>("")
  const [files, setFiles] = useState<FileList | null>(null)
  const uploadImage = () => {
    const formData = new FormData();
    files !== null && formData.append('file', files[0]);
    formData.append('upload_preset', 'zlxlplxx');
    axios.post('https://api.cloudinary.com/v1_1/dfqafsyni/image/upload', formData)
      .then((res: any) => { res.data.url ? setUrl(res.data.url) : setUrl("") })
  }

  // Upload image to the Cloudinary
  useEffect(() => {
    if (files !== null) {
      uploadImage();
    }
  }, [files]
  )

  // Handle change profile image, reload to update
  useEffect(() => {
    if (url === "") return;
    changeProfilePicture(sessionStorage.username, url).then(() => window.location.reload())
  }, [url])


  return (
    <Layout title={`${username} - DEV Community 👩‍💻👨‍💻`}>
      <div className="bg-white rounded-lg py-10 w-[90vw] mx-auto sm:w-[80vw] md:w-[60vw] lg:w-[40vw] mb-[50px]">
        {/* if the user is logged in && authorization, let them change the profile picture */}
        {sessionStorage.getItem('username') === username ? <div className="mx-auto w-[40%] text-center flex flex-col space-y-4">
          <form>
            <input type="file" name='file' id='file' onChange={(e) => { setFiles(e.target.files) }} className='w-0 h-0 opacity-0 overflow-hidden absolute z-[-1] ' />
            <label htmlFor='file' className='cursor-pointer'>
              <img className="mx-auto rounded-full w-20 h-20" src={profile_pic !== '' && profile_pic !== undefined ? profile_pic : 'https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png'} />
            </label>
            <h3 className="font-bold text-xl">{username}</h3>
          </form>
        </div> :
          <div className="mx-auto w-[40%] text-center flex flex-col space-y-4">
            <img className="mx-auto rounded-full w-20 h-20" src={profile_pic !== '' && profile_pic !== undefined ? profile_pic : 'https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png'} />
            <h3 className="font-bold text-xl">{username}</h3>
          </div>}
      </div>
      <div className='flex flex-col space-y-2 w-[90vw] mx-auto sm:w-[80vw] md:w-[60vw] lg:w-[40vw]'>
        {articles.map(article => {
          return (
            <div key={article.id}>
              <ArticleBlock article={article} liked={likedArticles.includes(Number(article.id))} />
            </div>
          )
        })}
      </div>
    </Layout>
  );
}

export default User