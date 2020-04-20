const rp = require("request-promise")

async function createJob(){
    for(let i=0; i<10; i++){
        await rp({
            uri: "http://localhost:3000/crawl-page",
            method: "POST",
            body: {
                url: "http://toquoc.vn/gay-ong-dap-lung-ong-cai-gia-qua-dat-ma-my-phai-tra-vi-ong-trump-trut-gian-len-who-82020184121246872.htm",
                file_name: "tintuc" + i + ".txt"
            },
            json: true
        })
        console.log("create job done.")
    }
}

createJob();