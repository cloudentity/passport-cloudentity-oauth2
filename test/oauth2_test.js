var vows = require('vows')
var assert = require('assert')
var util = require('util')
var CloudentityStrategy = require('../')

vows.describe('CloudentityStrategy').addBatch({
    'strategy': {
        topic: function() {
            return new CloudentityStrategy({
                clientID: 'a-client-id',
                clientSecret: 'asecret',
                authServerURL: 'http://www.authserver.com',
                callbackURL: 'http://www.client.com/callback'
            },
            function() {})
        },

        'should be named cloudentity': function(strategy) {
            assert.equal(strategy.name, 'cloudentity')
        },

    },
    'strategy authorization params': {
        topic: function() {
            return new CloudentityStrategy({
                clientID: 'a-client-id',
                clientSecret: 'asecret',
                authServerURL: 'http://www.authserver.com',
                callbackURL: 'http://www.client.com/callback'
            },
            function() {})
        },
        'returns empty object when parsing invalid options': function(strategy) {
            var params = strategy.authorizationParams({ bad: 'param'})
            assert.lengthOf(Object.keys(params), 0)
        },
        'should return login_hint': function (strategy) {
            var params = strategy.authorizationParams({ loginHint: 'ce-idp' });
            assert.equal(params.login_hint, 'ce-idp');
        },
    }
}).export(module)