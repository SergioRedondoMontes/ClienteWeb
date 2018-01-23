var myArr;
console.log("INICIO CARGA");

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    var url = "php/leerTitulaciones.php";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // alert(this.responseText);
            try {
                var estado = JSON.parse(this.responseText).estado;
                myArr = JSON.parse(this.responseText);
            } catch (error) {
                
            }
            if(estado=="ok"){
                myFunction(myArr.Titulaciones);
             }else{
                 alert("No se puede mostar los datos, por favor pongase en contacto con el administrador");
             }
            
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function myFunction(arr) {
    var form = document.getElementById("asdf");
    var divTitulacion = document.getElementById("asdf");
    var selectTitu = document.createElement("select");
    selectTitu.setAttribute("id","titulacion");
    selectTitu.setAttribute("class","input100");
    form.appendChild(selectTitu);
    



    for (let i = 0; i < arr.length; i++) {
        var optionTitulo = document.createElement("option");
        //optionTitulo.setAttribute("class","input100");
        selectTitu.setAttribute("class","input100");
        optionTitulo.setAttribute("value", arr[i].cod);
        var texto = document.createTextNode(arr[i].nombre);
		selectTitu.appendChild(optionTitulo);
		optionTitulo.appendChild(texto);
    }
}

function recogerAlumno() {
    try {
        var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var dni = document.getElementById("dni").value;
    var nacionalidad = document.getElementById("nacionalidad").value;
    var telefono = document.getElementById("telefono").value;
    var titulacion = document.getElementById("titulacion").value;

    var alumno = JSON.stringify({"alumnoAdd":{"nombre": nombre, "apellido":apellido,"dni":dni,
        "nacionalidad":nacionalidad,"telefono":telefono,"titulacion":titulacion},"peticion":"add"});
        insertAlumno(alumno);
    } catch (error) {
        alert("No se puede insertar los datos, por favor pongase en contacto con el administrador");

    }
    
}

function insertAlumno(alumnoJSON) {
    alert(alumnoJSON);

    var url = "php/escribirAlumno.php";

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(xmlhttp.responseText);
            try {
                var estado = JSON.parse(this.responseText).estado;
            } catch (error) {
                
            }
            if(estado=="ok"){
                
             }else{
                 alert("No se puede insertar los datos, por favor pongase en contacto con el administrador");
             }
        }else{
            alert("No se puede insertar los datos, por favor pongase en contacto con el administrador");
        }
    };

    xmlhttp.send(alumnoJSON);
    
}