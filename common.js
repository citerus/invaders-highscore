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

getGetOrdinal = function(n) {
   var s=[" th"," st"," nd"," rd"],
       v=n%100;
   return n+(s[(v-20)%10]||s[v]||s[0]);
}
