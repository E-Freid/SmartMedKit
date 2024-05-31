def calculate_trend(measurements):
    n = len(measurements)
    if n == 0:
        return 0
    x = range(n)
    y = [m.weight for m in measurements]
    trend = sum(xi * yi for xi, yi in zip(x, y)) / sum(xi ** 2 for xi in x)
    return trend


def notify_if_downward_trend(measurements, threshold=-0.1):
    trend = calculate_trend(measurements)
    return trend < threshold
