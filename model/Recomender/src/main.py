import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt
from tqdm import tqdm

# Load and prepare data
data = pd.read_csv('../data/ratings_Beauty.csv')
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
train_matrix = train_data.pivot_table(index='user_id', columns='item_id', values='rating', aggfunc='mean').fillna(0)
train_matrix_sparse = train_matrix.astype(pd.SparseDtype('float', 0))  # Convert to sparse format

# Convert the sparse DataFrame to a compressed sparse row (CSR) matrix
train_sparse = csr_matrix(train_matrix_sparse.fillna(0).values)

# Train KNN model
model_knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=100)
model_knn.fit(train_sparse)

def get_user_predictions(user_id, train_matrix, test_data, model_knn):
    """
    Get predictions for a user on test items with improved error handling
    """
    try:
        user_index = train_matrix.index.get_loc(user_id)

        # Get user's test items
        user_test_items = test_data[test_data['user_id'] == user_id]['item_id'].values

        if len(user_test_items) == 0:
            return None, None

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
            return None, None

        y_true = []
        y_scores = []

        for item_id in user_test_items:
            if item_id in train_matrix.columns:
                try:
                    # Get actual rating
                    actual_rating = test_data[(test_data['user_id'] == user_id) &
                                           (test_data['item_id'] == item_id)]['rating'].values[0]
                    y_true.append(1 if actual_rating >= 4 else 0)

                    # Calculate prediction score with error handling
                    item_col = train_matrix.columns.get_loc(item_id)
                    similar_ratings = train_matrix.iloc[indices.flatten()[1:], item_col]

                    # Only use non-zero weights
                    valid_indices = similarities[1:] > 0
                    if np.any(valid_indices):
                        pred_score = np.average(similar_ratings[valid_indices],
                                             weights=similarities[1:][valid_indices])
                        y_scores.append(pred_score)
                    else:
                        # Use mean rating if no valid weights
                        pred_score = similar_ratings.mean()
                        y_scores.append(pred_score)

                except (IndexError, ValueError):
                    continue

        if len(y_true) == 0 or len(y_scores) == 0:
            return None, None

        return np.array(y_true), np.array(y_scores)

    except (KeyError, IndexError):
        return None, None

def plot_roc_curve(y_true_all, y_score_all):
    """
    Plot ROC curve and calculate AUC
    """
    fpr, tpr, _ = roc_curve(y_true_all, y_score_all)
    roc_auc = auc(fpr, tpr)

    plt.figure(figsize=(10, 8))
    plt.plot(fpr, tpr, color='darkorange', lw=2,
             label=f'ROC curve (AUC = {roc_auc:.2f})')
    plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Receiver Operating Characteristic (ROC) Curve')
    plt.legend(loc="lower right")
    plt.grid(True)
    plt.show()

    return roc_auc

# Print initial statistics
print("Data statistics:")
print(f"Total number of ratings: {len(data)}")
print(f"Number of unique users: {data['user_id'].nunique()}")
print(f"Number of unique items: {data['item_id'].nunique()}")

# Collect predictions for evaluation
y_true_all = []
y_score_all = []
processed_users = 0

print("\nCollecting predictions for evaluation...")
# Fix: Convert to numpy array and then slice
unique_users = test_data['user_id'].values
users_to_process = unique_users[:1000]  # Slice the numpy array

for user_id in tqdm(users_to_process, desc="Processing users"):
    y_true, y_scores = get_user_predictions(user_id, train_matrix, test_data, model_knn)
    if y_true is not None and len(y_true) > 0:
        y_true_all.extend(y_true)
        y_score_all.extend(y_scores)
        processed_users += 1

# Convert to numpy arrays
y_true_all = np.array(y_true_all)
y_score_all = np.array(y_score_all)

print(f"\nSuccessfully processed {processed_users} users")
print(f"Total predictions: {len(y_true_all)}")

# Plot ROC curve and calculate AUC
if len(y_true_all) > 0:
    print("\nPlotting ROC curve...")
    roc_auc = plot_roc_curve(y_true_all, y_score_all)
    print(f"\nOverall AUC Score: {roc_auc:.3f}")

    # Print additional metrics
    print("\nEvaluation Summary:")
    print(f"Positive ratings ratio: {np.mean(y_true_all):.2%}")
    print(f"Average prediction score: {np.mean(y_score_all):.3f}")
else:
    print("No predictions were generated for evaluation.")
