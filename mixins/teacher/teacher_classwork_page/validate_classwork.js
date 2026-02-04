export default {
    methods: {
        // Validate classwork mixin method
        async validate_classwork(title, instruction, points, date, time, full_date, questions_array, classwork_type, date_object){
            this.started = true;
            this.can_assign_work = false;

            if (classwork_type === 'assignment' || classwork_type === 'classwork'){
                let instruction_x = '';

                if (/^ *$/.test(title) || title === null || title === undefined){
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Title is required!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------

                    this.started = false;
                    this.can_assign_work = true;
                } else {
                    if (/^ *$/.test(instruction) || instruction === null || instruction === undefined){
                        instruction_x = null;
                    } else {
                        instruction_x = instruction;
                    }

                    if (typeof(points) == 'number' && [5, 10, 15, 20, 30, 100].includes(points)){
                        if (date === full_date){
                            if (/^ *$/.test(time) || time === null || time === undefined){
                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: 'Time is required!',
                                    err: true
                                }

                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------

                                this.started = false;
                                this.can_assign_work = true;
                            } else {
                                let clean_time_string = time.split('"').join('').replace(/^[ ]+|[ ]+$/g, '').trim().replace(/ /g, ""); // Clean the time string to remove illegal characters
                                let meridim = clean_time_string.slice(-2); // Extract the meridim (AM or PM) from the time string
                                let act_time = clean_time_string.slice(0, -2); // Remove the meridim (AM or PM) from the time string

                                if ((/^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$/).test(act_time)){
                                    if (meridim === 'PM' || meridim === 'pm' || meridim === 'AM' || meridim === 'am'){
                                        let new_time = act_time + ` ${meridim}`;
                                        let empty_question = 0;
                                        let empty_answer = 0;
                                        let empty_option = 0;

                                        // Loop through the question property for each question object
                                        questions_array.forEach(element => {
                                            let question = element.question;

                                            if (/^ *$/.test(question) || question === null || question === undefined){
                                                empty_question += 1;
                                            }
                                        });
                                        //--------------------------------------

                                        if (empty_question === 0){
                                            // Loop through the question property for each question object
                                            questions_array.forEach(element => {
                                                let answer = element.answer;

                                                if (/^ *$/.test(answer) || answer === null || answer === undefined){
                                                    empty_answer += 1;
                                                }
                                            });
                                            //--------------------------------------

                                            if (empty_answer === 0){
                                                // Loop through the question property for each question object
                                                questions_array.forEach(element => {
                                                    element.options.forEach(data => {
                                                        let option = data.opt;

                                                        if (/^ *$/.test(option) || option === null || option === undefined){
                                                            empty_option += 1;
                                                        }
                                                    });
                                                });
                                                //--------------------------------------

                                                if (empty_option === 0){
                                                    this.started = false;
                                                    this.can_reset = false;
                                                    this.assign_btn = false;
                                                    this.assign_btn_load = true;

                                                    this.assign_classwork_operation(title, instruction_x, points, new_time, date_object, questions_array, classwork_type, this.$route.query.class_code); // Assign classwork operation mixin method
                                                } else if (empty_option > 0){
                                                    // Update the err msg dialog through vuex
                                                    let obj = {
                                                        value: true,
                                                        msg: 'Option is missing for a particular question!',
                                                        err: true
                                                    }

                                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                                    //---------------------------------------------

                                                    this.started = false;
                                                    this.can_assign_work = true;
                                                }
                                            } else if (empty_answer > 0){
                                                // Update the err msg dialog through vuex
                                                let obj = {
                                                    value: true,
                                                    msg: 'Answer is missing for a particular question!',
                                                    err: true
                                                }

                                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                                //---------------------------------------------

                                                this.started = false;
                                                this.can_assign_work = true;
                                            }
                                        } else if (empty_question > 0){
                                            // Update the err msg dialog through vuex
                                            let obj = {
                                                value: true,
                                                msg: 'Prompt is missing for a particular question!',
                                                err: true
                                            }

                                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                            //---------------------------------------------

                                            this.started = false;
                                            this.can_assign_work = true;
                                        }
                                    } else {
                                        // Update the err msg dialog through vuex
                                        let obj = {
                                            value: true,
                                            msg: 'Invalid time provided!',
                                            err: true
                                        }

                                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                        //---------------------------------------------

                                        this.started = false;
                                        this.can_assign_work = true;
                                    }
                                } else {
                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: 'Invalid time provided!',
                                        err: true
                                    }

                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------

                                    this.started = false;
                                    this.can_assign_work = true;
                                }
                            }
                        } else {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: 'Check the date provided!',
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------

                            this.started = false;
                            this.can_assign_work = true;
                        }
                    } else {
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Points is required!',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------

                        this.started = false;
                        this.can_assign_work = true;
                    }
                }
            } else if (classwork_type === 'attendance'){
                if (/^ *$/.test(title) || title === null || title === undefined){
                    // Update the err msg dialog through vuex
                    let obj = {
                        value: true,
                        msg: 'Title is required!',
                        err: true
                    }

                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                    //---------------------------------------------

                    this.started = false;
                    this.can_assign_work = true;
                } else {
                    if (typeof(points) == 'number' && [5, 10, 15, 20, 30, 100].includes(points)){
                        if (date === full_date){
                            if (/^ *$/.test(time) || time === null || time === undefined){
                                // Update the err msg dialog through vuex
                                let obj = {
                                    value: true,
                                    msg: 'Time is required!',
                                    err: true
                                }

                                this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                //---------------------------------------------

                                this.started = false;
                                this.can_assign_work = true;
                            } else {
                                let clean_time_string = time.split('"').join('').replace(/^[ ]+|[ ]+$/g, '').trim().replace(/ /g, ""); // Clean the time string to remove illegal characters
                                let meridim = clean_time_string.slice(-2); // Extract the meridim (AM or PM) from the time string
                                let act_time = clean_time_string.slice(0, -2); // Remove the meridim (AM or PM) from the time string

                                if ((/^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$/).test(act_time)){
                                    if (meridim === 'PM' || meridim === 'pm' || meridim === 'AM' || meridim === 'am'){
                                        let new_time = act_time + ` ${meridim}`;

                                        this.started = false;
                                        this.can_reset = false;
                                        this.assign_btn = false;
                                        this.assign_btn_load = true;

                                        this.assign_classwork_operation(title, null, points, new_time, date_object, null, classwork_type, this.$route.query.class_code); // Assign classwork operation mixin method
                                    } else {
                                        // Update the err msg dialog through vuex
                                        let obj = {
                                            value: true,
                                            msg: 'Invalid time provided!',
                                            err: true
                                        }

                                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                        //---------------------------------------------

                                        this.started = false;
                                        this.can_assign_work = true;
                                    }
                                } else {
                                    // Update the err msg dialog through vuex
                                    let obj = {
                                        value: true,
                                        msg: 'Invalid time provided!',
                                        err: true
                                    }

                                    this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                                    //---------------------------------------------

                                    this.started = false;
                                    this.can_assign_work = true;
                                }
                            }
                        } else {
                            // Update the err msg dialog through vuex
                            let obj = {
                                value: true,
                                msg: 'Check the date provided!',
                                err: true
                            }

                            this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                            //---------------------------------------------

                            this.started = false;
                            this.can_assign_work = true;
                        }
                    } else {
                        // Update the err msg dialog through vuex
                        let obj = {
                            value: true,
                            msg: 'Points is required!',
                            err: true
                        }

                        this.$store.commit(this.$config.VUEX_UPDATE_ERR_MSG_DIALOG, obj);
                        //---------------------------------------------

                        this.started = false;
                        this.can_assign_work = true;
                    }
                }
            }
        }
        //---------------------------------------------------------------------
    }
}