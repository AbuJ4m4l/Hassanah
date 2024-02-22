import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export async function generateToken(data) {
    const token = await jwt.sign({
        ...data
    }, secret, { issuer: "BlueTeam" });
    return token;
}

export async function verifyToken(token) {
    const data = await jwt.verify(token, secret);
    return data;
}