export const state = () => ({
    value: false, // Msg dialog visibility Eg: true - open dialog or false - close dialog
    msg: '', // Message to display in the dialog
})

export const mutations = {
    // Update msg dialog
    update_dialog(state, data){
        state.value = data.value;
        state.msg = data.msg;
    },
    //-----------------------------

    // Close the msg dialog
    close_dialog(state){
        state.value = false;
    },
    //-----------------------------

    // Reset the msg dialog
    reset_data(state){
        state.value = false;
        state.msg = '';
    }
    //--------------------------
}