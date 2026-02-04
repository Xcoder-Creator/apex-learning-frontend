export const state = () => ({
    value: false, // Comment dialog visibility Eg: true - open dialog or false - close dialog

    current_comments: [],

    current_post_id: null,

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
        if (state.all_comments[data.class_code]){
            let post_id = data.post_data.id;
            if (state.all_comments[data.class_code][post_id]){
                state.current_post_id = post_id;
                let class_code = data.class_code;
                state.current_comments = state.all_comments[class_code][post_id];
            } else {
                let class_code = data.class_code;
                let post_id = data.post_data.id;
                state.current_post_id = post_id;
                state.all_comments[class_code][post_id] = data.post_data.post_comments;
                state.current_comments = state.all_comments[class_code][post_id];
            }
        } else {
            let post_id = data.post_data.id;
            state.current_post_id = post_id;
            let created_comment = {};
            created_comment[post_id] = data.post_data.post_comments;
            let class_code = data.class_code;
            state.all_comments[class_code] = created_comment;
            state.current_comments = state.all_comments[class_code][post_id];
        }
    },
    //-----------------------------

    // Add new comment
    add_new_comment(state, data){ 
        if (state.all_comments[data.comment_data.class_code]){
            let post_id = data.comment_data.post_id;
            if (state.all_comments[data.comment_data.class_code][post_id]){
                let comments_length = state.all_comments[data.comment_data.class_code][post_id].length;

                if (comments_length > 0){
                    let class_code = data.comment_data.class_code;
                    let new_key = comments_length + 1;
                    data.comment_data['key'] = new_key;
                    state.all_comments[class_code][post_id].unshift(data.comment_data);
                    state.current_comments = state.all_comments[class_code][post_id];
                } else if (comments_length === 0){
                    let class_code = data.comment_data.class_code;
                    let new_key = 1;
                    data.comment_data['key'] = new_key;
                    state.all_comments[class_code][post_id].unshift(data.comment_data);
                    state.current_comments = state.all_comments[class_code][post_id];
                }
            }
        }
    },
    //-----------------------------

    // Remove class comments
    remove_class_comments(state, data){
        if (state.all_comments[data.class_code]){
            delete state.all_comments[data.class_code];
        }
    },
    //-----------------------------

    // Delete the comments for a particular post
    delete_comments_for_post(state, data){
        if (state.all_comments[data.class_code]){
            if (state.all_comments[data.class_code][data.post_id]){
                delete state.all_comments[data.class_code][data.post_id];
            }
        }

        state.current_comments = [];
        state.current_post_id = null;
    },
    //------------------------------

    // Reset the dialog
    reset_data(state){
        state.value = false;
        state.current_comments = [];
        state.current_post_id = null;
        state.all_comments = {};
    }
    //--------------------------
}