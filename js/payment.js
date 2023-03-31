$(document).ready(function () {

    loadPayments();

    var btn_action = "insert";
    var ModelPopup = $('#model');

    $("#table").on("click", "button.edit", function () {
        var paymentID = $(this).attr("paymentID");
        btn_action = "update";
        fetchPayments(paymentID);
        window.scroll(0, 0);
        // window.location.reload();
    });



    $("#table").on("click", "button.delete", function () {
        var paymentID = $(this).attr("paymentID");
        if(confirm("Are your sure?")){
            deletePayments(paymentID);
        }
    });

    $("#form").on("submit", function (e) {
        e.preventDefault();
        var paymentID = $("#paymentID").val();
        var home_code = $("#home_code").val();
        var amountPaid = $("#amountPaid").val();
        var months = $("#months").val();
     


        if (btn_action === "insert") {

            var data = {
                "action": "insert_update",
                "action_sp": "insert",
                "paymentID": "",
                "home_code": home_code,
                "amountPaid": amountPaid,
                "months": months,
           
                
            };

        } else {

            var data = {
                "action": "insert_update",
                "action_sp": "update",
                "paymentID": paymentID,
                "home_code": home_code,
                "amountPaid": amountPaid,
                "months": months,
              
            };
        }


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/payment.php",
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
                        loadPayments();
                        $("#form")[0].reset();


                    } else {
                        btn_action = "insert";
                        window.scroll(0, 0);
                        $("#form")[0].reset();
                        loadPayments();
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


    function loadPayments(){

        var data = {
            "action": "read",
            "paymentID": "",

        };

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/payment.php",
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

                        row += `<td class='text-center'>                         <button class='btn btn-success btn-sm edit' title="Edit"paymentID='` + item['paymentID'] + `'>
                                    <i class='fa fa-edit'></i>
                                    
                                </button>
                                <button class='btn btn-danger btn-sm delete' title="Delete" paymentID='` + item['paymentID'] + `'>
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

    function deletePayments(paymentID) {

        $.ajax({
            method: "POST",
            url: "../waterbilling/api/payment.php",
            data: { "action": "delete", "paymentID": paymentID },
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

    function fetchPayments(paymentID) {


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/payment.php",
            data: { "action": "read", "paymentID": paymentID },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {
                    $("#paymentID").val(message[0]['paymentID']);
                    $("#home_code").val(message[0]['home_code']);
                    $("#amountPaid").val(message[0]['amountPaid']);
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

    function fillHomeCode(){

        var data = {
            "action": 'fillHomeCode',
        }

        $.ajax({

            method: "POST",
            url: "../waterbilling/api/payment.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data){
                var status = data.status;
                var message = data.message;
                var options = '';
                // console.log(status);
                // console.log(message);

                if(status){
                    options = '';
                    message.forEach(function(item , i) {

                        $('#home_code').html("<option value=''>Select Home Code </option>");
                        // for(index in item){
                            options += `<option value="`+item['home_code']+`">`+item['fullname']+ ' - ' `</option>` 
                        // }
                        
                    });

                    console.log(options)
                    $("#home_code").append(options);

                }else{
                    console.log(message);
                }
            },
            error: function(data){

            }
        });
    }
    


});