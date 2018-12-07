import json

from django.utils import translation
import conf


class SwitchLanguageMiddleware(object):

    def process_request(self, request):
        lang = request.GET.get(conf.get_conf(conf.LANG_PARAM), '')

        if not lang:
            lang = request.META.get("HTTP_%s" % conf.get_conf(conf.LANG_PARAM).upper(), '')

        if not lang:
            print(request.COOKIES.get(conf.get_conf(conf.LANG_PARAM), ''))
            print(json.dumps(request.COOKIES))
            lang = request.COOKIES.get(conf.get_conf(conf.LANG_PARAM), '')

        if lang:
            translation.activate(lang)
            request.LANGUAGE_CODE = translation.get_language()

    def process_response(self, request, response):
            request.session['django_language'] = translation.get_language()
            if 'Content-Language' not in response:
                response['Content-Language'] = translation.get_language()
            translation.deactivate()

            return response