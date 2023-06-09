<!DOCTYPE html>
<html class="h-100" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Waterbilling System - Login</title>
    <!-- Favicon icon -->
    <link rel="icon" type="../waterbilling/assets/image/png" sizes="16x16" href="../waterbilling/assets/images/favicon.png">
 
    <link href="../waterbilling/assets/css/style.css" rel="stylesheet">

</head>

<body class="h-100">

    <!--*******************
        Preloader start
    ********************-->
    <div id="preloader">
        <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10" />
            </svg>
        </div>
    </div>
    <!--*******************
        Preloader end
    ********************-->

    <div class="login-form-bg h-100">
        <div class="container h-100">
            <div class="row justify-content-center h-100">
                <div class="col-xl-6">
                    <div class="form-input-content">
                        <div class="card login-form mb-0">
                            <div class="card-body pt-5">
                                <a class="text-center" href="#">
                                    <h3>Login</h3>
                                    <br>
                                    
                                    <h5>Waterbilling Management System</h5>
                                </a>
                                <div class="alert alert-danger">
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                                            aria-hidden="true">×</span>
                                    </button>
                                    <div class="message"></div>
                                </div>
                                <form class="mt-5 mb-5 login-input" id="form" action="" method="POST">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Username" id="username"
                                            name="username" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Password" id="password"
                                            name="password" required>
                                    </div>
                                    <button type="submit" class="btn login-form__btn submit w-100">Sign In</button>
                                </form>
                                <p class="mt-5 login-form__footer">Don't have account? <a href="page-register.html"
                                        class="text-primary">Sign Up</a> now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--**********************************
        Scripts
    ***********************************-->
    <script src="../waterbilling/assets/plugins/common/common.min.js"></script>
    <script src="../waterbilling/assets/js/custom.min.js"></script>
    <script src="../waterbilling/assets/js/settings.js"></script>
    <script src="../waterbilling/assets/js/gleek.js"></script>
    <script src="../waterbilling/assets/js/styleSwitcher.js"></script>
    <script src="../waterbilling/js/login.js"></script>
    <script>
    $('.alert').hide();
    </script>
</body>

</html>