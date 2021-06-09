$('.wrapper ul a').on('click', function () {
    $('.wrapper ul').find('li.active').removeClass('active');
    $(this).parent('li').addClass('active');
});