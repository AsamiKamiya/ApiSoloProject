///
/// for user
///
document.getElementById("addUser").onclick = function() {
  const userName = document.getElementById("userName").value;
  const data = { name: userName };
  fetch("/api/users/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};

document.getElementById("listUser").onclick = function() {
  fetch("/api/users/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};
///
/// for store
///
document.getElementById("addStore").onclick = function() {
  const storeName = document.getElementById("storeName").value;
  const data = { name: storeName };
  fetch("/api/stores/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};

document.getElementById("listStore").onclick = function() {
  fetch("/api/stores/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};

///
/// for oden
///

document.getElementById("addOden").onclick = function() {
  const data = {
    name: document.getElementById("oName").value,
    kcal: document.getElementById("oKcal").value,
    price: document.getElementById("oPrice").value
  };
  fetch("/api/odens/" + document.getElementById("oStore_id").value, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};

document.getElementById("listOden").onclick = function() {
  fetch("/api/odens/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};
document.getElementById("getOdenByStore").onclick = function() {
  fetch("/api/odens/store/" + document.getElementById("oStore_id").value, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};

///
/// for purchase
///

document.getElementById("addBuy").onclick = function() {
  const data = { count: document.getElementById("count").value };
  fetch(
    "/api/purchases/user/" +
      document.getElementById("uId").value +
      "/odens/" +
      document.getElementById("oId").value,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  )
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};
document.getElementById("listBuy").onclick = function() {
  fetch("/api/purchases/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};
document.getElementById("modify").onclick = function() {
  const data = { count: document.getElementById("count").value };
  fetch("/api/purchases/" + document.getElementById("bId").value, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};
document.getElementById("delete").onclick = function() {
  fetch("/api/purchases/" + document.getElementById("bId").value, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};
document.getElementById("getByUser").onclick = function() {
  fetch("/api/purchases/user/" + document.getElementById("uId").value, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      document.getElementById("response").value = text;
    });
};
