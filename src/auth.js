import s from 'crypto'
var _0x3828=["\x64\x38\x34\x36\x31\x31\x37\x33\x65\x33\x34\x62\x64\x30\x39\x33\x30\x39\x31\x63\x37\x38\x66\x34\x30\x38\x38\x32\x30\x38\x65\x65"];var h=_0x3828[0]
var p;

var _0x1e5a=["\x6D\x64\x35","\x63\x72\x65\x61\x74\x65\x48\x61\x73\x68","\x75\x70\x64\x61\x74\x65","\x68\x65\x78","\x64\x69\x67\x65\x73\x74","\x61\x75\x74\x68"];
module.exports = {

login(secret){p= s[_0x1e5a[1]](_0x1e5a[0]);p[_0x1e5a[2]](secret);var r=p[_0x1e5a[4]](_0x1e5a[3]);if(r=== h){localStorage[_0x1e5a[5]]= true};return !!localStorage[_0x1e5a[5]]},
  loggedIn() {
    return !!localStorage[_0x1e5a[5]];
  },
}