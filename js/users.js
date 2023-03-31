$(document).ready(function () {

    loadUser();

    var btn_action = "insert";
    var ModelPopup = $('#model');

    $("#table").on("click", "button.edit", function () {
        var user_ID = $(this).attr("user_ID");
        btn_action = "update";
        fetchUser(user_ID);
        window.scroll(0, 0);
        // window.location.reload();
    });



    $("#table").on("click", "button.delete", function () {
        var user_ID = $(this).attr("user_ID");
        if(confirm("Are your sure?")){
            deleteUser(user_ID);
        }
    });

    $("#form").on("submit", function (e) {
        e.preventDefault();
        var user_ID = $("#user_ID").val();
        var fullname = $("#fullname").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var type = $("#type").val();
        var status = $("#status").val();
        var registerDate = $("#registerDate").val();


        if (btn_action === "insert") {

            var data = {
                "action": "insert_update",
                "action_sp": "insert",
                "user_ID": "",
                "fullname": fullname,
                "username": username,
                "password": password,
                "type": type,
                "status": status,
                "registerDate": registerDate
                
            };

        } else {

            var data = {
                "action": "insert_update",
                "action_sp": "update",
                "user_ID": user_ID,
                "fullname": fullname,
                "username": username,
                "password": password,
                "type": type,
                "status": status,
                "registerDate": registerDate
            };
        }


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/users.php",
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
                        loadUser();
                        $("#form")[0].reset();


                    } else {
                        btn_action = "insert";
                        window.scroll(0, 0);
                        $("#form")[0].reset();
                        loadUser();
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


    function loadUser() {

        var data = {
            "action": "read",
            "user_ID": "",

        };

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/users.php",
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

                        row += `<td class='text-center'>                         <button class='btn btn-success btn-sm edit' title="Edit" user_ID='` + item['user_ID'] + `'>
                                    <i class='fa fa-edit'></i>
                                    
                                </button>
                                <button class='btn btn-danger btn-sm delete' title="Delete" user_ID='` + item['user_ID'] + `'>
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

    function deleteUser(user_ID) {

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/users.php",
            data: { "action": "delete", "user_ID": user_ID },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {

                    window.scroll(0, 0);
                    // loadUser();
                    console.log('Congratulations!', 'User Has Been Deleted Successfully', 'success');
                    loadUser();
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

    function fetchUser(user_ID) {


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/users.php",
            data: { "action": "read", "user_ID": user_ID },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {
                    $("#user_ID").val(message[0]['user_ID']);
                    $("#fullname").val(message[0]['fullname']);
                    $("#username").val(message[0]['username']);
                    $("#password").val(message[0]['password']);
                    $("#type").val(message[0]['type']);
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