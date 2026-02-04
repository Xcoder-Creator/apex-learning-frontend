export const state = () => ({
    value: false,
    bg_image: ''
})

export const mutations = {
    // Update the dialog
    update_dialog(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Update the bg image property
    update_bg_image(state, data){
        state.bg_image = data.value;
    },
    //-----------------------------

    // Reset the dialog
    reset_data(state){
        state.value = false;
        state.bg_image = '';
    }
    //--------------------------
}