const phoneRegex = /^\s*(?:\+?1[\s.-]*)?\(?([0-9]{3})\)?[\s.-]*([0-9]{3})[\s.-]*([0-9]{4})\s*(?:(?:[+-]|extension\.?|ext\.?|e\.?)?\s*([0-9]+)\s*)?$/;

const matchIndex = (string, re) => {
  var res  = [];
  var subs = string.match(re);

  for (var cursor = subs.index, l = subs.length, i = 1; i < l; i++){
    var index = cursor;

    if (i+1 !== l && subs[i] !== subs[i+1]) {
      var nextIndex = string.indexOf(subs[i+1], cursor);
      while (true) {
        var currentIndex = string.indexOf(subs[i], index);
        if (currentIndex !== -1 && currentIndex <= nextIndex) {
          index = currentIndex + 1;
        }
        else {
          break;
        }
      }
      index--;
    } else {
      index = string.indexOf(subs[i], cursor);
    }
    cursor = index + subs[i].length;

    res.push([subs[i], index]);
  }
  return res;
}

export const formatPhoneNumber = phoneNumberString => {
  let match = phoneNumberString.match(phoneRegex);

  if (!match) { return phoneNumberString };

  let result = '(' + match[1] + ') ' + match[2] + '-' + match[3];
  if (match[4]) {
    result += " " + phoneNumberString.substring(matchIndex(phoneNumberString, phoneRegex)[2][1] + match[3].length);
  }

  return result;
}

//returns the phone number string as a 10 digit phone number, omitting extensions and other things at the end
export const formatSimplePhoneNumber = phoneNumberString => {
  let match = phoneNumberString.match(phoneRegex);

  if (!match) { return phoneNumberString };

  let result = match[1] + match[2] + match[3];

  return result;
}
