// Start logic after page has loaded
$(document).ready(function () {
  
    // Materialize initializations
    init();
});

function init() {

    // Initialize input character counting
    $('input#zip-input').characterCounter();

    // Initialize date pickers
    $('.datepicker').datepicker({
        autoClose: true,
        defaultDate: Date.now(),
        setDefaultDate: true
    });

    // Initialize modals
    $('.modal').modal();

    // Intialize select fields
    $('select').formSelect();
}
