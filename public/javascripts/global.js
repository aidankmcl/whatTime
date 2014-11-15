$( document ).ready(function() {
    $.ajax({
         type: "get",
        url: "/adventure",
    }).done(function( date ) {
        date = JSON.parse(date);
        $('#date').text(date['date']).fadeIn('slow');
        $('#days').text(date['days'] + ' days').fadeIn('slow');
    });
});