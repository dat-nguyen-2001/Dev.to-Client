import React from 'react'

const Footer = () => {

    return (
        <div className="bg-inherit text-sm py-5">
            <div className="max-w-[1024px] m-auto text-center flex flex-col space-y-1">
                <p className="mb-5">
                    <span className="text-[#3e51e0] font-bold hover:underline">
                        <a href={'/'}>
                            DEV Community 👩‍💻👨‍💻
                        </a>
                    </span>
                    — A constructive and inclusive social network for software developers. With you every step of your journey.
                </p>
                <p>
                    Built on
                    <span> </span>
                    <span className="text-[#3e51e0] hover:underline">
                        <a href={'https://forem.com/'} target="_blank" rel="noopener noreferrer">
                            Forem
                        </a>
                    </span> — the open source software that powers
                    <span> </span>
                    <span className="text-[#3e51e0] hover:underline">
                        <a href={'/'}>
                            Dev
                        </a>
                    </span> and other inclusive communities.
                </p>
                <p>
                    Made with love and
                    <span> </span>
                    <span className="text-[#3e51e0] hover:underline">
                        <a href={'https://rubyonrails.org/'} target="_blank" rel="noopener noreferrer">
                            Ruby on Rails.
                        </a>
                    </span> DEV Community 👩‍💻👨‍💻 © 2016 - 2022.
                </p>
            </div>
        </div>)
}

export default Footer