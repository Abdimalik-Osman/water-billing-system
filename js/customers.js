$(document).ready(function () {
    
    loadCustomers();

    var btn_action = "insert";
    var ModelPopup = $('#model');
 
    $("#table").on("click", "button.edit", function () {
        var home_code = $(this).attr("home_code");
        btn_action = "update";
        fetchCustomer(home_code);
        window.scroll(0, 0);
        // window.location.reload();
    });



    $("#table").on("click", "button.delete", function () {
        var home_code = $(this).attr("home_code");
        if(confirm("Are your sure?")){
            deleteCustomer(home_code);
        }
    });

    $("#form").on("submit", function (e) {
        e.preventDefault();
        var home_code = $("#home_code").val();
        var fullname = $("#fullname").val();
        var address = $("#address").val();
        var phone = $("#phone").val();
        var status = $("#status").val();
        var registerDate = $("#registerDate").val();
     


        if (btn_action === "insert") {

            var data = {
                "action": "insert_update",
                "action_sp": "insert",
                "home_code": "",
                "fullname": fullname,
                "address": address,
                "phone": phone,
                "status": status,
                "registerDate": registerDate,
           
                
            };

        } else {

            var data = {
                "action": "insert_update",
                "action_sp": "update",
                "home_code": home_code,
                "fullname": fullname,
                "address": address,
                "phone": phone,
                "status": status,
                "registerDate": registerDate,
              
            };
        }


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/customers.php",
            data: data,
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;
                console.log(message);
                console.log(status);
                if (status === true) {

                    if (btn_action === "update") {

                        ModelPopup.modal("hide");
                        btn_action = "insert";
                        loadCustomers();
                        $("#form")[0].reset();


                    } else {
                        btn_action = "insert";
                        window.scroll(0, 0);
                        $("#form")[0].reset();
                        loadCustomers();
                        showAlert('success', message);
                    }


                } else {
                    showAlert('error', message)
                    window.scroll(0, 0);


                }
            },
            error: function (data) {

            }
        });

    });


    function loadCustomers(){

        var data = {
            "action": "read",
            "home_code": "",

        };

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/customers.php",
            data: data,
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;
                var column = '';
                var row = '';

                if (status) {
                    $('#table').dataTable().fnClearTable();
                    $('#table').dataTable().fnDestroy();

                    message.forEach(function (item, i) {

                        column = "<tr>";

                        for (index in item) {
                            column += "<th>" + index + "</th>";
                        }
                        column += "<th class='text-center'>" + 'Action' + "</th>"
                        column += "</tr>";



                        row += "<tr>";

                        for (index in item) {
                            row += "<td>" + item[index] + "</td>";
                        }

                        row += `<td class='text-center'>                         <button class='btn btn-success btn-sm edit' title="Edit"home_code='` + item['home_code'] + `'>
                                    <i class='fa fa-edit'></i>
                                    
                                </button>
                                <button class='btn btn-danger btn-sm delete' title="Delete" home_code='` + item['home_code'] + `'>
                                    <i class='fa fa-trash'></i>
                                </button>
                                </td>`;

                        row += "</tr>";

                    });

                    $("#table thead").html(column);
                    $("#table tbody").html(row);
                    $('#table').DataTable({
                        "order": [
                            [0, "desc"]
                        ]
                    });
                } else {
                    $("#table tbody").html("<tr><td colspan='4' class='text-center'>" + message + "</td></tr>");
                }

            },
            error: function (data) {

            }
        });

    }

    function deleteCustomer(home_code) {

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/customers.php",
            data: { "action": "delete", "home_code": home_code },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {

                    window.scroll(0, 0);
                    // loadCustomers();
                    console.log('Congratulations!', 'Customer Has Been Deleted Successfully', 'success');
                    loadCustomers();
                } else {

                    window.scroll(0, 0);
                    ModelPopup.modal('hide');
                    console.log('Error! '+ message + ' error');
                }

            },
            error: function (data) {

            }
        });

    }

    function fetchCustomer(home_code) {


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/customers.php",
            data: { "action": "read", "home_code": home_code },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {
                    $("#home_code").val(message[0]['home_code']);
                    $("#fullname").val(message[0]['fullname']);
                    $("#address").val(message[0]['address']);
                    $("#phone").val(message[0]['phone']);
                    $("#status").val(message[0]['status']);
                    $("#registerDate").val(message[0]['registerDate']);
                    
                    
                    

                    ModelPopup.modal('show');

                }

            },
            error: function (data) {

            }
        });

    }


    $("#btn_modle").on("click", function () {

        $("#form")[0].reset();
        ModelPopup.modal('show');
        btn_action = "insert";
    });




});