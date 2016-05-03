# -*- coding: utf-8 -*-

__author__ = 'herrdu'
from baseHandler import baseHandler

class indexHandler(baseHandler):
    def get(self):

        print self.session
        self.render("../views/content.html",misc_site="http://localhost:8083/static",view_path="../views/")

    def post(self):
        self.set_header("Content-Type", "text/plain")
        self.write("You wrote " + self.get_argument("message"))
