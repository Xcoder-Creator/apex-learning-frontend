export const state = () => ({
    value: false, // edit class dialog value property
    class_code: '', // class code value property
    class_name: '', // class name value property
    class_section: '', // class section value property
    class_subject: '', // class subject value property
    class_room: '', // class room value property
    editClass_btn: true, // edit class button
    editClass_btn_load: false // edit class button load
})

export const mutations = {
    // Update edit class dialog value property
    update_dialog(state, data){
        state.value = data.value;
    },
    //----------------------------------
    
    // Update class code value property
    update_class_code(state, data){
        state.class_code = data.class_code;
    },
    //----------------------------------

    // Update class name value property
    update_class_name(state, data){
        state.class_name = data.class_name;
    },
    //----------------------------------

    // Update class section value property
    update_class_section(state, data){
        state.class_section = data.class_section;
    },
    //----------------------------------

    // Update class subject value property
    update_class_subject(state, data){
        state.class_subject = data.class_subject;
    },
    //----------------------------------

    // Update class room value property
    update_class_room(state, data){
        state.class_room = data.class_room;
    },
    //----------------------------------

    // Update edit class btn value property
    update_edit_class_btn(state, data){
        state.editClass_btn = data.value;
    },
    //----------------------------------

    // Update edit class btn load value property
    update_edit_class_btn_load(state, data){
        state.editClass_btn_load = data.value;
    },
    //----------------------------------

    // Reset data
    reset_data(state){
        state.value = false;
        state.class_code = '';
        state.class_name = '';
        state.class_section = '';
        state.class_subject = '';
        state.class_room = '';
        state.editClass_btn = true;
        state.editClass_btn_load = false;
    }
    //---------------------------
}