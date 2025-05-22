    $(document).ready(()=>{
        $('.locationTable').DataTable({
            paging: true,
            searching: true,
            ordering:true,
            responsive: true,
        })

        const displayDataTable = () =>{
            axios.get('api/auth/display-locations-data')
            .then((response)=>{
                console.log(response)
               var locations = response.data.locations
               const table =  $('.locationTable').DataTable()
               table.clear();
               locations.forEach((item,index)=>{
                table.row.add([
                    `<div>${index + 1}</div>`,
                    `<div>${item.name}</div>`,
                    `<div class="text-center">
                    <a type="button" class="btn btn-info btn-sm" data-mdb-ripple-init onclick="viewLocation('${item.name}')">View</a>
                    <a type="button" class="btn btn-warning btn-sm" onclick="editModal(${item.id},'${item.name}')" data-mdb-ripple-init>Edit</a>
                    <a type="button" class="btn btn-danger btn-sm delBtn" data-mdb-ripple-init data-location="${item.id}" >Delete</a>
                    </div>`
                ])

                table.draw(false)

               })


            }).catch((e) => {
                console.error(e)
            })
           
        }
        displayDataTable()

        $('.openModalBtn').on('click',()=>{
            $('.locationModal').show()
        })
   
      
        $(document).on('click','.delBtn',function(){
               var id = $(this).data('location')
               axios.delete('api/auth/delete-location/' + id).then((res)=>{
                console.log(res)
                displayDataTable()
                }).catch((e)=>{
                console.error(e)
                })
            
         })

        $('.openAddModal').on('click',function(){
           $('.addlocationModal').show()

        })

        $('.addBtn').on('click',()=>{
            var location = $('#location');

            if(location.val().trim() ===""){
                alert("Please fill out the field");
                return
            }

            // var form = new FormData()
            // form.append('location', location.val().trim())

            axios.post('api/auth/add-location',{
                location:  location.val().trim()
            }).then((response)=>{
                console.log(response)
                displayDataTable()//this function will display the f table
                closeModal() /// this function is just function to close the function function close
            }).catch((e)=>{
                console.error(e);
            })
        })
      

        $('.editBtn').on('click', function(){
            var x = $('#editLocation');
            var i =  $('.locationID');

            var editform = new FormData()
            editform.append('updatedLocation', x.val().trim())
            axios.post('api/auth/update-location/' + i.val(),editform).then((response)=>{
                console.log(response)
                displayDataTable()//this function will display the f table
                closeModal() /// this function is just function to close the function function close
            }).catch((error)=>{
                console.error(error)
            })
        })

   
       
    })

    function closeModal(){
        $('.addlocationModal').hide()
        $('.editlocationModal').hide()// for hiding the modals
        $('.viewlocationModal').hide()
    }

function editModal(id,name){
    // console.log(name)
    var editedInput = $('#editLocation')
    var loc_id = $('.locationID')
    $('.editlocationModal').show()// for opening edit modal

    if($('.editlocationModal').is(':visible')){
        editedInput.val(name)
        loc_id.val(id)
    }
}
//this function is for opening view modal and content
function viewLocation(location_name){
 //this is for opening the view modal
   $('.viewlocationModal').show()
   $('#viewlocation').val(location_name)
   
}

// const deleteLocation = (id) =>{
//    axios.delete('api/auth/delete-location/' + id).then((res)=>{
//     console.log(res)
//     // displayDataTable()

//    }).catch((e)=>{
//     console.error(e)
//    })
// }
   
      
    