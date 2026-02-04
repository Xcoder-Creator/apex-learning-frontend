export default {
    methods: {
        // A Fetch request method to log a user out of his or her own account
        logout_from_account_request(request){
            return new Promise((resolve, reject) => {
                fetch(`${ this.$config.apiUrl }/api/v1/logout`, request)
                    .then((res) => res.json()) // Return response in JSON format
                    .then(data => {
                        resolve({ status: true, result: data }); // If request is successful, resolve the promise with a success response
                    })
                    .catch(err => {
                        resolve({ status: false }); // If request is unsuccessful, resolve the promise with an error response
                    })
            });
        }
        //---------------------------------------------------
    }
}