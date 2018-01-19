var myArr;
var myArrTitu;
var dniUpd;
var nombreUpd;
var apellidoUpd;
var nacionalidadUpd;
var telefonoUpd;
var titulacionUpd;
console.log("INICIO CARGA");

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    var url = "php/leerAlumnos.php";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
            myArr = JSON.parse(this.responseText);
            
            myFunction(myArr.Alumnos);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function myFunction(arr) {
    var table = document.getElementById("table");
    var headTable = document.getElementById("headTable");


    for (i = 0; i < arr.length; i++) {
        var tr = document.createElement("tr");
        tr.setAttribute("id",arr[i].dni);
        table.appendChild(tr);

        //DNI
        var td = document.createElement("td");
        //td.setAttribute("id",arr[i].dni);
        tr.appendChild(td);
        var dni = document.createTextNode(arr[i].dni);
        td.appendChild(dni);

        //NOMBRE
        var td = document.createElement("td");
        tr.appendChild(td);
        var nombre = document.createTextNode(arr[i].nombre);
        td.appendChild(nombre);

        //APELLIDO
        var td = document.createElement("td");
        tr.appendChild(td);
        var apellido = document.createTextNode(arr[i].apellido);
        td.appendChild(apellido);

        //TELEFONO
        var td = document.createElement("td");
        tr.appendChild(td);
        var telefono = document.createTextNode(arr[i].telefono);
        td.appendChild(telefono);

        //NACIONALIDAD
        var td = document.createElement("td");
        tr.appendChild(td);
        var nacionalidad = document.createTextNode(arr[i].nacionalidad);
        td.appendChild(nacionalidad);

        //TITULACION
        var td = document.createElement("td");
        td.setAttribute("id","titu"+arr[i].tituCod);
        tr.appendChild(td);
        var titulacion = document.createTextNode(arr[i].titulacion);
        td.appendChild(titulacion);

        //FORM BORRAR
        var td = document.createElement("td");
        tr.appendChild(td);
        var form = document.createElement("form");
        form.setAttribute("id","form"+arr[i].dni);
        td.appendChild(form);
        var btnBorrar = document.createElement("button");
        btnBorrar.setAttribute("type","button");
        btnBorrar.setAttribute("onclick","selector("+arr[i].dni+")");
        btnBorrar.setAttribute("id","btnSeleccionar");
        btnBorrar.setAttribute("title","enviar");
        form.appendChild(btnBorrar);
        var txtBorrar = document.createTextNode("Seleccionar");
        btnBorrar.appendChild(txtBorrar);
    }
}

function loadDocTitulaciones() {
    var xhttp = new XMLHttpRequest();
    var url = "php/leerTitulaciones.php";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // alert(this.responseText);
            myArrTitu = JSON.parse(this.responseText);
            myFunctionTitu(myArrTitu.Titulaciones);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function myFunctionTitu(arrTitu) {
    var form = document.getElementById("asdf");
    var divTitulacion = document.getElementById("asdf");
    var selectTitu = document.createElement("select");
    selectTitu.setAttribute("id","titulacion");
    selectTitu.setAttribute("class","input100");
    form.appendChild(selectTitu);


    for (let i = 0; i < arrTitu.length; i++) {
        var optionTitulo = document.createElement("option");
        optionTitulo.setAttribute("value", arrTitu[i].cod);
        var texto = document.createTextNode(arrTitu[i].nombre);
		selectTitu.appendChild(optionTitulo);
        optionTitulo.appendChild(texto);
    }
}


function selector(idTrSeleccionado) {
    var dni;
    var nombre;
    var apellido;
    var nacionalidad;
    var telefono;
    var titulacionId;
    //alert(idTrSeleccionado);
    var arrFila = document.getElementById(idTrSeleccionado);
   //alert(document.getElementById(idTrSeleccionado).childNodes[0].innerHTML);
   dni =  arrFila.childNodes[0].innerHTML;

   nombre =  arrFila.childNodes[1].innerHTML;

   apellido =  arrFila.childNodes[2].innerHTML;

   telefono =  arrFila.childNodes[3].innerHTML;

   nacionalidad =  arrFila.childNodes[4].innerHTML;

   titulacionId =  arrFila.childNodes[5].getAttribute("id").substring(4);

   setAlumnoFormUpd(dni,nombre,apellido,nacionalidad,telefono,titulacionId);
}

function setAlumnoFormUpd(dni,nombre,apellido,nacionalidad,telefono,titulacionId) {
    
    document.getElementById("dni").value = dni;
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("nacionalidad").value = nacionalidad;
    document.getElementById("telefono").value = telefono;
    document.getElementById("titulacion").value = titulacionId;
}


function recogerAlumno() {
    dniUpd = document.getElementById("dni").value;
    nombreUpd = document.getElementById("nombre").value;
    apellidoUpd = document.getElementById("apellido").value;
    nacionalidadUpd = document.getElementById("nacionalidad").value;
    telefonoUpd = document.getElementById("telefono").value;
    titulacionUpd = document.getElementById("titulacion").value;

    var alumno = JSON.stringify({"alumnoUpd":{"nombre": nombreUpd, "apellido":apellidoUpd,"dni":dniUpd,
        "nacionalidad":nacionalidadUpd,"telefono":telefonoUpd,"titulacion":titulacionUpd},"peticion":"upd"});
    insertAlumno(alumno);
}

function insertAlumno(alumnoJSON) {
    alert(alumnoJSON);
    var resp;
    var url = "php/actualizarAlumno.php";

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(xmlhttp.responseText);
            resp = JSON.parse(xmlhttp.responseText).estado;//guardo directarmente el estado del delete
            //myFunction(myArr.Titulaciones);
            //alert(resp);
            if(resp=="ok"){
               actualizarFila(dniUpd,nombreUpd,apellidoUpd,nacionalidadUpd,telefonoUpd,titulacionUpd);
            }
        }
    };

    xmlhttp.send(alumnoJSON);
    
}


function actualizarFila(dniUpd,nombreUpd,apellidoUpd,nacionalidadUpd,telefonoUpd,titulacionUpd) {
    
    // var dniAux = alumnoJSON.alumnoUpd.dni;
    // var nombreAux =alumnoJSON.alumnoUpd.nombre;
    // var apellidoAux  = alumnoJSON.alumnoUpd[0].apellido;
    // var nacionalidadAux = alumnoJSON.alumnoUpd[0].nacionalidad;
    // var telefonoAux = alumnoJSON.alumnoUpd[0].telefono;
    var titulacionAux;
    var arr = myArrTitu.Titulaciones
    for (let index = 0; index < arr.length; index++) {
        if(arr[index].id==titulacionUpd){
            titulacionAux = arr[index].nombre;
        }
    }
    //alert(idTrSeleccionado);
    var arrFila = document.getElementById(dniUpd);
    arrFila.childNodes[1].innerHTML = nombreUpd;
    arrFila.childNodes[2].innerHTML = apellidoUpd;
    arrFila.childNodes[3].innerHTML = nacionalidadUpd;
    arrFila.childNodes[4].innerHTML = telefonoUpd;
    arrFila.childNodes[5].innerHTML = titulacionAux;
}