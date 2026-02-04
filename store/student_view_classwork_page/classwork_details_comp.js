export const state = () => ({
    classwork_details_fetched: false, // Classwork details fetched property
    classwork_details: {} // Classwork details value
})

export const mutations = {
    // Update the classwork details fetched property
    update_classwork_details_fetched(state, data){
        state.classwork_details_fetched = data.value;
    },
    //--------------------------------------

    // Remove the classwork details for a particular class
    empty_classwork_details_for_class(state){
        state.classwork_details = {};
    },
    //--------------------------------------

    // Update classwork details for a particular class
    update_classwork_details(state, data){
        state.classwork_details = data.details;
    },
    //--------------------------------------
    
    // Reset data
    reset_data(state){
        state.classwork_details_fetched = false;
        state.classwork_details = {};
    }
    //--------------------------------------
}