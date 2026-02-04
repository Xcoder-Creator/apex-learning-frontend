export const state = () => ({
    active_tab: 0 // Active tab property
})

export const mutations = {
    // Update active tab property
    update_active_tab(state, data){
        state.active_tab = data.tab;
    },
    //--------------------------------------

    // Reset data
    reset_data(state){
        state.active_tab = 0;
    }
    //--------------------------------------
}