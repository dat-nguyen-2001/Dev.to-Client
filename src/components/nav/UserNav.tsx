import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { usernameState } from '../../atoms/usernameAtom';
import { useRecoilState } from 'recoil'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import usersApi from '../../api/users.api';

const UserNav = () => {
    const { getUserInfo } = usersApi;

    const [username, setUserName] = useRecoilState(usernameState);
    const [openDropMenu, setOpenDropMenu] = useState(false);
    const navigate = useNavigate();
    const signOut = function () {
        sessionStorage.clear();
        setUserName('');
        navigate('/enter');
    }

    const [user, setUser] = useState<any>()

    useEffect(() => {
        username !== undefined && getUserInfo(username).then(data => {
            const userFound = data.data[0]
            setUser(userFound);
        })
    }, [])

    return (
        <div className='flex space-x-2 mr-3'>
            <div className='w-10 h-10 rounded-lg cursor-pointer md:hidden hover:text-[blue]/70 hover:bg-[#e2e3f3]'>
                <SearchIcon fontSize='large' className='my-auto pt-2 pl-2' />
            </div>
            <a href={"/new"} className="hidden md:inline">
                <button className='min-w-[120px] h-[40px] border-solid border-[#3e51e0] border-2 rounded-md text-[#3e51e0] font-semibold hover:bg-[#3e51e0] hover:text-white hover:underline'>
                    Create Post
                </button>
            </a>
            <div className='w-10 h-10 rounded-lg cursor-pointer hover:text-[blue]/70 hover:bg-[#e2e3f3]'>
                <NotificationsIcon fontSize='large' className='my-auto pt-2 pl-2' />
            </div>
            <div className='relative' tabIndex={0} onBlur={() => setOpenDropMenu(false)}>
                <div className='w-8 h-8 rounded-full cursor-pointer hover:text-[blue]/70 hover:bg-[#e2e3f3]'>
                    <img src={user && user.profile_pic !== '' && user.profile_pic !== undefined ? user.profile_pic : 'https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png'} className='w-8 h-8 mt-1 rounded-full' onClick={() => setOpenDropMenu(prevState => !prevState)} />
                </div>
                {openDropMenu ?
                    <div className='flex flex-col space-y-3 absolute top-10 right-0 w-[250px] z-1 bg-white rounded border-[.1em] pt-2 px-2' >
                        <div className='space-y-1' onClick={() => {
                            // navigate to the user's page, also reload the page
                            navigate(`/${username}`);
                            window.location.reload()
                        }}>
                            <p className='dropMenu'>
                                @{username}
                            </p>
                        </div>
                        <hr></hr>
                        <div className='flex flex-col space-y-1'>
                            <div className='dropMenu' onClick={() => navigate(`/`)}>Dash Board</div>
                            <div className='dropMenu' onClick={() => navigate(`/new`)}>Create Post</div>
                            <div className='dropMenu' onClick={() => navigate(`/readinglist`)}>Reading List</div>
                        </div>
                        <div className='pb-2 space-y-1'>
                            <hr></hr>
                            <p className='dropMenu' onClick={signOut}>
                                Sign Out
                            </p>
                        </div>
                    </div> : null}
            </div>
        </div>
    )
}

export default UserNav