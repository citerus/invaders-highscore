
Meteor.subscribe('highscores');

Meteor.autosubscribe(function () {
    Meteor.subscribe("userData");
    Meteor.subscribe("allUserData");
});

Highscores = new Meteor.Collection("highscores");

Template.main.isCiterus = function () {
  var user = Meteor.user();
  return isAuthorized(user);
}

Template.main.showLogin = function () {
  return window.location.search === '?login';
}

Template.highscores.scores = function () {
  return Highscores.find({}, {sort: {score: -1}});
};


Meteor.startup(function () {
  Accounts.ui.config({
    requestPermissions: {
      google: ['email']
    }
  });
});

