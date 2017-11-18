import time
import csv

import decimal
import numpy as np
import matplotlib.pyplot as plt
import gmplot

from sklearn.neighbors import kneighbors_graph
from sklearn.cluster import MiniBatchKMeans, KMeans, MeanShift, estimate_bandwidth, SpectralClustering, AffinityPropagation, AgglomerativeClustering, DBSCAN, Birch
from sklearn.metrics.pairwise import pairwise_distances_argmin
from sklearn.mixture import GaussianMixture
from sklearn.datasets.samples_generator import make_blobs
from itertools import cycle, islice


# PLOT SETUP

n_clusters = 4
plot_rows = 3
plot_columns = 3
plot_size = 3
fig = plt.figure(figsize=(plot_columns * plot_size, plot_rows * plot_size))
fig.subplots_adjust(left=0.02, right=0.98, bottom=0.05, top=0.9)
colors = ['#4682B4', '#FF7F50', '#00FFFF', '#DC143C', '#8A2BE2', '#006400' ]


# DATA

X = np.empty(shape=[0,2])
with open('clustering/parsedMapData.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
                lat = float(row['lat'])
                lng = float(row['lng'])
                X = np.append(X, [[lat, lng]], axis=0)


# KMEANS

k_means = KMeans(init='k-means++', n_clusters=n_clusters, n_init=10)
t0 = time.time()
k_means.fit(X)
t_batch = time.time() - t0
k_means_cluster_centers = np.sort(k_means.cluster_centers_, axis=0)
k_means_labels = pairwise_distances_argmin(X, k_means_cluster_centers)


# KMeans
ax = fig.add_subplot(plot_rows, plot_columns, 1)
for k, col in zip(range(n_clusters), colors):
    my_members = k_means_labels == k
    cluster_center = k_means_cluster_centers[k]
    ax.plot(X[my_members, 0], X[my_members, 1], 'w', markerfacecolor=col, marker='.', markersize=10)
    ax.plot(cluster_center[0], cluster_center[1], 'o', markerfacecolor=col, markeredgecolor='k', markersize=10)
#     gmap.scatter(X[my_members, 0], X[my_members, 1], c=col, title='Test Marker')
#     gmap.heatmap(X[my_members, 0], X[my_members, 1], radius=50, opacity=0.4)

ax.set_title('KMeans')
ax.set_xticks(())
ax.set_yticks(())
plt.text(-3.5, 1.8,  'train time: %.2fs\ninertia: %f' % (
    t_batch, k_means.inertia_))
# gmap.draw('mymap.html')


# MB KMEANS

mbk = MiniBatchKMeans(init='k-means++', 
                      n_clusters=n_clusters, 
                      n_init=10, 
                      max_no_improvement=10, 
                      verbose=0)
t0 = time.time()
mbk.fit(X)
t_mini_batch = time.time() - t0

mbk_means_cluster_centers = np.sort(mbk.cluster_centers_, axis=0)
mbk_means_labels = pairwise_distances_argmin(X, mbk_means_cluster_centers)

order = pairwise_distances_argmin(k_means_cluster_centers,
                                  mbk_means_cluster_centers)

ax = fig.add_subplot(plot_rows, plot_columns, 2)
for k, col in zip(range(n_clusters), colors):
        my_members = mbk_means_labels == order[k]
        cluster_center = mbk_means_cluster_centers[order[k]]
        ax.plot(X[my_members, 0], X[my_members, 1], 'w', markerfacecolor=col, marker='.', markersize=10)
        ax.plot(cluster_center[0], cluster_center[1], 'o', markerfacecolor=col, markeredgecolor='k', markersize=10)
ax.set_title('MiniBatchKMeans')
ax.set_xticks(())
ax.set_yticks(())
plt.text(-3.5, 1.8, 'train time: %.2fs\ninertia: %f' %
         (t_mini_batch, mbk.inertia_))





# MEANSHIFT
bandwidth = estimate_bandwidth(X, quantile=0.3)
ms = MeanShift(bandwidth=bandwidth, bin_seeding=True)
ms.fit(X)

ax = fig.add_subplot(plot_rows, plot_columns, 3)
y_pred = ms.labels_.astype(np.int)
npcolors = np.array(list(islice(cycle(colors), int(max(y_pred) + 1))))
ax.scatter(X[:, 0], X[:, 1], s=10, color=npcolors[y_pred])

for k in ms.cluster_centers_:
        ax.plot(k[0], k[1], 'o', markerfacecolor=colors[0], marker='.', markersize=10)


ax.set_title('MeanShift')
ax.set_xticks(())
ax.set_yticks(())


# SPECTRAL
spectralGmap = gmplot.GoogleMapPlotter.from_geocode('Kansas City')

sp = SpectralClustering(n_clusters=n_clusters, eigen_solver='arpack', affinity='nearest_neighbors')
sp.fit(X)

ax = fig.add_subplot(plot_rows, plot_columns, 4)
y_pred = sp.labels_.astype(np.int)
npcolors = np.array(list(islice(cycle(colors), int(max(y_pred) + 1))))
ax.scatter(X[:, 0], X[:, 1], s=10, color=npcolors[y_pred])

ax.set_title('Spectral Clustering')
ax.set_xticks(())
ax.set_yticks(())


for k, col in zip(range(n_clusters), colors):
    my_members = sp.labels_ == k
    spectralGmap.scatter(X[my_members, 0], X[my_members, 1], c=col)
    spectralGmap.heatmap(X[my_members, 0], X[my_members, 1], radius=50, opacity=0.4)

spectralGmap.draw('spectral_clustering.html')




# Affinity
ax = fig.add_subplot(plot_rows, plot_columns, 5)

ap = AffinityPropagation(damping=0.9)
ap.fit(X)

y_pred = ap.labels_.astype(np.int)
npcolors = np.array(list(islice(cycle(colors), int(max(y_pred) + 1))))
ax.scatter(X[:, 0], X[:, 1], s=10, color=npcolors[y_pred])

ax.set_title('Affinity Propagation')
ax.set_xticks(())
ax.set_yticks(())


# Agglo
ax = fig.add_subplot(plot_rows, plot_columns, 6)

# connectivity matrix for structured Ward
connectivity = kneighbors_graph(X, n_neighbors=2, include_self=False)
# make connectivity symmetric
connectivity = 0.5 * (connectivity + connectivity.T)

ag = AgglomerativeClustering(linkage='average', affinity='cityblock', n_clusters=n_clusters, connectivity=connectivity )
ag.fit(X)

y_pred = ag.labels_.astype(np.int)
npcolors = np.array(list(islice(cycle(colors), int(max(y_pred) + 1))))
ax.scatter(X[:, 0], X[:, 1], s=10, color=npcolors[y_pred])

ax.set_title('Agglomerative Clustering')
ax.set_xticks(())
ax.set_yticks(())


# DBSCAN
ax = fig.add_subplot(plot_rows, plot_columns, 7)


db = DBSCAN(eps=0.15)
db.fit(X)
print('db labels')
print(db.labels_)

y_pred = db.labels_.astype(np.int)
print('dbscan y_pred')
print(y_pred)
npcolors = np.array(list(islice(cycle(colors), int(max(y_pred) + 1))))
print(npcolors)
ax.scatter(X[:, 0], X[:, 1], s=10, color=npcolors[y_pred])

ax.set_title('DBSCAN')
ax.set_xticks(())
ax.set_yticks(())


# BIRCH
ax = fig.add_subplot(plot_rows, plot_columns, 8)

br = Birch(n_clusters=n_clusters, threshold=0.1, branching_factor=10)
br.fit(X)
print('br labels')
print(br.labels_)

y_pred = br.labels_.astype(np.int)
print('BIRCH y_pred')
print(y_pred)
npcolors = np.array(list(islice(cycle(colors), int(max(y_pred) + 1))))
print(npcolors)
ax.scatter(X[:, 0], X[:, 1], s=10, color=npcolors[y_pred])

ax.set_title('BIRCH')
ax.set_xticks(())
ax.set_yticks(())


# Gaussian
ax = fig.add_subplot(plot_rows, plot_columns, 9)

gm = GaussianMixture(n_components=n_clusters,covariance_type='full')
gm.fit(X)

y_pred = gm.predict(X)
print('Gaussian y_pred')
print(y_pred)
npcolors = np.array(list(islice(cycle(colors), int(max(y_pred) + 1))))
print(npcolors)
ax.scatter(X[:, 0], X[:, 1], s=10, color=npcolors[y_pred])

ax.set_title('Gaussian Mixture')
ax.set_xticks(())
ax.set_yticks(())



plt.show()
