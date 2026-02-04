export const state = () => ({
    is_loading: true // If true - Page will show loading splash screen || If false - Page will not show loading splash screen
})

export const mutations = {
    // Update the is_loading property
    update_data(state, data){
        state.is_loading = data.value;
    },
    //-------------------------

    // Reset the is_loading property
    reset_data(state){
        state.is_loading = true;
    }
    //-------------------------------
}