from django.urls import path
from analytics.views import (
    bar_data_view,
    summary_data_view,
    recent_submissions_view,
    recent_drafts_view
)

urlpatterns = [
    path('summary/', summary_data_view),
    path('bar-data/', bar_data_view),
    path('recent-submissions/', recent_submissions_view),
    path('recent-drafts/', recent_drafts_view),
]
