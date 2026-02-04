<template>
    <v-list dense nav>
        <v-list-item-group
            v-model="lnk_sect3"
            color="#1976d2"
            :mandatory="list_three"
        >
            <v-list-item
                v-for="item in items3"
                :key="item.title"
                link
                @click="menu_link_item(item.menu)"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
// Imported mixins
import select_item from '../../../mixins/nav_drawer_items/select_item'
//-----------------------------------------

export default {
    name: 'ListThree', // Component name

    mixins: [ select_item ], // Registered mixins

    // Reactive data properties
    data(){
        return {
            // Items in a list
            items3: [
                { title: 'Archived classes', menu: 'archived_classes', icon: 'mdi-archive-arrow-down-outline' },
                { title: 'Settings', menu: 'settings', icon: 'mdi-cog-outline' },
                { title: 'Help', menu: 'help', icon: 'mdi-help-circle-outline' },
                { title: 'Privacy policy', menu: 'privacy_policy', icon: 'mdi-lock-outline' },
                { title: 'About us', menu: 'about_us', icon: 'mdi-information-outline' },
                { title: 'Logout', menu: 'logout', icon: 'mdi-logout' }
            ],
            //------------------------
        }
    },
    //-------------------------------

    // Computed property
    computed: {
        // Link sections
        lnk_sect3: {
            get(){
                return this.$store.state.watch_navdrawer_items.lnk_sect3;
            },

            set(value){
                this.$store.commit('watch_navdrawer_items/update_value', { sect: 3, value: value });
            }
        },
        //----------------------------------

        // List item
        list_three: function(){
            return this.$store.state.nav_drawer_lists.list_three;
        }
        //-----------------------------------------
    },
    //-------------------------------------------------

    // Methods property
    methods: {
        // Detect what item in the nav drawer that the user clicked on
        menu_link_item(item){
            this.select_item(item); // Select item mixin method
        }
        //-------------------------------------------------------
    },
    //-------------------------
}
</script>

<style scoped>
@import url('../../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
</style>