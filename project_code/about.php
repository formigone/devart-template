<!doctype html>
<html lang="eng">
<head>
    <meta charset="utf-8">

    <!--
        TODO: Add cool ascii art logo here
    -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BioPixology</title>

    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/style.css"/>
   <style>
      <?php $rand = rand(1, 4); ?>
      .stretchy {
         background-image: url("img/3d/banner-00<?= $rand; ?>.jpg");
      }
   </style>
</head>

<body class="stretchy">

<div class="site-wrapper">
    <div class="site-wrapper-inner">
        <div class="cover-container">
            <div class="masthead clearfix">
                <div class="inner">
                    <a href="/" class="masthead-brand">
                        <img src="img/logo.png" alt="BioPixology" class="logo">
                    </a>
                    <ul class="nav masthead-nav">
                        <li><a href="/">Create Life</a></li>
                        <li class="active"><a href="#">About</a></li>
                    </ul>
                </div>
            </div>

            <div class="inner cover">
                <h1 class="cover-heading">About BioPixology</h1>

                <p class="lead">This application was developed to be part of Google's DevArt project. The project is 100% open-source, and was intended to be a fun coding exercise where I could express my self through art and code.</p>
                <p class="lead">The premise is simple: you click the big button and watch Conway's cellular automaton evolve through its cycles and generations. The twist: you seed the initial state of the world with some input image. This way the input is arguably more beautiful =)</p>


                <p class="lead">
                    <a href="/play" class="btn btn-lg btn-success">Play now!</a>
                </p>
            </div>

            <div class="mastfoot">
                <p>Copyright &copy; 2014 <a href="http://www.rodrigo-silveira.com">Rodrigo Silveira</a>. All rights
                    reserved. <a href="https://devart.withgoogle.com/#/project/17886819">A DevArt project</a>.</p>
            </div>
        </div>
    </div>
</div>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-15090706-2', 'biopixology.com');
  ga('send', 'pageview');

</script>

</body>
</html>
