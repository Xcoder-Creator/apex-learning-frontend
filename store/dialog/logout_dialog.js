export const state = () => ({
    value: false // Log out dialog visibility Eg: true - open dialog or false - close dialog
})

export const mutations = {
    // Update the dialog
    update_dialog(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Reset the dialog
    reset_data(state){
        state.value = false;
    }
    //--------------------------
}