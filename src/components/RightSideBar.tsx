import React from 'react'

const listings = [
    { title: 'I develop free just to practice my React/Redux skills', genre: 'forhire', link: 'https://dev.to/listings/forhire/i-develop-for-free-just-to-practice-my-react-redux-skills-4935' },
    { title: 'Observability for Github CI workflows', genre: 'events', link: 'https://dev.to/listings/events/observability-for-github-ci-workflows-3d2l' },
    { title: 'Flatlogic Generator 50% Discount - flatlogic.com', genre: 'products', link: 'https://dev.to/listings/products/flatlogic-generator-50-discount-nbe' },
    { title: 'Collaborations Wanted For Noteslify - Privacy Friendly, Open Source. Alternatie to EverNote', genre: 'collabs', link: 'https://dev.to/listings/collabs/collaborators-wanted-for-noteslify-38c' },
    { title: 'Find an Entry Level Job in Tech: Switch to Become a Government Worker', genre: 'events', link: 'https://dev.to/listings/events/find-an-entry-level-job-in-tech-switch-to-become-a-government-worker-3o13' },
]

const helps = [
    { title: 'Can anyone provide an animation on the Node.js Event Loop', comment: 1, link: 'https://dev.to/nxpy123/can-anyone-provide-an-animation-on-the-nodejs-event-loop-28kg' },
    { title: 'A Developcado Falling from Gravitee', comment: 1, link: 'https://dev.to/jennjunod/a-developcado-falling-from-gravitee-1pci' },
    { title: 'How tough is Freelancing', comment: 9, link: 'https://dev.to/aviavinav/how-tough-is-freelancing-1493' },
]

const discusses = [
    { title: 'Do DevOps suffer less ageism compared to software developers?', comment: 8, link: 'https://dev.to/sloan/do-devops-suffer-less-ageism-compared-to-software-developers-277a' },
    { title: 'Meme Monday', comment: 29, link: 'https://dev.to/ben/meme-monday-3jjm' },
    { title: 'Why I am not getting good at Programming', comment: 9, link: 'https://dev.to/ikray/why-i-am-not-getting-good-at-programming-4npo' },
    { title: 'What are your Favorite Authors, on Which Topics, and Why?', comment: 17, link: 'https://dev.to/jmfayard/what-are-your-favorite-authors-on-which-topics-and-why-12c7' },
]

const imfives = [
    { title: 'Unicorns on DEV', comment: 4, link: 'https://dev.to/binyamin/unicorns-on-dev-167b' },
    { title: "Explain Open Source like I'm five", comment: 22, link: 'https://dev.to/peter/explain-open-source-like-i-m-five-264e' },
    { title: "Explain JSX like I'm five", comment: 23, link: 'https://dev.to/hr21don/explain-jsx-like-im-five-27g6' },
    { title: 'Is MVC pattern used only on monolithic web-applications?', comment: 3, link: 'https://dev.to/izidevspot/is-mvc-pattern-used-only-on-monolithic-web-applications-4j0' },
    { title: 'Explain Blockchain like I am Five', comment: 32, link: 'https://dev.to/hr21don/explain-blockchain-like-i-am-five-2a5g' },
]

const watercoolers = [
    { title: 'Meme Monday', comment: 29, link: 'https://dev.to/ben/meme-monday-3jjm' },
    { title: 'What are your Favorite Authors, on Which Topics, and Why?', comment: 17, link: 'https://dev.to/jmfayard/what-are-your-favorite-authors-on-which-topics-and-why-12c7' },
    { title: "Do you create your headers?", comment: 3, link: 'https://dev.to/dailydevtips1/how-do-you-create-your-headers-47fn' },
    { title: 'Music Monday - What are you listenig to ? (New Music Edition)', comment: 10, link: 'https://dev.to/music-discussions/music-monday-what-are-you-listening-to-new-music-edition-2alf' },
    { title: '100 000 Views Reached', comment: 2, link: 'https://dev.to/mxglt/100-000-views-reached-318g' },
]

const RightSideBar = () => {
    return (
        <aside className="flex flex-col space-y-5">
            <div className="right_side_div">
                <h1 className="font-bold text-xl pt-2 pb-5">Listings</h1>
                <ul className="right_side_ul">
                    {listings.map(listing => (
                        <li className="right_side_li" key={listing.link}>
                            <a href={listing.link} target="_blank" rel="noopener noreferrer">
                                <h3 className="right_side_h3">{listing.title}</h3>
                                <p>{listing.genre}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="right_side_div">
                <a href="https://dev.to/t/help" target="_blank" rel="noopener noreferrer">
                    <h1 className="right_side_h1">#help</h1>
                </a>
                <ul className="right_side_ul">
                    {helps.map(help => (
                        <li className="right_side_li" key={help.link}>
                            <a href={help.link} target="_blank" rel="noopener noreferrer">
                                <h3 className="right_side_h3">
                                    {help.title}
                                </h3>
                                <p>
                                    {help.comment} comments
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="right_side_div">
                <a href="https://dev.to/t/discuss" target="_blank" rel="noopener noreferrer">
                    <h1 className="right_side_h1">#discuss</h1>
                </a>
                <ul className="right_side_ul">
                    {discusses.map(discuss => (
                        <li className="right_side_li" key={discuss.link}>
                            <a href={discuss.link} target="_blank" rel="noopener noreferrer">
                                <h3 className="right_side_h3">
                                    {discuss.title}
                                </h3>
                                <p>
                                    {discuss.comment} comments
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="right_side_div">
                <a href="https://dev.to/t/explainlikeimfive" target="_blank" rel="noopener noreferrer">
                    <h1 className="right_side_h1">#explainlikeimfive</h1>
                </a>
                <ul className="right_side_ul">
                    {imfives.map(five => (
                        <li className="right_side_li" key={five.link}>
                            <a href={five.link} target="_blank" rel="noopener noreferrer">
                                <h3 className="right_side_h3">
                                    {five.title}
                                </h3>
                                <p>
                                    {five.comment} comments
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="right_side_div">
                <a href="https://dev.to/t/watercooler" target="_blank" rel="noopener noreferrer">
                    <h1 className="right_side_h1">#watercooler</h1>
                </a>
                <ul className="right_side_ul">
                    {watercoolers.map(watercooler => (
                        <li className="right_side_li" key={watercooler.link}>
                            <a href={watercooler.link} target="_blank" rel="noopener noreferrer">
                                <h3 className="right_side_h3">
                                    {watercooler.title}
                                </h3>
                                <p>
                                    {watercooler.comment} comments
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

        </aside>
    )
}

export default RightSideBar