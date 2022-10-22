import React from 'react'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import articlesApi from '../api/articles.api';
import usersApi from '../api/users.api';

import { useState, useEffect } from 'react';
import { usernameState } from '../atoms/usernameAtom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

const { calMinuteRead, saveArticle } = articlesApi;
const {likeArticle, getLikedArticles} = usersApi;

const ArticleBlock = ({ article }: any) => {
    const tags = article.tags.split(',');
    const navigate = useNavigate();
    // Check if the article is saved by the current user
    const listed_usernames = article.listed_users.map((user: any) => user.username);
    const curUser = useRecoilValue(usernameState)
    const [isSaved, setIsSaved] = useState<Boolean>(listed_usernames.includes(curUser));

    const handleSaveArticle = async () => {
        // If user is not logged in, redirect to the log in page
        if (!curUser) {
            return navigate('/enter')
        }

        setIsSaved((prevState) => !prevState)
        const articleId = Number(article.id);
        await saveArticle(articleId)
    }

    const [likedArticles, setLikedArticles] = useState<number[]>([])
    const [isLiked, setIsLiked] = useState<Boolean>(false)
    const [reacts, setReacts] = useState<number>(article.reactions)
    const handleLikeArticle = async() => {
        if(!curUser) {
            return navigate('/enter')
        }
        if(isLiked) {
            setReacts(prevValue => prevValue - 1)
        } else {
            setReacts(prevValue => prevValue + 1)
        }
        setIsLiked(prevState => !prevState);
        const articleId = Number(article.id)
        await likeArticle(articleId)
    }
    // calculate the minute read of an article
    const minuteRead = calMinuteRead(article.content)

    useEffect(() => {
        getLikedArticles().then(data => {setLikedArticles(data)
        setIsLiked(data.includes(Number(article.id)))})
    },[])

    return (
        <div className="flex flex-col space-y-2 bg-white rounded-md mx-auto border-[#d3d3d3] border-[.2px] py-8">
            {article.coverImage !== "" && <img src={article.coverImage} className='rounded-t-md w-auto md:h-[250px]' />}
            <a href={`/${article.user.username}`} className='flex items-center space-x-1 cursor-pointer px-3 py-1'>
                <div className='w-8 h-8 rounded-full cursor-pointer'>
                    <img src={article.user.profile_pic ? article.user.profile_pic : 'https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png'} className='rounded-full w-8 h-8' />
                </div>
                <div className='font-semibold'><i>@{article.user.username}</i></div>
            </a>
            <a href={`/${article.user.username}/${article.title}`}>
                <div className='px-4 text-[1.3em] lg:text-2xl font-bold hover:text-blue-700 cursor-pointer md:pl-12'>{article.title}</div>
            </a>
            <div className='px-3 flex space-x-2 flex-wrap text-[.9rem] md:pl-12'>
                {tags.map((tag: string) => (
                    <a key={tag} href={`./?tag=${tag}`} className='hover:bg-[#e5e5e5] border-[white] border-[.2px] hover:border-[#d3d3d3] rounded-md cursor-pointer px-1 py-1'>#{tag}</a>
                ))}
            </div>
            <div className='px-3 flex space-between items-center md:pl-12'>
                <div className='flex space-x-5 items-center'>
                    <div className='flex'>
                        {isLiked? 
                        <FavoriteIcon className='cursor-pointer mt-1 text-[red]' onClick={handleLikeArticle}/> 
                        : 
                        <FavoriteBorderIcon className='cursor-pointer mt-1' onClick={handleLikeArticle} />
}
                        <p className='lg:hover:bg-[#f5f5f5] px-2 rounded cursor-pointer py-1'>{reacts}
                            <span className='hidden lg:inline'> Reactions</span></p>
                    </div>
                    <div className='flex space-x-1'>
                        <div className='w-5 h-5'>
                            <ChatBubbleOutlineIcon className='cursor-pointer mt-1' />
                        </div>
                        <p className='lg:hover:bg-[#f5f5f5] px-2 rounded cursor-pointer py-1'>{article.comments.length}<span className='hidden lg:inline'> Comments</span></p>
                    </div>
                </div>
                <div className='flex space-x-3 items-center'>
                    <div>{minuteRead} min read</div>
                    <div>
                        {isSaved ?
                            <span className='articleIcon text-[#4f46e5]' onClick={handleSaveArticle}>
                                <BookmarkIcon />
                            </span> 
                            :
                            <span className='articleIcon hover:text-[#4f46e5]' onClick={handleSaveArticle}>
                                <BookmarkBorderIcon />
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ArticleBlock 