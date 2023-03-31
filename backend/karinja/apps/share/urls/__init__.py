from .users import urlpatterns as user_urlpatterns
from .state import urlpatterns as state_urlpatterns
from .city import urlpatterns as city_urlpatterns

urlpatterns = user_urlpatterns + state_urlpatterns + city_urlpatterns
