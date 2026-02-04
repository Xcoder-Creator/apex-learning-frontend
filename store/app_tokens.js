export const state = () => ({
    login_access_token: 'TEST_TOKEN', // Access token to keep a user logged in
    verify_account_token: 'TEST_TOKEN', // Access token to verify a users account
    password_reset_token: 'TEST_TOKEN' // Password reset token to reset a users password
})

export const mutations = {
    // Update the login access token value
    update_login_access_token(state, data){
        state.login_access_token = data.value;
    },
    //--------------------------------------

    // Update the verify account token value
    update_verify_account_token(state, data){
        state.verify_account_token = data.value;
    },
    //--------------------------------------

    // Update the password reset token value
    update_password_reset_token(state, data){
        state.password_reset_token = data.value;
    },
    //--------------------------------------

    // Reset all the properties
    reset_data(state){
        state.login_access_token = 'TEST_TOKEN';
        state.verify_account_token = 'TEST_TOKEN';
        state.password_reset_token = 'TEST_TOKEN';
    }
    //--------------------------------------
}