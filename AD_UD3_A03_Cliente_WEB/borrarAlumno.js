var myArr;
console.log("INICIO CARGA");

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    var url = "php/leerAlumnos.php";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
            try {
                myArr = JSON.parse(this.responseText);
                var estado = JSON.parse(this.responseText).estado;
            } catch (error) {
                alert("No se puede mostar los datos, por favor pongase en contacto con el administrador");
            }
            if(estado=="ok"){
                myFunction(myArr.Alumnos);
             }else{
                 alert("No se puede mostar los datos, por favor pongase en contacto con el administrador");
             }
            
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
        tr.appendChild(td);
        var titulacion = document.createTextNode(arr[i].titulacion);
        td.appendChild(titulacion);

        //FORM BORRAR
        var td = document.createElement("td");
        tr.appendChild(td);
        var form = document.createElement("form");
        form.setAttribute("id","myForm");
        td.appendChild(form);
        var btnBorrar = document.createElement("button");
        btnBorrar.setAttribute("type","button");
        btnBorrar.setAttribute("onclick","borrarAlumno("+arr[i].dni+")");
        btnBorrar.setAttribute("id","btnBorrar");
        btnBorrar.setAttribute("title","enviar");
        form.appendChild(btnBorrar);
        var txtBorrar = document.createTextNode("Eliminar");
        btnBorrar.appendChild(txtBorrar);
    }
}


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
            try {
                resp = JSON.parse(xmlhttp.responseText).estado;//guardo directarmente el estado del delete

            } catch (error) {
                //alert("No se puede borrar los datos, por favor pongase en contacto con el administrador");
            }
            //myFunction(myArr.Titulaciones);
            //alert(resp);
            if(resp=="ok"){
               borrarFila(alumnoID);
            }else{
                alert("No se puede borrar los datos, por favor pongase en contacto con el administrador");

            }
        }
    };
    xmlhttp.send(alumno);

    
}

function borrarFila(alumnoID) {
//alert(alumnoID);
    document.getElementById(alumnoID).remove();
}