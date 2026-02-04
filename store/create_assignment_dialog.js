export const state = () => ({
    value: false // Create assignment dialog value property
})

export const mutations = {
    // Update create assignment dialog value property
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