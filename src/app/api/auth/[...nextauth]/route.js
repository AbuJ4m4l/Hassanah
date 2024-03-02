import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../../utils/database";
import Google_User from '../../../../models/Google_User';
import Discord_User from '../../../../models/Discord_User';
import UAParser from "ua-parser-js";
import User from "../../../../models/user";
import { v4 } from "uuid";
import NodeRSA from "node-rsa";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

db();

async function sendEmail(data) {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.Email_SERVICE_NAME,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Compose the email
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: data.email,
            subject: data.subject,
            html: data.html
        };

        // Send the email
        transporter.sendMail(mailOptions)
            .then(info => {
                return info;
            })
            .catch(error => {
                console.error('Error sending message:', error);
                return;
            });
    } catch (error) {
        console.log(error);
    }
}

async function sendVerificationMessage(data) {
    sendEmail({
        email: data.email,
        subject: "Verify Your Email Address for Hassanah",
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
        <body style="padding: 0; margin: 0; font-family: Arial, Helvetica, sans-serif;">
            <nav>
                <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100px; background-color: #0093fd;">
                <img src="${process.env.URL}/images/hassanahLoggo-white.png" loading="lazy" style="width: 70px; height: 70px; margin: 5px; border-radius: 10px;">
            </div>
        </nav>
        <div style="margin-left: 7.5%;margin-right: 7.5%;margin-top: 5%; font-size: medium;">
        <h1>
            Dear <strong style="color: #0093fd;">${data.username ? data.username : data.user}</strong>,
        </h1>
        <br><br>
        <p style="font-weight: bold; font-size: larger;">
        Thank you for signing up for Hassanah! To complete your registration and access all the features of our platform, please verify your email address by clicking the link below:
        <br>
        <br>
        <button style="cursor: pointer; padding-top: 12px; padding-bottom: 12px; padding-left: 18px; padding-right: 18px; background-color: #0093fd; border-radius: 10px; border: none; color: white; font-size: medium; font-weight: bold;">
        <a style="text-decoration: none; color: white;" href="${process.env.URL}/verify?code=${data.code}">Verify</a>
        </button>
        <br>
        <br>
        Or direct link:
        <br>
        <br>
        <a href="${process.env.URL}/verify?code=${data.code}">${process.env.URL}/verify?code=${data.code}</a>
        <br>
        <br>
        If you did not sign up for Hassanah, please disregard this email.
        <br>
        <br>
        Best Regards,<br>
        The Hassanah Team
        </p>
        </div>
        </body>
        </html>`
    })
}

async function sendWelcomeMessage(data) {
    sendEmail({
        email: data.email,
        subject: "Welcome to Hassanah - Your Premier Source for Islamic Teachings",
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head><body style="margin: 0; font-family: Arial, Helvetica, sans-serif;">
        <nav>
                <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100px; background-color: #0093fd;">
                <img src="${process.env.URL}/images/hassanahLoggo-white.png" loading="lazy" style="width: 70px; height: 70px; margin: 5px; border-radius: 10px;">
            </div>
        </nav>
        <div style="margin-left: 7.5%; margin-right: 7.5%; margin-top: 5%; font-size: medium;">
            <h1>Dear <strong style="color: #0093fd;">${data.username ? data.username : data.user}</strong>,</h1>
            <h3>Welcome to Hassanah, your premier source for Quran Kareem readings, Islamic stories, Hadith collections, accurate prayer times, and more!</h3>
            <h4>At <a href="${process.env.URL}" style="color: #0093fd; text-decoration: none;">Hassanah.org</a>, we strive to provide you with a rich and diverse collection of resources to help you explore the richness of Islamic teachings in both English and Arabic. Whether you're seeking spiritual growth, educational resources, or simply a sense of community, Hassanah is here to support you on your journey.</h4>
            <h5>Here's what you can expect from our platform:</h5>
            <ol>
                <li><strong>Quran Kareem Readings:</strong> Immerse yourself in the beauty of the Quran with our comprehensive collection of readings and translations.</li>
                <li><strong>Islamic Stories:</strong> Discover inspiring stories from Islamic history and contemporary life that will uplift and motivate you.</li>
                <li><strong>Hadith Collections:</strong> Explore the teachings of the Prophet Muhammad (peace be upon him) through our curated Hadith collections.</li>
                <li><strong>Accurate Prayer Times:</strong> Stay informed with precise prayer times tailored to your location.</li>
                <li><strong>Multilingual Content:</strong> Access Islamic teachings in both English and Arabic, catering to a diverse global audience.</li>
            </ol>
            <p>We invite you to join our community and connect with like-minded individuals who share your passion for learning and spiritual growth. Follow us on <strong style="color: #0093fd;"><a style="text-decoration: none; color: #0093fd; cursor: pointer;" href="${process.env.FACEBOOK_URL}">Facebook</a>, <a style="text-decoration: none; color: #0093fd; cursor: pointer;" href="${process.env.X_URl}">X</a>, and <a style="text-decoration: none; color: #0093fd; cursor: pointer;" href="${process.env.INSTAGRAM_URL}">Instagram</a></strong> to stay updated on the latest content and community events.</p>
            <p>To get started, visit our website at <a href="${process.env.URL}" style="color: #0093fd; text-decoration: none;">https://hassanah.org</a> and explore the essence of Islamic teachings with Hassanah.</p>
            <p>Thank you for choosing Hassanah as your guide on this journey of exploration and enlightenment. We look forward to accompanying you every step of the way.</p>
            <p>Best regards,<br><strong style="color: #0093fd;">${data.username ? data.username : data.user}</strong><br>Hassanah Team</p>
        </div>
        </body>
        </html>`
    })
}

async function sendNewDeviceLoginAlertMessage(data) {
    sendEmail({
        subject: "New Device Login Alert",
        email: data.email,
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
        <body style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: large;">
        <nav>
                <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100px; background-color: #0093fd;">
                <img src="${process.env.URL}/images/hassanahLoggo-white.png" loading="lazy" style="width: 70px; height: 70px; margin: 5px; border-radius: 10px;">
            </div>
        </nav>
    <div style="margin-left: 7.5%; margin-right: 7.5%; margin-top: 5%;">
        <h1>Hello <strong style="color: #0093fd;">${data.username}</strong>,</h1>
        <p>We noticed a new device login to your Hassanah account. If this was you, you can ignore this email. If you did not log in from this device, please take immediate action to secure your account.</p>
        <p>Device: <strong>${(data.browserName + ` on ` + data.deviceOS + ` ` + data.deviceOSVersion)}</strong></p>
        <p>Location: <strong>${data.location}</strong></p>
        <p>IP Address: <strong>${data.ip}</strong></p>
        <p>If you have any concerns or questions, please don't hesitate to contact us immediately.</p>
        <p>Thank you for choosing Hassanah.</p>
        <p>Best regards,</p>
        <p><strong style="color: #0093fd;">Hassanah Team</strong></p>
    </div>
</body>
        
</html>`
    })
}

const secret = process.env.JWT_SECRET;
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAsdCJNw4Mi3eYMHfldbTYYKY+QppalK9bXM4rd4UcsKy0HU1/
CpeN+RICQxe3NfcNpmVbyS7cm6rMU30gEm3OMRiBmg9bDR779F7lmHrgOo0sOUaq
QadiJ1EDvzjSLGLPALR5WLEXEBN0cBeZjRjDlOtVKNmXcjd4njY3gZBq15z/ZdJd
Eud/ewMFFEF0FgVtCJAWqaoYw9LsBn+QZmpTX2PmTiFy6WYUw3pQJnRcnbOxF5Pn
gVdd+k0+CjdhnzGFY0D7fDAQHmQzFN5iWVhXIqApLiu/ra4IEncDiGBY9FmZEIHk
6H/VFNClQf5/qUmKWbpBxB1+LibcLW28OU6aZwIDAQABAoIBAEI9a0BlLWsvLDSy
FXrZ2dl3VK4/Dgthn+lcrHijz+JJE/fujKsHdk4Y1VrlFM03sZARJjY2DNy4rdFU
RYRX/33uoSkhG0wyBK4uQ92fuLRXLuhPWNGIZ1o6JekwY6tBS9f5Y1MU9YB5nuC7
Ceq0FPf/CwRiurZDz90wWVEc2ZBkPsxUJ7za1tAbpMgjUCaIdGPmG8vPXjyaTX4T
Raz1Jxq+ZZjKK895AKnbdJRxduQHgpwz4Qqwe68W2KK7KFm90IHGIiJJhd2PF7El
IeTjBBFwzd/XMy/eFiUMjIefzVFQUjomVxE186HJa9GeaCQq3FJC2wGKoGOqTIUs
XCTkHiECgYEA4jiIXqQfnEUNCtQS1vI7goncHr3i/JzGojZe5mrpUuecpW/Z+EFN
IWg7Jiyj1erCdeHIxzLC7cdZYjacZU0f3cHYBJvHLSGUrnLhaJtrQx93B0SvOAaE
XC3Qdxn/Uw/djPzJEFXJ+6o2QMQF2hMyBSJ02IUBI8oC2/PBuxVA+ckCgYEAyTjA
IEUwKWSIr3KIqalUUZZlSUqkFkKD3gPgnpJNQ6lxuk1eOhwf6Wgp+mR0XPMsjZxG
wvTeUTUgyF6Qsr4s+mjdKzec9R3aDb4Pe4jmgQns42j2HL/qtvRJwPaQnl15Lctd
NrmJ/Seb3Vx/jzl962CtetEI6cVQ0LAxqdgSCq8CgYEAr1S1jPSTc2CpTR01RNcV
fIUwz7rIdJVl9k9BmkB+ejz80dQxEhI6n4vTXDD5AlEjSo4mOQ2EuxnokxBUgscV
zZ/xtxCtfLMsM1Dil1rt9WYrsLxxOXEDoRX5HnZNx6jiQ+WgSELVe3Je/i9vgaei
+wvLmAzt5zkooiT4n/FHHNECgYAgOr/DK3HQX3LpLx4mlqGTw9QLTjJEAnlemR5k
J6jKepxlq7i49AJEf1Oh8G8W6DgtomdPGKt3NFxA26yvhHhtz1gFcQ3p0NM5OkT+
k2ngJzfTIN+ysSamETCzAIsfYndjV1xhxIwOiUaUyRkBVsMNbVm7/zk/QER2eJIr
0xjorwKBgADlUF+evdRvUVwNB9exCtm0abuWQBoJ4wUCr5Ee8mOwG9b9INrqyR/s
kIXe4OZ9HWIp393cqNrklX4eOh/T5iYppSpQOEFslXDZM/lK2D91PbPIrHSMflt5
LO8cXRiryeCRNlSh4ml5pLZmTzc/9RHzAKdOEK7S6gxWO3U0RDOM
-----END RSA PRIVATE KEY-----`;
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsdCJNw4Mi3eYMHfldbTY
YKY+QppalK9bXM4rd4UcsKy0HU1/CpeN+RICQxe3NfcNpmVbyS7cm6rMU30gEm3O
MRiBmg9bDR779F7lmHrgOo0sOUaqQadiJ1EDvzjSLGLPALR5WLEXEBN0cBeZjRjD
lOtVKNmXcjd4njY3gZBq15z/ZdJdEud/ewMFFEF0FgVtCJAWqaoYw9LsBn+QZmpT
X2PmTiFy6WYUw3pQJnRcnbOxF5PngVdd+k0+CjdhnzGFY0D7fDAQHmQzFN5iWVhX
IqApLiu/ra4IEncDiGBY9FmZEIHk6H/VFNClQf5/qUmKWbpBxB1+LibcLW28OU6a
ZwIDAQAB
-----END PUBLIC KEY-----`;

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role ?? "user",
                    locale: profile.locale ? profile.locale : "ar",
                    provider: 'google'
                };
            }
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.username,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role ?? "user",
                    locale: profile.locale ? profile.locale : "ar",
                    provider: 'discord'
                };
            },

        }),
        CredentialsProvider({
            id: "signup",
            name: "signup",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Username"
                },
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                },
                retypePassword: {
                    label: "Match Password",
                    type: "password",
                    placeholder: "Match Password",
                },
                userAgent: {
                    label: "User Agent",
                    type: "text"
                },
                userAgentID: {
                    label: "User Agent ID",
                    type: "number"
                }
            },
            async authorize(credentials, req) {
                try {
                    const encryptor = new NodeRSA(privateKey);
                    const validatePassword = (password) => {
                        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W|_)(?=.{7,})/;
                        const result = regex.test(password);
                        return result;
                    };
                    const parser = new UAParser();
                    await db();
                    if (credentials.email !== "" && credentials.password !== "" && credentials.username !== "" && credentials.userAgent !== "" && (credentials.password === credentials.retypePassword)) {
                        const {
                            email, password, username, retypePassword, userAgent: UA
                        } = credentials;

                        const encryptedPassword = await encryptor.encrypt(password, "base64");

                        const userAgent = parser.setUA(UA).getResult();
                        const {
                            browser,
                            os,
                            device
                        } = userAgent;
                        const id = await v4();
                        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                        if (validatePassword(password) === false) {
                            return null;
                        }
                        if ((password === retypePassword) && validatePassword(password) === true) {
                            const userExists = await User.findOne({
                                email: email
                            });
                            if (userExists) {
                                return null;
                            } else {
                                const token = await jwt.sign({
                                    id, email, username, role: 'user'
                                }, secret, { issuer: "BlueTeam" });
                                const verficationToken = await v4();
                                const user = {
                                    id,
                                    provider: "credentials.email",
                                    username: username,
                                    token,
                                    email: email,
                                    password: encryptedPassword,
                                    role: 'user',
                                    verified: false,
                                    blocked: false,
                                    devices: [{
                                        id: await parseInt(credentials.userAgentID, 10),
                                        deviceName: device.model & device.vendor,
                                        deviceType: device.type,
                                        deviceModel: device.model,
                                        deviceOS: os.name,
                                        deviceOSVersion: os.version,
                                        deviceBrowser: browser.name,
                                        deviceBrowserVersion: browser.version,
                                        deviceIP: ip
                                    }],
                                    avatar: 'Default',
                                    previousRole: 'user',
                                    verfication_token: verficationToken
                                };
                                const newUser = new User(user);
                                await newUser.save();
                                await sendWelcomeMessage({
                                    email,
                                    username
                                })
                                setTimeout(async () => {
                                    await sendVerificationMessage({
                                        email: email,
                                        username: username,
                                        code: verficationToken
                                    });
                                }, 500);
                                return {
                                    id,
                                    email,
                                    role: 'user',
                                    provider: "email"
                                };
                            }
                        } else if (password !== retypePassword) {
                            return null;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            }
        }),
        CredentialsProvider({
            id: "login",
            name: "login",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                },
                userAgent: {
                    label: "User Agent",
                    type: "text",
                    placeholder: "User Agent"
                },
                userAgentID: {
                    label: "User Agent ID",
                    type: "number"
                }
            },
            async authorize(credentials, req) {
                try {
                    const decryptor = new NodeRSA(privateKey);
                    const parser = new UAParser();

                    const userAgent = parser.setUA(credentials.userAgent).getResult();
                    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                    const {
                        browser,
                        os,
                        device
                    } = userAgent;
                    const user = await User.findOne({
                        email: credentials.email
                    })
                    const password = await decryptor.decrypt(user.password, "utf8");
                    if (password === credentials.password) {
                        const response = await fetch(`${process.env.GEOJS_URL}/${ip}.json`)
                        const data = await response.json();
                        const newDevice = {
                            id: await parseInt(credentials.userAgentID, 10),
                            deviceName: device.model & device.vendor,
                            deviceType: device.type,
                            deviceModel: device.model,
                            deviceOS: os.name,
                            deviceOSVersion: os.version,
                            deviceBrowser: browser.name,
                            deviceBrowserVersion: browser.version,
                            deviceIP: ip,
                            deviceCountry: data.country,
                            deviceCity: data.city,
                            deviceRegion: data.region
                        };
                        user.devices.push(newDevice);
                        await user.save();

                        await sendNewDeviceLoginAlertMessage({
                            browserName: browser.name,
                            deviceOS: os.name,
                            deviceOSVersion: os.version,
                            username: user.username ? user.username : user.name,
                            email: credentials.email,
                            location: `${(data.country + `, ` + (data.city ? data.city : data.region))}`,
                            ip: ip
                        })
                        return {
                            id: user.id,
                            email: credentials.email,
                            role: 'user',
                            provider: "email"
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    //adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.role = user.role;
            }
            return { ...token, ...user, provider: account.provider };
        },
        async session({ session, token }) {
            session.user.role = token.role;
            session.user.provider = token.provider;
            return session;
        },
        async signIn({ profile, account, user }) {
            console.log(profile, account, user)
            try {
                await db();
                if (account.provider === "google") {
                    const isUserExists = await Google_User.findOne({
                        id: account.providerAccountId,
                        email: profile.email
                    });
                    if (isUserExists) {
                        await Google_User.findOneAndUpdate({
                            id: account.providerAccountI,
                            email: profile.email
                        }, {
                            id: account.providerAccountId,
                            email: profile.email,
                            blocked: isUserExists.blocked,
                            verified: isUserExists.verified,
                            username: profile.name,
                            avatar_url: profile.picture,
                            given_name: profile.given_name,
                            family_name: profile.family_name,
                            locale: profile.locale,
                            provider: account.provider,
                            access_token: account.access_token,
                            expires_at: account.expires_at,
                            token_type: account.token_type,
                            id_token: account.id_token,
                            verfication_token: isUserExists.verfication_token
                        }, { new: true });
                        if (isUserExists.blocked === true) {
                            return false;
                        }
                        return true;
                    } else {
                        const token = await jwt.sign({
                            id: account.providerAccountId, email: profile.email, username: profile.name, role: 'user'
                        }, secret, { issuer: "BlueTeam" });
                        const verficationToken = await v4();
                        let data = new Google_User({
                            id: account.providerAccountId,
                            token: await token,
                            email: profile.email,
                            verified: false,
                            blocked: false,
                            username: profile.name,
                            avatar_url: profile.picture,
                            given_name: profile.given_name,
                            family_name: profile.family_name,
                            locale: profile.locale,
                            provider: account.provider,
                            access_token: account.access_token,
                            expires_at: account.expires_at,
                            token_type: account.token_type,
                            id_token: account.id_token,
                            verfication_token: verficationToken
                        });
                        await data.save()
                            .then(async () => {
                                await sendWelcomeMessage({
                                    email: profile.email,
                                    username: profile.name
                                });
                                setTimeout(async () => {
                                    await sendVerificationMessage({
                                        email: profile.email,
                                        username: profile.name,
                                        code: verficationToken
                                    });
                                }, 1500);
                            })
                            .catch(() => {
                                return null;
                            });
                        return true;
                    }
                } else if (account.provider === "discord") {
                    const isUserExists = await Discord_User.findOne({
                        id: profile.id,
                        email: profile.email
                    });
                    if (isUserExists) {
                        await Discord_User.findOneAndUpdate({
                            id: profile.id
                        }, {
                            id: profile.id,
                            username: profile.username,
                            avatar_url: profile.image_url,
                            blocked: isUserExists.blocked,
                            banner_url: `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png`,
                            banner_color: profile.banner_color ? profile.banner_color : "#FFF",
                            global_name: profile.global_name,
                            mfa_enabled: profile.mfa_enabled,
                            locale: profile.locale,
                            email: profile.email,
                            verified: isUserExists.verified,
                            provider: account.provider,
                            token_type: account.token_type,
                            access_token: account.access_token,
                            expires_at: account.expires_at,
                            refresh_token: account.refresh_token,
                            verfication_token: isUserExists.verfication_token
                        }, { new: true });
                        if (isUserExists.blocked === true) {
                            return false;
                        }
                        return true;
                    }
                    const token = await jwt.sign({
                        id: account.providerAccountId, email: profile.email, username: profile.name, role: 'user'
                    }, secret, { issuer: "BlueTeam" });
                    const verficationToken = await v4();
                    let data = new Discord_User({
                        id: profile.id,
                        username: profile.username,
                        token,
                        avatar_url: profile.image_url,
                        banner_url: `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.png`,
                        banner_color: profile.banner_color ? profile.banner_color : "#FFF",
                        global_name: profile.global_name,
                        mfa_enabled: profile.mfa_enabled,
                        locale: profile.locale,
                        blocked: false,
                        email: profile.email,
                        verified: false,
                        provider: account.provider,
                        token_type: account.token_type,
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        refresh_token: account.refresh_token,
                        verfication_token: verficationToken
                    });
                    await data.save()
                        .then(async () => {
                            await sendWelcomeMessage({
                                email: profile.email,
                                username: profile.username
                            });
                            setTimeout(async () => {
                                await sendVerificationMessage({
                                    email: profile.email,
                                    username: profile.username,
                                    code: verficationToken
                                });
                            }, 1500);
                        })
                        .catch(() => {
                            return null;
                        });
                    return true;
                }
                return true;
            } catch (error) {
                console.error(error)
                return false
            }
        }
    },
    pages: {
        newUser: "/profile",
        signIn: "/login",
        signOut: "/signout",
        error: "/error"
    },
    session: {
        strategy: "jwt"
    }
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };