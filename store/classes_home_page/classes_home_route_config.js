export const state = () => ({
    enable_unenroll_user: true, // If true - Allow the user to unenroll themselves from the class || If false - Stop the user from unenrolling from the class
    enable_join_class: true, // If true - Allow the user to join a class || If false - Stop the user from joining a class
    enable_create_class: true, // If true - Allow the user to create a class || If false - Stop the user from creating a class
    enable_archive_class: true, // If true - Allow the user to archive a class || If false - Stop the user from archiving a class
    enable_edit_class: true // If true - Allow the user to edit a class || If false - Stop the user from editing a class
})

export const mutations = {
    // Update enable unenroll user property
    update_enable_unenroll_user(state, data){
        state.enable_unenroll_user = data.value;
    },
    //--------------------------------------------

    // Update enable join class property
    update_enable_join_class(state, data){
        state.enable_join_class = data.value;
    },
    //--------------------------------------------

    // Update enable create class property
    update_enable_create_class(state, data){
        state.enable_create_class = data.value;
    },
    //--------------------------------------------

    // Update enable archive class property
    update_enable_archive_class(state, data){
        state.enable_archive_class = data.value;
    },
    //--------------------------------------------

    // Update enable edit class property
    update_enable_edit_class(state, data){
        state.enable_edit_class = data.value;
    },
    //--------------------------------------------

    // Reset properties
    reset_data(state){
        state.enable_unenroll_user = true;
        state.enable_join_class = true;
        state.enable_create_class = true;
        state.enable_archive_class = true;
        state.enable_edit_class = true;
    }
    //--------------------------------------
}