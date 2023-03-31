$(document).ready(function () {

    $("#form").on("submit", function (e) {
        e.preventDefault();
        var type = $("#type").val();
        var from = $("#from").val();
        var to = $("#to").val();

            var data = {
                "action": "invoice_report_sp",
                "type": type,
                "from": from,
                "to": to,
            };
        


        $.ajax({
            method: "POST",
            url: "../waterbilling/api/invoice_report.php",
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
                        column += "</tr>";



                        row += "<tr>";

                        for (index in item) {
                            row += "<td>" + item[index] + "</td>";
                        }

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

    });


});