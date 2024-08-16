import requests

url = "https://vidsrc.xyz/movies/latest/page-1.json"
response = requests.get(url)

if response.status_code == 200:
    movies = response.json()
    print(movies)  # Print the list of movies
else:
    print("Error:", response.status_code)