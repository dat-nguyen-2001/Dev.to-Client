import React from 'react'

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

interface Props {
    readingListNumber: number
}
const SideBar = ({readingListNumber} : Props) => {
    return (
        <aside>
            <nav>
                <ul>
                    <li className="aside_icon">
                        <img src="/aside_icons/home.svg" width={20} />
                        <a href='/'>Home</a>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/reading_list.svg" width={20} />
                        <a href='/readinglist'>Reading List <b>({readingListNumber})</b></a>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/listings.svg" width={20} />
                        <span>Listings</span>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/podcast.svg" width={20} />
                        <span>Podcasts</span>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/video.svg" width={20} />
                        <span>Videos</span>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/tag.svg" width={20} />
                        <span>Tags</span>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/FAQ.svg" width={20} />
                        <span>FAQ</span>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/forem_shop.svg" width={20} />
                        <a href='https://shop.forem.com/' target="_blank" rel="noopener noreferrer">Forem Shop</a>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/sponsors.svg" width={20} />
                        <span>Sponsors</span>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/guide.svg" width={20} />
                        <span>Guide</span>
                    </li>
                </ul>
            </nav>
            <nav>
                <h1 className='font-bold ml-5 py-2'>Others</h1>
                <ul>
                    <li className="aside_icon">
                        <img src="/aside_icons/code_of_conducts.svg" width={20} />
                        <span>Code of Conducts</span>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/privacy_policy.svg" width={20} />
                        <span>Privacy Policy</span>
                    </li>
                    <li className="aside_icon">
                        <img src="/aside_icons/terms_of_use.svg" width={20} />
                        <span>Terms of use</span>
                    </li>
                </ul>
            </nav>
            <div className='flex space-x-2 mt-7'>
                <a className='social_icon' href="https://twitter.com/thepracticaldev" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon />
                </a>
                <a className='social_icon'href="https://www.facebook.com/thepracticaldev" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon />
                </a>
                <a className='social_icon' href="https://github.com/forem" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon />
                </a>
                <a className='social_icon' href="https://www.instagram.com/thepracticaldev/" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                </a>
            </div>
            <div></div>
            <div></div>
        </aside>
    )
}

export default SideBar