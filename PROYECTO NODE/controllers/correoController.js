const {} = require('express');
const nodeMailer = require('nodemailer');

const envioCorreo = (req=request, resp=response)  =>{
    let body = req.body;

    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post: 587,
        auth:{
            user: 'anaremkg@gmail.com',
            pass: 'cjzzsssjquuyxcvl'
        }
    });

    const opciones = {
        from: 'BarAKA',
        subject: body.asunto,
        to: body.email,
        text: body.mensaje
        /*subject: 'Confirmacion de cita',
        to: body.email,
        text: 'Gracias por escribirnos, hemos recibido tu mensaje y con gusto resolveremos tus dudas. Nos encontramos trabajando en ellas'*/
    };

    config.sendMail(opciones,function(error,result){
        if (error) return resp.json({ok:false, msg:error});
        
        return resp.json({
            ok:true,
            msg: result
        })

    })
}

const envioCita = (req=request, resp=response)  =>{
    let body = req.body;

    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post: 587,
        auth:{
            user: 'anaremkg@gmail.com',
            pass: 'cjzzsssjquuyxcvl'
        }
    });

    const opciones = {
        from: 'BarAKA',
        subject: body.asunto,
        to: body.email,
        html: `<h2>Nombre del reservador: ${body.nombre}</h2>
        <h3>Lugar de reservacion: ${body.lugar}</h3>
        <h3>Cantidad de personas: ${body.personas}</h3>
        <h3>Fecha y hora de las reservacion: ${body.fecha}</h3>`
    };

    config.sendMail(opciones,function(error,result){
        if (error) return resp.json({ok:false, msg:error});
        
        return resp.json({
            ok:true,
            msg: result
        })

    })
}


module.exports = {
    envioCorreo,
    envioCita
}
