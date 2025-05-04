from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from forms.models import Student, Address
from forms.serializers import StudentSerializer

@api_view(['POST'])
def create_student_profile(request):
    # Ensure the required data is in the request
    required_fields = ['student_number', 'college', 'current_year_level', 'degree_program', 'last_name', 
                       'first_name', 'sex', 'birth_rank', 'birthdate', 'birthplace', 'contact_number', 
                       'permanent_address', 'address_while_in_up']
    
    # Validate that all required fields are present
    for field in required_fields:
        if field not in request.data:
            return Response({ 'error': f'{field} is required' }, status=status.HTTP_400_BAD_REQUEST)
    
    student_data = request.data
    
    # Extract and process address data
    permanent_address_data = student_data.get('permanent_address')
    address_while_in_up_data = student_data.get('address_while_in_up')

    # Helper function to check if an address already exists or create a new one
    def get_or_create_address(address_data):
        address, created = Address.objects.get_or_create(
            address_line_1=address_data['address_line_1'],
            address_line_2=address_data.get('address_line_2', ''),
            barangay=address_data['barangay'],
            city_municipality=address_data['city_municipality'],
            province=address_data['province'],
            region=address_data['region'],
            zip_code=address_data['zip_code'],
        )
        return address

    # Get or create the permanent and UP addresses
    permanent_address = get_or_create_address(permanent_address_data)
    address_while_in_up = get_or_create_address(address_while_in_up_data)

    # Create the student profile
    student = Student.objects.create(
        student_number=student_data['student_number'],
        college=student_data['college'],
        current_year_level=student_data['current_year_level'],
        degree_program=student_data['degree_program'],
        user=request.user, 
        last_name=student_data['last_name'],
        first_name=student_data['first_name'],
        middle_name=student_data.get('middle_name', ''),
        nickname=student_data.get('nickname', ''),
        sex=student_data['sex'],
        religion=student_data.get('religion', ''),
        birth_rank=student_data['birth_rank'],
        birthdate=student_data['birthdate'],
        birthplace=student_data['birthplace'],
        contact_number=student_data['contact_number'],
        landline_number=student_data.get('landline_number', ''),
        permanent_address=permanent_address,
        address_while_in_up=address_while_in_up,
        is_complete=student_data.get('is_complete', False),
    )

    # Serialize the student profile (to return in the response)
    serializer = StudentSerializer(student)

    # Return the response with the serialized student profile data
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_student_profile(request):
    try:
        # Get the student profile for the authenticated user
        student = Student.objects.get(user=request.user)
        # Serialize the student profile
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({'error': 'Student profile not found'}, status=status.HTTP_404_NOT_FOUND)