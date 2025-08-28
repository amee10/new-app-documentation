$(document).ready(function(){
	$('header .support-btn').click(function(e) {
		$('.form-popup').fadeIn();
	});
	$('.form-popup .close-btn').click(function(e) {
		$('.form-popup').fadeOut();
	});
});

$("#back-btn").on("click", function () {
	$('.message-section').empty();
	$('.form-section').show();
	$('#back-btn').hide();
});

$("form[name='contactus']").on('submit', function (e) {
	e.preventDefault();
	$.ajax({
		url: "form.php",
		type: "POST",
		data: $(this).serialize(),
		beforeSend: function () {
			$('.support-btn').attr('disabled', true);
			$('#submit-btn').text('Sending...');
		},
		success: function (data) {
			$('.support-btn').attr('disabled', false);
			$('#submit-btn').text('Submit');
			var respo = {};
			try { respo = JSON.parse(data); } catch (e) {}
			if (respo.status == 1) {
				$("form[name='contactus']")[0].reset();
				$('.form-section').hide();
				$('.message-section').html("<h2><i>Thank You!</i></h2>");
				$('#back-btn').show();
			} else {
				$('.form-section').hide();
				$('.message-section').html("<h2><i>Sorry Try Again!!!</i></h2>");
				$('#back-btn').show();
			}
		}
	});
}); 