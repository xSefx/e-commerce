function sessionChecker(req, res, next) {
  if (!req.session.login) {
    res.redirect('/auth/login');
  }
  next();
}

function hasAdmin(req, res, next) {
  if (req.session.role !== 'Admin') {
    res.redirect('/auth/login');
  }
  next();
}

module.exports = { hasAdmin, sessionChecker };
