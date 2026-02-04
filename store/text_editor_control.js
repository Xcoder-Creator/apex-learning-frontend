export const state = () => ({
    view_box: false // View box property
})

export const mutations = {
    // View box property update
    update_view_box(state, data){
        state.view_box = data.value;
    },
    //-------------------------

    // Reset data
    reset_data(state){
        state.view_box = false;
    }
    //---------------------------
}