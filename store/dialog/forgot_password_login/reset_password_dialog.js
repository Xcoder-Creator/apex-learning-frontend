export const state = () => ({
    value: false // If true - Open reset password dialog || If false - Close reset password dialog
})

export const mutations = {
    // Update the properties of the reset password dialog in the login route
    update_data(state, value){
        state.value = value;
    },
    //-----------------------------------------------

    // Reset the properties of the reset password dialog in the login route
    reset_data(state){
        state.value = false;
    }
    //-----------------------------------------------------
}