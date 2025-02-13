const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "godlikewebsite123@gmail.com",
            pass: ""

        }
    });

    const receiver = {
        from : "godlikewebsite123@gmail.com",
        to : "amanhusainbutt@gmail.com",
        subject : "Node Js Mail Testing!",
        text : "Hello this is a text mail!"
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("success!");
        response.end();
    });
    
});

server.listen(8080);