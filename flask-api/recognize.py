#recognize characters
import base64
import numpy as np
import cv2
import pickle
from sklearn import datasets, model_selection, svm, metrics
from sklearn.datasets import fetch_openml

def Base64ToNdarry(img_base64):
  img_data = base64.b64decode(img_base64)
  img_np = np.fromstring(img_data, np.uint8)
  src = cv2.imdecode(img_np, cv2.IMREAD_ANYCOLOR)
  src = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
  src = cv2.resize(src, (28, 28))
  return src

def trimuri(datauri):
  return datauri.split(',')[-1]

def get_predict(datauri):
  try:
    with open('openml/model.pickle','rb') as f:
      model = pickle.load(f)
  except:
    return _predict(datauri)

  target = Base64ToNdarry(trimuri(datauri))/255
  return model.predict([target.flatten()])

def _predict(datauri):
  mnist_X, mnist_y = fetch_openml('mnist_784', version=1, data_home=".", return_X_y=True)

  train_size = 25000
  test_size = 2000

  mnist_data = mnist_X/255
  mnist_label = mnist_y

  data_train, data_test, label_train, label_test = model_selection.train_test_split(
    mnist_data,
    mnist_label,
    test_size=test_size,
    train_size=train_size
    )

  clf = svm.LinearSVC(max_iter=3000)
  clf.fit(data_train, label_train)

  with open('openml/model.pickle','wb') as f:
    pickle.dump(clf,f)

  target = Base64ToNdarry(trimuri(datauri))/255
  print(target)
  print(data_test[0])
  return clf.predict([target.flatten()])