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

import nodemailer from 'nodemailer'

async function sendVerifyCode(data) {
    try {
        console.log("sending email")
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
            subject: "Verify Your Email Address for Hassanah",
            html: `<!DOCTYPE html>
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
            <div style="margin-left: 7.5%;margin-right: 7.5%;margin-top: 5%;">
            <h1>
                Dear ${data.username},
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
            If you did not sign up for Hassanah, please disregard this email.
            <br>
            <br>
            Best Regards,<br>
            The Hassanah Team
            </p>
            </div>
            </body>
            </html>`
        };


        // Send the email

        transporter.sendMail(mailOptions)
            .then(info => {
                console.log(info);
            })
            .catch(error => {
                console.error('Error sending message:', error)
            });
    } catch (error) {
        console.log(error);
    }
}

const secret = process.env.JWT_SECRET;

async function generateToken(data) {
    const token = await jwt.sign({
        ...data
    }, secret, { issuer: "BlueTeam" });
    return token;
}

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

const handler = NextAuth({
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
                    role: profile.role ? profile.role : "user",
                    locale: profile.locale ?? "ar"
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
                    role: profile.role ? profile.role : "user",
                    locale: profile.locale ?? "ar"
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
                                await sendVerifyCode({
                                    email
                                })
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
                                        deviceName: device.model + device.vendor,
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
                                };
                                const newUser = new User(user);
                                await newUser.save();
                                return user;
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
                    console.log(error);
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
                    const newDevice = {
                        id: await parseInt(credentials.userAgentID, 10),
                        deviceName: device.model + device.vendor,
                        deviceType: device.type,
                        deviceModel: device.model,
                        deviceOS: os.name,
                        deviceOSVersion: os.version,
                        deviceBrowser: browser.name,
                        deviceBrowserVersion: browser.version,
                        deviceIP: ip
                    };
                    const user = await User.findOne({
                        email: credentials.email
                    })
                    const password = await decryptor.decrypt(user.password, "utf8");
                    if (password === credentials.password) {
                        user.devices.push(newDevice);
                        await user.save();
                        return user;
                    } else {
                        throw new Error("Invalid credentials");
                    }
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    //adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user.role = token.role;
            return session;
        },
        async signIn({ profile, account }) {
            try {
                await db();
                if (account.provider === "google") {
                    console.log(profile, account)
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
                        return true;
                    } else {
                        const token = await jwt.sign({
                            id: account.providerAccountId, email: profile.email, username: profile.name, role: 'user'
                        }, secret, { issuer: "BlueTeam" });
                        const verficationToken = await v4();
                        await sendVerifyCode({
                            email: profile.email,
                            username: profile.name,
                            code: verficationToken
                        });
                        let data = new Google_User({
                            id: account.providerAccountId,
                            token: await token,
                            email: profile.email,
                            verified: false,
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
                        await data.save();
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
                        return true;
                    }
                    const token = await jwt.sign({
                        id: account.providerAccountId, email: profile.email, username: profile.name, role: 'user'
                    }, secret, { issuer: "BlueTeam" });
                    const verficationToken = await v4();
                    await sendVerifyCode({
                        email: profile.email,
                        username: profile.username,
                        code: verficationToken
                    });
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
                        email: profile.email,
                        verified: false,
                        provider: account.provider,
                        token_type: account.token_type,
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        refresh_token: account.refresh_token,
                        verfication_token: verficationToken
                    });
                    await data.save();
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
        newUser: "/",
        signIn: "/login",
        signOut: "/signout",
        error: "/error",
        verifyRequest: "/verify"
    },
    session: {
        strategy: "jwt"
    }
});


export { handler as GET, handler as POST };