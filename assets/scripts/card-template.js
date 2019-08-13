// Call cardTemplate function
// GENERATE CARD TEMPLATE FUNCTION
function cardTemplate(index) {

        var resultObj = searchResults[index];

        var template = $("<div>");
        template.addClass("col s12 black-text");
        template.html(`
    
    <div class="card horizontal">

    <div class="card-image">
    </div>

    <div class="card-stacked">

      <div class="card-content">

              <span class="card-title">` + resultObj.name +
                `<a class="btn add-cart red accent-2 white text right" data-index="` + index + `">
                        <i class="material-icons">add</i>
                </a>
              </span>

              <div class="row">

                  <!-- Map Div-->
                  <div class="col s12 m4 l4 info-boxes center-align">
                          <img class="materialboxed" width="150" src=${resultObj.photo}>
                  </div>

                  <!--Place Info-->
                  <div class="col s12 m4 r l4 info-boxes">
                      <div class="row">
                          <div class="col s12 info"><h5></h5></div>
                          <div class="col s12 info">` + resultObj.address + `</div>
                          <div class="col s12 info">
                          <img width="20" height="20" class"place-icon" src="` + resultObj.icon +
                `" alt="` + resultObj.name +
                ` icon">
                          </div>
                          <div class="col s12 info">
                          <span>Rating</span>
                          ` + resultObj.rating + `
                          </div>
                       </div>
                  </div>

                  <!-- Right side links and opening and closing time-->
                  <div class="col s12 m4  center-align l4 info-boxes">
                          <div class="row">
                                  <div class="col s12 info" id="` + resultObj.id + `><p class="open-time"></p></div>
                                  <div class="col s12 info"></div>
                               </div>
                     </div>
               </div>
       </div>



  
  </div>
    
    `);
        $("#result-container").append(template);
}