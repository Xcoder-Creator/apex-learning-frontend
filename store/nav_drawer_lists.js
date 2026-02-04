export const state = () => ({
    list_one: false,
    list_two: false,
    list_three: false
})

export const mutations = {
    // Update lists
    update_lists(state, data){
        if (data.list_item === 1){
            state.list_one = data.value;
            state.list_two = false;
            state.list_three = false;
        } else if (data.list_item === 2){
            state.list_two = data.value;
            state.list_one = false;
            state.list_three = false;
        } else if (data.list_item === 3){
            state.list_three = data.value;
            state.list_one = false;
            state.list_two = false;
        }
    },
    //-------------------------

    // Reset data
    reset_data(state){
        state.list_one = false;
        state.list_two = false;
        state.list_three = false;
    }
    //---------------------------
}