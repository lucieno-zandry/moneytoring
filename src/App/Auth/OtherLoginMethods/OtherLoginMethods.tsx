import React from "react"
import { Translate } from "react-i18nify";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import useScreenLoader from "../../../partials/ScreenLoader/hooks/useScreenLoader";
import { googleSignin } from "../../../core/api/actions";
import useAuth from "../../../core/hooks/useAuth";
import storageTokenActions from "../../../core/helpers/storageTokenActions";
import toast from "react-hot-toast";

export type GoogleUserInfo = {
    family_name: string,
    given_name: string,
    picture: string,
    email: string
}

export default React.memo(() => {
    const screenLoader = useScreenLoader();
    const { setAuth } = useAuth();

    const handleGoogleSuccess = React.useCallback(({ credential }: CredentialResponse) => {
        if (!credential) return;
        const decodedGoogleUserInfo: GoogleUserInfo = jwtDecode(credential);
        screenLoader.toggle();
        googleSignin(decodedGoogleUserInfo)
            .then(response => {
                const { user, token } = response.data;
                storageTokenActions.set(token);
                setAuth(user);
            })
            .catch(() => {
                toast.error('Authentication failed');
            })
            .finally(screenLoader.toggle);
    }, []);

    return <div className="col-8 text-align-center ">
        <h6><Translate value="application.or_authentify" /></h6>
        <div className="mt-3 d-flex gap-2 justify-content-center">
            <GoogleLogin onSuccess={handleGoogleSuccess} text="signin" />
        </div>
    </div>
});