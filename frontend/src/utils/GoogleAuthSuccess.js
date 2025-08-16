const { useEffect } = require("react");
const { useCookies } = require("react-cookie");
const { useNavigate } = require("react-router-dom");
const {toast} = require("react-toastify");

const GoogleAuthSuccess = () => {
    const [_, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie('token', token, { path: '/', expires: date });
            toast.success("Login Successfull.")
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [setCookie , navigate])

    return null;
}

export default GoogleAuthSuccess;