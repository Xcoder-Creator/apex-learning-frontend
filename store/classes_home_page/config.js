export const state = () => ({
    value: 0 // Value property
})

export const mutations = {
    // Update value property
    update_value(state, data){
        state.value = data.value;
    },
    //------------------------------

    // Reset properties
    reset_data(state){
        state.value = 0;
    }
    //--------------------------------------
}