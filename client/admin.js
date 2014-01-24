Template.admin.scores = function () {
	return Highscores.find();
}

var validStr = function(str) {
	return str.length > 0;
}

var validNum = function(str) {
	return !isNaN(parseFloat(str));
}

Template.admin.events({
	'click #new-score-save': function () {
		var name = $('#new-score-name').val();
		var score = $('#new-score-value').val();
		var email = $('#new-score-email').val();
		if (validStr(name) && validNum(score) && validStr(email)) {
			Highscores.insert({
				name: name,
				score: parseFloat(score),
				email: email,
				recordedBy: Meteor.user().services.google.email,
				timestamp: (new Date()).getTime()
			});
		} else {
			alert('Alla f&auml;lt m&aring;ste vara korrekt ifyllda.');
		}

	}
});

Template.score.date = function() {
	return new Date(this.timestamp);
}