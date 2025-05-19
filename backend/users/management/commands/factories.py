import random
import factory
from faker import Faker
from datetime import date
from django.utils import timezone
from datetime import datetime, timedelta

from forms.models import (
    Student, Address, Submission, Preferences, HealthData,
    PersonalityTraits, SocioEconomicStatus, FamilyData, Support, StudentSupport, PresentScholasticStatus
)
from users.models import CustomUser, Role
from forms.models import (
    CollegeEnum, YearLevelEnum, DegreeProgramEnum, SemesterEnum,
    PhilippineRegionEnum, SupportChoices
)

fake = Faker()

# Constrain birthdate: between 2000 and 2006
def constrained_birthdate():
    return fake.date_of_birth(minimum_age=18, maximum_age=24)

# Constrain student number: "20YY-#####", with 20YY from 2018 to 2024
def constrained_student_number():
    year = random.randint(2018, 2024)
    unique_digits = fake.unique.numerify(text="#####")
    return f"{year}-{unique_digits}"

class AddressFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Address

    address_line_1 = factory.Faker("street_address")
    address_line_2 = factory.Faker("secondary_address")
    barangay = factory.Faker("city_suffix")
    city_municipality = factory.Faker("city")
    province = factory.Faker("state")
    region = factory.Iterator(PhilippineRegionEnum.values)
    zip_code = factory.Faker("postcode")

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser

    email = factory.LazyAttribute(lambda x: fake.email())
    password = factory.PostGenerationMethodCall('set_password', 'testpass123')
    role = Role.STUDENT

class StudentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Student

    student_number = factory.LazyAttribute(
        lambda _: f"{random.randint(2018, 2024)}-{fake.unique.numerify(text='#####')}"
    )
    user = factory.SubFactory(UserFactory)
    college = factory.Iterator(CollegeEnum.values)
    current_year_level = factory.Iterator(YearLevelEnum.values)
    degree_program = factory.Iterator(DegreeProgramEnum.values)
    date_initial_entry_sem = factory.Iterator(SemesterEnum.values)
    last_name = factory.Faker("last_name")
    first_name = factory.Faker("first_name")
    middle_name = factory.Faker("first_name")
    nickname = factory.Faker("first_name")
    sex = factory.Iterator(["Male", "Female"])
    religion = "Catholic"
    birth_rank = factory.LazyAttribute(lambda _: random.randint(1, 5))
    birthdate = factory.LazyFunction(lambda: fake.date_of_birth(minimum_age=18, maximum_age=24))
    birthplace = factory.Faker("city")
    contact_number = factory.LazyAttribute(lambda _: fake.msisdn()[0:11])
    landline_number = None
    permanent_address = factory.SubFactory(AddressFactory)
    address_while_in_up = factory.SubFactory(AddressFactory)

    @factory.lazy_attribute
    def date_initial_entry(self):
        year_str = str(self.student_number).split("-")[0]
        try:
            year = int(year_str)
            return f"{year}-{year + 1}"
        except ValueError:
            return "2023-2024"  # fallback default

class SubmissionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Submission

    student = factory.SubFactory(StudentFactory)
    form_type = "Basic Information Sheet"
    status = factory.Iterator(["draft", "submitted"])

    @factory.lazy_attribute
    def created_at(self):
        year_str = str(self.student.student_number).split("-")[0]
        year = int(year_str)

        naive_dt = datetime(
            year, random.randint(1, 12), random.randint(1, 28),
            random.randint(8, 17), random.randint(0, 59)
        )
        return timezone.make_aware(naive_dt)

    @factory.lazy_attribute
    def saved_on(self):
        saved = self.created_at + timedelta(days=random.randint(1, 10))
        return timezone.make_aware(saved) if timezone.is_naive(saved) else saved

    @factory.lazy_attribute
    def submitted_on(self):
        if self.status == "submitted":
            submitted = self.saved_on + timedelta(days=random.randint(1, 10))
            return timezone.make_aware(submitted) if timezone.is_naive(submitted) else submitted
        return None

    updated_at = factory.LazyFunction(timezone.now)


class PreferencesFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Preferences

    student_number = None
    submission = None
    influence = factory.Faker("sentence", nb_words=6)
    reason_for_enrolling = factory.Faker("paragraph", nb_sentences=2)
    transfer_plans = factory.Faker("boolean")
    transfer_reason = factory.Maybe('transfer_plans', factory.Faker('sentence'), None)
    shift_plans = factory.Faker("boolean")
    planned_shift_degree = factory.Maybe('shift_plans', factory.Faker('word'), None)
    reason_for_shifting = factory.Maybe('shift_plans', factory.Faker('sentence'), None)

class SupportFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Support

    code = factory.Iterator(SupportChoices.values)

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        instance, _ = model_class.objects.get_or_create(**kwargs)
        return instance

class StudentSupportFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = StudentSupport

    student_number = None
    submission = None

    @factory.post_generation
    def support(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for support in extracted:
                self.support.add(support)
        else:
            support = SupportFactory.create()
            self.support.add(support)

    other_notes = factory.Faker("sentence")
    other_scholarship = factory.Faker("sentence")
    combination_notes = factory.Faker("sentence")

class SocioEconomicStatusFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = SocioEconomicStatus

    student_number = None
    submission = None
    has_scholarship = factory.Faker("boolean")
    scholarships = factory.Maybe('has_scholarship', factory.Faker('word'), None)
    scholarship_privileges = factory.Maybe('has_scholarship', factory.Faker('sentence'), None)
    monthly_allowance = factory.Faker("pydecimal", left_digits=4, right_digits=2, positive=True)
    spending_habit = factory.Faker("sentence")

class PresentScholasticStatusFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PresentScholasticStatus

    student = None
    submission = None
    intended_course = factory.Iterator(DegreeProgramEnum.values)
    first_choice_course = factory.Iterator(DegreeProgramEnum.values)
    admitted_course = factory.Iterator(DegreeProgramEnum.values)

    @factory.lazy_attribute
    def next_plan(self):
        if self.first_choice_course != self.admitted_course:
            return fake.sentence()
        return ""
