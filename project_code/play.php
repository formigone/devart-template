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
      .stretchy {
         background-image: url("img/banner-6.jpg");
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
         height: 90%;
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
         padding: 0 2.5%;
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
               <button type="button" class="bio-btn" id="btn-picture">
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


</body>
</html>
