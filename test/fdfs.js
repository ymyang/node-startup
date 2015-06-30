/**
 * Created by yang on 2015/6/22.
 */
var FdfsClient = require('fdfs-client');

var fdfs = new FdfsClient({
    trackers: [
        {
            host: '192.168.1.71',
            port: 22122
        }
        //{
        //    host: '192.168.1.74',
        //    port: 22122
        //}
    ],
    timeout: 10000,
    defaultExt: 'txt',
    charset: 'utf8'
});

fdfs.upload('d:/tmp/oatos.lic', function(err, fileId) {
    if (err) {
        console.error('[upload]:', err);
    }
    console.log('[upload]:', fileId);

    fdfs.download(fileId, 'd:/tmp/oatos-1.lic', function(err) {
        if (err) {
            console.error('[download]:', err);
        }
    });

    var meta = {fileName: 'oatos.lic', fileId: 12};
    fdfs.setMetaData(fileId, meta, 'M', function(err) {
        if (err) {
            console.error('[setMetaData]:', err);
        }
        fdfs.getMetaData(fileId, function(err, metaData) {
            if (err) {
                console.error('[getMetaData]:', err);
            }
            console.log('[getMetaData]:', metaData);
        });
    });

    fdfs.getFileInfo(fileId, function(err, fileInfo) {
        if (err) {
            console.error('[getFileInfo]:', err);
        }
        console.log('[getFileInfo]:', fileInfo);
    });

    //fdfs.del(fileId, function(err) {
    //    if (err) {
    //        console.error('[del]:', err);
    //    }
    //});
});

fdfs.on('error', function(err) {
    // ?????????ик?ик?ио
    console.error('[error]:', err);
});