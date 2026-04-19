(function() {
  var origFetch = window.fetch;
  window.fetch = function() {
    var args = Array.prototype.slice.call(arguments);
    var input = args[0];
    var url = typeof input === 'string' ? input : (input && input.url) ? input.url : '';
    if (url.indexOf('contacts/webhook') !== -1 && url.indexOf('search=') !== -1) {
      var match = url.match(/search=(\d+)/);
      if (match) {
        var num = match[1].replace(/^33/, '0');
        setTimeout(function() {
          var old = document.getElementById('lmsbanner');
          if (old) { old.parentNode.removeChild(old); }
          var d = document.createElement('div');
          d.id = 'lmsbanner';
          d.setAttribute('style', 'position:fixed;top:10px;left:50%;margin-left:-200px;width:400px;background:#1B2D4F;color:white;padding:16px 24px;border-radius:12px;font-size:15px;font-weight:600;z-index:999999;text-align:center;cursor:pointer;');
          d.innerHTML = 'Appel : ' + num + '<br><span style="font-size:13px;text-decoration:underline;font-weight:400;">Cliquer pour ouvrir Interfast</span>';
          d.onclick = function() {
            window.open('https://app.inter-fast.fr/dashboard/clients?search=' + num, '_blank');
            d.parentNode.removeChild(d);
          };
          document.body.appendChild(d);
          setTimeout(function() { if (d.parentNode) { d.parentNode.removeChild(d); } }, 30000);
        }, 300);
      }
    }
    return origFetch.apply(this, args);
  };
})();
