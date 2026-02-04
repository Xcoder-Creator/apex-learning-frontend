export default {
    methods: {
        // Date picker utility
        date_picker_utility(date){
            if (this.started === false){
                const [year, month, day] = date.split('-');
                this.date = `${month} ${day}, ${year}`
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var date = new Date();
                var formated_date = String(months[parseInt(month) - 1]) + ' ' + String(parseInt(day)) + ', ' + parseInt(year);
                this.month = String(months[parseInt(month) - 1]);
                this.day = String(parseInt(day));
                this.year = parseInt(year);
                this.date = formated_date;
            } else if (this.started === true){
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var date = new Date();
                var formated_date = String(months[date.getMonth()]) + ' ' + String(date.getDate()) + ', ' + date.getFullYear();
                this.month = String(months[date.getMonth()]);
                this.day = String(date.getDate());
                this.year = date.getFullYear();
                this.date = formated_date;
            }
        },
        //--------------------------------------------------------------------------------------------

        // Remove option utility
        remove_option_utility(question, option){
            if (this.questions_array[question].options.length > 2){
                let value = this.questions_array[question].options[option].opt;
                let index = this.questions_array[question].options.map(object => object.opt).indexOf(value);
                this.questions_array[question].options.splice(index, 1);
                let question_x = this.questions_array[question];
                this.questions_array.splice(question, 1);
                this.questions_array[question] = question_x;

                // Update snackbar text from vuex
                let obj = {
                    value: true,
                    text: 'Option deleted!'
                }

                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                //--------------------------------------

                setTimeout(() => {
                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, { value: false });
                }, 1000);
            } else {
                // Update the err msg dialog through vuex
                let obj = {
                    value: true,
                    msg: 'A minimum of two options is required!',
                    err: true
                }

                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                //---------------------------------------------
            }
        },
        //-------------------------------------------------------------------------------  

        // Add option utility
        add_option_utility(i){
            if (this.questions_array[i].options.length < 4){
                this.questions_array[i].options.push({ opt: '' });

                // Update snackbar text from vuex
                let obj = {
                    value: true,
                    text: 'Option added!'
                }

                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                //--------------------------------------

                setTimeout(() => {
                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, { value: false });
                }, 1000);
            } else {
                // Update the err msg dialog through vuex
                let obj = {
                    value: true,
                    msg: 'More than 4 options is not allowed!',
                    err: true
                }

                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                //---------------------------------------------
            }
        },
        //---------------------------------------------------------------------

        add_question_utility(){
            if (this.questions_array.length < 30){
                this.questions_array.push({
                    question: '',
                    answer: '',
                    options: [
                        {
                            opt: ''
                        },

                        {
                            opt: ''
                        }
                    ]
                });

                // Update snackbar text from vuex
                let obj = {
                    value: true,
                    text: 'Question added!'
                }

                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                //--------------------------------------

                setTimeout(() => {
                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, { value: false });
                }, 1000);
            } else {
                // Update the err msg dialog through vuex
                let obj = {
                    value: true,
                    msg: 'Can\'t have more than 30 questions!',
                    err: true
                }

                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                //---------------------------------------------
            }
        },

        leave_input_utility(){
            if (/^ *$/.test(this.time) || this.time === null || this.time === undefined){
                this.time = '11:59 pm';
            } else {
                let time_txt = this.time.split('"').join('').replace(/^[ ]+|[ ]+$/g, '').trim().replace(/ /g, ""); // Clean the time string to remove illegal characters
                let meridim = time_txt.slice(-2); // Extract the meridim (AM or PM) from the time string
                let act_time = time_txt.slice(0, -2); // Remove the meridim (AM or PM) from the time string

                if ((/^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$/).test(act_time)){
                    let formated_time = '';

                    if (meridim === 'PM' || meridim === 'pm'){
                        formated_time = act_time + ' pm';
                        this.time = formated_time;
                    } else if (meridim === 'AM' || meridim === 'am'){
                        formated_time = act_time + ' am';
                        this.time = formated_time;
                    } else {
                        formated_time = act_time + ' pm';
                        this.time = formated_time;
                    }
                } else {
                    this.time = '11:59 pm';
                }
            }
        },

        reset_dialog_utility(){
            if (this.can_reset === true){
                this.started = true;
                this.title = '';
                this.instruction = '';
                this.points = null;
                this.time = '11:59 pm';
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var date = new Date();
                var formated_date = String(months[date.getMonth()]) + ' ' + String(date.getDate()) + ', ' + date.getFullYear();
                this.month = String(months[date.getMonth()]);
                this.day = String(date.getDate());
                this.year = date.getFullYear();
                this.picker = '';
                setTimeout(() => {
                    this.date = formated_date;
                }, 3);
                this.questions_array = null;
                this.questions_array = [
                    {
                        question: '',
                        answer: '',
                        options: [
                            {
                                opt: ''
                            },

                            {
                                opt: ''
                            }
                        ]
                    }
                ];

                this.calendar = false;
                
                this.create_quiz = false;
                
                setTimeout(() => {
                    this.create_quiz = true;
                }, 5);
                
                // Update snackbar text from vuex
                let obj = {
                    value: true,
                    text: 'Data reset!'
                }

                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                //--------------------------------------

                setTimeout(() => {
                    this.started = false;
                }, 5);

                setTimeout(() => {
                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, { value: false });
                }, 1000);
            }
        },

        delete_question_utility(question){
            if (this.questions_array.length > 1){
                this.questions_array.splice(question, 1);

                // Update snackbar text from vuex
                let obj = {
                    value: true,
                    text: 'Question deleted!'
                }

                this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, obj);
                //--------------------------------------

                setTimeout(() => {
                    this.$store.commit(this.$config.VUEX_UPDATE_SNACKBAR, { value: false });
                }, 1000);
            } else {
                // Update the err msg dialog through vuex
                let obj = {
                    value: true,
                    msg: 'A minimum of one question is required!',
                    err: true
                }

                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                //---------------------------------------------
            }
        },

        get_full_date(){
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var date = new Date();
            var formated_date = String(months[date.getMonth()]) + ' ' + String(date.getDate()) + ', ' + date.getFullYear();
            this.month = String(months[date.getMonth()]);
            this.day = String(date.getDate());
            this.year = date.getFullYear();
            this.date = formated_date;
        }
    }
}