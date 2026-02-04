<template>
   <div id="exp_panels2">
        <v-expansion-panels style="border-radius: 0.5rem;" id="exp_panel_inner">
            <v-expansion-panel>
                <v-expansion-panel-header v-ripple>
                    View class details
                </v-expansion-panel-header>

                <v-expansion-panel-content style="text-align: left;">
                    <p style="font-size: 0.92rem;"><b>Section</b><span id="class_info">{{ class_info.class_section }}</span></p>
                    <p style="font-size: 0.92rem;"><b>Room</b><span id="class_info">{{ class_info.class_room }}</span></p>
                    <p style="font-size: 0.92rem;"><b>Subject</b><span id="class_info">{{ class_info.class_subject }}</span></p>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
export default {
    name: 'ExpPanel', // Component name

    // Computed property
    computed: {
        // Class info property from vuex
        class_info: function(){
            return this.$store.state.class_info.class_info;
        }
        //--------------------------------------------------------
    }
    //-------------------------------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>