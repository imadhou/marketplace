import numpy as np
#import matplotlib.pyplot as plt
import mysql.connector
import time
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Get data (titles, overviews, genres and production companies) from database
def get_data_from_DB():
    product_name_list = []
    product_category_list = []
    product_description_list = []
    cnx = mysql.connector.connect(user='root', database='blockchain')
    cursor = cnx.cursor()
    
   
    query = ("SELECT product_name, product_category, product_description FROM product")
    cursor.execute(query)
    
    for (name, category, description) in cursor :
        product_name_list.append(format(name))
        product_category_list.append(format(category))
        product_description_list.append(format(description))

    cursor.close()
    cnx.close()
    return product_name_list, product_category_list, product_description_list

# Create the Item-Item matrix
def createItemItemMatrix(length, names_output_file, matrix_output_file):
    product_name_list, product_category_list, product_description_list = get_data_from_DB()
    
    criteria = []
    criteria.append(product_name_list[:length])
    criteria.append(product_category_list[:length])
    criteria.append(product_description_list[:length])

    cosine_sim = np.zeros((length,length))
    
    for k in range(len(criteria)) :

        tfidf_vectorizer = TfidfVectorizer()
        tfidf_matrix = tfidf_vectorizer.fit_transform(criteria[k])
        cosine_sim += linear_kernel(tfidf_matrix, tfidf_matrix)
 
    cosine_sim /= len(criteria)

    np.save(names_output_file, product_name_list[:length])
    np.save(matrix_output_file, cosine_sim)

# Get recommendation's execution time graphics
# def exec_time_graph():
#     exec_time_matrix_creation = []
#     for j in range(5):
#         length = (j+1)*5000
#         print("--- Exec Time Step %s ---" % (j+1))
        
#         print("Matrix calculation ...")
#         start_time = time.time()
#         createItemItemMatrix(length, "titles" + str(j) + ".npy","matrix" + str(j) + ".npy")
#         exec_time = time.time() - start_time
#         exec_time_matrix_creation.append(exec_time)
#         print("Done")
        
#     x = [5000,10000,15000,20000,25000]        
#     plt.plot(x,exec_time_matrix_creation)
#     plt.xlabel('Amount of movie')
#     plt.ylabel('Execution Time (seconds)')
#     plt.title("Evolution of the matrix's calculation time compared to the amount of movie")
#     plt.show()


titles_output_file = "names.npy"
matrix_output_file = "matrix.npy"
    

createItemItemMatrix(1000, titles_output_file, matrix_output_file)