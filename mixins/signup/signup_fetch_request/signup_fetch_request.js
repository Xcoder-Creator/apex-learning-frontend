export default {
    methods: {
        // A Fetch request method to create a new account
        signup_fetch_request(request){
            return new Promise((resolve, reject) => {
                fetch(`${ this.$config.apiUrl }/api/v1/signup`, request)
                    .then((res) => res.json()) // Return response in JSON format
                    .then(data => {
                        resolve({ status: true, result: data }); // If request is successful, resolve the promise with a success response
                    })
                    .catch(err => {
                        resolve({ status: false }); // If request is unsuccessful, resolve the promise with an error response
                    })
            });
        }
        //-------------------------------------------
    }
}