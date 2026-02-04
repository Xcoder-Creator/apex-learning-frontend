<template>
    <v-list dense nav>
        <v-list-item-group
            v-model="lnk_sect1"
            color="#1976d2"
            :mandatory="list_one"
        >
            <v-list-item
                v-for="item in items"
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
    name: 'ListOne', // Component name

    mixins: [ select_item ], // Registered mixins

    // Reactive data properties
    data(){
        return {
            // Items in a list
            items: [
                { title: 'Classes', menu: 'class_list', icon: 'mdi-home-outline' },
                { title: 'Calendar', menu: 'calendar', icon: 'mdi-calendar-outline' }
            ]
            //------------------
        }
    },
    //-------------------------------

    // Computed property
    computed: {
        // Link sections
        lnk_sect1: {
            get(){
                return this.$store.state.watch_navdrawer_items.lnk_sect1;
            },

            set(value){
                this.$store.commit('watch_navdrawer_items/update_value', { sect: 1, value: value });
            }
        },
        //-----------------------------------------

        // List item
        list_one: function(){
            return this.$store.state.nav_drawer_lists.list_one;
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