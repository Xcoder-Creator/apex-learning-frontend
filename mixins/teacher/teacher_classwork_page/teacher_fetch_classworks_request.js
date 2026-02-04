export default {
    methods: {
        // A Fetch request method to get all available classworks for a particular class
        teacher_fetch_classworks_request(request){
            return new Promise((resolve, reject) => {
                fetch(`${ this.$config.apiUrl }/api/v1/teacher/fetch-classworks`, request)
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