import React from 'react';
import { useHistory , useLocation} from 'react-router';


const Welcome = () => {
    const history=useHistory();
    const location = useLocation();
    const user = location.state.params;
    return (
        <div>
            <p>
                <h1>Welcome</h1>
            </p>
        </div>
    );
}

export default Welcome;
