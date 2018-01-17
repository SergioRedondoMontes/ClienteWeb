var myArr;
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
        table.appendChild(tr);

        //DNI
        var td = document.createElement("td");
        //td.setAttribute("id",dni);
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
    }
}