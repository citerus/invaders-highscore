
Template.admin.scores = function () {
  return Highscores.find({}, {sort: {score: -1}}).map(function(doc, index, cursor) {
    var i = _.extend(doc, {index: getGetOrdinal(index+1)});
    return i;
  });
};

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
            var highscore = Highscores.findOne({email: email});

            if (highscore) {
                Highscores.update(
                    { _id : highscore._id },
                    { $set: {score: parseFloat(score),
                        name: name,
                        email: email,
                        recordedBy: Meteor.user().services.google.email,
                        timestamp: (new Date()).getTime()
                    }});
            } else {
                Highscores.insert({
                    name: name,
                    score: parseFloat(score),
                    email: email,
                    recordedBy: Meteor.user().services.google.email,
                    timestamp: (new Date()).getTime()
                });
            }
            $('#new-score-name').val("");
            $('#new-score-value').val("");
            $('#new-score-email').val("");
		} else {
			alert('Alla f&auml;lt m&aring;ste vara korrekt ifyllda.');
		}
	}
});

Template.highscores.events({
       'dblclick' : function () {
           if (isAuthorized && window.location.search === '?login') {
               var returned = confirm("Är du säker på att du vill ta bort poängen för: " + this.email + " ?");
               if (returned) {
                   Highscores.remove( {_id : this._id});
               }
           }

       }
});

Template.highscores.date = function() {
    var d = new Date();
    d.setTime(this.timestamp - (d.getTimezoneOffset() * 60 * 1000));
	return d.toUTCString();
}