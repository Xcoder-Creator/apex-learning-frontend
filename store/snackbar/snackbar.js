export const state = () => ({
    value: false, // The value to toggle the display of the snackbar component
    text: '' // The text printed on the snackbar
})

export const mutations = {
    // Update the value and text of the snackbar
    update_data(state, data){
        state.value = data.value;
        state.text = data.text;
    },
    //------------------------------------

    // Reset the data properties
    reset_data(state){
        state.value = false;
        state.text = '';
    }
    //--------------------------------------
}