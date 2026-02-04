export const state = () => ({
    enable_signup: true, // If true - Allow the user to create an account || If false - Dont allow the user to create an account
    enable_verif_acct: true, // If true - Allow the user to verify their account || If false - Dont allow the user to verify their account
    enable_resend_verif_code: true, // If true - Allow the user to send a new verification code to their email || If false - Dont allow the user to send a new verification code to their email
});

export const mutations = {
    // Update enable login property
    update_enable_signup(state, value){
        state.enable_signup = value;
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

    // Reset the vuex data properties to default values
    reset_data(state){
        state.enable_signup = true;
        state.enable_verif_acct = true;
        state.enable_resend_verif_code = true;
    }
    //-------------------------------------------
};