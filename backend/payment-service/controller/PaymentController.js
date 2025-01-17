const asyncHandler = require("express-async-handler");
const Payment = require("../module/PaymentModule");
const sendEmail = require("../utils/sendEmail");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const accountSid = 'ACc187b49eb4321fce0f4a2c305e24ad27';
const authToken = 'dedce42e82a1481837486e5b85031b63';
const client = require('twilio')(accountSid, authToken);


const createPayment =asyncHandler (async(req,res)=>{
    try{
        const uid = req.params.uid;
        const cid = req.params.cid;
        const amount = req.params.amount;
        const courseName = req.params.cname;
        console.log(uid);
        console.log(cid);
        console.log(amount);
        // const phone = req.params.phone
        console.log(req.body.email);

        await stripe.charges.create(
            {
              source: req.body.tokenId,
              amount: req.body.amount,
              currency: "usd",
              receipt_email: req.body.email,
      
            },
            (stripeErr, stripeRes) => {
              if (stripeErr) {
                res.status(500).json(stripeErr);
              } else {
                res.status(200).json(stripeRes);
              }
            }
          );


        const  payment = await Payment.create({
            userid:uid,
            courseid:cid,
            amount:amount,
            courseName:courseName,
            payemail:req.body.email
        })

        await client.messages.create({
            body: `Your $ ${amount} payment successfully recived. And you are enrolled ${courseName}. GOOD LUCK 👨‍🎓  Knowlage.net` ,
            from: '+12076721160',
            to: '+94717472613'
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err));



        //email
        const message = `
            <h1>Knowlage.net<h1>
            <h2>Payment Conformation!</h2>
            <p>Your $ ${amount} payment successfully recived.</p>
            <p>And you are enrolled ${courseName}. GOOD LUCK 👨‍🎓  </p>
            <br/>
            <p>Knowlage.net</p>

            
        `

        const subject = "Knowlage.net payment recipt"
        const send_to = req.body.email
        const sent_from = process.env.EMAIL_USER

        await sendEmail(subject, message, send_to, sent_from, )

        res.status(201).json(payment);
        

    }catch (error) {
        console.error("Error occour paying:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})


const getAllPayment = asyncHandler(async(req,res)=>{
    try{
        const payment = await Payment.find();

        res.status(200).json(payment)

    }catch (error) {
        console.error("Error occour getiing payment details", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})


const getPaymentByUserId = asyncHandler(async(req,res)=>{
    try{
        const payment = await Payment.find({userid:req.params.uid});

        res.status(200).json(payment)

    }catch (error) {
        console.error("Error occour getiing payment details:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})



module.exports ={
    createPayment,
    getAllPayment,
    getPaymentByUserId

}