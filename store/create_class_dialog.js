export const state = () => ({
    value: false // create class dialog value property
})

export const mutations = {
    // Update create class dialog value property
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