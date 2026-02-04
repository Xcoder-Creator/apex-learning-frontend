export const state = () => ({
    reset_code_value: '' // Reset code for reseting the users password
})

export const mutations = {
    // Update the users reset code
    update_data(state, data){
        state.reset_code_value = data.reset_code;
    },
    //------------------------------------

    // Reset the users reset code
    reset_data(state){
        state.reset_code_value = '';
    }
    //--------------------------------------
}