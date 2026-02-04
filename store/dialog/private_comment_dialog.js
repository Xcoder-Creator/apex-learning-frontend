export const state = () => ({
    value: false, // Private comment dialog visibility Eg: true - open dialog or false - close dialog

    current_classwork_id: null,

    current_student_id: null,

    current_comments: [],

    all_comments: {} // All comments
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

        state.current_classwork_id = data.student_data.id;
        state.current_student_id = data.student_data.user_id;
            
        if (state.all_comments.hasOwnProperty(data.student_data.user_id)){
            state.current_comments = state.all_comments[data.student_data.user_id];
        } else {
            state.all_comments[data.student_data.user_id] = data.student_data.classwork_comments;
            state.current_comments = state.all_comments[data.student_data.user_id];
        }
    },
    //-----------------------------

    // Add new comment
    add_new_comment(state, data){ 
        let details = data.comment_data;
        let student_id = details.user_id;

        if (state.all_comments.hasOwnProperty(student_id)){
            details['key'] = state.all_comments[student_id].length;
            state.current_student_id = student_id;
            state.all_comments[state.current_student_id].unshift(details);
            state.current_comments = state.all_comments[state.current_student_id];
        } else {
            state.current_student_id = student_id;
            state.all_comments[student_id] = [ details ];
            state.current_comments = state.all_comments[student_id];
        }
    },
    //-----------------------------

    // Reset the dialog
    reset_data(state){
        state.value = false;
        state.current_classwork_id = null;
        state.current_student_id = null;
        state.current_comments = [];
        state.all_comments = {};
    }
    //--------------------------
}