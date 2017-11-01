
const admin = require('firebase-admin');

// twilio: +14388079984

module.exports = (req, res) => {
    // verify the user provided a phone
    if(!req.body.phone){
        return res.status(202).send({ error: 'Bad input.' })
    }

    // format the phone number to remove dashes and parens
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    // create a new user account using that phone number
    admin.auth().createUser({ uid: phone })
                .then(user => res.send(user))
                .catch(err => res.status(422).send({ error: err }));

    // respond to the user request, saying the account was made
}
