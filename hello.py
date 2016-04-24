import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
         self.render("views/content.html",misc_site="http://localhost:8083/static")

    def post(self):
        self.set_header("Content-Type", "text/plain")
        self.write("You wrote " + self.get_argument("message"))


application = tornado.web.Application([
    (r"/",MainHandler),
])

if __name__ == "__main__":
    application.listen(9001)
    tornado.ioloop.IOLoop.instance().start()