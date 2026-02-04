export const state = () => ({
    enable_login: true, // If true - Allow the user to login || If false - Dont allow the user to login
    enable_verif_acct: true, // If true - Allow the user to verify their account || If false - Dont allow the user to verify their account
    enable_resend_verif_code: true, // If true - Allow the user to send a new verification code to their email || If false - Dont allow the user to send a new verification code to their email
    enable_check_email: true, // If true - Allow the user to send in their email for validation of their accounts || If false - Dont allow the user to send in their email for validation of their accounts
    enable_validate_reset_code: true, // If true - Allow the user to send in their reset code for validation || If false - Dont allow the user to send in their reset code for validation
    enable_reset_password: true // If true - Allow the user to reset their password || If false - Dont allow the user to reset their password
});

export const mutations = {
    // Update enable login property
    update_enable_login(state, value){
        state.enable_login = value;
    },
    //-------------------------------

    // Update enable verification account property
    update_enable_verif_acct(state, value){
        state.enable_verif_acct = value;
    },
    //---------------------------------------

    // Update enable resend verification code property
    update_enable_resend_verif_code(state, value){
        state.enable_resend_verif_code = value;
    },
    //-------------------------------------------

    // Update enable check email property
    update_enable_check_email(state, value){
        state.enable_check_email = value;
    },
    //-------------------------------------------

    // Update enable validate reset code property
    update_enable_validate_reset_code(state, value){
        state.enable_validate_reset_code = value;
    },
    //----------------------------------------------

    // Update enable reset password property
    update_enable_reset_password(state, value){
        state.enable_reset_password = value;
    },
    //----------------------------------------------

    // Reset the vuex data properties to default values
    reset_data(state){
        state.enable_login = true;
        state.enable_verif_acct = true;
        state.enable_resend_verif_code = true;
        state.enable_check_email = true;
        state.enable_validate_reset_code = true;
        state.enable_reset_password = true;
    }
    //-------------------------------------------
};