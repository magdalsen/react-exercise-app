import { useUserContext } from "../../contexts/UserContext";

const LoginWrapper = ({children}:{children:React.ReactNode}) => {
    const {isLoggedIn}=useUserContext()
    return (
        <>
            {!isLoggedIn ? <p>You need to login first.</p> : <>{children}</>}
        </>
    )
}

export default LoginWrapper