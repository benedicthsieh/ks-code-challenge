var assert = require('assert');
var sinon = require('sinon');

var CardManager = require('../CardManager');

suite('main');

test('#tryAddCard_lunh', function() {
  // testcases:
  // 49927398716 (true)
  // 49927398717 (false)
  // 1234567812345678 (false)
  // 1234567812345670 (true)
  // from http://rosettacode.org/wiki/Luhn_test_of_credit_card_numbers

  var cm = new CardManager();
  assert.equal(cm.tryAddCard('b', '49927398716'),
      CardManager.CardAddStatus.VALID);
  assert.notEqual(cm.tryAddCard('b', '49927398717'),
      CardManager.CardAddStatus.VALID);
  assert.notEqual(cm.tryAddCard('b', '1234567812345678'),
      CardManager.CardAddStatus.VALID);
  assert.equal(cm.tryAddCard('b', '1234567812345670'),
      CardManager.CardAddStatus.VALID);
});

test('#tryAddCard_users', function() {
  var cm = new CardManager();
  assert.equal(cm.tryAddCard('b1', '49927398716'),
      CardManager.CardAddStatus.VALID);
  assert.equal(cm.tryAddCard('b2', '49927398716'),
      CardManager.CardAddStatus.ERROR_CARD_OWNED);
  assert.equal(cm.tryAddCard('b1', '1234567812345670'),
      CardManager.CardAddStatus.VALID);
});
