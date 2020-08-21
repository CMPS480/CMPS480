<?php
    if (isset($_POST['save'])) {
        $conn = new mysqli('localhost', 'root', '', 'ratingSystem');

        $uID = $conn->real_escape_string($_POST['uID']);
        $ratedIndex = $conn->real_escape_string($_POST['ratedIndex']);
        $ratedIndex++;

        if (!$uID) {
            $conn->query("INSERT INTO stars (ratedIndex) VALUES ('$ratedIndex')");
            $sql = $conn->query("SELECT id FROM stars ORDER BY id DESC LIMIT 1");
            $uDATA = $sql->fetch_assoc();
            $uID = $uData['id'];
    }   else
            $conn->query("UPDATE stars SET ratedIndex='$ratedIndex' WHERE id = '$uID'");

        exit(json_encode(array('id => $uID')));
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rating System</title>
    <script src="https://use.fontawesome.com/ee053e15fb.js"></script>
</head>
<body>
    <div align="center" style="background: #000; padding: 50px;">
    <i class="fa fa-star" data-index="0"></i>
    <i class="fa fa-star" data-index="1"></i>
    <i class="fa fa-star" data-index="2"></i>
    <i class="fa fa-star" data-index="3"></i>
    <i class="fa fa-star" data-index="4"></i>
    </div>

    <script src="http://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script>
        var ratedIndex = -1, uID = 0;
        $(document).ready(function () {
            resetStarColor();

            if (localStorage.getItem('ratedIndex') != null) {
                setStars(parseInt(localStorage.getItem('ratedIndex')));
                uID = localStorage.getItem('uID');
            }
            $(' .fa-star').on('click', function () {
              ratedIndex = parseInt($(this).data('index'));
              localStorage.setItem('ratedIndex', ratedIndex);
              saveToTheDB();
            });

            $(' .fa-star').mouseover(function (){
                resetStarColor();
                var currentIndex = parseInt($(this).data('index'));
                setStars(currentIndex)

                for (var i=0; i <= currentIndex; i++)
                        $('.fa-star:eq('+i+')').css('color', 'yellow');
            });
            
            $(' .fa-star').mouseleave(function (){
                resetStarColor();

                if (ratedIndex != -1)
                    setStars(ratedIndex);

            });
        });

        function saveToTheDB() {
            $.ajax({
                url: "index.php",
                method: "POST",
                dataType: 'json',
                data: {
                    save: 1,
                    uID: uID,
                    ratedIndex: ratedIndex
                }, success: function (r) {
                    uID = r.id;
                    localStorage.setItem('uID', uID);
                }

            });
        }

        function setStars(max) {
            for (var i=0; i <= ratedIndex; i++)
                $('.fa-star:eq('+i+')').css('color', 'yellow');
        }

        function resetStarColor() {
            $('.fa-star').css('color', 'white');
        }
    </script>

</body>
</html>