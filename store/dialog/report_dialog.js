export const state = () => ({
    value: false, // Report dialog visibility Eg: true - open dialog or false - close dialog
    class_code: null,
    post_id: null
})

export const mutations = {
    // Update report dialog
    update_dialog(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Update class code
    update_class_code(state, data){
        state.class_code = data.class_code;
    },
    //-----------------------------

    // Update post id
    update_post_id(state, data){
        state.post_id = data.post_id;
    },
    //-----------------------------

    // Reset the report dialog
    reset_data(state){
        state.value = false;
        state.class_code = null;
        state.post_id = null;
    }
    //--------------------------
}