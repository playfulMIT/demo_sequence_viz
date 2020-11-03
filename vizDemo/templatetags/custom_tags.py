from django import template

register = template.Library()


@register.filter(name='total_submissions')
def check_evaluated(submissions, value):
    total = 0

    array = map(int, submissions.split(' '))
    print('total check called')
    for item in array:

        total += int(item)
        print('total: ' + str(total))
    return total
