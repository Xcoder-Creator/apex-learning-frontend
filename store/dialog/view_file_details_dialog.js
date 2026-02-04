export const state = () => ({
    value: false, // View file details dialog visibility Eg: true - open dialog or false - close dialog

    // File properties
    file_data: {
        post_creators_id: null,
        user_name: '',
        file_name: '',
        file_type: '',
        file_size: '',
        post_creation_date: '',
        post_creation_time: ''
    }
    //-----------------------
})

export const mutations = {
    // Update the view file dialog
    update_data(state, data){
        state.file_data.post_creators_id = data.post_creators_id;
        state.file_data.user_name = data.user_name;
        state.file_data.file_name = data.file_name;
        state.file_data.file_type = data.file_type;
        state.file_data.file_size = data.file_size;
        state.file_data.post_creation_date = data.post_creation_date;
        state.file_data.post_creation_time = data.post_creation_time;
    },
    //-----------------------------

    // Open or close the view file dialog
    update_value(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Reset the view file dialog
    reset_data(state){
        state.value = false;
        state.file_data.post_creators_id = null;
        state.file_data.user_name = '';
        state.file_data.file_name = '';
        state.file_data.file_type = '';
        state.file_data.file_size = '';
        state.file_data.post_creation_date = '';
        state.file_data.post_creation_time = '';
    }
    //--------------------------
}