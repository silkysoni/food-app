import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        try {
            const decodedUser = jwt.verify(token, 'SECRET_KEY');
            req.user = decodedUser;
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ error: "Invalid token" });
        }
    } else {
        console.log("Token not provided");
        res.status(401).json({ error: "Token not provided" });
    }
}