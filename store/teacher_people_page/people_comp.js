export const state = () => ({
    people_data_fetched: true, // People data fetched property
    people_data_array: [], // People data array property
    teacher_data_array: {}, // Teacher data array property
    active_people: {}, // Active people property
    active_teacher: {} // Active teacher property
})

export const mutations = {
    // Update the people data fetched property
    update_people_data_fetched(state, data){
        state.people_data_fetched = data.value;
    },
    //--------------------------------------

    // Update the classwork array property
    update_people_data_array(state, data){
        state.people_data_array = data.value;
    },
    //--------------------------------------

    // Update teacher data property
    update_teacher_data_array(state, data){
        state.teacher_data_array = data.value;
    },
    //--------------------------------------

    // Update active teacher property
    update_active_teacher(state, data){
        state.active_teacher[data.class_code] = data.value;
    },
    //--------------------------------------

    // Update active people property
    update_active_people(state, data){
        state.active_people[data.class_code] = data.value;
    },
    //--------------------------------------

    // Reset data
    reset_data(state){
        state.people_data_fetched = false;
        state.people_data_array = [];
        state.teacher_data_array = {};
        state.active_people = {};
        state.active_teacher = {};
    }
    //--------------------------------------
}