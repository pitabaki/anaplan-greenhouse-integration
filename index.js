const fs = require("fs"),
    path = require("path"),
    Client = require("ssh2-sftp-client"),
    watch = require("node-watch"),
    { exec } = require("child_process");

let sftp = new Client();
let watchPath = path.join(__dirname, "/prod/assets/js/greenhouse-integration-script.js");

let gulpTask = function( task ) {
    exec('gulp ' + task, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stderr);
        console.log(stdout);
    });
};

watch(watchPath, { recursive: true }, function(evt, name) {
    gulpTask("jsTask");
    console.log('%s changed.', name);
});

/*
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
});*/