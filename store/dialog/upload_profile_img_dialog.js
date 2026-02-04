export const state = () => ({
    value: false // Upload profile img dialog visibility Eg: true - open dialog or false - close dialog
})

export const mutations = {
    // Open or close the upload profile img dialog
    update_value(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Reset the upload profile img dialog
    reset_data(state){
        state.value = false;
    }
    //--------------------------
}