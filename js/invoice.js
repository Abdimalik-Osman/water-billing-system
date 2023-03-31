$(document).ready(function () {

    loadInvoice();

    var btn_action = "insert";
    var ModelPopup = $('#model');

    $("#table").on("click", "button.edit", function () {
        var invoiceNum = $(this).attr("invoiceNum");
        btn_action = "update";
        fetchInvoice(invoiceNum);
        window.scroll(0, 0);
        // window.location.reload();
    });



    $("#table").on("click", "button.delete", function () {
        var invoiceNum = $(this).attr("invoiceNum");
        if(confirm("Are your sure?")){
            deletePayments(invoiceNum);
        }
    });

    $("#form").on("submit", function (e) {
        e.preventDefault();
        var invoiceNum = $("#invoiceNum").val();
        var home_code = $("#home_code").val();
        var lastRead = $("#lastRead").val();
        var months = $("#months").val();
     


        if (btn_action === "insert") {

            var data = {
                "action": "insert_update",
                "action_sp": "insert",
                "invoiceNum": "",
                "home_code": home_code,
                "lastRead": lastRead,
                "months": months,
           
                
            };

        } else {

            var data = {
                "action": "insert_update",
                "action_sp": "update",
                "invoiceNum": invoiceNum,
                "home_code": home_code,
                "lastRead": lastRead,
                "months": months,
              
            };
        }


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/invoice.php",
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
                        loadInvoice();
                        $("#form")[0].reset();


                    } else {
                        btn_action = "insert";
                        window.scroll(0, 0);
                        $("#form")[0].reset();
                        loadInvoice();
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


    function loadInvoice(){

        var data = {
            "action": "read",
            "invoiceNum": "",

        };

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/invoice.php",
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

                        row += `<td class='text-center'>                         <button class='btn btn-success btn-sm edit' title="Edit"invoiceNum='` + item['invoiceNum'] + `'>
                                    <i class='fa fa-edit'></i>
                                    
                                </button>
                                <button class='btn btn-danger btn-sm delete' title="Delete" invoiceNum='` + item['invoiceNum'] + `'>
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

    function deletePayments(invoiceNum) {

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/invoice.php",
            data: { "action": "delete", "invoiceNum": invoiceNum },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {

                    window.scroll(0, 0);
                    // loadInvoices();
                    console.log('Congratulations!', 'Invoice Has Been Deleted Successfully', 'success');
                    loadInvoices();
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

    function fetchInvoice(invoiceNum) {


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/invoice.php",
            data: { "action": "read", "invoiceNum": invoiceNum },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {
                    $("#invoiceNum").val(message[0]['invoiceNum']);
                    $("#home_code").val(message[0]['home_code']);
                    $("#lastRead").val(message[0]['lastRead']);
                    $("#months").val(message[0]['months']);
                    
                    

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