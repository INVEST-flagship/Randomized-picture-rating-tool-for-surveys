from uuid import uuid4

import string
import random


def empty_dictionary():
    return dict()

def json_attributes_template():
    attributes = {}
    return attributes

def create_unique_uuid():
    """generates 36 character long uuid"""
    return str(uuid4())

def create_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

