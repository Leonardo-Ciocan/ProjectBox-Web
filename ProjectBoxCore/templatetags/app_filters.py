from json import dumps
import json
from bson import json_util
from django import template
import django
from ProjectBoxCore.views import boxes

register = template.Library()

@register.filter(name='get')
def get(d, k):
    return d.get(k, None)

@register.filter(name='json')
def json(d):
    return dumps(d, sort_keys=True, indent=4, default=json_util.default)