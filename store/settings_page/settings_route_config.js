export const state = () => ({
    enable_update_profile_image: true
})

export const mutations = {
    // Update enable update profile image property
    update_enable_update_profile_image(state, data){
        state.enable_update_profile_image = data.value;
    },
    //--------------------------------------------

    // Reset properties
    reset_data(state){
        state.enable_update_profile_image = true;
    }
    //--------------------------------------
}