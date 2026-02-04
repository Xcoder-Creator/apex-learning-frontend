export const state = () => ({
    title: '', // Title value
    instruction: '', // Instruction value
    month: '', // Month value
    day: '', // Day value
    year: '', // Year value
    date: '', // Date value
    time: '', // Time value
    points: '', // Points value
    questions_array: [] // Questions array value
})

export const mutations = {
    // Update title 
    update_title(state, data){
        state.title = data.value;
    },
    //------------------------

    // Update instruction
    update_instruction(state, data){
        state.instruction = data.value;
    },
    //------------------------

    // Update questions array
    update_questions_array(state, data){
        state.questions_array = data.value;
    },
    //------------------------

    // Reset data
    reset_data(state){
        state.title = '';
        state.instruction = '';
        state.questions_array = [];
    }
    //---------------------------
}