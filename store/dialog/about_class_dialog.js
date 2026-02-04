export const state = () => ({
    value: false // About class dialog visibility Eg: true - open dialog or false - close dialog
})

export const mutations = {
    // Update the about class dialog
    update_data(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Reset the about class dialog
    reset_data(state){
        state.value = false;
    }
    //--------------------------
}