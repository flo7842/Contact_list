export const checkAuthenticated = (req, res, next) => {
    if (req.user) {
        return next()
    }

    res.redirect('/login')
}

export const checkNotAuthenticated = (req, res, next) => {
    if (req.user) {
        return res.redirect('/')
    }
    next()
}