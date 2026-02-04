export default {
    methods: {
        // A Fetch request method to send a private comment
        send_comment_operation_request(request){
            return new Promise((resolve, reject) => {
                fetch(`${ this.$config.apiUrl }/api/v1/student/send-private-comment`, request)
                    .then((res) => res.json()) // Return response in JSON format
                    .then(data => {
                        resolve({ status: true, result: data }); // If request is successful, resolve the promise with a success response
                    })
                    .catch(err => {
                        resolve({ status: false }); // If request is unsuccessful, resolve the promise with an error response
                    })
            });
        }
        //---------------------------------------------------------------------
    }
}