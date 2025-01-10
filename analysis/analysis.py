import pandas as pd
from scipy.stats import friedmanchisquare, wilcoxon
import json

def Question1():
    with open('analysis\enjoyment_effectiveness.json') as f:
        scores = json.load(f)

    data = {"Effectiveness": {'A': [], 'B': [], 'C': []}, "Enjoyment": {'A': [], 'B': [], 'C': []}}

    for user, types in scores.items():
        for type, values in types.items():
            for key, value in values.items():
                data[type][key].append(value)

    data = pd.DataFrame.from_dict(data)
    print(data)

    # Friedman Test
    stat, p_value = friedmanchisquare(data["Enjoyment"]['A'], data["Enjoyment"]['B'], data["Enjoyment"]['C'])
    print(f"Friedman Test: Statistic={stat}, p-value={p_value}")

    # If p-value < 0.05, perform pairwise Wilcoxon tests (post-hoc analysis)
    if p_value < 0.05:
        print("Post-hoc Wilcoxon tests:")
        print("A vs B:", wilcoxon(data['A'], data['B']))
        print("A vs C:", wilcoxon(data['A'], data['C']))
        print("B vs C:", wilcoxon(data['B'], data['C']))

Question1()
