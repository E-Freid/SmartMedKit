def moving_average(measurements, window_size=5):
    if len(measurements) < window_size:
        return sum(m.weight for m in measurements) / len(measurements) if measurements else 0
    return sum(m.weight for m in measurements[-window_size:]) / window_size


def notify_if_below_moving_average(measurements, current_weight, threshold_ratio=0.75, window_size=5):
    avg_weight = moving_average(measurements, window_size)
    return current_weight < avg_weight * threshold_ratio
