$(function() {
  $(".rslides").responsiveSlides();
  menu();
});

$(window).resize(function(){
  menu();
})

function menu (){
  if(window.matchMedia("(max-width:768px)").matches){
      var $buttonShowMenu = document.getElementById('showMenu');
      var $buttonHideMenu = document.getElementById('hideMenu');
      var $menu = document.getElementById('menu');
      
      var $body = document.querySelector('body');

      var body = new Hammer($body);

      var showMenu = function(){
          $buttonShowMenu.classList.remove('is-active');
          $buttonHideMenu.classList.add('is-active');
          $menu.classList.add('is-active');
      };

      var hideMenu = function(){
          $buttonShowMenu.classList.add('is-active');
          $buttonHideMenu.classList.remove('is-active');
          $menu.classList.remove('is-active');
      };

      $buttonShowMenu.addEventListener("click", showMenu);

      $buttonHideMenu.addEventListener("click", hideMenu);

      body.on('panright', showMenu);
      body.on('panleft', hideMenu);
  }
}