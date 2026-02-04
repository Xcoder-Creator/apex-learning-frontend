export const state = () => ({
    enable_private_comment: true, // enable private comment property
    enable_check_classwork_valid: true // enable check classwork valid property
})

export const mutations = {
    // Update the enable private comment property
    update_enable_private_comment(state, data){
        state.enable_private_comment = data.value;
    },
    //--------------------------------------

    // Update the enable check classwork valid property
    update_enable_check_classwork_valid(state, data){
        state.enable_check_classwork_valid = data.value;
    },
    //--------------------------------------
    
    // Reset data
    reset_data(state){
        state.enable_private_comment = true;
        state.enable_check_classwork_valid = true;
    }
    //--------------------------------------
}