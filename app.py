from flask import Flask, render_template_string

app = Flask(__name__)

@app.route('/')
def index():
    html_content = '''
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>معلومات الفيلم</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                margin: 0;
                padding: 0;
                color: #000;
            }
            header {
                background-color: #333;
                color: hsl(0, 94%, 46%);
                text-align: center;
                padding: 10px;
            }
            .vk-embed {
                margin: 20px auto;
                text-align: center;
            }
            .vk-embed iframe {
                width: 100%;
                max-width: 480px;
                height: 270px;
                border: none;
            }
            h2 {
                text-align: center;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>فهرس</h1>
        </header>
        <h2>شاهد الآن</h2>
        <div class="vk-embed">
            <iframe src="https://vk.com/video_ext.php?oid=760598098&id=456251010&hash=&hd=2"
                    frameborder="0"
                    allowfullscreen
                    webkitallowfullscreen
                    mozallowfullscreen
                    msallowfullscreen>
            </iframe>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html_content)

if __name__ == '__main__':
    app.run(debug=True)