from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Availability, Department, UserProfile, Course, Student, Class, ClassStudent, Attendance
from .serializers import (
    AvailabilitySerializer,
    DepartmentSerializer,
    UserProfileSerializer,
    CourseSerializer,
    StudentSerializer,
    ClassSerializer,
    ClassStudentSerializer,
    AttendanceSerializer,
)

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

class ClassStudentViewSet(viewsets.ModelViewSet):
    queryset = ClassStudent.objects.all()
    serializer_class = ClassStudentSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer

    @action(detail=False, methods=['put'], url_path='student/(?P<student_id>[^/.]+)')
    def update_student_availabilities(self, request, student_id=None):
        student = Student.objects.get(pk=student_id)
        availabilities = request.data.get('availabilities', [])
        
        # Delete existing availabilities for this student
        Availability.objects.filter(student=student).delete()
        
        # Create new availabilities
        created_availabilities = []
        for avail in availabilities:
            availability = Availability.objects.create(
                student=student,
                day_of_week=avail['day_of_week'],
                is_available=avail['is_available']
            )
            created_availabilities.append(availability)
        
        serializer = self.get_serializer(created_availabilities, many=True)
        return Response(serializer.data)