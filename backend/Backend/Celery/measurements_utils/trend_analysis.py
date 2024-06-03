def calculate_trend(measurements):
    n = len(measurements)
    if n <= 1:
        return 0

    x = range(n)
    y = [m.weight for m in measurements]

    sum_xi_yi = sum(xi * yi for xi, yi in zip(x, y))
    sum_xi_squared = sum(xi ** 2 for xi in x)

    if sum_xi_squared == 0:
        return 0

    trend = sum_xi_yi / sum_xi_squared
    return trend


def notify_if_downward_trend(measurements, threshold=0.1):
    trend = calculate_trend(measurements)
    return trend < threshold if len(measurements) > 1 else False
