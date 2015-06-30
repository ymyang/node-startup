/**
 * Created by yang on 2015/6/22.
 */
var ldap = require('ldapjs');

var client = ldap.createClient({
    url: 'ldap://192.168.1.130:389'
    //maxConnections: 5,
    //bindDN: 'administrator@test.com',
    //bindCredentials: 'qycloud@1234',
    //checkInterval: 30000,
    //maxIdleTime: 60000
});

client.bind('cn=admin,dc=test,dc=com', '123456', function(err) {
    if (err) {
        console.error(err);
    }
    console.log('bind ok');
});

var useroptions = {
    scope: 'sub',
    filter: '(objectclass=person)'
}

var ouoptions = {
    scope: 'sub',
    filter: '(objectclass=organizationalUnit)'
};

var groupoptions = {
    scope: 'sub',
    filter: '(|(objectclass=group)(objectclass=posixGroup))'
};

client.search('dc=test,dc=com', useroptions, function(err, res){
    if (err) {
        console.error(err);
    }
    var count = 0;
    res.on('searchEntry', function(entry) {
        console.log('entry: ' + JSON.stringify(entry.object));
        count ++;
    });
    res.on('searchReference', function(referral) {
        console.log('referral: ' + referral.uris.join());
    });
    res.on('error', function(err) {
        console.error('error: ' + err.message);
    });
    res.on('end', function(result) {
        console.log('status: ' + result.status);
        console.log('count:', count);
    });
});