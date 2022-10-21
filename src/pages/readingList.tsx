import React from 'react'

import Layout from '../components/Layout';
import ReadingListBlock from '../components/ReadingListBlock';

import usersApi from '../api/users.api';

import { useRecoilValue } from 'recoil';
import { usernameState } from '../atoms/usernameAtom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const { getUserInfo } = usersApi

const ReadingList = () => {
    const navigate = useNavigate()

    // If user is not logged in, redirect to the log in page
    const username = useRecoilValue(usernameState)
    useEffect(() => {
        if (!username) {
            navigate('/enter')
        }
    }, [])

    const [reading_list, setReadingList] = useState<any[]>([])
    const curUsername = useRecoilValue(usernameState)
    useEffect(() => {
        getUserInfo(curUsername).then(res => setReadingList(res.data[0].reading_list))
    }, [])
    return (
        <Layout title="Reading List - DEV Community 👩‍💻👨‍💻">
            <div className="px-2 flex flex-col space-y-4 mx-auto md:w-[85vw] md:flex-row">
                <h1 className='md:pt-3 text-[1.5em] md:text-[1.75em] lg:text-[2em] font-[770] md:w-[45%] md:text-center lg:w-[30%]'>Reading list ({reading_list.length})</h1>
                <div className='flex flex-col space-y-5'>
                    <div className="searchWrapper bg-white w-full items-center text-center h-[40px] border-[1.5px] border-black/50 rounded-md">
                        <input
                            placeholder="Search..."
                            className={`w-[95%] h-[100%] outline-none pl-1 md:pl-5`} />
                    </div>
                    <div className='flex flex-col space-y-2 text-left'>
                        {reading_list.map(article => {
                            return (
                                <div key={article.id}>
                                    <ReadingListBlock article={article} />
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default ReadingList
