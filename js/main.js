let timerStopped = false

$(document).ready(() => {
	// Initializations
	$('#timer-bar').html(parseInt($('select#timer').val()) + 's')
	$('#message').html('&nbsp;')
	$('#stop-timer').addClass('disabled')

	// Start timer
	$(document).on('click', '#start-timer:not(.disabled)', () => {
		startTimer()
	})
	// stop timer
	$(document).on('click', '#stop-timer:not(.disabled)', () => {
		stopTimer()
	})
	// Demo buttons
	$('.demo-button').on('click', function () {
		$(this).toggleClass('active')
	})
})

async function startTimer() {
	timerStopped = false
	timer = parseInt($('select#timer').val())
	$('#message').html('Counting down...')
	$('#timer-bar').css('background-position', '0 0')
	$('#start-timer, #stop-timer').toggleClass('disabled')
	$('select#timer').attr('disabled', true)
	const tbw = parseInt($('#timer-bar').css('width'))
	for (let t = timer; t >= 0; t--) {
		if (timerStopped) return
		const offset = tbw - (tbw / timer) * t
		$('#timer-bar').css('background-position', '-' + offset.toString() + 'px 0')
		$('#timer-bar').html(t + 's')
		await delay(1000)
	}
	$('#start-timer, #stop-timer').toggleClass('disabled')
	$('select#timer').attr('disabled', false)
	$('#message').html('Timer finished!')
}

function stopTimer() {
	$('#message').html('Timer stopped')
	$('#start-timer, #stop-timer').toggleClass('disabled')
	$('select#timer').attr('disabled', false)
	timerStopped = true
}

function delay(timems) {
	return new Promise((resolve) => {
		setTimeout(() => {
			return resolve()
		}, timems)
	})
}
