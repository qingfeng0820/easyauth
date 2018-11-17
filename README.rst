easyauth: A simplified authentication lib based on Django
===========================================

.. image:: https://img.shields.io/travis/qingfeng0820/easyauth/master.svg
    :target: https://travis-ci.org/qingfeng0820/easyauth


License
-------

`BSD License <LICENSE.txt>`_


Tutorial
--------


Add easyauth to your app
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add easyauth in {Your app}/settings.py like below:

.. code-block:: python

    INSTALLED_APPS += (
        # Default Django apps:
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        # Rest app
        'rest_framework',
        'django_filters',
        # easyauth app                   #<----  Add easyauth app here
        'easyauth',
    )

    REST_FRAMEWORK = {
        # Use Django's standard `django.contrib.auth` permissions,
        'DEFAULT_PERMISSION_CLASSES': (
            'rest_framework.permissions.IsAuthenticated',
        ),
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'easyauth.authentication.CsrfExemptSessionAuthentication',             #<---- Disable crsf check
            'rest_framework.authentication.BasicAuthentication'
        ),
        'DEFAULT_RENDERER_CLASSES': (
            'rest_framework.renderers.JSONRenderer',
            #  Enable BrowsableAPI
            'rest_framework.renderers.BrowsableAPIRenderer',
        ),
        'DEFAULT_PARSER_CLASSES': (
            'rest_framework.parsers.JSONParser',
            'rest_framework.parsers.FormParser',
            'rest_framework.parsers.MultiPartParser'
        ),
        'DEFAULT_FILTER_BACKENDS': (
            'django_filters.rest_framework.DjangoFilterBackend', 'rest_framework.filters.OrderingFilter'
        ),
        'DEFAULT_PAGINATION_CLASS': 'easyauth.pagination.CustomizedPageNumberPagination',     #<--- Set default pagination
        'PAGE_SIZE': 500
    }


Sepcify your own User Model
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create your own User Model (extends easyauth.models.AbstractUser) in {Your app}/models.py:

.. code-block:: python

    from easyauth.models import AbstractUser


    class User(AbstractUser):
        pass


Change AUTH_USER_MODEL to be your own User Model in {Your app}/settings.py:

.. code-block:: python
        
    AUTH_USER_MODEL = 'test.User'
    

Expose easyauth APIs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Expose user admin APIs and user authentication related APIs in {Your app}/urls.py by below code:

.. code-block:: python

    from easyauth import urls as auth_urls
    from easyauth import admin_urls as user_admin_urls

    urlpatterns = [
        # auth apis including login, password reset
        url(r'^api-auth/', include(auth_urls)),
        # user admin crud apis - only used by administrator
        url(r'^api/', include(user_admin_urls)),
    ]


API List:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- user admin APIs
    - /api/users GET: Get all users
    - /api/users POST: Create an user (With default password)
    - /api/users/[user_id] GET: Get a specific user
    - /api/users/[user_id] POST or PUT: Modify a specific user
    - /api/users/[user_id] DELETE: Delete a specific user
    - /api/users/[user_id]/reset/password POST: Reset to default password for a specific user

- authentication APIs
    - /api-auth/login POST: User login
    - /api-auth/logout POST (or GET if enabled): User logout
    - /api-auth/me POST or PUT: Modify current login user
    - /api-auth/me GET: Get current login user
    - /api-auth/password/change POST: Change the current login user's password
    - /api-auth/register POST: Register User (This API can be disabled by configuration)
