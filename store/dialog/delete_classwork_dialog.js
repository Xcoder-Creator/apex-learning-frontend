export const state = () => ({
    value: false, // Delete classwork dialog visibility Eg: true - open dialog or false - close dialog
    classwork_id: 0, // ID of the classwork
    class_code: '' // Classcode of the class
})

export const mutations = {
    // Update the dialog
    update_dialog(state, data){
        state.value = data.value;
    },
    //-----------------------------

    // Update classwork ID
    update_classwork_id(state, data){
        state.classwork_id = data.value;
    },
    //-----------------------------

    // Update classcode
    update_classcode(state, data){
        state.class_code = data.value;
    },
    //-----------------------------

    // Reset the dialog
    reset_data(state){
        state.value = false;
        state.classwork_id = 0;
        state.class_code = '';
    }
    //--------------------------
}