<?php
	$email_to = "yeisonbe10@hotmail.com";
	$email_subject = "Contacto desde el sitio web";

	$email_message = "Detalles del formulario de contacto:\n\n";
	$email_message .= "Nombre: " . $_POST['nombre'] . "\n";
	$email_message .= "E-mail: " . $_POST['email'] . "\n";
	$email_message .= "Mensaje: " . $_POST['mensaje'] . "\n\n";
	
	$headers = "From: ".$_POST['email']."\r\n".
	'Reply-To: '.$_POST['email']."\r\n" .
	'X-Mailer: PHP/' . phpversion();
	mail($email_to, $email_subject, $email_message, $headers);
	
	echo "Mensaje enviado. Gracias por contactarme";
?>