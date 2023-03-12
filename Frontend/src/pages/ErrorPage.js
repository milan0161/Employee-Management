import { useRouteError } from "react-router-dom";
import NavigationBar from "../components/Navigation/NavigationBar";





const ErrorPage = () => {
    const error = useRouteError()
    let title = 'An Error occured!'
    let message = 'Something went wrong'
    if (error.status === 500) {
        message = error.data.message
    }
    if (error.status === 404) {
        title = 'Not found!'
        message = 'Cound not find resource or page'
    }
    return (
        <>
            <NavigationBar />
            <div>
                <h1>{title}</h1>
                <p>{message}</p>
            </div>
        </>
    )
};



export default ErrorPage