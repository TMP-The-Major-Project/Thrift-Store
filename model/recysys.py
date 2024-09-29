import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import f1_score

# Load dataset again (or directly use the DataFrame)
df = pd.read_csv('/mnt/data/shein.csv')

# Step 1: Create User Rating Matrix
def build_user_rating_matrix(df):
    user_ratings = df.pivot_table(index='user_id', columns='item_id', values='rating').fillna(0)
    return user_ratings

user_rating_matrix = build_user_rating_matrix(df)

# Step 2: Create Item Content Matrix (based on text features like product descriptions)
def build_item_content_matrix(df, feature_column):
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df[feature_column])
    return pd.DataFrame(tfidf_matrix.toarray(), index=df['item_id'])

item_content_matrix = build_item_content_matrix(df, 'description')  # Assuming 'description' column exists

# Step 3: Calculate Cosine Similarity for items
def calculate_cosine_similarity(matrix):
    cosine_sim = cosine_similarity(matrix, matrix)
    return pd.DataFrame(cosine_sim, index=matrix.index, columns=matrix.index)

item_similarity_matrix = calculate_cosine_similarity(item_content_matrix)

# Step 4: Recommend Top N items based on item similarity
def recommend_items(user_id, user_rating_matrix, item_similarity_matrix, top_n=5):
    user_ratings = user_rating_matrix.loc[user_id]
    rated_items = user_ratings[user_ratings > 0].index
    scores = item_similarity_matrix[rated_items].sum(axis=1)
    scores = scores.sort_values(ascending=False).drop(rated_items)
    return scores.head(top_n).index

# Example recommendation for user 'u1'
recommended_items = recommend_items('u1', user_rating_matrix, item_similarity_matrix, top_n=5)
print(f"Recommended items for user 'u1': {recommended_items}")

# Step 5: Evaluate Recommender System using F1 Score
def evaluate_recommendation(user_id, user_rating_matrix, recommended_items):
    true_positives = user_rating_matrix.loc[user_id][user_rating_matrix.loc[user_id] >= 4].index
    y_true = [1 if item in true_positives else 0 for item in recommended_items]
    y_pred = [1] * len(recommended_items)
    return f1_score(y_true, y_pred)

# Example of F1 Score for user 'u1'
f1 = evaluate_recommendation('u1', user_rating_matrix, recommended_items)
print(f"F1 Score for user 'u1': {f1}")
