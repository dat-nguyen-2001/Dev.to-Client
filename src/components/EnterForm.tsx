import React from 'react'

import { useForm, SubmitHandler } from "react-hook-form";
// import signIn from "../utils/signIn";
import { useNavigate } from 'react-router-dom';
import usersApi from "../api/users.api";
import { useRecoilState } from 'recoil';
import { usernameState } from "../atoms/usernameAtom";
// import signUp from "../utils/signUp";


interface Inputs {
    email: string,
    password: string
}

interface Prop {
    status: string
}

const {signIn, signUp} = usersApi

function EnterForm({ status }: Prop) {
    const navigate = useNavigate()
    const [username, setUsername] = useRecoilState(usernameState)
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        if (status === 'signin') {
            const accessToken = await signIn(email, password);
            //User store token for authorizations
            if (accessToken !== null) {
                sessionStorage.setItem('accessToken', accessToken)
                const username = email.split('@')[0]
                sessionStorage.setItem('username', username)
                setUsername(username);
                navigate("/");
            }
        } else {
            const signedUp = await signUp(email, password);
            if (signedUp) {
                const accessToken = await signIn(email, password);
                //User store token for authorizations
                if (accessToken !== null) {
                    sessionStorage.setItem('accessToken', accessToken)
                    const username = email.split('@')[0]
                    sessionStorage.setItem('username', username)
                    setUsername(username);
                    navigate("/");
                }
            }

        }
    };

    return (
        <form className="flex flex-col space-y-3" method="submit" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-1">
                <label className="font-semibold flex">Email</label>
                <input type="email" className="registerInput" {...register("email", { required: true })} />
            </div>
            <div className="flex flex-col space-y-1">
                <label className="font-semibold flex">Password</label>
                <input type="password" className="registerInput" {...register("password", { required: true })} />
            </div>
            <button className=" bg-[blue]/70 hover:bg-[blue] text-lg text-white font-semibold py-3 rounded-md">{status === 'signin' ? 'Continue' : 'Register'}</button>
        </form>
    );
}

export default EnterForm