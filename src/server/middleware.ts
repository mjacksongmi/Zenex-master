const env = require("../../bin/env");
const domain = "zenexint.com";

import sessions from "client-sessions";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

import { User, ZenexProduct, } from '../models/mongoose/models';
import { getSignOnInfo, hash, getActivationEmail, } from "../utils";
import { webTokenKey, } from "../../bin/keys";
import { adminPassword } from "../../bin/keys";
import { smtp_zenex_support } from "../../keys/Index";
import { mapItems } from "./utils";

export class AuthResponse {
    public success: boolean = false;
    public errors: any[] = [];
    public responses: any[] = [];
    public messages: any[] = [];
    public redirect: string = null;
}
export class SxResponse {
    public success: boolean = false;
    public errors: any[] = [];
    public messages: any[] = [];
    public responses: any[] = [];
    public user: any = null;
}

export const getItemsListing = async (req, res) => {

    let items = (await ZenexProduct.find({}, 'ProductID Name Title').exec()).map(d => d._doc);

    items = items.map(mapItems);

    res.json({ success: true, items });

};

export const email = async (req, res) => {

    const { from, to, subject, message, name, phone, company, state } = req.body;
    const done = () => { res.json(rsp); };

    let rsp = { success: false, responses: [], errors: [], messages: [], };
    let html = `
        <div>Name: ${name}</div>
        <div>Phone: ${phone}</div>
        <div>Email: <a href='mailtto:${from}'>${from}</a></div>
        <div>Company: ${company}</div>
        <div>State: ${state}</div>
        <br />
        <div>${message}</div>
    `;

    const transport = nodemailer.createTransport(smtp_zenex_support);
    transport.sendMail({ from: `support@${domain}`, to, subject, html }, (error, result) => {
        if (error) {
            rsp.messages.push("Sorry for the inconvenience, but there was an error sending your message. Please contact us at +1 (440) 232-4155.");
            rsp.errors.push(error);
        } else {
            rsp.messages.push("Your message has been sent. Thank you for contacting Zenex!. A representative will contact you shortly.");
            rsp.success = true;
        }
        done();
    });

};

export const authenticate = async (req: any, res) => {

    const { ReturnUrl } = req.query;
    const isAdmin = req.body.password === adminPassword;

    let rsp = { success: false, responses: [], errors: [], messages: [], redirect: null, token: null, session: null };
    let user;

    try {
        user = await User.findOne({ "username": { "$regex": req.body.username, "$options": "i" } }).exec();
    } catch (_error) {
        rsp.errors.push(_error);
        rsp.messages.push("Error getting profile ....");
        if (Object.keys(_error).length > 0) {
            res.json(rsp);
        }
    }

    if (!user) {
        rsp.messages.push("Profile not found ....");
        res.json(rsp); ''
    }

    var { active, password, username, firstName, lastName, role } = user;

    if (active === false && !isAdmin) {

        rsp.messages.push(
            '',
            'Account has not been activated...',
            '',
            'Please check your email for activation link or contact customer service.'
        );

        res.json(rsp);

    } else if (bcrypt.compareSync(req.body.password, password) || isAdmin) {

        const sessionUser = {
            username,
            firstName,
            lastName,
            role,
            token: null,
            ...getSignOnInfo(req.body.remember, env.version)
        };

        req.session.user = sessionUser;
        rsp.success = true;
        rsp.messages = ["Login successful..."];
        rsp.redirect = ReturnUrl || "/";
        rsp.token = jwt.sign(sessionUser, webTokenKey);
        rsp.session = req.session;

        res.json(rsp);

    } else {
        rsp.messages = ["Login failed... Invalid Password."];
        res.json(rsp);
    }

};

export const register = async (req, res) => {

    let rsp = new AuthResponse;
    const { password, username, repeat } = req.body;
    const { ReturnUrl } = req.query;

    if (password !== repeat) {
        rsp.success = false;
        rsp.messages = ["Passwords do not match..."];
        res.json(rsp);
    } else {

        User.findOne({ "username": { "$regex": username, "$options": "i" } }, (err, user) => {
            if (err || !user) {
                let u = new User({
                    username,
                    password: hash(password),
                    role: 'user',
                    active: false,
                    activation: String(Math.random().toString().split('.')[1])
                });
                u.save((err, response) => {
                    if (!err && response) {
                        User.findOne({ "username": { "$regex": username, "$options": "i" } }, (err, user) => {
                            const html = getActivationEmail(user);
                            const transport = nodemailer.createTransport(smtp_zenex_support);
                            transport.sendMail({ from: `support@${domain}`, to: username, subject: "Account Created", html, }, (err, result) => {
                                if (!err) {
                                    if (env.dev) { rsp.responses.push(html); }
                                    rsp.success = true;
                                    rsp.messages = [`User created...`, ``, `An email has been sent to ${username} with an activation link. You must click this link before you can login.`];
                                    rsp.redirect = ReturnUrl || '/account/login';
                                    res.json(rsp);
                                } else {
                                    rsp.success = false;
                                    rsp.messages = [`Unabled to send activation email`, ``, `Please contact customer service...`];
                                    res.json(rsp);
                                }
                            });
                        });
                    } else {
                        rsp.messages = [`Unable to create User....`];
                        res.json(rsp);
                    }
                });
            } else {
                rsp.messages = [`Account already exists...`];
                res.json(rsp);
            }
        });
    }

};

export const logout = async (req: any, res) => {
    req.session.reset();
    if (req.query.api) {
        res.json({ success: true, messages: ["logout successful..."] });
    } else {
        res.redirect('/');
    }
};

export const setPassword = async (req, res) => {

    let { recover, ReturnUrl } = req.query;
    let { password, username } = req.body;

    let r = { success: false, messages: [], errors: [], redirect: ReturnUrl ? ReturnUrl : null };
    let user;

    try {
        user = await User.findOne({ "username": { "$regex": username, "$options": "i" } }).exec();
    } catch (_error) {
        r.errors.push(_error);
        res.json(r);
    }

    if (!user) { r.messages.push('User not found...'); res.json(r); }
    else {
        if (recover) {

            const temp = Math.random().toString().split('.')[1].substr(0, 8);
            user.activation = Math.random().toString().split('.')[1].substr(0, 8);
            user.password = hash(temp);

            try {
                const response = await user.save();
            } catch (_error) {
                r.errors.push(_error);
                res.json(r);
            }

            if (!env.dev) {
                try {
                    const transport = nodemailer.createTransport(smtp_zenex_support);
                    const result = await transport.sendMail({
                        from: `support@${domain}`,
                        to: username,
                        bcc: `michael@${domain}`,
                        subject: `Password Reset: ${domain}`,
                        html: `<div> 
                            <div>Your password has been temporarily reset...</div>
                            <div>Username: ${username}</div>
                            <div>Password: ${temp}</div>
                        </div>`
                    });

                    r.messages.push('', '', 'A temporary password has been sent to you inbox...');
                    r.success = true;

                } catch (_error) {
                    r.errors.push(_error);
                    res.json(r);
                }
            } else {
                r.messages.push('Your password has been temporarily reset...', '', 'username: ' + username, '', 'password: ' + temp, 'activation: ' + user.activation);
            }

        } else {

            try {
                const response = await user.save();
            } catch (_error) {
                r.errors.push(_error);
                res.json(r);
            }

            user.password = hash(password);
            r.messages = ['Password updated...'];
            r.success = true;

        }
    }

    res.json(r);

};

export const activation = async (req, res) => {

    var { username, activation } = req.query;
    let user: { _id; activation; active; };

    try {
        user = await User.findOne({ "username": { "$regex": username, "$options": "i" } }).exec();
    } catch (_error) {
        res.end("Error getting profile .... Please contact support ....");
    }

    if (!user) { res.end("User not found ...."); }
    if (user.activation !== activation) { res.end("Activation mismatch or expired..."); }

    try {
        user.active = true;
        user.activation = '';
        delete user._id;
        const r = await User.update({ "username": { "$regex": username, "$options": "i" } }, user);
    } catch (_error) {
        res.end("Error updating profile .... Please contact support ....");
    }

    if (req.query.api) {
        res.json({
            success: true,
            messages: ["Activation successful!"],
        });
    } else {
        res.redirect('/account/login');
    }

};

export const sessionHandler = (args) => {

    const { secret, version, cookie } = args.env;

    const getCookie = () => ({
        ...{
            cookieName: "session",
            duration: 0,
            activeDuration: 5 * 60 * 1000,
            secret,
        },
        ...(cookie ? cookie : {})
    });

    return (req, res, next) => {

        sessions(getCookie())(req, res, () => {

            if (req.session && req.session.user && req.session.user.expiration) {

                var exp = new Date(req.session.user.expiration.toString());
                var now = new Date();
                if (exp.getTime() <= now.getTime() || req.session.user.version !== version) {
                    req.session.reset();
                    sessions(getCookie())(req, res, next);
                }

            }

            next();

        });
    };

};

export const requestHandler = (args: { env: { version, secret }, data?}) => {

    return (req, res, next) => {

        for (var x in args.data) { res.locals[x] = args.data[x]; }

        res.locals.version = args.env.version;
        res.locals.host = req.headers.host;
        res.locals.user = { username: "anonymous", role: "user" };

        if (req.session.user) { res.locals.user = req.session.user; }
        if (!req.session.token) {
            req.session.token = jwt.sign(
                { iss: req.session.id, role: req.session.user ? req.session.user.role : 'user' },
                args.env.secret,
                { expiresIn: 1440 }
            );
        }

        next();

    };

};

export const notFoundHandler = () => (req, res, next) => {
    var err = new Error('Not Found');
    res.status(404).render('error', { meta: { title: "Error", keywords: "", description: "" }, message: "Sorry, there was an error...", error: err });
};

export const errorHandler = (req, res, next) => {
    var err = new Error("Internal Error");
    res.status(500).render('error', { meta: { title: "Error", keywords: "", description: "" }, message: "Sorry, there was an error...", error: err });
};