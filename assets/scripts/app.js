// Start logic after page has loaded
$(document).ready(function () {

    // Materialize initializations
    init();

    // Handle search button click events
    $(document).on("click", "#search-btn", search);

    // Handle go button click events
    $(document).on("click", "#go-btn", generateItinerary);
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

function search(event) {
    event.preventDefault();

    // TODO
}

function generateItinerary(event) {
    event.preventDefault();

    // TODO
}
