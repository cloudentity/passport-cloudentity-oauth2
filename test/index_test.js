var vows = require('vows');
var assert = require('assert')
var util = require('util')
var CloudentityStrategy = require('../lib')

vows.describe('passport-cloudentity-oauth2').addBatch({
    'module': {
        'should export Oauth 2.0 strategy': function(x) {
            assert.isFunction(CloudentityStrategy)
        },
        'should make OAuth 2.0 strategy available at .Strategy': function(x) {
            assert.isFunction(CloudentityStrategy.Strategy)
        },
        'should throw on missing authServerURL': function(x) {
            try {
                new CloudentityStrategy({
                        clientID: 'a-client-id',
                        clientSecret: 'asecret',
                        callbackURL: 'http://www.client.com/callback'
                    },
                    function() {})
            } catch (e) {
                assert.equal(e.message, (new TypeError('CloudentityStrategy requires an authorization URL option').message))
            }
        },
        'should throw on missing clientID': function(x) {
            try {
                new CloudentityStrategy({
                        clientSecret: 'asecret',
                        authServerURL: 'http://www.authserver.com',
                        callbackURL: 'http://www.client.com/callback'
                    },
                    function() {})
            } catch (e) {
                assert.equal(e.message, (new TypeError('CloudentityStrategy requires a client ID option').message))
            }
        },
        'should throw on missing callbackURL': function(x) {
            try {
                new CloudentityStrategy({
                        clientID: 'a-client-id',
                        clientSecret: 'asecret',
                        authServerURL: 'http://www.authserver.com',
                    },
                    function() {})
            } catch (e) {
                assert.equal(e.message, (new TypeError('CloudentityStrategy requires an callback URL option').message))
            }
        },
        'should throw on missing secret': function(x) {
            try {
                new CloudentityStrategy({
                        clientID: 'a-client-id',
                        callbackURL: 'http://www.client.com/callback',
                        authServerURL: 'http://www.authserver.com',
                    },
                    function() {})

            } catch (e) {
                assert.equal(e.message, (new TypeError('CloudentityStrategy requires a client secret URL option when not using pkce').message))
            }
        },
        'should throw on pkce without state': function(x) {
            try {
                new CloudentityStrategy({
                        clientID: 'a-client-id',
                        callbackURL: 'http://www.client.com/callback',
                        authServerURL: 'http://www.authserver.com',
                        pkce: true,
                    },
                    function() {})
            } catch (e) {
                assert.equal(e.message, (new TypeError('CloudentityStrategy requires requires state when using pkce').message))
            }
        },
        'should return strategy when using pkce and state': function(x) {
            try {
                new CloudentityStrategy({
                        clientID: 'a-client-id',
                        callbackURL: 'http://www.client.com/callback',
                        authServerURL: 'http://www.authserver.com',
                        pkce: true,
                        state: true,
                    },
                    function() {})
            } catch (e) {
                assert.equal(e, null)
            }
        },
    },


}).export(module)