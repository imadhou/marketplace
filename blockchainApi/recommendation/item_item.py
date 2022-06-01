import numpy as np
#import matplotlib.pyplot as plt
import time
from flask import Flask, request
from flask_restful import Resource, Api
name_list = np.load('recommendation/names.npy').tolist()
item_item_matrix = np.load('recommendation/matrix.npy')
app = Flask(__name__)
api = Api(app)


def get_recommendations(name, cosine_sim, name_list):
    result = []
    # Get the index of the movie that matches the title
    idx = name_list.index(name)
    # Get the pairwsie similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))
    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # Get the scores for 100 most similar movies
    sim_scores = sim_scores[1:101]
    # Get the movie indices
    product_indices = [i[0] for i in sim_scores]
    # Return the top 100 most similar movies
    for i in range(100):
        result.append(product_indices[i])
    return result

# Get the recommendation for an history 
def get_recommendations_history(history, cosine_sim, name_list, timestamp = False):
    votes = dict()
    keys_list = list(history)
    if history != {} :
        for product in history:
            if product in name_list:
                rec = get_recommendations(product, cosine_sim, name_list)
                if product == keys_list[0]:
                    first_product = product
                    first_rec = rec 
                for movie_rec in rec:
                    if movie_rec in votes:
                        votes[movie_rec] += (1-rec.index(movie_rec)/100)
                    else:
                        votes[movie_rec] = (1-rec.index(movie_rec)/100)
    else : first_product, first_rec = ''
    for product in history:
        if product in votes:
            votes.pop(product)
    return sorted(votes, key = votes.get, reverse = True), votes

class RecommandationIndex(Resource):
    def post(self):
        return get_recommendations(request.json['item'], item_item_matrix, name_list)

class RecommandationHistory(Resource):
    def post(self):
        return get_recommendations_history(request.json['items'], item_item_matrix, name_list)

    # ---------------------- SQL Queries to Database ---------------------- #

    # Get a list of all users of a specified source
    # def get_users(source):
    #     users = []
    #     cnx = mysql.connector.connect(user='root', database='recomvee')
    #     cursor = cnx.cursor()
        
    #     query = ("SELECT id_user FROM user WHERE user_type = '" + source + "'")
    #     cursor.execute(query)
        
    #     for user, in cursor :
    #         users.append(format(user))

    #     cursor.close()
    #     cnx.close()
    #     return users
        
    # # Get a list of movies that a user from a specified source has rated
    # def get_user_history(uid,source):
    #     history = []
    #     cnx = mysql.connector.connect(user='root', database='recomvee')
    #     cursor = cnx.cursor()
        
    #     query = ("SELECT movie.title, rating.rating FROM movie, rating WHERE rating.user_id = '" + uid + "' AND rating.source = '" + source + "' AND rating.movie_id = movie.movie_id")
    #     cursor.execute(query)
        
    #     for title in cursor :
    #         if title in name_list:
    #             history.append(title)

    #     cursor.close()
    #     cnx.close()
    #     return history

    # ---------------------- Recommendation algorithm ---------------------- #

    # Get the recommendation for one film in particular

    # ---------------------- Tests and Graphics ---------------------- #

    # Get recommendation's execution time graphics
    # def exec_time_graph(history):
    #     exec_time_loading = []
    #     exec_time_recommendation = []
    #     for j in range(5):
    #         print("--- Exec Time Step %s ---" % (j+1))
            
    #         print("Matrix loading ...")
    #         start_time = time.time()
    #         title_list = np.load("titles" + str(j) +".npy").tolist()
    #         item_item_matrix = np.load("matrix" + str(j) +".npy")
    #         exec_time = time.time() - start_time
    #         exec_time_loading.append(exec_time)
    #         print("Done")
        
    #         print("Recommendation ...")
    #         start_time = time.time()
    #         recommendation = get_recommendations_history(history, item_item_matrix,title_list)
    #         exec_time = time.time() - start_time
    #         exec_time_recommendation.append(exec_time)
    #         print("Done")
            
    #         print("Clearing data") 
    #         del title_list, item_item_matrix, recommendation
            
    #     x = [5000,10000,15000,20000,25000]        
    
    #     plt.plot(x,exec_time_loading)
    #     plt.xlabel('Amount of movie')
    #     plt.ylabel('Execution Time (seconds)')
    #     plt.title("Evolution of the execution time of the matrix's loading compared to the amount of movie")
    #     plt.show()

    #     plt.plot(x,exec_time_recommendation)
    #     plt.xlabel('Amount of movie')
    #     plt.ylabel('Execution Time (seconds)')
    #     plt.title("Evolution of the recommendation's execution time compared to the amount of movie")
    #     plt.show()

    # Get the relevance percentage of the recommendation having hidden half of the user's history
    # def relevance_hidden_history(user_id, source):
    #     history = get_user_history(user_id, source)
    #     relevance = 0
    #     processed_user = 0
    #     if len(history) >= 2 :
    #         processed_user = 1
    #         visible_history = dict(list(history.items())[len(history)//2:])
    #         hidden_history = dict(list(history.items())[:len(history)//2])
        
    #         recommendation, votes, first_movie, first_rec = get_recommendations_history(visible_history, item_item_matrix, name_list)
            
    #         for movie in hidden_history :
    #             if movie in recommendation :
    #                 relevance += 1
    #         relevance = relevance / len(hidden_history) * 100
        
    #     return relevance,processed_user

    # # Get the average relevance percentage for all users
    # def test_relevance(source):
    #     users = get_users(source)
    #     relevance = 0
    #     processed_user = 0
    #     for user in users :
    #         r, pu = relevance_hidden_history(user, source)
    #         relevance += r
    #         processed_user += pu
    #     relevance /= processed_user
        
    #     return relevance

    # ---------------------- Execution Example ---------------------- #

    # user_id = 'Z20181009175130748676741'
    # source = 'allocine'
        
    #recommendation = get_recommendations('Terra by Battat – 4 Dinosaur Toys, Medium – Dinosaurs for Kids & Collectors, Scientifically Accurate & Designed by A Paleo-Artist; Age 3+ (4 Pc)', item_item_matrix, name_list)
    # rec, votes = get_recommendations_history(['Terra by Battat – 4 Dinosaur Toys, Medium – Dinosaurs for Kids & Collectors, Scientifically Accurate & Designed by A Paleo-Artist; Age 3+ (4 Pc)', 'Creative Co-op Green & Grey Plush Dinosaur Rattles (Set of 3 Styles) Toys, Green'], item_item_matrix, name_list)
api.add_resource(RecommandationIndex, '/index')
api.add_resource(RecommandationHistory, '/history')

if __name__ == '__main__':
    app.run(debug=True)