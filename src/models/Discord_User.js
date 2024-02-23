import { model, Schema, models } from "mongoose"

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar_url: {
        type: String,
        required: false
    },
    banner_url: {
        type: String,
        required: false
    },
    banner_color: {
        type: String,
        required: false
    },
    global_name: {
        type: String,
        required: false
    },
    mfa_enabled: {
        type: Boolean,
        required: false,
        default: false
    },
    locale: {
        type: String,
        required: false,
        default: 'en-GB'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        required: false,
        default: false
    },
    provider: {
        type: String,
        required: false,
        default: 'discord'
    },
    token_type: {
        type: String,
        required: true,
        default: 'Bearer'
    },
    access_token: {
        type: String,
        required: true
    },
    expires_at: {
        type: Number,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    verfication_token: {
        type: String,
        required: false,
        unique: true
    }
}, { timestamps: true });


let User;
if (models.Discord_User) {
    User = model('Discord_User');
} else {
    User = model('Discord_User', userSchema);
}

export default User;
