<?php
    require('../waterbilling/common/head.php');
    require('../waterbilling/common/header.php');
    require('../waterbilling/common/sidebar.php');
    // include_once('');
    // require('');
    // include_once('');
?>
<link href="../waterbilling/assets/plugins/tables/css/datatable/dataTables.bootstrap4.min.css" rel="stylesheet">

<!--**********************************
            Content body start
        ***********************************-->
<div class="content-body">

    <div class="row page-titles mx-0">
        <div class="col p-md-0">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
                <li class="breadcrumb-item active"><a href="javascript:void(0)">Payment s Management</a></li>
            </ol>
        </div>
    </div>
    <!-- row -->

    <div class="container-fluid">
        <div class="alert alert-danger">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                    aria-hidden="true">×</span>
            </button>
            <div class="message"></div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header text-right">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#model">Register
                            New Payment </button>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">Payment  Data</h4>

                        <div class="table-responsive">
                            <table id="table" class="table table-striped table-bordered zero-configuration">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- #/ container -->
</div>

<div class="modal fade" id="model">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Payment  Registration</h5>
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                </button>
            </div>
            <form id="form" action="" method="POST">
                <div class="modal-body">
                    <div class="container-fluid">

                        <div class="basic-form">
                        <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Payment Number</label>
                                        <input type="text" id="paymentID" name="paymentID" class="form-control"
                                            placeholder="Payment  Number">
                                    </div>

                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <input type="hidden" class="form-control" id="paymentID" name="paymentID"
                                            value="">

                                        <label class="col-sm-2 col-form-label col-form-label-sm">Home Code</label>
                                        <div class="col-sm-10">
                                            <input type="text" id="home_code" name="home_code" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Amount Paid</label>
                                        <input type="number" id="amountPaid" name="amountPaid" class="form-control"
                                            placeholder="Amount Paid">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label>Months</label>
                                        <select name="months" id="months">
                                            <option value=""></option>
                                            <option value="january">january</option>
                                            <option value="february">february</option>
                                            <option value="march">march</option>
                                            <option value="abril">abril</option>
                                            <option value="may">may</option>
                                            <option value="june">june</option>
                                            <option value="july">july</option>
                                            <option value="august">august</option>
                                            <option value="september">september</option>
                                            <option value="october">october</option>
                                            <option value="november">november</option>
                                            <option value="december">december</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save and Update</button>
                </div>
            </form>
        </div>

    </div>
</div>
</div>
<!--**********************************
            Content body end
        ***********************************-->


<?php
    require('../waterbilling/common/footer.php');
?>

<script src="../waterbilling/assets/plugins/tables/js/jquery.dataTables.min.js"></script>
<script src="../waterbilling/assets/plugins/tables/js/datatable/dataTables.bootstrap4.min.js"></script>
<script src="../waterbilling/assets/plugins/tables/js/datatable-init/datatable-basic.min.js"></script>
<script src="../waterbilling/js/payment.js"></script>

<script>
$('.alert').hide();
</script>