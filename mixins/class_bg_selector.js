export default {
    methods: {
        // Reset
        reset(){
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
        },
        //---------------------------

        // First space
        first_space(){
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

            this.reset();
        },
        //---------------------------

        // Second space
        second_space(id){
            let bg = document.querySelectorAll('[data-bg]');
            let svg = document.querySelectorAll('[data-svg]');

            bg.forEach(elem => {
                elem.style.border = 'unset';
            });

            svg.forEach(elem => {
                elem.style.display = 'none';
                elem.removeAttribute("fill");
            });

            let bg_elem = document.querySelector(`[data-bg="${id}"]`);
            let svg_elem = document.querySelector(`[data-svg="${id}"]`);

            if (typeof(bg_elem) != 'undefined' && bg_elem != null){
                if (typeof(svg_elem) != 'undefined' && svg_elem != null){
                    document.querySelector(`[data-bg="${id}"]`).style.border = '5px solid #1976d2';
                    document.querySelector(`[data-svg="${id}"]`).style.display = 'inline';
                    document.querySelector(`[data-svg="${id}"]`).setAttribute("fill", "#1976d2");
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_bg_class_img', { value: id });
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: false });
                } else {
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_bg_class_img', { value: null });
                    this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: true });
                }
            } else {
                this.$store.commit('dialog/bg_class_img_list_dialog/update_bg_class_img', { value: null });
                this.$store.commit('dialog/bg_class_img_list_dialog/update_disable_select_theme', { value: true });
            }

            this.reset();
        },
        //---------------------------

        // Select the background image for a particular class
        async class_bg_selector(id){
            if (id === 1){
                if (this.data_1 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_1 = true;
                }
            } else if (id === 2){
                if (this.data_2 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_2 = true;
                }
            } else if (id === 3){
                if (this.data_3 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_3 = true;
                }
            } else if (id === 4){
                if (this.data_4 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_4 = true;
                }
            } else if (id === 5){
                if (this.data_5 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_5 = true;
                }
            } else if (id === 6){
                if (this.data_6 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_6 = true;
                }
            } else if (id === 7){
                if (this.data_7 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_7 = true;
                }
            } else if (id === 8){
                if (this.data_8 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_8 = true;
                }
            } else if (id === 9){
                if (this.data_9 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_9 = true;
                }
            } else if (id === 10){
                if (this.data_10 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_10 = true;
                }
            } else if (id === 11){
                if (this.data_11 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_11 = true;
                }
            } else if (id === 12){
                if (this.data_12 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_12 = true;
                }
            } else if (id === 13){
                if (this.data_13 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_13 = true;
                }
            } else if (id === 14){
                if (this.data_14 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_14 = true;
                }
            } else if (id === 15){
                if (this.data_15 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_15 = true;
                }
            } else if (id === 16){
                if (this.data_16 === true){
                    this.first_space();
                } else {
                    this.second_space(id);
                    this.data_16 = true;
                }
            }
        }
        //---------------------------------------------------------------------
    }
}