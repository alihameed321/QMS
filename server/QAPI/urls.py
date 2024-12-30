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
]
