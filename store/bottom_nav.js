export const state = () => ({
    tab_value: 0 // Tab value
})

export const mutations = {
    // Update tab value
    update_tab_value(state, data){
        state.tab_value = data.value;
    },
    //-------------------------

    // Reset data
    reset_data(state){
        state.tab_value = 0;
    }
    //---------------------------
}