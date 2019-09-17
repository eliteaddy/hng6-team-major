function getcube() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var value = { email: username, password: password };

  fetch("/login", {
    method: "POST",
    body: JSON.stringify(value)
  }).then(res => {
    if (res.status === 201) {
      return (location.href = "/dashboard.html");
    } else if (res.status >= 400) {
      console.log("Error " + res.msg);
    }
  });
}
