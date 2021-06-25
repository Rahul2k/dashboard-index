<head>
    <style>
        .reportBox {
            border: 1px solid #dbdbdb;
            padding: 20px;
            margin-top: 20px;
            margin-left: 25px;
            margin-bottom: 20px;
            box-shadow: 0px 0px 20px #d0d0d0;
            width: 90%;
        }

        .chartArea {
            float: left;
            border: 1px solid #dbdbdb;
            padding: 20px;
            margin-top: 20px;
            margin-left: 25px;
            margin-bottom: 20px;
            box-shadow: 0px 0px 20px #d0d0d0;
            height: 300px;
        }

        .reportHeader {
            display: flex;
            align-items: center;
            list-style-type: none;
        }

            .reportHeader li {
                margin-left: 37%;
            }
    </style>
</head>
<body>
    <div class="reportBox">
        <div style="margin-top: -10px; display: block;" id="paging" class="col-sm-12">
            <ul class="reportHeader">
                <li>Certificate of Disposition</li>
                <li>Report Date: 4/1/2020</li>
            </ul>
        </div>
        <div id="reportid" class="display"></div>
    </div>
</body>
