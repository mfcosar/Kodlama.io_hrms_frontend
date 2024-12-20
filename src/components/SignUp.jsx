import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default function SignUp() {



    return (
        <div>
            <h2>Please sign up for a new account</h2>
            <div>
                <h3>Are you </h3>
                <Link to={'/candidate/register'}>
                    <Button>
                        Candidate
                    </Button>
                </Link><br /><br /> OR<br /><br />
            </div>
            <div>
                <Link to={'/employer/add'}>
                    <Button>
                        Employer
                    </Button>
                </Link>
            </div>

        </div>);
}