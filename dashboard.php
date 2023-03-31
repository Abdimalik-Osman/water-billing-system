<?php
    require('../waterbilling/common/head.php');
    require('../waterbilling/common/header.php');
    require('../waterbilling/common/sidebar.php');

?>

<div class="content-body">

    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-lg-2 col-sm-6">
                <div class="card gradient-1">
                    <div class="card-body">
                        <h3 class="card-title text-white">Users</h3>
                        <div class="d-inline-block">
                            <h2 class="text-white users">0</h2>

                        </div>
                        <span class="float-right display-5 opacity-5"><i class="fa fa-user"></i></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-sm-6">
                <div class="card gradient-3">
                    <div class="card-body">
                        <h3 class="card-title text-white">Customers</h3>
                        <div class="d-inline-block">
                            <h2 class="text-white customers">0</h2>

                        </div>
                        <span class="float-right display-5 opacity-5"><i class="fa fa-user"></i></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-sm-6">
                <div class="card gradient-5">
                    <div class="card-body">
                        <h3 class="card-title text-white">Invoice</h3>
                        <div class="d-inline-block">
                            <h2 class="text-white invoice">0</h2>

                        </div>
                        <span class="float-right display-5 opacity-5"><i class="fa fa-users"></i></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6">
                <div class="card gradient-7">
                    <div class="card-body">
                        <h3 class="card-title text-white">Payments</h3>
                        <div class="d-inline-block">
                            <h2 class="text-white payments">$ 0.00</h2>

                        </div>
                        <span class="float-right display-5 opacity-5"><i class="fa fa-money"></i></span>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-sm-6">
                <div class="card gradient-9">
                    <div class="card-body">
                        <h3 class="card-title text-white">Balance</h3>
                        <div class="d-inline-block">
                            <h2 class="text-white balance">$ 0.0</h2>

                        </div>
                        <span class="float-right display-5 opacity-5"><i class="fa fa-money"></i></span>
                    </div>
                </div>
            </div>
        </div>




    </div>
    <!-- #/ container -->
</div>

<?php
    require('../waterbilling/common/footer.php');
?>

<script src="../waterbilling/assets/plugins/chart.js/Chart.bundle.min.js"></script>
<script src="../waterbilling/js/admin.js"></script>