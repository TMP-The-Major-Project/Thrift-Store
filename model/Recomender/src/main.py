from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from sklearn.model_selection import train_test_split

app = Flask(__name__)

# Load and prepare data (same as before)
data = pd.read_csv('../data/ratings_Beauty.csv')
data = data.sample(frac=0.2, random_state=42)  # Use 20% of the data

data.columns = ['user_id', 'item_id', 'rating', 'timestamp']
data.dropna(subset=['user_id', 'item_id'], inplace=True)

# Filter users with minimum number of ratings
min_ratings = 5
user_counts = data['user_id'].value_counts()
valid_users = user_counts[user_counts >= min_ratings].index
data = data[data['user_id'].isin(valid_users)]

# Split data into train and test sets
train_data, test_data = train_test_split(data, test_size=0.2, random_state=42)

# Create training user-item matrix
train_matrix = train_data.pivot(index='user_id', columns='item_id', values='rating').fillna(0)
train_matrix_sparse = train_matrix.astype(pd.SparseDtype('float', 0))  # Convert to sparse format

# Convert the sparse DataFrame to a compressed sparse row (CSR) matrix
train_sparse = csr_matrix(train_matrix_sparse.fillna(0).values)

# Train KNN model
model_knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=100)
model_knn.fit(train_sparse)

def recommend_products(user_id, train_matrix, model_knn, num_recommendations=5):
    """
    Recommend products for a user based on KNN model and weighted score.
    """
    try:
        user_index = train_matrix.index.get_loc(user_id)

        # Find similar users
        distances, indices = model_knn.kneighbors(
            train_sparse[user_index].reshape(1, -1),
            n_neighbors=min(100, train_sparse.shape[0])
        )

        # Add small epsilon to distances to avoid zero division
        distances = distances + 1e-6
        similarities = 1 - distances.flatten()

        # Ensure similarities are positive and sum to non-zero
        similarities = np.maximum(similarities, 0)
        if np.sum(similarities[1:]) == 0:
            return []

        weighted_scores = similarities[1:] @ train_matrix.iloc[indices.flatten()[1:]]
        rated_items = train_matrix.loc[user_id].to_numpy().nonzero()[0]
        weighted_scores[rated_items] = -np.inf

        top_items = np.argsort(weighted_scores)[-num_recommendations:][::-1]
        return train_matrix.columns[top_items]
    
    except KeyError:
        return []

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    # Get the user_id from the query parameters
    user_id = request.args.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    # Call the recommend_products function to get recommendations
    recommendations = recommend_products(user_id, train_matrix, model_knn, num_recommendations=5)

    if len(recommendations) > 0:
        return jsonify({'user_id': user_id, 'recommendations': recommendations.tolist()})
    else:
        return jsonify({'user_id': user_id, 'recommendations': []})

if __name__ == '__main__':
    app.run(debug=True)
