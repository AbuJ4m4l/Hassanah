import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    id: String,
    token: String,
    provider: String,
    username: String,
    email: String,
    password: String,
    previousRole: String,
    role: String,
    avatar: String,
    verified: Boolean,
    blocked: Boolean,
    mfaEnabled: Boolean,
    mfaSecret: String,
    devices: [{
        id: String,
        deviceName: String,
        deviceType: String,
        deviceModel: String,
        deviceBrowser: String,
        deviceBrowserVersion: String,
        deviceOS: String,
        deviceOSVersion: String,
        deviceIP: String
    }]
}, { timestamps: true });


let User;
if (models.account) {
    User = model('account');
} else {
    User = model('account', userSchema);
}

export default User;