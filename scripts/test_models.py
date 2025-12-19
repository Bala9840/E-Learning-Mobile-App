import urllib.request
import json
import time

API_KEY = 'AIzaSyC9ZUZhe_U6z5fKqplhYW7upzc_0oFapJY'

# List including user suggestions and known existing models
MODELS = [
    # User suggestions (likely futuristic/non-existent but will test)
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.5-pro',
    
    # Current Experimental
    'gemini-2.0-flash-exp',
    'gemini-2.0-flash',
    
    # Current Stable
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash-001',
    'gemini-1.5-flash-002',
    'gemini-1.5-pro',
    'gemini-1.5-pro-latest',
    
    # Legacy
    'gemini-pro',
    'gemini-1.0-pro'
]

def test_model(model_name):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={API_KEY}"
    headers = {'Content-Type': 'application/json'}
    data = json.dumps({
        "contents": [{
            "parts": [{"text": "Hello, this is a test."}]
        }]
    }).encode('utf-8')

    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    
    print(f"Testing {model_name}...", end=" ", flush=True)
    
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                print(f"SUCCESS! (200)")
                return True
            else:
                print(f"Failed ({response.status})")
                return False
    except urllib.error.HTTPError as e:
        print(f"Error: {e.code} - {e.reason}")
        if e.code == 429:
            print("   -> Rate Limited (Working model but busy)")
            return True # Technically this model *exists* for the user
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

print(f"Starting Gemini Model Sweep...")
print(f"------------------------------")

working_models = []

for model in MODELS:
    if test_model(model):
        working_models.append(model)
    time.sleep(0.5) # Avoid hitting rate limits too hard during scan

print(f"------------------------------")
if working_models:
    print(f"Working Models Found: {working_models}")
else:
    print("No working models found.")
