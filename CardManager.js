var assert = require('assert');

function CardManager() {
  // maps cardNumbers to backerNames
  // @type {Map.<String, String>}
  this._cards = new Map();
}

/**
 * @param {String} backerName
 * @param {String} cardNumber
 * @return {CardManager.CardAddStatus}
 */
CardManager.prototype.tryAddCard = function(backerName, cardNumber) {
  if (!luhnChk(cardNumber)) {
    return CardManager.CardAddStatus.ERROR_CARD_INVALID;
  }
  if (!!this._cards.get(cardNumber)) {
    return CardManager.CardAddStatus.ERROR_CARD_OWNED;
  }
  this._cards.set(cardNumber, backerName);
  return CardManager.CardAddStatus.VALID;
}


// Taken from https://gist.github.com/ShirtlessKirk/2134376
// I believe this is an acceptable use under the linked license.
/**
 * Luhn algorithm in JavaScript: validate credit card number supplied as string of numbers
 * @author ShirtlessKirk. Copyright (c) 2012.
 * @license WTFPL (http://www.wtfpl.net/txt/copying)
 */
var luhnChk = (function (arr) {
    return function (ccNum) {
        var
            len = ccNum.length,
            bit = 1,
            sum = 0,
            val;

        while (len) {
            val = parseInt(ccNum.charAt(--len), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }

        return sum && sum % 10 === 0;
    };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));


// enum type, value is the user-displayable message.
CardManager.CardAddStatus = {
  VALID: "Card is valid",
  ERROR_CARD_OWNED: "ERROR: That card has already been added by another user!",
  ERROR_CARD_INVALID: "ERROR: This card is invalid"
};

module.exports = CardManager;
