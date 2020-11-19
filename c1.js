const io = require("socket.io-client");
const rl = require('console-read-write');

async function main(){

    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });


    ioClient = io.connect("http://localhost:3000");

    //catching events from server
    ioClient.on("hello-client", (data)=>{
        console.log("server said "+data);

    });

    while(true){
        console.log("\n\n\n");
        // _ = await io.ask('enter search string')
        search_str = await io.ask('enter search string')
        // awaitrl.question("enter search string", (search_str) => {
        //     ioClient.emit('search', search_str);      
        //     rl.close();
        //   });

        ioClient.emit('search', search_str);
        ioClient.on('search_res', (response)=>{
            console.log("query response from the server was"+response);
        });
        // console
    }
};


main();