# -*- coding: utf-8 -*-
import os
import sys

from tornado.ioloop import IOLoop

import tornado.web
from lib import  session

from handler.loginHandler import loginHandler
from handler.indexHandler import indexHandler

from tornado.options import define,options

reload(sys)

from tornado.web import HTTPError

class testHandler(tornado.web.RequestHandler):
    def get(self):
        username = self.get_argument("username")
        print username

    def post(self):
        username = self.request.body
        print username

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
            (r"/",indexHandler),
            (r"/test",testHandler),
            (r"/index",indexHandler),
            (r"/login",loginHandler),
        ]
        tornado.web.Application.__init__(self,handlers,**settings)
        self.session_manager = session.SessionManager(settings["session_secret"],settings["store_options"],settings["session_timeout"])


define('port',default=9000,group="application")

if __name__ == "__main__":
    application = Application()
    print "Application starts on port:",options.port
    application.listen(options.port)

    tornado.ioloop.IOLoop.instance().start()