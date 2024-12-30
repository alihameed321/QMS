from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet,
    UserProfileViewSet,
    CourseViewSet,
    StudentViewSet,
    ClassViewSet,
    ClassStudentViewSet,
    AttendanceViewSet,
    AvailabilityViewSet
)

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from QAPI.views import (
    DepartmentViewSet,
    UserProfileViewSet,
    CourseViewSet,
)

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'profiles', UserProfileViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'students', StudentViewSet)
router.register(r'classes', ClassViewSet)
router.register(r'classstudents', ClassStudentViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'availabilities', AvailabilityViewSet)

urlpatterns = [
     path('', include(router.urls)),
     # JWT auth endpoints:
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
