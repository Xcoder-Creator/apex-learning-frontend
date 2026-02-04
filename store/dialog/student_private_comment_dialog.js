export const state = () => ({
    value: false, // Private comment dialog visibility Eg: true - open dialog or false - close dialog

    current_classwork_id: null,

    teacher_user_id: null,

    current_comments: []
})

export const mutations = {
    // Update the dialog
    update_dialog(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Update comment data
    update_comment_data(state, data){
        /*let all_comments = {
            '89': [ { sds: 'sdsd', dsdsd: '88wj' } ]
        }*/

        state.current_classwork_id = data.classwork_id;
        state.teacher_user_id = data.teacher_id;
        state.current_comments = data.private_comments;
    },
    //-----------------------------

    // Add new comment
    add_new_comment(state, data){ 
        state.current_comments.unshift(data.comment_data);
    },
    //-----------------------------

    // Reset the dialog
    reset_data(state){
        state.value = false;
        state.current_classwork_id = null;
        state.teacher_user_id = null;
        state.current_comments = [];
    }
    //--------------------------
}