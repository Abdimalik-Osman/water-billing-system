$(document).ready(function () {

    loadMenus();

    var btn_action = "insert";
    var ModelPopup = $('#model');

    $("#table").on("click", "button.edit", function () {
        var menuID = $(this).attr("menuID");
        btn_action = "update";
        fetchMenus(menuID);
        window.scroll(0, 0);
    });



    $("#table").on("click", "button.delete", function () {
        var menuID = $(this).attr("menuID");
        if(confirm("Are your sure?")){
            deleteMenu(menuID);
        }
    });

    $("#form").on("submit", function (e) {
        e.preventDefault();
        var menuID = $("#menuID").val();
        var name = $("#name").val();
        var module = $("#module").val();
        var link = $("#link").val();
        // var userID = $("#userID").val();
        var registerDate = $("#registerDate").val();


        if (btn_action == "insert") {

            var data = {
                "action": "insert_update",
                "action_sp": "insert",
                "menuID": "",
                "name": name,
                "module": module,
                "link": link,
                // "userID": userID,
                "registerDate": registerDate
                
            };

        } else {

            var data = {
                "action": "insert_update",
                "action_sp": "update",
                "menuID": menuID,
                "name": name,
                "module": module,
                "link": link,
                // "userID": userID,
                "registerDate": registerDate
            };
        }


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/menu.php",
            data: data,
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {

                    if (btn_action == "update") {

                        ModelPopup.modal("hide");
                        btn_action = "insert";
                        $("#form")[0].reset();
                        loadMenus();


                    } else {
                        btn_action = "insert";
                        window.scroll(0, 0);
                        $("#form")[0].reset();
                        loadMenus();
                    }


                } else {
                    swal('Error!', message, 'error');
                    show_toast('error', message)
                    window.scroll(0, 0);


                }
            },
            error: function (data) {

            }
        });

    });


    function loadMenus() {

        var data = {
            "action": "read",
            "menuID": "",

        };

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/menu.php",
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

                        row += `<td class='text-center'>                         <button class='btn btn-success btn-sm edit' title="Edit" menuID='` + item['menuID'] + `'>
                                    <i class='fa fa-edit'></i>
                                    
                                </button>
                                <button class='btn btn-danger btn-sm delete' title="Delete" menuID='` + item['menuID'] + `'>
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

    function deleteMenu(menuID) {

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/menu.php",
            data: { "action": "delete", "menuID": menuID },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {

                    window.scroll(0, 0);
                    loadMenus();
                    console.log('Congratulations!', 'Menus Has Been Deleted Successfully', 'success');
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

    function fetchMenus(menuID) {


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/menu.php",
            data: { "action": "read", "menuID": menuID },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {
                    console.log(message[0]['menuID']);
                    $("#menuID").val(message[0]['menuID']);
                    $("#name").val(message[0]['name']);
                    $("#module").val(message[0]['module']);
                    $("#link").val(message[0]['link']);
                    // $("#userID").val(message[0]['userID']);
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