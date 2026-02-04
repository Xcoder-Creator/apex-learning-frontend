export const state = () => ({
    fetch_more_posts: false, // Fetch more posts value
    delete_class_post: false // Delete class post value
})

export const mutations = {
    // Update the fetch more posts property
    update_fetch_more_posts(state, data){
        state.fetch_more_posts = data.value;
    },
    //--------------------------------------

    // Update the delete class post property
    update_delete_class_post(state, data){
        state.delete_class_post = data.value;
    },
    //--------------------------------------

    // Reset data
    reset_data(state){
        state.fetch_more_posts = false;
        state.delete_class_post = false;
    }
    //--------------------------------------
}