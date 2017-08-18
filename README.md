# ajaxCrypto
Encode Ajax Request Data &amp; Decode PHP post-get

JavaScript Request Encode Data
```
ajaxCrypto("post-or-get", "url.php", {isim:"ihaci",soyisim:"berkpw"}, success_function, error_function);
```

Php Decode Example
```
require_once("ajaxCrypto.php");
if($ajaxCrypto->post){
  echo var_dump($ajaxCrypto->post);
}
if($ajaxCrypto->get){
  echo var_dump($ajaxCrypto->get);
}
```

<img src="" />
