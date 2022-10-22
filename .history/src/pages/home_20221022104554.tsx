
import articlesApi from '../api/articles.api';
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import ArticleBlock from '../components/ArticleBlock'
import SideBar from '../components/SideBar'
import RightSideBar from '../components/RightSideBar'
import { useLocation } from 'react-router-dom';
import React from "react";
import usersApi from '../api/users.api'
import { useRecoilValue } from 'recoil';
import { usernameState } from '../atoms/usernameAtom';

import Spinner from '../components/Spinner';


const {getUserInfo} = usersApi
const {getArticles, getArticlesByTag, getArticlesBySearch} = articlesApi;

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const HomePage = () => {

  const curUsername = useRecoilValue(usernameState)

  //Extract filter, search if any
  let query = useQuery();
  const tag = query.get('tag');
  const search = query.get('search');
  // Fetch articles from the database
  const [articles, setArticles] = useState<any[]>([])

  // Handle sorting artic
  const [sortByLatest, setSortByLatest] = useState<Boolean>(true)

  const sortLatest = (data: Array<any>) => {
    return data.sort(function(a: any,b: any){return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()})
  }
  const sortPopularity = (data: Array<any>) => {
    return data.sort(function(a: any,b: any){return b.reactions - a.reactions})
  }

  function handleSortByLatest() {
    setSortByLatest(true)
  }

  function handleSortByPopularity() {
    setSortByLatest(false)
  }

  //Get all the articles liked by current user
  useEffect(() => {

    if(tag) {
      getArticlesByTag(tag).then(data => {
        setArticles(sortByLatest ? sortLatest(data) : sortPopularity(data))
      })
    } else if(search) {
      getArticlesBySearch(search).then(data => {
        setArticles(sortByLatest ? sortLatest(data) : sortPopularity(data))
      })
    } else {
      getArticles().then(data => {
        setArticles(sortByLatest ? sortLatest(data) : sortPopularity(data))
      })
    }
  }, [sortByLatest])

  //Handle infinite scrolling
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const handleScroll = function() {
    setLoading(true)
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    if(windowHeight + scrollTop + 150 >= scrollHeight) {
      console.log()
      setPage(prev => prev+1);
      setLoading(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  

  const [readingListNumber, setReadingListNumber] = useState<number>(0)
  useEffect(() => {
    getUserInfo(curUsername).then(data => setReadingListNumber(data.data[0].reading_list.length))
  }, [])

  return (
    <Layout title="DEV Community 👩‍💻👨‍💻">
      <div className='md:grid grid-cols-7 lg:grid-cols-10 2xl:px-32'>
        <div className='hidden md:inline col-span-2'>
          <SideBar readingListNumber={readingListNumber}/>
        </div>
        <div className='col-span-5 px-2'>
          <div className='flex space-x-2 text-[1.2rem] font-semibold'>
            <div className={`cursor-pointer hover:text-blue-700 px-2 py-2 mb-2 sm:hover:bg-white rounded-md ${sortByLatest ? 'font-bold': ''}`} onClick={handleSortByLatest}>Latest</div>
            <div className={`cursor-pointer hover:text-blue-700 px-2 py-2 mb-2 sm:hover:bg-white rounded-md ${!sortByLatest ? 'font-bold': ''}`} onClick={handleSortByPopularity}>Top</div>
          </div>
          <div className='flex flex-col space-y-2'>
            {articles.slice(0, 10 * page).map(article => {
              return (
                <div key={article.id}>
                  <ArticleBlock article={article}/>
                </div>
              )
            })}
            {loading &&<div className='pt-10 w-[10%] mx-auto'> <Spinner /> </div>}
          </div>
        </div>
        <div className='hidden lg:inline col-span-3'>
          <RightSideBar />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage


