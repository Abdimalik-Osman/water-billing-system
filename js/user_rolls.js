$(document).ready(function(){

    $("#content_body").on('change', "input[name='module[]']", function () {
    var value = $(this).val();

    if ($(this).is(":checked")) {
        $("#content_body input[type='checkbox'][module='" + value + "']").prop("checked", true);

        } else {
            $("#content_body input[type='checkbox'][module='" + value + "']").prop("checked", false);

        }
    });

    $("input[name='check_all']").on('change', function () {
        
        if ($(this).is(":checked")) {
            $("#content_body input[type='checkbox']").prop("checked", true);

        } else {
            $("#content_body input[type='checkbox']").prop("checked", false);

        }
    });

    $("#user_ID").change(function(){
        var user_ID = $(this).val();

        fetchUserRolls(user_ID);
    });

    $("#form").on('submit', function(e){
        e.preventDefault()

        var user_ID = $("#user_ID").val();
        var menuID = [];

        $("input[name='submenu[]']").each(function () {

            if ($(this).is(":checked"))
                menuID.push($(this).val())
                
        });
        
        var data = {
            "action": 'updateRolls',
            "menuID": menuID,
            "user_ID":user_ID,
        }

        $.ajax({

            method: "POST",
            url: "../waterbilling/api/users.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data){
                var status = data.status;
                var message = data.message;


                if(status){

                    $("#form")[0].reset();
                    showAlert('success', message);
                    
                }else{
                    showAlert('danger', message);
                }
            },
            error: function(data){

            }
        });



    });

    load_authorities();
    function load_authorities() {
    $("#table tr").remove();

    var data = {
        "action": "readMenus",
        "id": "",
        "procedure": "user_menu_get",
    };

    $.ajax({
        method: "POST",
        url: "../waterbilling/api/users.php",
        data: data,
        dataType: "JSON",
        async: true,
        success: function (data) {
            var message = data.message;
            var status = data.status;
            var strHTML = '';
            var column = '';
            var currentModule = '';
            var menu = '';
            var currentMenu = '';

            if (status == true) {
                // strHTML = '<div class="">';
                message.forEach(function (item, i) {

                    //Print module if its not printed
                    if (currentModule != item['module']) {
                        strHTML += `</fieldset><fieldset class="col-md-2 m-3 pl-3 custom-checkbox" >`;
                        strHTML += `<legend style="font-weight:600;background-color: #231B50;color: #fff;"><b><label class="custom-control custom-checkbox mt-2" for="` + item['module'] + `"><input type="checkbox" class="custom-control-input" id="` + item['module'] + `" name="module[]" module="` + item['module'] + `" value="` + item['module'] + `">
                        <span class="custom-control-label">` + item['module'] + `</span></label></b></legend>`;
                        currentModule = item['module'];
                        strHTML += `<ul class="custom-control custom-checkbox" style="list-style-type:none">`;
                    }


                    if (currentMenu != item['menu']) {
                        strHTML += `<li><label class="custom-control custom-checkbox" for="` + item['menuID'] + `"><input type="checkbox"  class="custom-control-input" id="` + item['menuID'] + `" name="submenu[]" menuID="` + item['menuID'] + `" module="` + item['module'] + `" menuID="` + item['menuID'] + `" value="` + item['menuID'] + `">
                                    <span class="custom-control-label">` + item['menu'] + `</span></label></li>`;
                        currentMenu = item['menu'];
                    }

                });
                // strHTML += '</div>';

                $('#content_body').html(strHTML);
                // $('#content_body').append(strHTML);
            } else {

            }

        },
        error: function (data) {
            alert(data.Message);
        }
    });

    }

    fillUser();
    function fillUser(){

        var data = {
            "action": 'fillUser',
        }

        $.ajax({

            method: "POST",
            url: "../waterbilling/api/users.php",
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

                        $('#user_ID').html("<option value=''>Select User </option>");
                        // for(index in item){
                            options += `<option value="`+item['user_ID']+`">`+item['type']+ ' - ' + item['username'] + `</option>` 
                        // }
                        
                    });

                    console.log(options)
                    $("#user_ID").append(options);

                }else{
                    console.log(message);
                }
            },
            error: function(data){

            }
        });



    }


    function fetchUserRolls(user_ID){

        var data = {
            "action": 'fetchUserRolls',
            "user_ID": user_ID
        }

        $.ajax({

            method: "POST",
            url: "../waterbilling/api/users.php",
            data: data,
            dataType: "JSON",
            async: true,

            success: function(data){
                var status = data.status;
                var message = data.message;
                $("#content_body input[type='checkbox']").prop("checked", false);
                if(status){
                    
                    message.forEach(function(item , i) {

                       console.log(message);
                       $("#content_body input[type='checkbox'][menuID='" + item['menuID'] + "']").prop("checked", true);
                        
                    });

                }else{
                    console.log(message);
                }
            },
            error: function(data){

            }
        });



    }
});