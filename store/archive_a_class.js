export const state = () => ({
    archive_class: false, // Archive class property
    started_archive: false // True - If user has started archiving a class | False - If a user is not archiving a class
})

export const mutations = {
    // Archive class property update
    update_archive_class(state, data){
        state.archive_class = data.value;
    },
    //-------------------------

    // Started archive property update
    update_started_archive(state, data){
        state.started_archive = data.value;
    },
    //-------------------------

    // Reset data
    reset_data(state){
        state.archive_class = false;
        state.started_archive = false;
    }
    //---------------------------
}