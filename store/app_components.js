export const state = () => ({
    loading_linear: true, // Loading linear value
    is_data_loaded: false, // Is data loaded value
    is_data_available: true, // Is data available value
    refresh_data: true, // Refresh data value
})

export const mutations = {
    // Update the loading linear value
    update_loading_linear(state, data){
        state.loading_linear = data.value;
    },
    //--------------------------------------

    // Update the is data loaded value
    update_is_data_loaded(state, data){
        state.is_data_loaded = data.value;
    },
    //--------------------------------------

    // Update the is data available value
    update_is_data_available(state, data){
        state.is_data_available = data.value;
    },
    //--------------------------------------

    // Update the refresh data value
    update_refresh_data(state, data){
        state.refresh_data = data.value;
    },
    //--------------------------------------

    // Reset data
    reset_data(state){
        state.loading_linear = true;
        state.is_data_loaded = false;
        state.is_data_available = true;
        state.refresh_data = true;
    }
    //--------------------------------------
}