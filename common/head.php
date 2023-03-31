<?php
session_start();

if (!isset($_SESSION['user_ID'])) {
	header("Location: login.php");
}
?> 

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>waterbilling Admin Dashboard </title>
    <!-- Favicon icon -->
    <link rel="icon" type="../waterbilling/assets/image/png" sizes="16x16" href="../waterbilling/assets/images/favicon.png">
    <!-- Custom Stylesheet -->
    <link href="../waterbilling/assets/css/style.css" rel="stylesheet">

</head>

<body>

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
    