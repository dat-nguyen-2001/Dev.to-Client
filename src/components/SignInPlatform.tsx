import React from 'react'

interface Props {
    platform: string,
    logo: string
}

const Platform = ({platform, logo }: Props) => {
    return (
        <div className={`h-[50px] bg-inherit text-white font-bold rounded mx-auto flex items-center`}>
            <div className={`w-[210px] flex items-center mx-auto text-center`}>
                <img src={logo} width={40} height={40} />
                Continue with {platform}
            </div>
        </div>
    )
}

export default Platform
