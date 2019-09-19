$(document).ready(function() {
                               //   $.post(
                               //     "http://localhost:3000/login",
                               //     {
                               //       email: "fergusoniyara@gmail.com",
                               //       password: "Somepassword%7690"
                               //     },
                               //     {

                               //     },
                               //     function(data) {
                               //       console.log(data);
                               //     }
                               //   );
                               // https://jsonplaceholder.typicode.com/posts
                               $.ajax({
                                 url: "http://localhost:3000/login",
                                 type: "post",
                                 data: {
                                   email: "fergusoniyara@gmail.com",
                                   password: "Somepassword%7690"
                                 },
                                 crossDomain: true,
                                 headers: {
                                   accept: "application/json",
                                   "Access-Control-Allow-Origin": "*"
                                 },
                                 success: function(data, status, xhr) {
                                   console.log(data);
                                 }
                               });
                             });
