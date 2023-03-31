$(document).ready(function () {
    fetchStatistics();
    function fetchStatistics() {
        $.ajax({
            method: "POST",
            url: "../waterbilling/api/admin.php",
            data: { "action": "fetchStatistics" },
            dataType: "JSON",
            async: true,
            success: function (data) {
                var status = data.status;
                var message = data.message;

                if (status == true) {
                    $(".users").html(message[0]['users']);
                    $(".customers").html(message[0]['customers']);
                    $(".invoice").html(message[0]['invoice']);
                    $(".payments").html(message[0]['payments']);
                    $(".balance").html(message[0]['balance']);


                }

            },
            error: function (data) {

            }
        });

    }

    


});