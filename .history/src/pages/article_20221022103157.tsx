import React from 'react'

import articlesApi from '../api/articles.api'
import usersApi from '../api/users.api'
import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useRecoilValue } from 'recoil';
import { usernameState } from '../atoms/usernameAtom';
import { useForm, SubmitHandler } from 'react-hook-form';

const { getArticlesByUser, saveArticle } = articlesApi
const { getLikedArticles, likeArticle, getUserInfo, commentOnArticle } = usersApi;

interface CommentInfo {
    content: string
}

const ArticlePage = () => {
    const curUsername = useRecoilValue(usernameState);
    const [curUser, setCurUser] = useState<any>(null)
    const navigate = useNavigate();
    // STATES

    // username from the params, aka username of the article's author
    const { username, title } = useParams();

    // username of the user, aka 'me' - who are signing in
    const signedInUsername = useRecoilValue(usernameState)

    // main article
    const [article, setArticle] = useState<any>()

    //Comments from the main article
    const [comments, setComments] = useState<any[]>([])

    // other articles from the same author
    const [otherArticles, setOtherArticles] = useState<any>()
    const [tagsList, setTagsList] = useState([])

    //All articles liked by current user
    const [likedArticles, setLikedArticles] = useState<number[]>([])

    // Render the main article and other articles from the same author / user
    useEffect(() => {
        if (curUsername) {
            getLikedArticles().then(data => setLikedArticles(data))
            getUserInfo(curUsername).then(data => setCurUser(data.data[0]))
        }
        username !== undefined && getArticlesByUser(username).then(data => {
            // Set the main article
            const filteredArticle = data.filter((article: any) => article.title === title);
            setArticle(filteredArticle[0]);

            // Set comments of the main article
            setComments(filteredArticle[0].comments)

            // Set number of reactions
            setReacts(filteredArticle[0].reactions)

            //Set 3 other articles of the user
            const others = data.filter((article: any) => article.title !== title);
            setOtherArticles(others.slice(0, 3));

            setTagsList(filteredArticle[0].tags.split(','))

            // Set listed_usernames, aka who has added the article to their reading_list
            const listed_usernames = filteredArticle[0].listed_users.map((user: any) => user.username);
            setIsSaved(listed_usernames.includes(signedInUsername))
        })
    }, [])

    useEffect(() => {
        if (article !== undefined && article.id) {
            setIsLiked(likedArticles.includes(Number(article.id)))
        }
    }, [article])

    // Handle saving article to the reading list
    // First, check if the article is already in the reading list
    const [isSaved, setIsSaved] = useState<Boolean>(false)
    const handleSaveArticle = async () => {
        if (!curUsername) {
            return navigate('/enter')
        }
        setIsSaved((prevState) => !prevState)
        const articleId = Number(article.id);
        await saveArticle(articleId)
    }

    //Like Article Handler
    const [isLiked, setIsLiked] = useState<Boolean>(false)
    const handleLikeArticle = async () => {
        if (!curUsername) {
            return navigate('/enter')
        }
        if (isLiked) {
            setReacts(prevValue => prevValue - 1)
        } else {
            setReacts(prevValue => prevValue + 1)
        }
        setIsLiked(prevState => !prevState);
        const articleId = article ? Number(article.id) : 0
        await likeArticle(articleId)
    }
    const [reacts, setReacts] = useState<number>(0)

    // Auto-resize textarea
    const textarea = document.querySelector('textarea');
    const handleResize = (e: any) => {
        const area = e.target;
        area.style.height = "auto";
        area.style.height = area.scrollHeight + "px";
    }
    if (textarea !== null) {
        textarea.addEventListener('input', handleResize)
    }

    //Handle comment area
    const {
        register,
        handleSubmit,
    } = useForm<CommentInfo>();
    const onSubmit: SubmitHandler<CommentInfo> = async ({ content }) => {
        await commentOnArticle(content, Number(article.id))
        window.location.reload()
    };
    const commentHandler = function () {
        if (!sessionStorage.getItem('username')) {
            return navigate('/enter')
        }
    }
    return (
        <Layout title={title}>
            {article !== undefined &&
                <div className='flex lg:px-10 2xl:px-32'>
                    {/* // Left side */}
                    <div className='hidden md:flex flex-col h-full  sticky top-[100px] z-[1] space-y-8 px-10 pt-[50px] lg:px-0 lg:pr-10'>
                        <div className='flex flex-col items-center '>
                            {isLiked ?
                                <span className="articleIcon bg-[pink] text-[red]">
                                    <FavoriteBorderIcon onClick={handleLikeArticle} />
                                </span>
                                :
                                <span className='articleIcon hover:bg-[pink] hover:text-[red]'>
                                    <FavoriteBorderIcon onClick={handleLikeArticle} />
                                </span>
                            }
                            <span>{reacts}</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='articleIcon hover:bg-[#f5ecdd] hover:text-[#f59e0b]'>

                                <ChatBubbleOutlineIcon />
                            </span>
                            <span>{article.comments.length}</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            {isSaved ?
                                <span className='articleIcon bg-[#e4e3f3] text-[#4f46e5] border-[1px] border-[#4f46e5]' onClick={handleSaveArticle}>
                                    <BookmarkIcon />
                                </span> :
                                <span className='articleIcon hover:bg-[#e4e3f3] hover:text-[#4f46e5]' onClick={handleSaveArticle}>
                                    <BookmarkBorderIcon />
                                </span>}
                            {/* <span>{article.listed_users.length}</span> */}
                        </div>
                    </div>
                    {/* // Content wrapper */}
                    <div className='w-full overflow-x-hidden bg-white flex flex-col space-y-3 px-0 md:mt-0 rounded-lg md:mr-5 pb-10 lg:basis-[70%]'>
                        {article.coverImage !== "" && <img src={article.coverImage} className="border-b-[1px] w-auto rounded-t-md" />}
                        <a href={`/${article.user.username}`} className='flex items-center space-x-1 cursor-pointer pl-5'>
                            <div className='w-8 h-8 rounded-full cursor-pointer'>
                                <img src={article.user.profile_pic ? article.user.profile_pic : 'https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png'} className='w-8 h-8 rounded-full' />
                            </div>
                            <div className='font-semibold'><i>@{article.user.username}</i></div>
                        </a>
                        <div className='font-bold text-2xl md:pl-10'>{article.title}</div>
                        <div className='flex space-x-3 md:pl-10'>
                            {tagsList.map((tag: string) => (
                                <div className={`px-2 py-1 rounded flex space-x-2 bg-[#e5e5e5]`} key={tag}>
                                    <a href={`../?tag=${tag}`} className="cursor-pointer">#{tag}</a>
                                </div>
                            ))}
                        </div>
                        <div className='md:px-10 whitespace-pre-wrap'>
                            {article.content}
                        </div>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <div className='md:px-10 flex flex-col space-y-5'>
                            <h1 className='text-2xl font-bold'>Top Comments ({article.comments.length})</h1>
                            <div className='flex space-x-2'>
                                <div className='w-8 h-8 rounded-full cursor-pointer'>
                                    <img src={curUser !== null && curUser.profile_pic ? curUser.profile_pic : 'https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png'} className='rounded-full w-8 h-8' />
                                </div>
                                <form className='w-full flex flex-col space-y-2 items-left'>
                                    <textarea {...register("content", { required: true })} onFocus={commentHandler} placeholder='Add to the discussion . . .' className='w-full h-[100px] px-3 pt-2 border-[#e5e5e5] border-[1px] rounded-md' />
                                    <button onClick={handleSubmit(onSubmit)} className='commentSubmit w-[100px] py-2 cursor-pointer rounded-md bg-blue-600 hover:bg-blue-800 text-white front-semibold text-[1.2em]'>Submit</button>
                                </form>
                            </div>
                            {comments.length ?
                                <div className='flex flex-col space-y-4'>
                                    {comments.sort(function (a: any, b: any) { return new Date(b.created_at).getTime() - new Date(a.created_at).getTime() }).map(comment => (
                                        <div className='flex space-x-2' key={comment.id}>
                                            <a className='w-8 h-8 rounded-full cursor-pointer' href={`/${comment.user.username}`}>
                                                <img src={comment.user.profile_pic ? comment.user.profile_pic : 'https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png'} className='rounded-full ư-8 h-8' />
                                            </a>
                                            <div className='w-full px-3 py-2 border-[#e5e5e5] border-[1px] rounded-md flex flex-col space-y-2'>
                                                <div className='flex space-x-3'>
                                                    <a className='font-semibold' href={`/${comment.user.username}`}>{comment.user.username}</a>
                                                    <p>{comment.created_at.substring(0, 10)}</p>
                                                </div>
                                                <p className='w-full text-[1.1em]'>{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                :
                                null}
                        </div>
                    </div>
                    {/* Right side */}
                    <div className='hidden lg:inline sticky top-[80px] rounded-lg bg-white px-3 py-5 h-full xl:px-8 basis-[30%] z-[0]'>
                        <a href={`/${article.user.username}`} className='flex items-center space-x-1 cursor-pointer mb-3'>
                            <div className='w-8 h-8 rounded-full cursor-pointer'>
                                <img src={article.user.profile_pic ? article.user.profile_pic : 'https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png'} className='rounded-full w-8 h-8' />
                            </div>
                            <div className='font-semibold'><i>@{article.user.username}</i></div>
                        </a>
                        <p className='text-lg font-semibold'>More from <a href={`/${article.user.username}`} className='text-[blue] cursor-pointer'>{article.user.username}</a></p>
                        {/* Other articles from the same user */}
                        <div>
                            {otherArticles.length === 0 ?
                                <p>Nothing to show here!</p>
                                :
                                <>
                                    {otherArticles.map((article: any) => (
                                        <div className='border-t-[1px] mt-3' key={article.id}>
                                            <a href={`/${article.user.username}/${article.title}`} className='text-lg text-[gray] hover:text-blue-800 cursor-pointer'>{article.title}</a>
                                            <div className='flex space-x-1 flex-wrap'>
                                                {article.tags.split(',').map((tag: string) => (
                                                    <div key={tag}>#{tag}  </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }
                        </div>
                    </div>
                </div>
            }
        </Layout>

    )
}

export default ArticlePage