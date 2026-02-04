export const state = () => ({
    value: false // Update password dialog visibility Eg: true - open dialog or false - close dialog
})

export const mutations = {
    // Open or close the update password dialog
    update_dialog(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Reset the upload profile img dialog
    reset_data(state){
        state.value = false;
    }
    //--------------------------
}