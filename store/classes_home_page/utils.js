export const state = () => ({
    is_snackbar_displayed: false // Is snackbar displayed property
})

export const mutations = {
    // Update is snackbar displayed property
    update_value(state, data){
        state.is_snackbar_displayed = data.value;
    },
    //------------------------------

    // Reset properties
    reset_data(state){
        state.is_snackbar_displayed = false;
    }
    //--------------------------------------
}