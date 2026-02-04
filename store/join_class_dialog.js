export const state = () => ({
    value: false // join class dialog value property
})

export const mutations = {
    // Update join class dialog value property
    update_dialog(state, data){
        state.value = data.value;
    },
    //----------------------------------

    // Reset data
    reset_data(state){
        state.value = false;
    }
    //---------------------------
}