export const requireGuest = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    next();
};

export const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};