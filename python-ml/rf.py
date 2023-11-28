import numpy as np
import pandas as pd
import seaborn as sns
import scipy
import matplotlib.pyplot as plt
import warnings

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans, AgglomerativeClustering
from sklearn.mixture import GaussianMixture
from sklearn.multiclass import OneVsRestClassifier
from xgboost import XGBClassifier
from sklearn.svm import SVC
from sklearn.metrics import precision_recall_fscore_support, fbeta_score,     confusion_matrix, RocCurveDisplay, PrecisionRecallDisplay
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier, GradientBoostingClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import RandomizedSearchCV

from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import confusion_matrix

warnings.filterwarnings("ignore")
np.random.seed(0)
pd.set_option('display.max_columns', None)
sns.set_theme()

cust_pallete = sns.color_palette(['#006E1A', '#D27000', '#B50E0E'])

path = 'fetal_health.csv'
data = pd.read_csv(path)
data.rename({'percentage_of_time_with_abnormal_long_term_variability':'perc_of_time_with_abnormal_long_term_variability'}, axis=1, inplace=True)
data.drop_duplicates(inplace = True)

from sklearn.preprocessing import LabelEncoder

# Create an instance of LabelEncoder
le = LabelEncoder()
categorical_columns = data.columns
for column in categorical_columns:
    data[column] = le.fit_transform(data[column])


X = data.drop('fetal_health', axis=1).values  # Features
Y = data['fetal_health'].values  # Target variable
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.25, random_state=42)

from sklearn.preprocessing import RobustScaler

scaler = RobustScaler()

X_train_Scaled=scaler.fit_transform(X_train)
X_test_Scaled=scaler.transform(X_test)

param_grid = {
    'bootstrap': False,
    'max_depth': 30,
    'max_features': 'auto',
    'min_samples_leaf': 2,
    'min_samples_split': 2,
    'n_estimators': 100
}
rf_classifier = RandomForestClassifier(**param_grid)

rf_classifier.fit(X_train_Scaled, y_train)
y_pred = rf_classifier.predict(X_test_Scaled)



new_input = [142,0.002,0.002,0.008,0,0,0,74,0.4,36,5,42,117,159,2,1,145,143,145,1,0]
input_data_reshaped = np.array(new_input).reshape(1, -1)
new_data_scaled = scaler.transform(input_data_reshaped)
prediction = rf_classifier.predict(new_data_scaled)
print(prediction)



conf_matrix = confusion_matrix(y_test, y_pred)
num_classes = len(conf_matrix)


precision = np.zeros(num_classes)
recall = np.zeros(num_classes)
f1_score = np.zeros(num_classes)
specificity = np.zeros(num_classes)




for i in range(num_classes):
    tp = conf_matrix[i, i]
    fp = np.sum(conf_matrix[:, i]) - tp
    fn = np.sum(conf_matrix[i, :]) - tp
    tn = np.sum(conf_matrix) - (tp + fp + fn)

    precision[i] = tp / (tp + fp) if (tp + fp) != 0 else 0
    recall[i] = tp / (tp + fn) if (tp + fn) != 0 else 0
    f1_score[i] = 2 * precision[i] * recall[i] / (precision[i] + recall[i]) if (precision[i] + recall[i]) != 0 else 0
    specificity[i] = tn / (tn + fp) if (tn + fp) != 0 else 0

# Print class-specific metrics
for i in range(num_classes):
    print(f"Class {i}: Precision: {precision[i]}, Recall: {recall[i]}, F1-Score: {f1_score[i]}, Specificity: {specificity[i]}")
