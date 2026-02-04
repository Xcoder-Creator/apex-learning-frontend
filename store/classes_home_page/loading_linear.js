export const state = () => ({
    loading_linear: false // Is loading linear property
})

export const mutations = {
    // Update loading linear property
    update_value(state, data){
        state.loading_linear = data.value;
    },
    //------------------------------

    // Reset properties
    reset_data(state){
        state.loading_linear = false;
    }
    //--------------------------------------
}