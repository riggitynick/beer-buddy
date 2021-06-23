$(document).ready(function() {
    var fixHelper = function(e, ui) {
      ui.children().each(function() {
        $(this).width($(this).width());
      });
      return ui;
    };

    // THIS SECTION MAKES THE ACCORDION DRAGGABLE - IS NORMALLY USED FOR SORTING LISTS
    // $('.wrapper').sortable({ 
    //   appendTo: "div",
    //   axis: "y",
    //   helper: fixHelper,
    //   forceHelperSize: true,
    //   forcePlaceholderSize: true
    // }).disableSelection();
    
    
    searchfield = $('#search');
    
    searchfield.on('keyup change', function() {



    var titles = $('.accordion').find('.accordion__content');
     

      var array = [];
      
      /* show all elements */
      titles.each(function(index) {
        console.log($(titles[index]).parent());
        $(titles[index]).parent().show();


        array.push(index);
      });
  
          
      /* put title-text in an array */
      var title_text = [];
      titles.each(function() {
       title_text.push($(this).html());
      });
      
      /* create search object put indices in array result */



      //this is needed to search all text, change the distance to include a larger search range of the text
      const f = new Fuse(title_text, {
       threshold: 0.25,
        ignoreLocation: true,
         distance: 10000
      });


     // f.maxPatternLength = 1;
      var result = f.search(searchfield.val());
      
      /* if searchfield is empty every item matches */
      if(searchfield.val() == '') result = array;
      
      /* subtract arrays */
      var sub = $.grep(array, function(n, i){
        return $.inArray(n, result) == -1;
      });
  
      /* hide elements */
      $.each(sub, function(k, v) {

        $(titles[v]).parent().hide();


      });
    });
    
  });
  

//Start of json population section

  
  const beersBody = document.getElementById("accordion");
 
  function loadBeers (){
      const request = new XMLHttpRequest();

      request.open("get", "data/beers.json");
  

        request.onload = () => {
          try{
  
  const json = JSON.parse(request.responseText);
      
      populateBeers(json);
          } catch (e) {
              console.warn("Could not load beer styles!!!");        
          }
      };
  
  request.send();
  
  }
  
  function populateBeers (json) {
      // Clears out existing table data
      while (beersBody.firstChild) {
        beersBody.removeChild(beersBody.firstChild);
    }
  
  // Populate table from json, creating new rows
  json.forEach((row) => {
 

//Capsul to hold all of the accordion  
const capsul = document.createElement("div");
capsul.className = "capsul";

  const input = document.createElement("input");
  input.type="checkbox";
  
  input.className="accordion__input";
      input.id=row[0];
      
  //Label to click on for each beer
      const label = document.createElement("label");
      label.className="accordion__label";
      label.innerHTML=row[0];
      label.htmlFor=row[0];
      label.style.backgroundColor="#"+row[12];
      
  //Unordered list element    
      //const ul = document.createElement("ul");


//Div element    -CHANGE NAME
const ul = document.createElement("div");




  //Div to hold content
      const divAccordionContent = document.createElement("div");
      divAccordionContent.className="accordion__content";
      //divAccordionContent.style.backgroundColor=("white");
  
  //Space to list the Beer's Primary Style
      const bStyle = document.createElement("p");
      bStyle.innerHTML="<b>"+"Style: "+"</b>"+ row[1];
  
  //Space to list the details inside of divAccordionContent
      const bDetails = document.createElement("p");
      bDetails.className="details";




      const bOrigin = document.createElement("p");
      //link.href="file://"+"\\\\" + row[4] + "\\ " + row[3];
      bOrigin.innerHTML= "<b>"+"Origin: "+"</b>"+row[2];

//ABV of each beer
      const abv = document.createElement("p");
      abv.innerHTML= "<b>"+"ABV(alcohol by volume): "+"</b>"+row[3];

//IBU of each beer
const ibu = document.createElement("p");
ibu.innerHTML= "<b>"+"IBU(Bitterness): "+"</b>"+row[4];
    
//SRM of each beer
const srm = document.createElement("p");
srm.innerHTML= "<b>"+"SRM(color): "+"</b>"+row[5];

//Glassware for each beer
const glassware = document.createElement("p");
glassware.innerHTML="<b>"+"Serving Glass - "+row[6]+":"+"</br></br>"+"</b>"+"<img src=data\\"+row[13]+".png"+">";
//glassware.innerHTML=row[6];
glassware.className="glassware";
//glassware.img.width=10;
glassware.style.borderRadius=.5;


//Serving temperature of each beer
const temp = document.createElement("p");
temp.innerHTML= "<b>"+"Serving Temperature: "+"</b>"+row[7];

//Examples of each beer
const examples = document.createElement("p");
examples.innerHTML= "<b>"+"Examples: "+"</b>"+row[8];

//Food Pairings of each beer
const food = document.createElement("p");
food.innerHTML= "<b>"+"Food Pairings: "+"</b>"+row[9];

//Descriptions of each beer
const description = document.createElement("p");
description.innerHTML= "<b>"+"Desctiption: "+"</b>"+row[10];


        //Element so links can be implemented
        const link = document.createElement("a");
        link.href=row[11];
        link.innerHTML="<b>"+"More information"+"</b>";
        link.target="blank";


//Populates the unordered list with content from the JSON Row's cells 
      row.forEach((cell) => {
                                                                                 
        const li = document.createElement("li");
         li.textContent = cell;

//Attatches everything together

        bDetails.appendChild(bStyle);
        bDetails.appendChild(bOrigin);
        bDetails.appendChild(abv);
        bDetails.appendChild(ibu);
        bDetails.appendChild(srm);
        bDetails.appendChild(glassware);
        bDetails.appendChild(temp);
        bDetails.appendChild(examples);
        bDetails.appendChild(food);
        bDetails.appendChild(description);

        bDetails.appendChild(link);
        

        //ul.appendChild(li);
        bDetails.appendChild(ul);
        

        divAccordionContent.appendChild(bDetails);
                                                 
        capsul.appendChild(input);
                                                 
        capsul.appendChild(label);
                                                  
        capsul.appendChild(divAccordionContent);

      });
      
    //Attatches back to inside the <div id="accordion"> element
      beersBody.appendChild(capsul);
  
  });
  
  }
  
  document.addEventListener("DOMContentLoaded", () => { loadBeers(); });
  