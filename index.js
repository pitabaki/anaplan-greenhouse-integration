const fs = require("fs"),
    path = require("path"),
    Client = require('ssh2-sftp-client');

let sftp = new Client();
sftp.connect({
    host: 'anaplancareer.sftp.wpengine.com',
    port: '2222',
    username: 'anaplancareer-peterstaging',
    password: 'gDTALb3jnCKx'
}).then(() => {
    return sftp.list('/wp-content/uploads/js/anaplan-greenhouse-integration/js');
}).then((data) => {
    data.forEach((key, val)=>{
        console.log(key.name);
    });
}).catch((err) => {
    console.log(err, 'catch error');
});