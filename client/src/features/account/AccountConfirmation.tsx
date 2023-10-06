import { useCallback, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import AccountConfirmationError from "./AccountConfirmationError";
import AccountConfirmationSuccess from "./AccountConfirmationSuccess";

function AccountConfirmation() {

    const [loading, setLoading] = useState(true);
    const [emailConfirmed, setEmailConfirmed] = useState(false);

    const confirmEmail = useCallback(async () => {
        try {
            let queryParameters = new URLSearchParams(window.location.search);
            let userId = queryParameters.get('userId');
            let confirmToken = queryParameters.get('confirmToken');
            agent.Account.confirmEmail({
                userId: userId,
                confirmToken: confirmToken
            }).then((result: boolean) => {
                setEmailConfirmed(result);
                setLoading(false);
            })
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => { confirmEmail() }, [confirmEmail])

    if (loading) return <span>Loading...</span>

    return (<>
        {emailConfirmed && <AccountConfirmationSuccess />}
        {!emailConfirmed && <AccountConfirmationError />}
        </>
    ); 
}

export default AccountConfirmation;