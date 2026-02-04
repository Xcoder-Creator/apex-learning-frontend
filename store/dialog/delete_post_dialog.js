export const state = () => ({
    value: false, // Delete post dialog visibility Eg: true - open dialog or false - close dialog
    post_id: 0 // ID of the post
})

export const mutations = {
    // Update the dialog
    update_dialog(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Update post ID
    update_post_id(state, data){
        state.post_id = data.value;
    },
    //-----------------------------

    // Reset the dialog
    reset_data(state){
        state.value = false;
        state.post_id = 0;
    }
    //--------------------------
}