export const state = () => ({
    value: false // Send feedback dialog visibility Eg: true - open dialog or false - close dialog
})

export const mutations = {
    // Update dialog
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