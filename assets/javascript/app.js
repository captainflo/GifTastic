   
    var animals = ["rabbit","zebra", "panda","crocodiles", "cat"];
    
    // Display info Animals on div List
    function infoAnimals(){
        $("#list").empty();
        $("#list").html("<h1 class='text-center'>Click on the Picture buddy</h1>");
        animal = $(this).attr("data-name");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=dc6zaTOxFJmzC';
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            console.log(response);
            for(i=0; i < response.data.length; i++){
                    var images = $("<img>");
                    var p = $('<p>');
                    p.text('Rating: '+ response.data[i].rating)
                    images.addClass("gif");
                    images.attr("src",response.data[i].images.downsized_still.url);
                    images.attr("data-state", "still");
                    images.attr("data-still", response.data[i].images.downsized_still.url);
                    images.attr("data-animate", response.data[i].images.fixed_width_small.url);
                    $("#list").append(images);
                    $("#list").append(p);
                    
                }
        });
    }

    // Function RenderButton for renderButton after
    function RenderButton(){
        $("#buttons-view").empty();
        for(i=0; i < animals.length;i++){
            var a = $("<button class='btn btn-success'>");
            a.addClass("animal");
            a.attr("data-name", animals[i]);
            a.text(animals[i]);
            $("#buttons-view").append(a);
        }
    }
    
    RenderButton(); //Function RenderButton for renderButton begin
    
    // Add button on click with the input
    $("#add-animal").on("click", function(event){
        event.preventDefault();
        var animal = $("#userInput").val().trim();
        if (animal != "" && !animals.includes(animal.toLowerCase())){
            animals.push(animal);
            RenderButton();
        }
        else{
            alert("You have to add animal or it was already chosen")
        }
    })

    //function click on image 
     function clickImages() {
        console.log(this);
        var state = $(this).attr("data-state");
        var stillurl = $(this).attr("data-still");
        var animeurl = $(this).attr("data-animate");
        // STEP THREE: Check if the variable state is equal to 'still',
        if (state === 'still'){
            $(this).attr('src', animeurl);
            $(this).attr('data-state', 'animate');
        }
        // then update the src attribute of this image to it's data-animate value,
        // and update the data-state attribute to 'animate'.
        else if( state === 'animate'){
            $(this).attr('src', stillurl);
            $(this).attr('data-state', 'still');
        }
        // If state is equal to 'animate', then update the src attribute of this
        // image to it's data-still value and update the data-state attribute to 'still'
        };

    // Each time I click on button with class 'animal' in execute the fonction infoAnimals 
    $(document).on("click", ".animal", infoAnimals); 

    // Each time I click on button with class 'gif' in execute the fonction infoAnimals 
    $(document).on("click", ".gif", clickImages); 