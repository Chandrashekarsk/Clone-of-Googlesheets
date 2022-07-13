import { Link } from "react-router-dom";
const Landing = () => {

    return ( 
        <div className="landing">
            <Link to="/login"><button>Login to your account</button></Link>

            <h3>Dont't have an account?</h3>

           <Link to="signup"> <button>Create new account</button> </Link>
        </div>
     );
}
 
export default Landing;