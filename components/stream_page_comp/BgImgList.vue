<template>
    <div id="bg_class_img_list_container">
        <div id="xccz_part">
            <div @click="select_bg_img(1)" data-vxc="1" id="bg_img_part" class="auuqi9b">
                <img data-bg="1" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/backtoschool.jpg'" alt="">
                <svg data-svg="1" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(2)" data-vxc="2" id="bg_img_part" class="zz7unx">
                <img data-bg="2" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/chemistry.jpg'" alt="">
                <svg data-svg="2" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(3)" data-vxc="3" id="bg_img_part" class="zz7unx">
                <img data-bg="3" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/cinema.jpg'" alt="">
                <svg data-svg="3" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(4)" data-vxc="4" id="bg_img_part" class="zz7unx">
                <img data-bg="4" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/code.jpg'" alt="">
                <svg data-svg="4" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(5)" data-vxc="5" id="bg_img_part" class="zz7unx">
                <img data-bg="5" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/concert.jpg'" alt="">
                <svg data-svg="5" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(6)" data-vxc="6" id="bg_img_part" class="zz7unx">
                <img data-bg="6" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/economics.jpg'" alt="">
                <svg data-svg="6" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(7)" data-vxc="7" id="bg_img_part" class="zz7unx">
                <img data-bg="7" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/english.jpg'" alt="">
                <svg data-svg="7" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(8)" data-vxc="8" id="bg_img_part" class="zz7unx">
                <img data-bg="8" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/geography.jpg'" alt="">
                <svg data-svg="8" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>
        </div>

        <div id="bccy_part">
            <div @click="select_bg_img(9)" data-vxc="9" id="bg_img_part" class="auuqi9b">
                <img data-bg="9" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/graduation.jpg'" alt="">
                <svg data-svg="9" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(10)" data-vxc="10" id="bg_img_part" class="zz7unx">
                <img data-bg="10" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/hobby.jpg'" alt="">
                <svg data-svg="10" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(11)" data-vxc="11" id="bg_img_part" class="zz7unx">
                <img data-bg="11" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/learnlanguage.jpg'" alt="">
                <svg data-svg="11" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(12)" data-vxc="12" id="bg_img_part" class="zz7unx">
                <img data-bg="12" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/math.jpg'" alt="">
                <svg data-svg="12" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(13)" data-vxc="13" id="bg_img_part" class="zz7unx">
                <img data-bg="13" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/read.jpg'" alt="">
                <svg data-svg="13" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(14)" data-vxc="14" id="bg_img_part" class="zz7unx">
                <img data-bg="14" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/soccer.jpg'" alt="">
                <svg data-svg="14" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(15)" data-vxc="15" id="bg_img_part" class="zz7unx">
                <img data-bg="15" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/videogaming.jpg'" alt="">
                <svg data-svg="15" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>

            <div @click="select_bg_img(16)" data-vxc="16" id="bg_img_part" class="zz7unx">
                <img data-bg="16" id="xbb7yn_xcc" :src="$config.apiUrl + '/images/class_background_images/wrestling.jpg'" alt="">
                <svg data-svg="16" focusable="false" width="24" height="24" viewBox="0 0 24 24" class="UYAYve"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18 9l-8 8z"></path></svg>
            </div>
        </div>
    </div>
</template>

<script>
// Imported mixins
import class_bg_selector from '../../mixins/class_bg_selector'
//---------------------------------

export default {
    name: 'BgImgList', // Component name

    // Registered mixins
    mixins: [
        class_bg_selector
    ],
    //--------------------------------

    data(){
        return {
            data_1: false,
            data_2: false,
            data_3: false,
            data_4: false,
            data_5: false,
            data_6: false,
            data_7: false,
            data_8: false,
            data_9: false,
            data_10: false,
            data_11: false,
            data_12: false,
            data_13: false,
            data_14: false,
            data_15: false,
            data_16: false,
        }
    },

    // Computed properties
    computed: {
        // Vuex property to toggle the visibility of the bg class image list dialog
        dialog: {
            get(){
                if (this.$store.state.dialog.bg_class_img_list_dialog.value === false){
                    this.data_1 = false;
                    this.data_2 = false;
                    this.data_3 = false;
                    this.data_4 = false;
                    this.data_5 = false;
                    this.data_6 = false;
                    this.data_7 = false;
                    this.data_8 = false;
                    this.data_9 = false;
                    this.data_10 = false;
                    this.data_11 = false;
                    this.data_12 = false;
                    this.data_13 = false;
                    this.data_14 = false;
                    this.data_15 = false;
                    this.data_16 = false;

                    let bg = document.querySelectorAll('[data-bg]');
                    let svg = document.querySelectorAll('[data-svg]');

                    bg.forEach(elem => {
                        elem.style.border = 'unset';
                    });

                    svg.forEach(elem => {
                        elem.style.display = 'none';
                        elem.removeAttribute("fill");
                    });

                    this.$store.commit('dialog/bg_class_img_list_dialog/update_bg_class_img', { value: null });
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: true });
                }

                return this.$store.state.dialog.bg_class_img_list_dialog.value;
            },

            set(value){
                this.$store.commit('dialog/bg_class_img_list_dialog/update_dialog', { value: value });
            }
        },
        //--------------------------------------------
    },
    //----------------------------------------

    // Methods property
    methods: {
        // Select background image
        select_bg_img(id){
            if (this.$store.state.dialog.bg_class_img_list_dialog.can_select_bg === true){
                this.class_bg_selector(id);
            }
        }
        //-----------------------------
    }
    //---------------------------
}
</script>

<style scoped>
@import url('../../assets/class_stream_page.css'); /* CSS stylesheet file for the class stream page */
@import url('../../assets/settings_page.css'); /* CSS stylesheet file for the settings page */
@import url('../../assets/classes_home_page.css'); /* CSS stylesheet file for the classes home page */
</style>