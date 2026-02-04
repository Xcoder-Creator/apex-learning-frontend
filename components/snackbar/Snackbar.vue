<template>
    <div class="text-center ma-2">
        <v-snackbar
            v-model="snackbar"
            timeout="-1"
        >
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="primary"
                    text
                    v-bind="attrs"
                    @click="close_snackbar()"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'Snackbar', // Component name

    // Computed properties
    computed: {
        // Snackbar value property from vuex
        snackbar: {
            get(){
                return this.$store.state.snackbar.snackbar.value;
            },

            set(value){
                this.$store.commit(this.$config.VUEX_RESET_SNACKBAR);
            }
        },
        //---------------------------------------

        // Text to place into the snackbar
        text: function(){
            return this.$store.state.snackbar.snackbar.text;
        }
        //---------------------------------------
    },
    //---------------------------

    // Methods property
    methods: {
        // Close snackbar
        close_snackbar(){
            var route_name = this.$route.name; // Name of the current route

            // Check if the current route is the student classes home page
            if (route_name === 'student-classes'){
                this.snackbar = false; // Close snackbar
                this.$store.commit('classes_home_page/utils/update_value', { value: false }); // Update is sncakbar displayed property in vuex
            } else {
                this.snackbar = false; // Close snackbar
            }
        }
        //-------------------
    }
    //-----------------------
}
</script>