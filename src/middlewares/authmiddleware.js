import jwt from "jsonwebtoken";

export const authMiddleWare = (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.token;
        console.log(token);
        // Check if the token exists
        if (!token) {
            return res.status(400).json({success: false, message: "No Token Found."})
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message})
    }
}