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
                <li class="breadcrumb-item active"><a href="javascript:void(0)">Customers Management</a></li>
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
                            New Customer</button>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">Customers Data</h4>

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
                <h5 class="modal-title">Customer Registration</h5>
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span>
                </button>
            </div>
            <form id="form" action="" method="POST">
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="basic-form">
                            <div class="row">
                                <div class="col-4">
                                    <div class="form-group">
                                        <label>Home Code</label>
                                        <input type="text" id="home_code" name="home_code" class="form-control"
                                            placeholder="Home Code">
                                    </div>

                                </div>
                                <div class="col-8">
                                    <div class="form-group">
                                        <label>Full Name</label>
                                        <input type="text" id="fullname" name="fullname" class="form-control"
                                            placeholder="Full Name">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" id="address" name="address" class="form-control"
                                    placeholder="Address">
                            </div>
                            <div class="form-group">
                                <label>Mobile</label>
                                <input type="number" id="phone" name="phone" class="form-control"
                                    placeholder="Mobile Phone">
                            </div>
                            <div class="form-group">
                                <label>Status</label>
                                <select name="status" id="status">
                                    <option value="active">Active</option>
                                    <option value="inActive">In Active</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Register Date</label>
                                <input type="date" id="registerDate" name="registerDate" class="form-control"
                                    placeholder="" value="<?php echo Date('Y-m-d')?>">
                            </div>



                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
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
<script src="../waterbilling/js/customers.js"></script>

<script>
$('.alert').hide();
</script>