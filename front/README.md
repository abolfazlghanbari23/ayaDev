# Front
For website front code we used [W3Scool site](https://www.w3schools.com/) css templates in [here](https://www.w3schools.com/w3css/tryw3css_templates_app_launch.htm). Then we used **ajax** from **jquery** package for sending requests and getting resposnses from server.
Simple javascript code handling requests and response:
    
    console.log("test");
            $.ajax({
                url: 'http://192.168.99.135/nodejs/write',
                data: data,
                dataType: 'json',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
            }).done(function (response) {
                document.getElementById("fileLineResult").value = response.Result;
                console.log(document.getElementById("fileLineResult").value);
            }).fail(function (xhr, status, errorThrown) {
                ...
            });
            
In html file for every button and input tags we define an id for getting their values before sending reqeusts and setting results values after receiving response. Setting and getting values for updating ui are done with bellow simple code template:

    document.getElementById(<element id>).value = <new value>;
    var element_value = document.getElementById(<elemenet id>).value;