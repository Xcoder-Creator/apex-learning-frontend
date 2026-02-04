export const state = () => ({
    is_logging_out: false // Is logging out property
})

export const mutations = {
    // Is logging out property update
    update_is_logging_out(state, data){
        state.is_logging_out = data.value;
    },
    //-------------------------

    // Reset data
    reset_data(state){
        state.is_logging_out = false;
    }
    //---------------------------
}