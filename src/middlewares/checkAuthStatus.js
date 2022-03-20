export const checkAuthenticated = (req, res, next) => {
    if (req.session.passport) {
        return next()
    }
    res.redirect('/login')
}

export const checkNotAuthenticated = (req, res, next) => {
    if (req.session.passport !== undefined) {
        return res.redirect('/')
    }
    next()
}