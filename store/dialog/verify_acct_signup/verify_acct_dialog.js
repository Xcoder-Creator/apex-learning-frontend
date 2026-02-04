export const state = () => ({
    value: false, // If true - Open account verification dialog || If false - Close the account verification dialog
    name: '', // The name of the user to be used in the dialog
    email: '' // The email of the user to be used in the dialog
})

export const mutations = {
    // Update the properties of the account verification dialog in the signup route
    update_data(state, data){
        state.value = data.value;
        state.name = data.name;
        state.email = data.email;
    },
    //-----------------------------------------------

    // Reset the properties of the account verification dialog in the signup route
    reset_data(state){
        state.value = false;
    }
    //-----------------------------------------------------
}