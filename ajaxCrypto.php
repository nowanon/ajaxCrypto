<?php

  /*
    @author: ihaci 
    ajaxCrypto 1.0
  */

  class ajaxCrypto {

    public $post = Array();
    public $get = Array();

    private function uniord($u){
      if(!$u){
        return;
      }
      $k = mb_convert_encoding($u, 'UCS-4LE', "utf-8");
      $k1 = ord(substr($k, 0, 1));
      $k2 = ord(substr($k, 1, 1));
      return $k2 * 256 + $k1;
    }

    private function unichr($i) {
      return iconv('UCS-4LE', "utf-8", pack('V', $i));
    }

    private function mbStringToArray ($string) {
      if(!$string){
        return;
      }
      $strlen = mb_strlen($string);
      while ($strlen) {
        $array[] = $this->uniord(mb_substr($string,0,1, "utf-8"));
        $string = mb_substr($string,1,$strlen, "utf-8");
        $strlen = mb_strlen($string);
      }
      return $array; 
    }

    private function decode($str, $sifre){
      $str = $this->mbStringToArray($str);
      $r = "";
      $b = 0;
      for($x = 0; $x < count($str); $x++){
        $r .= $this->unichr($str[$x] - $sifre[$b]);
        $b++;
        if(!isset($sifre[$b])){
          $b = 0;
        }
      }
      return $r;
    }

    function __construct(){
      if(count($_POST) >= 2 && array_key_exists("ajaxCrypto",$_POST)){
        $sifre = $this->mbStringToArray($_POST["ajaxCrypto"]);
        unset($_POST["ajaxCrypto"]);
        foreach(array_keys($_POST) as $i){
          $this->post[$this->decode($i, $sifre)] = $this->decode($_POST[$i], $sifre);
        }
      }
      if(count($_GET) >= 2 && array_key_exists("ajaxCrypto",$_GET)){
        $sifre = $this->mbStringToArray($_GET["ajaxCrypto"]);
        unset($_GET["ajaxCrypto"]);
        foreach(array_keys($_GET) as $i){
          $this->get[$this->decode($i, $sifre)] = $this->decode($_GET[$i], $sifre);
        }
      }
    }

  }

  $ajaxCrypto = new ajaxCrypto();


?>