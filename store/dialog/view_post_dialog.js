export const state = () => ({
    value: false, // View post dialog visibility Eg: true - open dialog or false - close dialog

    // Post data property
    post_data: {
        user_name: null,
        post_creators_id: null,
        post_comments: [],
        new_material_files: [],
        assignment_status: null,
        score_value: null,
        added_att: null,
        post_point: null,
        title: null,
        post_due_date: null,
        user_image: null,
        date: null,
        post_data: null,
        att_files: [],
        post_type: null
    }
    //--------------------------------
})

export const mutations = {
    // Update the dialog
    update_dialog(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Update post data
    update_post_data(state, data){
        state.post_data = {
            user_name: data.user_name,
            post_creators_id: data.post_creators_id,
            post_comments: data.post_comments,
            new_material_files: data.new_material_files,
            assignment_status: data.assignment_status,
            score_value: data.score_value,
            added_att: data.added_att,
            post_point: data.post_point,
            title: data.title,
            post_due_date: data.post_due_date,
            user_image: data.user_image,
            date: data.date,
            post_data: data.post_data,
            att_files: data.att_files,
            post_type: data.post_type
        }
    },
    //-----------------------------

    // Reset the dialog
    reset_data(state){
        state.value = false;
        state.post_data = {
            user_name: null,
            post_creators_id: null,
            post_comments: [],
            new_material_files: [],
            assignment_status: null,
            score_value: null,
            added_att: null,
            post_point: null,
            title: null,
            post_due_date: null,
            user_image: null,
            date: null,
            post_data: null,
            att_files: [],
            post_type: null
        };
    }
    //--------------------------
}