export const state = () => ({
    class_list: [], // A list of different classes

    // Class data
    class_data: {
        no_of_classes: 0
    }
    //--------------------
})

export const mutations = {
    // Update class data
    update_class_data(state, data){
        state.class_data.no_of_classes = data.value;
    },
    //-------------------------

    // Update class list
    update_class_list(state, data){
        state.class_list = data.details;
    },
    //-------------------------

    // Reset data
    reset_data(state){
        state.class_list = [];
        state.class_data.no_of_classes = 0;
    }
    //---------------------------
}