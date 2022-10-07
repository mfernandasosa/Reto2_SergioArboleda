function limpiar_formulario(){
		var campoTextoID = document.getElementById("id");
		var campoTextoNombre = document.getElementById("name");
		var campoTextoEmail = document.getElementById("email");
		var campoTextoAge = document.getElementById("age");
		var divResultado = document.getElementById("resultado");

		campoTextoID.value = "";
		campoTextoNombre.value = "";
		campoTextoEmail.value = "";
		campoTextoAge.value = "";		
		divResultado.innerHTML = ""
}

function consultar_todo(){
    $.ajax({
        url:"https://gbd71f54ce9c33a-cabin.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
		type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('Ha ocurrido un problema, intentalo nuevamente, ' + xhr.status);
		},
		
		complete: function(xhr, status){
			alert('Resultado de comprobacion → Cod. Estado: ' + xhr.status);
		},	
		
        success:function(json){
           	$("#resultado").empty();
			tabla = "<center> <table border='1'> <tr> <th>ID:</th> <th>NOMBRE</th> <th>E-MAIL</th> <th>EDAD</th></tr> </tr>"
			$("#resultado").append("<h2>RESULTADO CONSULTA</h2><br>")
			filas = "";
			for (i=0; i<json.items.length; i++){
				filas += "<tr>";
				filas += "<td>" + json.items[i].id + "</td>";
				filas += "<td>" + json.items[i].name + "</td>";
				filas += "<td>" + json.items[i].email + "</td>";
				filas += "<td>" + json.items[i].age + "</td>";
				filas += "<td> <button class='delete' onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";//se agrega el boton y este tiene la funcion borrar registro:
				filas += "</tr>";
			}	
			filas += "</table>"
			$("#resultado").append(tabla + filas + "<br><br><tr><b><th colspan='2'>TOTAL REGISTROS: <td>" + i +"</b><br>")
			$("#resultado").append("<a href='index.html' title='Regresar la Menu Principal'>Regresar Menu Inicio</a></center>")
			console.log(json)	
				
        }

    });
}

function validarCampo(campoTexto){
	if(campoTexto.val() != ""){
		return true;
	}
	else{
		return false;
	}
}

function consultaID(id){
	if(!validarCampo(id)){
		alert("Debe ingresar ID valido a buscar"+id.attr("id"));
	}
	if(!validarCampo($("#id"))){
		alert("Debe ingresar un Id");
		return;
	}
	else{

		$.ajax({
			url: 'https://gbd71f54ce9c33a-cabin.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client'+ id.val(),			
			type: 'GET',
			dataType: 'json',

			success: function(json){
				tabla = "<center><table border='1'>";
				filas = "";
				if (json.items.length > 0){
					console.log(json);
					$("#resultado").empty();
					filas += "<tr><th>ID:<td>" + json.items[0].id
					filas += "<tr><th>NOMBRE:<td>" + json.items[0].name
					filas += "<tr><th>E-MAIL:<td>" + json.items[0].email
					filas += "<tr><th>EDAD:<td>" + json.items[0].age
					$("#resultado").append(tabla + filas + "</center>")
					
				}
				else{
					alert("El registro con ID: "+ id.val() + "No existe")
				}
				
			},

			error: function(xhr, status){
				alert('Ha ocurrido un problema, Error: ' + xhr.status);
			},
			
			complete: function(xhr, status){
				alert('La peticion ha sido realizada,' + xhr.status);
				
			}		

		});
	}
}

function guardarInformacion(){
	
	if(!validarCampo($("#id"))){
		alert("Debe ingresar un Id");
		return;
	}
	if(!validarCampo($("#name"))){
		alert("Debe ingresar un nombre");
		return;
	}
	
	if(!validarCampo($("#email"))){
		alert("Debe ingresar un e-mail");
		return;
	}
	if(!validarCampo($("#age"))){
		alert("Debe ingresar una edad");
		return;
	}		
	
    $.ajax({
        url: 'https://gbd71f54ce9c33a-cabin.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client',
		data:{
			id: $("#id").val(),
			name: $("#name").val(),
			email: $("#email").val(),			
			age: $("#age").val(),
		},
		
		type: 'POST',
		dataType: 'json',
			
        success:function(json){		
        },
		
		error: function(xhr, status){
			if(xhr.status == 200){
				console.log("Registro guardado con exito");
			}
			else{
				console.log("Por favor revise que los datos esten correctos");
			}
		},
		
		complete: function(xhr, status){
			alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultar_todo();
			
		},	
    });
}

function editar_Informacion(){
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
		email:$("#email").val(),
        age:$("#age").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
	
	if (confirm("Está seguro de modificar el registro:  " + $("#id").val() + "  ??")){
		
		$.ajax({
			url:"https://gbd71f54ce9c33a-cabin.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
			type:"PUT",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			success:function(respuesta){
				$("#resultado").empty();

				consultar_todo();
				alert("Se ha realizado la actualicion del registro correctamente")
			}
		});
	}
}

function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Está seguro de eliminar el registro:  " + idElemento + "  ??")){
	
		$.ajax({
			url:"https://gbd71f54ce9c33a-cabin.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client",
			type:"DELETE",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			
			success:function(respuesta){
				$("#resultado").empty();
				limpiar_formulario();
				consultar_todo();
				alert("El registro se ha eliminado correctamente.")	
			}
		});
	}
}