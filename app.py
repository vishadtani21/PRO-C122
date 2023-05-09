from flask import Flask,request,jsonify,render_template
import text_sentiment_prediction
from predict_bot_response import *

app = Flask(__name__)
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict' , methods = ['POST'])
def predict():

    response = ""
    review = request.json.get('customer_review')
    if not review:
        response = {'status' : 'error',
                    'message' : 'Empty Review'}   
    else:
        sentiment , path = text_sentiment_prediction.predict(review)
        response = {'status' : 'success',
                    'message' : 'Got it',
                    'sentiment' : sentiment,
                    'path' : path}
    return jsonify(response)


@app.route('/save' , methods = ['POST'])
def save():
    date = request.json.get('date')
    product = request.json.get('product')
    review = request.json.get('review')
    sentiment = request.json.get('sentiment')

    data_entry = date + "," + product + "," + review + "," + sentiment

    f = open('./static/assets/datafiles/data_entry.csv' , 'a')
    f.write(data_entry + '\n')
    f.close()

    return jsonify({'status' : 'success' , 
                    'message' : 'Data Logged'})


@app.route("/bot-response", methods=["POST"])
def bot():
    input_text = request.json.get("user_bot_input_text")
    bot_res = bot_response(input_text)
    response = {
            "bot_response": bot_res
        }
    return jsonify(response)     
     
if __name__ == '__main__':
    app.run(debug=True)