var myArr;
var myArrTitu;
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

function myFunctionTitu(arr) {
    var form = document.getElementById("FormUpd");
    var button = document.getElementById("button");
    var selectTitu = document.createElement("select");
    selectTitu.setAttribute("id","titulacion");
    //form.appendChild(selectTitu);
    form.insertBefore(selectTitu,button);


    for (let i = 0; i < arr.length; i++) {
        var optionTitulo = document.createElement("option");
        optionTitulo.setAttribute("value", arr[i].cod);
        var texto = document.createTextNode(arr[i].nombre);
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
    var titulacion;
}

/*
function borrarAlumno(alumnoID) {
    var resp;
    alert(alumnoID);
    var alumno = JSON.stringify({"alumnoDel":{"dni":alumnoID,},"peticion":"del"});
    alert(alumno);
    var url = "php/borrarAlumno.php";

	var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
	xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(xmlhttp.responseText);
            resp = JSON.parse(xmlhttp.responseText).estado;//guardo directarmente el estado del delete
            //myFunction(myArr.Titulaciones);
            //alert(resp);
            if(resp=="ok"){
               borrarFila(alumnoID);
            }
        }
    };
    xmlhttp.send(alumno);

    
}

function borrarFila(alumnoID) {
//alert(alumnoID);
    document.getElementById(alumnoID).remove();
}
*/