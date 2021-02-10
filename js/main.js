//sidebar section
/*  the next function for the navBar to do the following 
1- when the user click on the nav button open the navBar 
2- animate the ul items by change the padding*/
$("#iconClose").click(function () {

    let x = $("#iconClose").attr("class");
// >>>> fa-times <<< this is the Close Icon on the outer NavBar
    if (x == "fas fa-times fa-2x") {
        $("#iconClose").attr("class", "fa fa-align-justify fa-2x");
        $("#navContainer").css("left", "-240px");
        $(".my-item").css("padding-top" , "500px")
    } else {
        $("#iconClose").attr("class", "fas fa-times fa-2x");
        $("#navContainer").css("left", "0px");
        // let ulItems = document.getElementsByClassName("my-item");
$(".my-item").animate({ 
    'padding-top' : 0,
  }, "slow"); 
  //animation work with the css property transetion: 1s in style.css file Line "27"
    }


});

// end sidebar section

//start api section 
let allfilm =[] ;
let searchMovie = document.getElementById("searchMovie");

async function getfilm(path) {
    let filmShow = await fetch(path);
    allfilm = await filmShow.json();
    allfilm = allfilm.results;
    displayFilm();
}
//  we call the function getfilm() to show the Movies dinamically on the home page
getfilm("https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44");
$(".js-Path").click(function(e){
let requierPath= e.target.name ;

getfilm(requierPath);

});

async function filmSearch(term) {
    let apiResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`);
    allfilm= await apiResponse.json();
    allfilm = allfilm.results;
    displayFilm();
}


$("#searchMovie").on("keyup" ,function(){
    
    // console.log(searchMovie.value);
    //this function to check if the input value is not empty to avoid error allfilm.length is undefined this in line 93
if(searchMovie.value =="")
{
    getfilm("https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44");
// console.log(searchMovie.value);
}
else
{
     filmSearch(searchMovie.value);
}

});

// $("#searchMovie").on("keydown" ,function(){
    
//     // console.log(searchMovie.value);

//      filmSearch(searchMovie.value);

// });
//search in site
word =document.getElementById("word")







function displayFilm() {
    
    let box = ``;
    let x = `https://image.tmdb.org/t/p/w500`;
    for (let i = 0; i < allfilm.length; i++) {

        // let hasName = (allfilm[i].title == true) ? allfilm[i].title:allfilm[i].name;
    

          let hasName = (allfilm[i].title == undefined)? allfilm[i].name:allfilm[i].title;


        box += `<div class="col-md-6 col-lg-4 py-3" >
 <div id="filmDetails" class="film-detail position-relative">
 <img src="${x}${allfilm[i].poster_path}" alt="" class="img-fluid w-100 poster">
 <div class="inner-details position-absolute text-center d-flex justify-content-center flex-column px-2">
     <h2 class="h2">${hasName}</h2>
     <p class="text-dark h-50 overflow-hidden">${allfilm[i].overview}</p>
           <h6 class="text-dark">${allfilm[i].vote_average}</h6>
           <h6 class="text-dark">${allfilm[i].release_date}</h6>
 </div>

</div>
</div>`;

    }

    document.getElementById("movieList").innerHTML = box;


}


//end api section
//  ---------------------------------------------------------------------------------------  //


//validation

let inputPassword = document.getElementById("password");
let rePassword = document.getElementById("rePassword");
let password ;
let dataValidate = false ;

// password this to save the value of the entry password and chech on it in the  
// repasswordvalidate() function in line 106

function passwordvalidate() {

    let rge = /^(?:.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;

    if (rge.test(inputPassword.value) == true) {

        $("#passwordalert").hide(500);

        password = inputPassword.value;
        dataValidate = true;
    } else {
        $("#passwordalert").show(500);
        dataValidate = false;

    }

}

inputPassword.addEventListener("blur", function () {

    passwordvalidate();
});
// end validate password

// Start validate repassword

function repasswordvalidate() {
    if (rePassword.value === password) {
        $("#repasswordalert").hide(500);
        dataValidate = true;
    
    } else {
        $("#repasswordalert").show(500);
        dataValidate = false;

    }
   
}
rePassword.addEventListener("blur", function () {

    repasswordvalidate();
});
// End validate repassword

// Start validate name
$("#name").blur(function(){
    let regexName = /^(?:.*[A-Za-z]){3,}/;
    if (regexName.test(this.value) == true) {
        $("#namealert").hide(500);
        dataValidate = true;

    } else {
        $("#namealert").show(500);
        dataValidate = false;

    }
})

// End validate name

// Start validate Email
$("#email").blur(function(){
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regexEmail.test(this.value) == true) {
        $("#emailalert").hide(500);
        dataValidate = true;
    } else {
        $("#emailalert").show(500);
        dataValidate = false;

    }
})

// End validate Email

// Start validate Phone
$("#phone").blur(function(){
    let regexPhone = /^\(?([0-9]{2,})\)?[-. ]?([0-9]{2,})[-. ]?([0-9]{2,})$/;
    if (regexPhone.test(this.value) == true) {
        $("#phonealert").hide(500);
        dataValidate = true;
    } else {
        $("#phonealert").show(500);
        dataValidate = false;
    }
})

// End validate Phone

// Start validate Age
$("#age").blur(function(){
    let regexPhone = /^[1-9]?[0-9]$/;
    if (regexPhone.test(this.value) == true) {
        $("#agealert").hide(500);
        dataValidate = true;
    } else {
        $("#agealert").show(500);
        dataValidate = false;
    }
})

// End validate Age
setInterval(function (){
    if (dataValidate == true) {
        $("#submitBtn").removeAttr("disabled");
    }
    else {
        $("#submitBtn").attr('disabled', 'disabled');
        
    }
}, 1000)


//end validation

//search function

