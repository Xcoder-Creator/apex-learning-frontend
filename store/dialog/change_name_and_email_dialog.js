export const state = () => ({
    value: false
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