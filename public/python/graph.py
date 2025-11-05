import pandas as pd
import matplotlib
matplotlib.use('Agg') 

import matplotlib.pyplot as plt
import numpy as np
import json
import sys
import os 

script_dir = os.path.dirname(os.path.abspath(__file__))  
public_dir = os.path.join(script_dir, '../img')
os.makedirs(public_dir, exist_ok=True)  
print("Public directory:", public_dir)
print("Arguments:", sys.argv)

try:
    data = json.loads(sys.argv[1])
    image_name = sys.argv[2] if len(sys.argv) > 2 else 'output.png'
    chart_title = sys.argv[3] if len(sys.argv) > 3 else 'Bar Chart'
    chart_type = sys.argv[4] if len(sys.argv) > 4 else 'bar'

    df = pd.DataFrame(data)

    df['age'] = pd.to_numeric(df['age'], errors='coerce')

    ax = df.plot(x='nome', y='age', kind= chart_type, legend=False)
    ax.set_title(chart_title)
    plt.tight_layout()

    output_path = os.path.join(public_dir, image_name)
    plt.savefig(output_path)
    print("Saving to:", output_path)
    print("Plot saved as", image_name)
    print("Original DataFrame:")
    print(df)
except Exception as e:
    print("Error:", e)