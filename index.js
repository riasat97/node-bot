/**
 * Created by riasatraihan on 4/13/2016.
 */
var request = require('request');
var fs = require('fs');
var no=1;
var download=true;

    (function loop() {
        if (download) {
            request({
                url: 'https://www.artstation.com/projects.json', //URL to hit
                qs: {page:no,sorting:'latest'}, //Query string data
                method: 'GET' //Specify the method

            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    loop();
                } else {
                    console.log(response.statusCode);
                    console.log('number of exe '+no);
                    var result=JSON.parse(body);
                    var data = result.data;
                    if(data.length == 0) {
                        download =false;
                        console.log('download complete');
                        return false;
                    }
                    if(no > 3){
                        download=false;
                        console.log('download successfully completed');
                        return false;
                    }
                    for(var image in data){
                        console.log(data[image].cover.thumb_url);
                        var img=data[image].cover.thumb_url;
                        var path='./img/' + Math.random().toString().split('.').pop()+'.jpg';
                        var destination = fs.createWriteStream(path);

                        request(img)
                            .pipe(destination)
                            .on('error', function(error){
                                console.log(error);
                            });
                    }
                   no++;
                   loop();
                }
            });
        }
        console.log('in else ');
    }());
//console.log(downloadImg()+"downloaded");
