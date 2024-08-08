from flask import Flask, request, jsonify, render_template
import openai

app = Flask(__name__)

# Configure your OpenAI API key here
openai.api_key = 'your-api-key'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({'reply': 'No message provided'}), 400  # Bad Request
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": user_input}
            ]
        )
        reply = response.choices[0].message['content'].strip()
        return jsonify({'reply': reply})
    except openai.error.RateLimitError as e:
        print(f"Rate limit exceeded: {e}")
        return jsonify({'reply': 'Rate limit exceeded. Please check your usage.'}), 429  # Too Many Requests
    except openai.error.AuthenticationError as e:
        print(f"Authentication error: {e}")
        return jsonify({'reply': 'Authentication error. Please check your API key.'}), 401  # Unauthorized
    except openai.error.APIError as e:
        print(f"API error: {e}")
        return jsonify({'reply': f'API error: {e}'}), 500  # Internal Server Error
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({'reply': 'An unexpected error occurred.'}), 500  # Internal Server Error

if __name__ == '__main__':
    app.run(debug=True)
