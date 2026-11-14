import re

def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'

    if not isinstance(email, str):
        return False
    
    return re.match(pattern, email.strip()) 


def is_valid_password(password):
    # Verifica se a senha tem pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula e um número
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$'
    return re.match(pattern, password)