# ajaxCrypto
## Encode Ajax Request Data &amp; Decode PHP post-get


JavaScript Request Encode Data
```
<script src="ajaxCrypto.js"></script>
ajaxCrypto("post-or-get", "test.php", {isim:"ihaci",soyisim:"berkpw"}, setHeader_func_or_null, success_func, error_func);
```

Php Decode Request Data
```
require_once("ajaxCrypto.php");
if($ajaxCrypto->post){
  echo var_dump($ajaxCrypto->post);
}
if($ajaxCrypto->get){
  echo var_dump($ajaxCrypto->get);
}
```

<img src="https://raw.githubusercontent.com/nowanon/ajaxCrypto/master/example.png" />
