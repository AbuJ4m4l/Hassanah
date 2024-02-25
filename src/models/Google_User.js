import { Schema, model, models } from 'mongoose'

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
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        required: false,
        default: false
    },
    username: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        required: false
    },
    given_name: {
        type: String,
        required: false
    },
    family_name: {
        type: String,
        required: false
    },
    locale: {
        type: String,
        required: false,
        default: 'en'
    },
    provider: {
        type: String,
        required: false,
        default: 'google'
    },
    access_token: {
        type: String,
        required: true
    },
    expires_at: {
        type: Number,
        required: true
    },
    token_type: {
        type: String,
        required: true,
        default: 'Bearer'
    },
    id_token: {
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
if (models.Google_User) {
    User = model('Google_User');
} else {
    User = model('Google_User', userSchema);
}

export default User;