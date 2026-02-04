export const state = () => ({
    loaded_posts: false, // Loaded posts value
    posts_array: [], // Posts array value
    loading_linear: true, // Loading linear value
    refresh_data: false, // Refresh data value
    active_class_posts: {}, // Active class posts value
    active_class_post_offset: {}, // Offset values
    active_upcoming_work_data: {}, // Upcoming work data value
    current_upcoming_work: [], // Current upcoming work value
    spinner: false, // Infinite scroll value
    can_create_post: false, // Can create post property
})

export const mutations = {
    // Update the loaded posts property
    update_loaded_posts(state, data){
        state.loaded_posts = data.value;
    },
    //--------------------------------------

    // Update the posts array property
    update_posts_array(state, data){
        state.posts_array = data.value;
    },
    //--------------------------------------

    // Update upcoming work data property
    update_upcoming_work_data(state, data){
        if (data.state === true){
            state.active_upcoming_work_data[data.class_code] = data.classwork_data;
            state.current_upcoming_work = [];
            state.current_upcoming_work.push(data.classwork_data);
        } else if (data.state === false){
            state.active_upcoming_work_data[data.class_code] = null;
            state.current_upcoming_work = [];
        }
    },
    //--------------------------------------

    // Remove upcoming work data for a particular class
    remove_upcoming_work_data(state, data){
        if (state.active_upcoming_work_data[data.class_code]){
            delete state.active_upcoming_work_data[data.class_code];
            state.current_upcoming_work = [];
        } else {
            state.current_upcoming_work = [];
        }
    },
    //--------------------------------------

    update_upcoming_work_from_mounted(state, data){
        state.current_upcoming_work = [];

        if (data.value === null){
            state.current_upcoming_work = [];
        } else {
            state.current_upcoming_work.push(data.value);
        }
    },

    // Update the loading linear property
    update_loading_linear(state, data){
        state.loading_linear = data.value;
    },
    //--------------------------------------

    // Update the refresh data property
    update_refresh_data(state, data){
        state.refresh_data = data.value;
    },
    //--------------------------------------

    // Update active class posts property
    update_active_class_posts(state, data){
        state.active_class_posts[data.class_code] = data.class_posts;
    },
    //--------------------------------------

    // Add more posts
    add_more_posts(state, data){
        state.active_class_posts[data.class_code].push(data.class_post);
    },
    //--------------------------------------

    // Remove a particular class posts
    remove_class_post(state, data){
        delete state.active_class_posts[data.class_code];
    },
    //--------------------------------------

    // Remove the offset for a particular class
    remove_offset(state, data){
        delete state.active_class_post_offset[data.class_code];
    },
    //--------------------------------------

    // Remove all class posts
    remove_all_class_posts(state){
        state.active_class_posts = {};
    },
    //--------------------------------------

    // Update offset
    update_active_post_offset(state, data){
        state.active_class_post_offset[data.class_code] = data.offset;
    },
    //--------------------------------------

    // Update infinite scroll
    update_spinner(state, data){
        state.spinner = data.value;
    },
    //--------------------------------------

    // Update class post
    update_class_post(state, data){
        let class_posts = state.active_class_posts[data.class_code];

        class_posts.forEach((post, index) => {
            if (post.id === data.post_id){
                class_posts.splice(index, 1);
            }
        });

        state.posts_array = state.active_class_posts[data.class_code];
    },
    //--------------------------------------

    // Add new post to available posts
    add_new_post(state, data){
        if (state.active_class_posts.hasOwnProperty(data.class_code)){
            let class_posts = state.active_class_posts[data.class_code];

            class_posts.unshift(data.post);

            state.posts_array = state.active_class_posts[data.class_code];
        } else {
            state.active_class_posts[data.class_code] = [];

            let class_posts = state.active_class_posts[data.class_code];

            class_posts.unshift(data.post);

            state.posts_array = state.active_class_posts[data.class_code];

            state.loaded_posts = true;
        }
    },
    //--------------------------------------

    // Update can create post
    update_can_create_post(state, data){
        state.can_create_post = data.value;
    },
    //--------------------------------------

    remove_deleted_post(state, data){
        let class_posts = state.active_class_posts[data.class_code]
        for (let [i, post] of class_posts.entries()){
            if (post.id === data.post_id){
                class_posts.splice(i, 1);
            }
        }
        state.active_class_posts[data.class_code] = class_posts;
        state.posts_array = class_posts;

        if (state.active_class_posts[data.class_code].length === 0){
            state.loaded_posts = 'no_posts';
            delete state.active_class_posts[data.class_code];
            delete state.active_class_post_offset[data.class_code];
        }
    },

    // Reset data
    reset_data(state){
        state.loaded_posts = false;
        state.posts_array = [];
        state.loading_linear = true;
        state.refresh_data = false;
        state.active_class_posts = {};
        state.active_class_post_offset = {};
        state.active_upcoming_work_data = {};
        state.current_upcoming_work = [];
        state.spinner = true;
        state.can_create_post = false;
    }
    //--------------------------------------
}