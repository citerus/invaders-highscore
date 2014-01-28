
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

Template.highscores.showAll = function () {
    var user = Meteor.user();
    return isAuthorized(user) && window.location.search === '?login';
}

Template.highscores.scores = function () {
  return Highscores.find({}, {sort: {score: -1}}).map(function(doc, index, cursor) {
    var i = _.extend(doc, {index: getGetOrdinal(index+1)});
    return i;
  });
};

Template.highscores.isCiterus = function () {
    var user = Meteor.user();
    return isAuthorized(user);
}

Meteor.startup(function () {
  Accounts.ui.config({
    requestPermissions: {
      google: ['email']
    }
  });
});

