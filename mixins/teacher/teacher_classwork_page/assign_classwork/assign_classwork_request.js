export default {
    methods: {
        // A Fetch request method to assign a new classwork to the students of a particular class
        assign_classwork_request(request){
            return new Promise((resolve, reject) => {
                fetch(`${ this.$config.apiUrl }/api/v1/teacher/assign-classwork`, request)
                    .then((res) => res.json()) // Return response in JSON format
                    .then(data => {
                        resolve({ status: true, result: data }); // If request is successful, resolve the promise with a success response
                    })
                    .catch(err => {
                        resolve({ status: false, err: err }); // If request is unsuccessful, resolve the promise with an error response
                    })
            });
        }
        //-------------------------------------------------------
    }
}