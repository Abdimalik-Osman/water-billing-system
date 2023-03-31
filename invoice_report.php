<?php
    require('../waterbilling/common/head.php');
    require('../waterbilling/common/header.php');
    require('../waterbilling/common/sidebar.php');
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
                <li class="breadcrumb-item active"><a href="javascript:void(0)"> Invoice Report Management</a></li>
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
                        <form id="form" action="" method="POST">
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label class="float-left">Type</label>
                                       <input type="text" placeholder="type" id="type" name="type" class="form-control" >
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label class="float-left">From</label>
                                        <input type="date" id="from" name="from" class="form-control" placeholder="From">
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="form-group">
                                        <label class="float-left">To</label>
                                        <input type="date" id="to" name="to" class="form-control" placeholder="To">
                                    </div>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-primary" id='submit'>Get Data</button>
                                </div>
                            </div>

                            
                        </form>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">Invoice Report List</h4>

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

<!--**********************************
            Content body end
        ***********************************-->


<?php
    require('../waterbilling/common/footer.php');
?>

<script src="../waterbilling/assets/plugins/tables/js/jquery.dataTables.min.js"></script>
<script src="../waterbilling/assets/plugins/tables/js/datatable/dataTables.bootstrap4.min.js"></script>
<script src="../waterbilling/assets/plugins/tables/js/datatable-init/datatable-basic.min.js"></script>
<script src="../waterbilling/js/invoice_report.js"></script>

<script>
$('.alert').hide();
</script>