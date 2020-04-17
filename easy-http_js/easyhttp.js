function easyHTTP() {
  this.http = new XMLHttpRequest();
}

// Make an HTTP GET request
easyHTTP.prototype.get = function (url, callback) {
  const self = this;
  this.http.open("GET", url, true);

  this.http.onload = function () {
    if (self.http.status === 200) {
      callback(null, self.http.responseText);
    } else {
      callback("Error: ", +self.http.status);
    }
  };

  this.http.send();
};

// Make an HTTP POST request
easyHTTP.prototype.post = function (url, data, callback) {
  const self = this;

  this.http.open("POST", url, true);

  this.http.setRequestHeader("Content-type", "application.json");

  this.http.onload = function () {
    callback(null, self.http.responseText);
  };

  this.http.send(JSON.stringify(data));
};

// Make an HTTP PUT request
easyHTTP.prototype.put = function (url, data, callback) {
  const self = this;

  this.http.open("PUT", url, true);

  this.http.setRequestHeader("Content-type", "application.json");

  this.http.onload = function () {
    callback(null, self.http.responseText);
  };

  this.http.send(JSON.stringify(data));
};

// Make an HTTP DELETE request
easyHTTP.prototype.delete = function (url, callback) {
  const self = this;

  this.http.open("DELETE", url, true);

  this.http.onload = function () {
    callback(null, self.http.status);
  };

  this.http.send();
};
