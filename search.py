# app.py
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

TOTAL_PAGES = 1543

def fetch_movies_from_page(page_number):
    url = f'https://vidsrc.xyz/movies/latest/page-{page_number}.json'
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data.get('result', [])
    except requests.RequestException as e:
        print(f"Error fetching page {page_number}: {e}")
        return []

@app.route('/search', methods=['GET'])
def search_movies():
    query = request.args.get('query', '').strip().lower()
    if not query:
        return jsonify([])

    results = []
    for page_number in range(1, TOTAL_PAGES + 1):
        page_data = fetch_movies_from_page(page_number)
        if not page_data:
            break
        filtered_movies = [movie for movie in page_data if query in movie['title'].lower()]
        results.extend(filtered_movies)
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)