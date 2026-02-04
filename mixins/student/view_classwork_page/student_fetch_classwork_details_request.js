export default {
    methods: {
        // A Fetch request method to get available data for a particular classwork
        student_fetch_classwork_details_request(request){
            return new Promise((resolve, reject) => {
                fetch(`${ this.$config.apiUrl }/api/v1/student/view-classwork`, request)
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