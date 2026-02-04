export const state = () => ({
    is_logged_in: false, // If true - User is logged in || If false - User is not logged in

    // User account details
    details: {
        user_name: '',
        user_email: '',
        user_role: '',
        user_id: 0,
        profile_image: '',
        user_settings: {}
    }
    //-----------------------
})

export const mutations = {
    // Update the users login state and user details
    update_data(state, data){
        state.is_logged_in = data.value;
        state.details.user_name = data.user_name;
        state.details.user_email = data.user_email;
        state.details.user_role = data.user_role;
        state.details.user_id = data.user_id;
        state.details.profile_image = data.user_profile_image;
        state.details.user_settings = data.user_settings;
    },
    //------------------------------------

    // Update user settings
    update_settings(state, data){
        if (data.option === 1){
            state.details.user_settings.allow_email_notif = data.value;
        }
    },
    //------------------------------------

    // Update user profile image
    update_profile_image(state, data){
        state.details.profile_image = data.image;
    },
    //------------------------------------

    // Update user name and email
    update_name_and_email(state, data){
        state.details.user_name = data.name;
        state.details.user_email = data.email;
    },
    //------------------------------------

    // Reset the users login state and user details
    reset_data(state){
        state.is_logged_in = false;
        state.details.user_name = '';
        state.details.user_email = '';
        state.details.user_role = '';
        state.details.user_id = 0;
        state.details.profile_image = '';
        state.details.user_settings = {};
    }
    //--------------------------------------
}