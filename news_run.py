from flask import Flask, render_template, request
from news_data import news_lists, comment_lists

app = Flask(__name__, static_url_path='', static_folder='./templates',)

@app.route('/news')
def news1():
    news_index = int(request.args.get('news'))
    comment_index = int(request.args.get('comment'))
    return render_template('news_template.htm', 
                           title=news_lists[news_index].title, 
                           press=news_lists[news_index].press, 
                           press_eng=news_lists[news_index].press_eng, 
                           editor=news_lists[news_index].editor,
                           editor_eng=news_lists[news_index].editor_eng,
                           summary_list=news_lists[news_index].summary_list, 
                           body_list=news_lists[news_index].body_list, 
                           comment_list=comment_lists[comment_index])


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0")
