
Highscores = new Meteor.Collection("highscores");

Meteor.publish("allUserData", function () {
  return Meteor.users.find({}, {fields: {'services.google.email': 1}});
});

Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'services.google.email': 1}});
});

Meteor.publish('highscores', function () {
	var user = Meteor.users.findOne({_id: this.userId});
	if (isAuthorized(user)) {
		return Highscores.find({});
	} else {
		return Highscores.find({}, {
			fields: {name: 1, score: 1},
      sort: {score: -1},
			limit: 10
		});
	}	
});

Highscores.allow({
  insert: function (userId) {
    return (userId && isAuthorized(Meteor.user()));
  },
  remove: function (userId) {
    return (userId && isAuthorized(Meteor.user()));
  },
  update: function (userId) {
      return (userId && isAuthorized(Meteor.user()));
  }

});