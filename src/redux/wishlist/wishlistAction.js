import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP,USER_INFO } from "./userType";
export const userData = (data) => {
    return {
        type: USER_INFO,
        payload: data
    }
}
