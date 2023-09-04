import { useCallback, useEffect, useState } from "react";
import agent from "../../app/api/agent";

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
        {emailConfirmed && <strong>Email confirmed</strong>}
        {!emailConfirmed && <strong>Email not confirmed</strong>}
        </>
  );
}

export default AccountConfirmation;