import csv
from django.db import models


def processEvents(file):
    with open(file, newline='') as csvfile:
        filereader = csv.reader(csvfile, delimiter=';')
        for row in filereader:
            print(row['data'])
