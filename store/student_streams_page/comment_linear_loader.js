export const state = () => ({
    value: false
})

export const mutations = {
    // Update value property
    update_value(state, data){
        state.value = data.value;
    },
    //--------------------------------------

    // Reset data
    reset_data(state){
        state.value = false;
    }
    //--------------------------------------
}