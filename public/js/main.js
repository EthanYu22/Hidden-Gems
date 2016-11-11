function loadScript(path) {
  var body = document.body;
  var script = document.createElement('script');
  script.src = path;
  body.appendChild(script);
}