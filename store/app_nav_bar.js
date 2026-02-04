export const state = () => ({
    drawer: null // Navigation drawer value
})

export const mutations = {
    // Update the navigation drawer value
    update_data(state, data){
        state.drawer = data.value;
    },
    //--------------------------------------

    // Reset the navigation drawer value
    reset_data(state){
        state.drawer = false;
    }
    //--------------------------------------
}