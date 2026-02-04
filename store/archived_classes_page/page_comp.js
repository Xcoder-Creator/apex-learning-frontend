export const state = () => ({
    is_data_loaded: false, 
    is_data_available: false,
    archived_classes: []
})

export const mutations = {
    update_is_data_loaded(state, data){
        state.is_data_loaded = data.value;
    },

    update_is_data_available(state, data){
        state.is_data_available = data.value;
    },

    update_archived_classes(state, data){
        state.archived_classes = data.archived_classes;
    },

    // Reset properties
    reset_data(state){
        state.is_data_loaded = false;
        state.is_data_available = false;
        state.archived_classes = []
    }
    //--------------------------------------
}