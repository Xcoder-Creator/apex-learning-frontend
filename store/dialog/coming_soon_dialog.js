export const state = () => ({
    value: false
})

export const mutations = {
    // Update coming soon dialog
    update_data(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Reset coming soon dialog
    reset_data(state){
        state.value = false;
    }
    //--------------------------
}