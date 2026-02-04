export const state = () => ({
    class_id: null // Class code
})

export const mutations = {
    // Update class code
    update_class_id(state, data){
        state.class_id = data.value;
    },
    //-------------------------

    // Reset data
    reset_data(state){
        state.class_id = '';
    }
    //---------------------------
}