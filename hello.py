# -*- coding: utf-8 -*-
import os
import sys
import session

from tornado.ioloop import IOLoop

import tornado.web
from tornado.options import define,options
from session import *
reload(sys)
#sys.setdefaultencoding('utf-8')

from tornado.web import HTTPError
from handler.baseHandler import baseHandler



class MainHandler(baseHandler):
    def get(self):
        print "*****************"
        print self.session
        self.render("views/content.html",misc_site="http://localhost:8083/static")

    def post(self):
        self.set_header("Content-Type", "text/plain")
        self.write("You wrote " + self.get_argument("message"))

class LoginHandler(baseHandler):
    def get(self):
         self.render("views/login.html",misc_site="http://localhost:8083/static")

    def post(self):
        self.set_header("Content-Type", "application/json")
        l = []
        username= 'admin'
        password = 'password'
        print self.session
        self.session['username'] = username
        self.session['password'] = password
        self.session.save()
        print self.session
        response = { 'success': 'true',
                     'errCode': '00001',
                     'errMsg':u'我是一个错误的提示语'}
        self.write(response)
        print 'post 结束'
        self.finish()


class Application(tornado.web.Application):
    def __init__(self):
        settings = dict(cookie_secret="e446976943b4e8442f099fed1f3fea28462d5832f483a0ed9a3d5d3859f==78d",
            session_secret = "3cdcb1f00803b6e78ab50b466a40b9977db396840c28307f428b25e2277f1bcc",
            session_timeout = 60000,
            store_options ={
                'redis_host':'localhost',
                'redis_port':6379,
                'redis_pass':''
            },
        )
        handlers = [
            (r"/",MainHandler),
            (r"/index",MainHandler),
            (r"/login",LoginHandler),
        ]
        tornado.web.Application.__init__(self,handlers,**settings)
        self.session_manager = session.SessionManager(settings["session_secret"],settings["store_options"],settings["session_timeout"])


define('port',default=9000,group="application")

if __name__ == "__main__":
    application = Application()
    print "Application starts on port:",options.port
    application.listen(options.port)

    tornado.ioloop.IOLoop.instance().start()