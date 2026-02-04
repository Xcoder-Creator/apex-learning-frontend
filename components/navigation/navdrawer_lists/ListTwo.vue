<template>
    <v-list dense nav>
        <v-list-item-group
            color="#1976d2"
            v-model="lnk_sect2"
            :mandatory="list_two"
        >
            <v-list-item
                v-for="item in items2"
                :key="item.title"
                @click="menu_link_item(item.menu)"
                link
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
    name: 'ListTwo', // Component name

    mixins: [ select_item ], // Registered mixins

    // Reactive data properties
    data(){
        return {
            // Items in a list
            items2: [
                { title: 'To-do', menu: 'to_do', icon: 'mdi-clipboard-list-outline' }
            ],
            //--------------------
        }
    },
    //-------------------------------

    // Computed property
    computed: {
        // Link sections
        lnk_sect2: {
            get(){
                return this.$store.state.watch_navdrawer_items.lnk_sect2;
            },

            set(value){
                this.$store.commit('watch_navdrawer_items/update_value', { sect: 2, value: value });
            }
        },
        //-----------------------------------------

        // List item
        list_two: function(){
            return this.$store.state.nav_drawer_lists.list_two;
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