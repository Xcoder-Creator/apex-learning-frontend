export const state = () => ({
    unenroll_from_class: false, // Unenroll from class property
    started_unenroll: false // True - If user has started unenrolling him self or her self from a class | False - If a user is not unenrolling him self or her self from a class
})

export const mutations = {
    // Unenroll from class property update
    update_unenroll_from_class(state, data){
        state.unenroll_from_class = data.value;
    },
    //-------------------------

    // Started unenroll property update
    update_started_unenroll(state, data){
        state.started_unenroll = data.value;
    },
    //-------------------------

    // Reset data
    reset_data(state){
        state.unenroll_from_class = false;
        state.started_unenroll = false;
    }
    //---------------------------
}