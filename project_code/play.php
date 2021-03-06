<!doctype html>
<html lang="eng" xmlns="http://www.w3.org/1999/html">
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
      .stretchy {
         background-image: url("img/biopixology-scientist.jpg");
      }

      #screen {
         position: absolute;
         top: 0;
         left: 0;
         /*background: rgba(0, 0, 0, 0.75);*/
         width: 100%;
         height: 100%;
         margin: 0;
         padding: 0;
      }

      #screen canvas {
         width: 100%;
         height: 100%;
         display: block;
         margin: 0;
      }

      #ctrls {
         position: absolute;
         z-index: 9999;
         bottom: 0;
         left: 0;
         background: rgba(0, 0, 0, 0.75);
         width: 100%;
         margin: 0;
         padding: 0 1%;
         font-size: 2.0em;
         text-align: left;
      }

      .bio-btn {
         padding: 25px;
         border: 0;
         border-left: 1px solid #fff;
         background: transparent;
         outline: none;
         -webkit-transition: background 0.5s, color 0.75s;
      }

      .bio-btn:first-child {
         border: 0;
      }

      .bio-btn:hover, .bio-btn:active {
         background: rgba(0, 0, 0, 0.95);
         color: #c00;
      }

      #btn-picture {
         position: relative;
      }

      #ghost-file {
         display: block;
         opacity: 0;
         position: absolute;
         z-index: 9999;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         cursor: pointer;
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
                  <li class="active"><a href="#">Create Life</a></li>
                  <li><a href="/about">About</a></li>
               </ul>
            </div>
         </div>

         <div class="cover-container">
            <div id="screen"></div>
            <div id="ctrls">
               <button type="button" class="bio-btn" id="btn-play">
                  <span class="glyphicon glyphicon-play"></span>
               </button>
               <button type="button" class="bio-btn" id="btn-refresh">
                  <span class="glyphicon glyphicon-refresh"></span>
               </button>
               <button type="button" class="bio-btn" id="btn-toggle-sound">
                  <span class="glyphicon glyphicon-volume-off"></span>
               </button>
               <button type="button" class="bio-btn" id="btn-picture">
                  <input type="file" id="ghost-file" />
                  <span class="glyphicon glyphicon-picture"></span>
               </button>
            </div>
         </div>

         <div class="mastfoot">
            <p>Copyright &copy; 2014 <a href="http://www.rodrigo-silveira.com">Rodrigo Silveira</a>. All rights
               reserved. <a href="https://devart.withgoogle.com/#/project/17886819">A DevArt project</a>.</p>
         </div>
      </div>
   </div>
</div>

<?php if ((bool)stristr($_SERVER['SERVER_SOFTWARE'], 'development')): ?>
   <script src="/lib/closure/goog/base.js"></script>
   <script src="deps.js"></script>
   <script src="app.js"></script>
<?php else: ?>
   <script src="app.comp.js"></script>
<?php endif; ?>
<script>main();</script>

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
