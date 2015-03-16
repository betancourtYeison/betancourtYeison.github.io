<?php
	$email_to = "yeisonbe10@hotmail.com";
	$email_subject = "Contacto desde http://betancourtyeison.github.io/";

	$email_message = "Detalles del formulario de contacto:\n\n";
	$email_message .= "Nombre: " . $_POST['nombre'] . "\n";
	$email_message .= "E-mail: " . $_POST['email'] . "\n";
	$email_message .= "Mensaje: " . $_POST['mensaje'] . "\n\n";
	
	$headers = "From: " . $email_to . "\r\n".
	'Reply-To: ' . $_POST['email'] ."\r\n" .
	'X-Mailer: PHP/' . phpversion();
	mail($email_to, $email_subject, $email_message, $headers);
	
	print "Mensaje enviado. Gracias por contactarme";
?>
