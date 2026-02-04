export const state = () => ({
    classwork_details_fetched: false, // Classwork details fetched property
    classwork_details_array: [], // Classwork details array value
    classwork_details: {}, // Classwork details value
    students_available: false // Student available value
})

export const mutations = {
    // Update the classwork details fetched property
    update_classwork_details_fetched(state, data){
        state.classwork_details_fetched = data.value;
    },
    //--------------------------------------

    // Update the classwork details array property
    update_classwork_details_array(state, data){
        state.classwork_details_array = data.value;
    },
    //--------------------------------------

    // Remove the classwork details for a particular class
    empty_classwork_details_for_class(state){
        state.classwork_details_array = [];
        state.classwork_details = {};
    },
    //--------------------------------------

    // Update classwork details for a particular class
    update_classwork_details(state, data){
        state.classwork_details = data.details;
    },
    //--------------------------------------

    // Update students_available property
    update_students_available(state, data){
        state.students_available = data.value;
    },
    //--------------------------------------
    
    // Reset data
    reset_data(state){
        state.classwork_details_fetched = false;
        state.classwork_details_array = [];
        state.classwork_details = {};
        state.students_available = false;
    }
    //--------------------------------------
}