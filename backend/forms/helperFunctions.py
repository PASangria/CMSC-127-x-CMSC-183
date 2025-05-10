from django.core.exceptions import ValidationError

def check_required_fields(instance, fields, status):
    """
    This helper function checks if the fields should be required based on the form's status.
    Arguments:
    - instance: The model instance being validated.
    - fields: A dictionary of fields that need to be checked.
    - status: The form submission status ('draft' or 'submitted').
    """
    if status == 'draft':
        return  # Skip validation for draft forms
    
    # Validation logic for submitted forms
    for field, condition in fields.items():
        value = getattr(instance, field, None)
        if condition == 'required' and not value:
            raise ValidationError({field: f'This field is required when the form is submitted.'})

    return None
