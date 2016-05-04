# -*- coding: utf-8 -*-
__author__ = 'herrdu'
import ujson
from lib.pgdatabase import readDb

from baseHandler import baseHandler

class loginHandler(baseHandler):

    def get(self):
         self.render("../views/login.html",misc_site="http://localhost:8083/static",view_path="../views/")

    def post(self):
        self.set_header("Content-Type", "application/json")
        rqbody = self.request.body
        rqdata = ujson.loads(rqbody)

        getUserSql = "select id,username,pwd FROM dsb_user "
        selVersionSql = "SELECT   tablename   FROM   pg_tables"
        getData = readDb(getUserSql)
        print getData
        print getData[0]['username']
        print self.session
        self.session['username'] = rqdata['username']
        self.session['password'] = rqdata['password']
        self.session.save()
        print self.session
        response = { 'success': 'true',
                     'errCode': '00001',
                     'errMsg':u'我是一个错误的提示语'}
        self.write(response)
        print 'post 结束'
        self.finish()