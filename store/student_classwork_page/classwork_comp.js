export const state = () => ({
    classwork_fetched: false, // Classwork fetched property
    classwork_array: [], // Classwork array value
    active_classworks: {} // Active classworks value
})

export const mutations = {
    // Update the classwork fetched property
    update_classwork_fetched(state, data){
        state.classwork_fetched = data.value;
    },
    //--------------------------------------

    // Update the classwork array property
    update_classwork_array(state, data){
        state.classwork_array = data.value;
    },
    //--------------------------------------

    // Remove the classworks for a particular class
    empty_classwork_for_class(state, data){
        if (state.active_classworks[data.class_code]){
            delete state.active_classworks[data.class_code];
        }
    },
    //--------------------------------------

    // Add new classworks for a particular class
    add_new_classwork(state, data){
        state.active_classworks[data.class_code] = data.classworks;
        state.classwork_array = data.classworks;
    },
    //--------------------------------------
    
    // Reset data
    reset_data(state){
        state.classwork_fetched = false;
        state.classwork_array = [];
        state.active_classworks = {};
    }
    //--------------------------------------
}