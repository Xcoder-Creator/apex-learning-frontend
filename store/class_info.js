export const state = () => ({
    // Holds data about a particular class
    class_info: {
        class_background_img: '',
        class_code: '',
        class_name: '',
        class_room: '',
        class_section: '',
        class_status: '',
        class_subject: '',
        id: 0,
        profile_initials: '',
        teacher_name: ''
    }
    //---------------------------
})

export const mutations = {
    // Update class info
    update_class_info(state, data){
        state.class_info = data.value;
    },
    //-------------------------

    // Reset data
    reset_data(state){
        state.class_info = {
            class_background_img: '',
            class_code: '',
            class_name: '',
            class_room: '',
            class_section: '',
            class_status: '',
            class_subject: '',
            id: 0,
            profile_initials: '',
            teacher_name: ''
        };
    }
    //---------------------------
}