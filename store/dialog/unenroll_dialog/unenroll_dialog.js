export const state = () => ({
    value: false, // If true - Open unenroll user dialog || If false - Close unenroll user dialog
    class_name: '', // Name of the class
    class_code: '' // Class code of the class
})

export const mutations = {
    // Update the value property
    update_value(state, data){
        state.value = data.value;
    },
    //--------------------------------------

    // Update the class name property
    update_class_name(state, data){
        state.class_name = data.class_name;
    },
    //--------------------------------------

    // Update class code property
    update_class_code(state, data){
        state.class_code = data.class_code;
    },
    //--------------------------------------

    // Reset the value, class name and class code properties
    reset_data(state){
        state.value = false;
        state.class_name = '';
        state.class_code = '';
    }
    //--------------------------------------
}