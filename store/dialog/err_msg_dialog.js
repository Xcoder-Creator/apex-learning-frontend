export const state = () => ({
    value: false, // Error msg dialog visibility Eg: true - open dialog or false - close dialog
    msg: '', // Message to display in the dialog
    err: false // Show wether there is an error or not
})

export const mutations = {
    // Update the err msg dialog
    update_data(state, data){
        state.value = data.value;
        state.msg = data.msg;
        state.err = data.err;
    },
    //-----------------------------

    // Reset the err msg dialog
    reset_data(state){
        state.value = false;
    }
    //--------------------------
}