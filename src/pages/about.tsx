import React from 'react'

import Layout from '../components/Layout'

const AboutPage = () => (
  <Layout title="About DEV - DEV Community 👩‍💻👨‍💻">
    <div className="px-10 mx-auto w-[85vw] max-w-[1000px] bg-white rounded pt-10 pb-20 text-xl">
      <h1 className=" font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">About DEV</h1>
      <br></br>
      <p>DEV is a community of software developers getting together to help one another out. The software industry relies on collaboration and networked learning. We provide a place for that to happen.</p>
      <br></br>
      <p>DEV is built on Forem: open source software designed to empower communities. Because our application is open source, you can inspect every little detail of the code, or chip in yourself! Forem is available for anyone interested in creating similar communities in any niche or passion. Visit our meta Forem, forem.dev for more information.</p>
      <br></br>
      <p>We believe in transparency and adding value to the ecosystem. We hope you enjoy poking around and participating!</p>
      <br></br>
      <h2 className='font-bold text-xl sm:text-2xl md:text-3xl mb-3'>Leadership</h2>
      <a target="_blank" rel="noopener noreferrer" href='https://res.cloudinary.com/practicaldev/image/fetch/s--2wDjV5jB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://res.cloudinary.com/practicaldev/image/fetch/s--S2Ud7coR--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/0r746whbdtl8uvs98uah.JPG'>
        <img src='leadership.jpg' className='rounded' />
      </a>
      <p className='mt-3'>DEV is led by Forem's co-founders Ben Halpern, Jess Lee, and Peter Frank ("PB&J").</p>
      <br></br>
      <h2 className='font-bold text-xl sm:text-2xl md:text-3xl mb-3'>Team</h2>
      <a target="_blank" rel="noopener noreferrer" href='https://res.cloudinary.com/practicaldev/image/fetch/s--kztNb6c8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8pdz0airtdl81h1ykhx1.jpg'>
        <img src='team.jpg' className='rounded' />
      </a>
      <p className='mt-3'>Our team is distributed around the world. We have no office, but we come together online each day to build community and improve the software careers of millions.</p>
      <br></br>
      <p>Happy coding ❤️</p>
    </div>
  </Layout>
)

export default AboutPage
