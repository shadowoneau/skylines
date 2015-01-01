from flask.ext.script import Shell as BaseShell

from flask import current_app
from skylines import model


def make_context():
    return dict(app=current_app, model=model, db=model.db)


class Shell(BaseShell):
    def __init__(self, *args, **kw):
        super(Shell, self).__init__(make_context=make_context, *args, **kw)
