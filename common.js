endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

userEmail = function() {
  return Meteor.user().services.google.email;
}

isAuthorized = function(user) {
  if (user === undefined 
    || user === null
    || user.services === undefined
    || user.services.google === undefined
    || user.services.google.email === undefined
    || !endsWith(user.services.google.email, '@citerus.se')) {
      
    return false;
  } else {
    return true;
  }
}
