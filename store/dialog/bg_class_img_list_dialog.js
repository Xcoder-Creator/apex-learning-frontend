export const state = () => ({
    value: false,
    disable_select_theme: true,
    bg_class_img: null,
    can_select_bg: true
})

export const mutations = {
    // Update the dialog
    update_dialog(state, data){
        state.value = data.value;
    },
    //-----------------------------

    update_disable_select_theme(state, data){
        state.disable_select_theme = data.value;
    },

    update_bg_class_img(state, data){
        state.bg_class_img = data.value;
    },

    update_can_select_bg(state, data){
        state.can_select_bg = data.value;
    },

    // Reset the dialog
    reset_data(state){
        state.value = false;
        state.disable_select_theme = true;
        state.bg_class_img = null;
        state.can_select_bg = true;
    }
    //--------------------------
}