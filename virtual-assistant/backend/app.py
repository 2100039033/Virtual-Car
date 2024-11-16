from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = "YAIzaSyCGB5tf_4-apCFkZRCUUN5QxnarmUXyyNQ"  # Replace with your actual API key

@app.route('/navigate', methods=['POST'])
def navigate():
    data = request.get_json()
    destination = data.get('destination')
    origin = "New York, NY"  # Example origin, can be made dynamic

    url = f"https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&key={API_KEY}"
    response = requests.get(url)
    route_data = response.json()

    # Check if API returned directions successfully
    if route_data['status'] == 'OK':
        steps = route_data['routes'][0]['legs'][0]['steps']
        directions = [step['html_instructions'] for step in steps]
        return jsonify({"directions": directions})
    else:
        return jsonify({"error": "Unable to fetch directions"}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
