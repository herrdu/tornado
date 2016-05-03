# -*- coding: utf-8 -*-

__author__ = 'herrdu'

import tornado.web
from lib import session

class baseHandler(tornado.web.RequestHandler):
    def __init__(self,*argc,**argkw):
        super(baseHandler,self).__init__(*argc,**argkw)
        self.session = session.Session(self.application.session_manager,self)