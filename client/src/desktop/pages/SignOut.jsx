import { Data } from "../../App";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function SignOut() {
    const navigate = useNavigate();
    const { setter } = useContext(Data);

    useEffect(() => {
        setter({
            access_token: null,
            auth: false,
            user_id: null,
            username: null,
            role: null,
            subscription_end: null
        });
        toast.success('Sign out successful. Redirecting...');
        navigate('/sign-in');
    })
    return (
        <h1>loading...</h1>
    );
}
