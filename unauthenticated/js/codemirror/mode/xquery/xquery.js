(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("xquery",function(){var g=function(){function K(A){return{type:A,style:"keyword"}}var D=K("keyword a"),y=K("keyword b"),v=K("keyword c"),z=K("operator"),J={type:"atom",style:"atom"},u={type:"punctuation",style:null},L={type:"axis_specifier",style:"qualifier"};var x={"if":D,"switch":D,"while":D,"for":D,"else":y,then:y,"try":y,"finally":y,"catch":y,element:v,attribute:v,let:v,"implements":v,"import":v,module:v,namespace:v,"return":v,"super":v,"this":v,"throws":v,where:v,"private":v,",":u,"null":J,"fn:false()":J,"fn:true()":J};var F=["after","ancestor","ancestor-or-self","and","as","ascending","assert","attribute","before","by","case","cast","child","comment","declare","default","define","descendant","descendant-or-self","descending","document","document-node","element","else","eq","every","except","external","following","following-sibling","follows","for","function","if","import","in","instance","intersect","item","let","module","namespace","node","node","of","only","or","order","parent","precedes","preceding","preceding-sibling","processing-instruction","ref","return","returns","satisfies","schema","schema-element","self","some","sortby","stable","text","then","to","treat","typeswitch","union","variable","version","where","xquery","empty-sequence"];for(var H=0,E=F.length;H<E;H++){x[F[H]]=K(F[H])}var I=["xs:string","xs:float","xs:decimal","xs:double","xs:integer","xs:boolean","xs:date","xs:dateTime","xs:time","xs:duration","xs:dayTimeDuration","xs:time","xs:yearMonthDuration","numeric","xs:hexBinary","xs:base64Binary","xs:anyURI","xs:QName","xs:byte","xs:boolean","xs:anyURI","xf:yearMonthDuration"];for(var H=0,E=I.length;H<E;H++){x[I[H]]=J}var G=["eq","ne","lt","le","gt","ge",":=","=",">",">=","<","<=",".","|","?","and","or","div","idiv","mod","*","/","+","-"];for(var H=0,E=G.length;H<E;H++){x[G[H]]=z}var w=["self::","attribute::","child::","descendant::","descendant-or-self::","parent::","ancestor::","ancestor-or-self::","following::","preceding::","following-sibling::","preceding-sibling::"];for(var H=0,E=w.length;H<E;H++){x[w[H]]=L}return x}();function l(w,v,u){v.tokenize=u;return u(w,v)}function t(B,w){var u=B.next(),D=false,E=n(B);if(u=="<"){if(B.match("!--",true)){return l(B,w,b)}if(B.match("![CDATA",false)){w.tokenize=f;return"tag"}if(B.match("?",false)){return l(B,w,d)}var x=B.eat("/");B.eatSpace();var y="",A;while((A=B.eat(/[^\s\u00a0=<>\"\'\/?]/))){y+=A}return l(B,w,q(y,x))}else{if(u=="{"){p(w,{type:"codeblock"});return null}else{if(u=="}"){h(w);return null}else{if(c(w)){if(u==">"){return"tag"}else{if(u=="/"&&B.eat(">")){h(w);return"tag"}else{return"variable"}}}else{if(/\d/.test(u)){B.match(/^\d*(?:\.\d*)?(?:E[+\-]?\d+)?/);return"atom"}else{if(u==="("&&B.eat(":")){p(w,{type:"comment"});return l(B,w,k)}else{if(!E&&(u==='"'||u==="'")){return l(B,w,e(u))}else{if(u==="$"){return l(B,w,m)}else{if(u===":"&&B.eat("=")){return"keyword"}else{if(u==="("){p(w,{type:"paren"});return null}else{if(u===")"){h(w);return null}else{if(u==="["){p(w,{type:"bracket"});return null}else{if(u==="]"){h(w);return null}else{var C=g.propertyIsEnumerable(u)&&g[u];if(E&&u==='"'){while(B.next()!=='"'){}}if(E&&u==="'"){while(B.next()!=="'"){}}if(!C){B.eatWhile(/[\w\$_-]/)}var z=B.eat(":");if(!B.eat(":")&&z){B.eatWhile(/[\w\$_-]/)}if(B.match(/^[ \t]*\(/,false)){D=true}var v=B.current();C=g.propertyIsEnumerable(v)&&g[v];if(D&&!C){C={type:"function_call",style:"variable def"}}if(s(w)){h(w);return"variable"}if(v=="element"||v=="attribute"||C.type=="axis_specifier"){p(w,{type:"xmlconstructor"})}return C?C.style:"variable"}}}}}}}}}}}}}}function k(z,x){var v=false,u=false,y=0,w;while(w=z.next()){if(w==")"&&v){if(y>0){y--}else{h(x);break}}else{if(w==":"&&u){y++}}v=(w==":");u=(w=="(")}return"comment"}function e(u,v){return function(y,x){var w;if(j(x)&&y.current()==u){h(x);if(v){x.tokenize=v}return"string"}p(x,{type:"string",name:u,tokenize:e(u,v)});if(y.match("{",false)&&i(x)){x.tokenize=t;return"string"}while(w=y.next()){if(w==u){h(x);if(v){x.tokenize=v}break}else{if(y.match("{",false)&&i(x)){x.tokenize=t;return"string"}}}return"string"}}function m(w,u){var v=/[\w\$_-]/;if(w.eat('"')){while(w.next()!=='"'){}w.eat(":")}else{w.eatWhile(v);if(!w.match(":=",false)){w.eat(":")}}w.eatWhile(v);u.tokenize=t;return"variable"}function q(u,v){return function(x,w){x.eatSpace();if(v&&x.eat(">")){h(w);w.tokenize=t;return"tag"}if(!x.eat("/")){p(w,{type:"tag",name:u,tokenize:t})}if(!x.eat(">")){w.tokenize=r;return"tag"}else{w.tokenize=t}return"tag"}}function r(w,v){var u=w.next();if(u=="/"&&w.eat(">")){if(i(v)){h(v)}if(c(v)){h(v)}return"tag"}if(u==">"){if(i(v)){h(v)}return"tag"}if(u=="="){return null}if(u=='"'||u=="'"){return l(w,v,e(u,r))}if(!i(v)){p(v,{type:"attribute",tokenize:r})}w.eat(/[a-zA-Z_:]/);w.eatWhile(/[-a-zA-Z0-9_:.]/);w.eatSpace();if(w.match(">",false)||w.match("/",false)){h(v);v.tokenize=t}return"attribute"}function b(w,v){var u;while(u=w.next()){if(u=="-"&&w.match("->",true)){v.tokenize=t;return"comment"}}}function f(w,v){var u;while(u=w.next()){if(u=="]"&&w.match("]",true)){v.tokenize=t;return"comment"}}}function d(w,v){var u;while(u=w.next()){if(u=="?"&&w.match(">",true)){v.tokenize=t;return"comment meta"}}}function c(u){return o(u,"tag")}function i(u){return o(u,"attribute")}function s(u){return o(u,"xmlconstructor")}function j(u){return o(u,"string")}function n(u){if(u.current()==='"'){return u.match(/^[^\"]+\"\:/,false)}else{if(u.current()==="'"){return u.match(/^[^\"]+\'\:/,false)}else{return false}}}function o(v,u){return(v.stack.length&&v.stack[v.stack.length-1].type==u)}function p(u,v){u.stack.push(v)}function h(u){u.stack.pop();var v=u.stack.length&&u.stack[u.stack.length-1].tokenize;u.tokenize=v||t}return{startState:function(){return{tokenize:t,cc:[],stack:[]}},token:function(w,v){if(w.eatSpace()){return null}var u=v.tokenize(w,v);return u},blockCommentStart:"(:",blockCommentEnd:":)"}});a.defineMIME("application/xquery","xquery")});