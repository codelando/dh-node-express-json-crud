const controller = {
    index: (req, res) => {
        res.render('index');
    },
    about: (req, res) => {
        res.render('about');
    },
    faq: (req, res) => {
        res.render('faq');
    }
}

module.exports = controller;