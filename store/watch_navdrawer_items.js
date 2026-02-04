export const state = () => ({
    lnk_sect1: null, // Link tab first section
    lnk_sect2: null, // Link tab second section
    lnk_sect3: null // Link tab third section
})

export const mutations = {
    // Update properties
    update_value(state, data){
        if (data.sect === 1){
            state.lnk_sect1 = data.value;
            state.lnk_sect2 = null;
            state.lnk_sect3 = null;
        } else if (data.sect === 2){
            state.lnk_sect2 = data.value;
            state.lnk_sect1 = null;
            state.lnk_sect3 = null;
        } else if (data.sect === 3){
            state.lnk_sect3 = data.value;
            state.lnk_sect1 = null;
            state.lnk_sect2 = null;
        }
    },
    //------------------------------

    // Reset properties
    reset_data(state){
        state.lnk_sect1 = null;
        state.lnk_sect2 = null;
        state.lnk_sect3 = null;
    }
    //------------------------------
}