
$(document).ready(function(){

    $(".table").DataTable({
        paging: true,
        ordering:true,
        searching:true,
        responsive:true,

    });


});
// $.ajax({
//     url: '/api/auth/employee',
//     type: 'GET',
//     success:function(response){
//         var emp = response.employ
//         console.log(emp)
//         if(response.success){
//            var body = $("#tablebody");
//            body.empty();
//             for(let x = 0; x < emp.length;x++){
//                body.append(`<tr>
//                    <td>${emp[x].user.name}</td>
//                    <td>${emp[x].user.email}</td>
//                     <td>${emp[x].department.kupal.name}</td>


//                     </tr>`)
//             }

//             emp.forEach(function(e){
//                 body.append(`<tr>
//                    <td>${e.user.name}</td>
//                    <td>${e.user.email}</td>
//                     <td>${e.department.kupal.name}</td>


//                     </tr>`)
//             })




//         }
//         // console.log(response)
//     },
//     error:function(xhr,status,error){
//         console.error(xhr.responseText)
//     }
// })

axios.get('/api/auth/employee')
.then(function(response){
    var sample = response.data.data

    if(response.data.success){
        var body = $("#tablebody");
                 body.empty();
                   for(let x = 0; x < sample.length;x++){
                      body.append(`<tr>
                          <td>${sample[x].user.name}</td>
                           <td>${sample[x].user.email}</td>
                           <td>${sample[x].department.kupal.name}</td>


                            </tr>`)
                    }
    }

}).catch(function(error){
    console.error(error)
})

fetch('/api/auth/employee')
.then(response => response.json())
.then(data =>{
    // console.log(data)
}).catch(function(error){
    // console.log(error)
})




