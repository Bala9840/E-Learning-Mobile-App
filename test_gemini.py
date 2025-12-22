import requests
import json

API_KEY = 'AIzaSyB7LoHWyfevhQalfe-nlrZgm_xPoSwL_KY'
URL = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}'

headers = {
    'Content-Type': 'application/json'
}

data = {
    "contents": [{
        "parts": [{
            "text": "Hello, explain how AI works in one sentence."
        }]
    }]
}

print(f"Testing Gemini API with key: {API_KEY[:5]}...{API_KEY[-5:]}")
print(f"URL: {URL}")

try:
    response = requests.post(URL, headers=headers, json=data)
    
    print(f"Status Code: {response.status_code}")
    print("Response Body:")
    try:
        print(json.dumps(response.json(), indent=2))
    except:
        print(response.text)

except Exception as e:
    print(f"An error occurred: {e}")
