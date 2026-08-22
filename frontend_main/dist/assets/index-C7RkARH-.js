var Dy=Object.defineProperty;var Uy=(r,e,i)=>e in r?Dy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[e]=i;var Et=(r,e,i)=>Uy(r,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var Th={exports:{}},Po={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r_;function Ny(){if(r_)return Po;r_=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Po.Fragment=e,Po.jsx=i,Po.jsxs=i,Po}var o_;function Ly(){return o_||(o_=1,Th.exports=Ny()),Th.exports}var A=Ly(),bh={exports:{}},ot={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l_;function Oy(){if(l_)return ot;l_=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),x=Symbol.iterator;function M(P){return P===null||typeof P!="object"?null:(P=x&&P[x]||P["@@iterator"],typeof P=="function"?P:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b=Object.assign,y={};function _(P,re,ye){this.props=P,this.context=re,this.refs=y,this.updater=ye||E}_.prototype.isReactComponent={},_.prototype.setState=function(P,re){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,re,"setState")},_.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function L(){}L.prototype=_.prototype;function N(P,re,ye){this.props=P,this.context=re,this.refs=y,this.updater=ye||E}var D=N.prototype=new L;D.constructor=N,b(D,_.prototype),D.isPureReactComponent=!0;var j=Array.isArray;function H(){}var z={H:null,A:null,T:null,S:null},Y=Object.prototype.hasOwnProperty;function U(P,re,ye){var K=ye.ref;return{$$typeof:r,type:P,key:re,ref:K!==void 0?K:null,props:ye}}function w(P,re){return U(P.type,re,P.props)}function V(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function he(P){var re={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(ye){return re[ye]})}var ne=/\/+/g;function de(P,re){return typeof P=="object"&&P!==null&&P.key!=null?he(""+P.key):re.toString(36)}function pe(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(H,H):(P.status="pending",P.then(function(re){P.status==="pending"&&(P.status="fulfilled",P.value=re)},function(re){P.status==="pending"&&(P.status="rejected",P.reason=re)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function B(P,re,ye,K,me){var Re=typeof P;(Re==="undefined"||Re==="boolean")&&(P=null);var Ee=!1;if(P===null)Ee=!0;else switch(Re){case"bigint":case"string":case"number":Ee=!0;break;case"object":switch(P.$$typeof){case r:case e:Ee=!0;break;case v:return Ee=P._init,B(Ee(P._payload),re,ye,K,me)}}if(Ee)return me=me(P),Ee=K===""?"."+de(P,0):K,j(me)?(ye="",Ee!=null&&(ye=Ee.replace(ne,"$&/")+"/"),B(me,re,ye,"",function(Qe){return Qe})):me!=null&&(V(me)&&(me=w(me,ye+(me.key==null||P&&P.key===me.key?"":(""+me.key).replace(ne,"$&/")+"/")+Ee)),re.push(me)),1;Ee=0;var Oe=K===""?".":K+":";if(j(P))for(var qe=0;qe<P.length;qe++)K=P[qe],Re=Oe+de(K,qe),Ee+=B(K,re,ye,Re,me);else if(qe=M(P),typeof qe=="function")for(P=qe.call(P),qe=0;!(K=P.next()).done;)K=K.value,Re=Oe+de(K,qe++),Ee+=B(K,re,ye,Re,me);else if(Re==="object"){if(typeof P.then=="function")return B(pe(P),re,ye,K,me);throw re=String(P),Error("Objects are not valid as a React child (found: "+(re==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":re)+"). If you meant to render a collection of children, use an array instead.")}return Ee}function $(P,re,ye){if(P==null)return P;var K=[],me=0;return B(P,K,"","",function(Re){return re.call(ye,Re,me++)}),K}function J(P){if(P._status===-1){var re=P._result;re=re(),re.then(function(ye){(P._status===0||P._status===-1)&&(P._status=1,P._result=ye)},function(ye){(P._status===0||P._status===-1)&&(P._status=2,P._result=ye)}),P._status===-1&&(P._status=0,P._result=re)}if(P._status===1)return P._result.default;throw P._result}var Se=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var re=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(re))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},be={map:$,forEach:function(P,re,ye){$(P,function(){re.apply(this,arguments)},ye)},count:function(P){var re=0;return $(P,function(){re++}),re},toArray:function(P){return $(P,function(re){return re})||[]},only:function(P){if(!V(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return ot.Activity=g,ot.Children=be,ot.Component=_,ot.Fragment=i,ot.Profiler=l,ot.PureComponent=N,ot.StrictMode=s,ot.Suspense=p,ot.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=z,ot.__COMPILER_RUNTIME={__proto__:null,c:function(P){return z.H.useMemoCache(P)}},ot.cache=function(P){return function(){return P.apply(null,arguments)}},ot.cacheSignal=function(){return null},ot.cloneElement=function(P,re,ye){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var K=b({},P.props),me=P.key;if(re!=null)for(Re in re.key!==void 0&&(me=""+re.key),re)!Y.call(re,Re)||Re==="key"||Re==="__self"||Re==="__source"||Re==="ref"&&re.ref===void 0||(K[Re]=re[Re]);var Re=arguments.length-2;if(Re===1)K.children=ye;else if(1<Re){for(var Ee=Array(Re),Oe=0;Oe<Re;Oe++)Ee[Oe]=arguments[Oe+2];K.children=Ee}return U(P.type,me,K)},ot.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},ot.createElement=function(P,re,ye){var K,me={},Re=null;if(re!=null)for(K in re.key!==void 0&&(Re=""+re.key),re)Y.call(re,K)&&K!=="key"&&K!=="__self"&&K!=="__source"&&(me[K]=re[K]);var Ee=arguments.length-2;if(Ee===1)me.children=ye;else if(1<Ee){for(var Oe=Array(Ee),qe=0;qe<Ee;qe++)Oe[qe]=arguments[qe+2];me.children=Oe}if(P&&P.defaultProps)for(K in Ee=P.defaultProps,Ee)me[K]===void 0&&(me[K]=Ee[K]);return U(P,Re,me)},ot.createRef=function(){return{current:null}},ot.forwardRef=function(P){return{$$typeof:h,render:P}},ot.isValidElement=V,ot.lazy=function(P){return{$$typeof:v,_payload:{_status:-1,_result:P},_init:J}},ot.memo=function(P,re){return{$$typeof:m,type:P,compare:re===void 0?null:re}},ot.startTransition=function(P){var re=z.T,ye={};z.T=ye;try{var K=P(),me=z.S;me!==null&&me(ye,K),typeof K=="object"&&K!==null&&typeof K.then=="function"&&K.then(H,Se)}catch(Re){Se(Re)}finally{re!==null&&ye.types!==null&&(re.types=ye.types),z.T=re}},ot.unstable_useCacheRefresh=function(){return z.H.useCacheRefresh()},ot.use=function(P){return z.H.use(P)},ot.useActionState=function(P,re,ye){return z.H.useActionState(P,re,ye)},ot.useCallback=function(P,re){return z.H.useCallback(P,re)},ot.useContext=function(P){return z.H.useContext(P)},ot.useDebugValue=function(){},ot.useDeferredValue=function(P,re){return z.H.useDeferredValue(P,re)},ot.useEffect=function(P,re){return z.H.useEffect(P,re)},ot.useEffectEvent=function(P){return z.H.useEffectEvent(P)},ot.useId=function(){return z.H.useId()},ot.useImperativeHandle=function(P,re,ye){return z.H.useImperativeHandle(P,re,ye)},ot.useInsertionEffect=function(P,re){return z.H.useInsertionEffect(P,re)},ot.useLayoutEffect=function(P,re){return z.H.useLayoutEffect(P,re)},ot.useMemo=function(P,re){return z.H.useMemo(P,re)},ot.useOptimistic=function(P,re){return z.H.useOptimistic(P,re)},ot.useReducer=function(P,re,ye){return z.H.useReducer(P,re,ye)},ot.useRef=function(P){return z.H.useRef(P)},ot.useState=function(P){return z.H.useState(P)},ot.useSyncExternalStore=function(P,re,ye){return z.H.useSyncExternalStore(P,re,ye)},ot.useTransition=function(){return z.H.useTransition()},ot.version="19.2.8",ot}var c_;function ap(){return c_||(c_=1,bh.exports=Oy()),bh.exports}var Z=ap(),Ah={exports:{}},zo={},Rh={exports:{}},Ch={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u_;function Py(){return u_||(u_=1,(function(r){function e(B,$){var J=B.length;B.push($);e:for(;0<J;){var Se=J-1>>>1,be=B[Se];if(0<l(be,$))B[Se]=$,B[J]=be,J=Se;else break e}}function i(B){return B.length===0?null:B[0]}function s(B){if(B.length===0)return null;var $=B[0],J=B.pop();if(J!==$){B[0]=J;e:for(var Se=0,be=B.length,P=be>>>1;Se<P;){var re=2*(Se+1)-1,ye=B[re],K=re+1,me=B[K];if(0>l(ye,J))K<be&&0>l(me,ye)?(B[Se]=me,B[K]=J,Se=K):(B[Se]=ye,B[re]=J,Se=re);else if(K<be&&0>l(me,J))B[Se]=me,B[K]=J,Se=K;else break e}}return $}function l(B,$){var J=B.sortIndex-$.sortIndex;return J!==0?J:B.id-$.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var p=[],m=[],v=1,g=null,x=3,M=!1,E=!1,b=!1,y=!1,_=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function D(B){for(var $=i(m);$!==null;){if($.callback===null)s(m);else if($.startTime<=B)s(m),$.sortIndex=$.expirationTime,e(p,$);else break;$=i(m)}}function j(B){if(b=!1,D(B),!E)if(i(p)!==null)E=!0,H||(H=!0,he());else{var $=i(m);$!==null&&pe(j,$.startTime-B)}}var H=!1,z=-1,Y=5,U=-1;function w(){return y?!0:!(r.unstable_now()-U<Y)}function V(){if(y=!1,H){var B=r.unstable_now();U=B;var $=!0;try{e:{E=!1,b&&(b=!1,L(z),z=-1),M=!0;var J=x;try{t:{for(D(B),g=i(p);g!==null&&!(g.expirationTime>B&&w());){var Se=g.callback;if(typeof Se=="function"){g.callback=null,x=g.priorityLevel;var be=Se(g.expirationTime<=B);if(B=r.unstable_now(),typeof be=="function"){g.callback=be,D(B),$=!0;break t}g===i(p)&&s(p),D(B)}else s(p);g=i(p)}if(g!==null)$=!0;else{var P=i(m);P!==null&&pe(j,P.startTime-B),$=!1}}break e}finally{g=null,x=J,M=!1}$=void 0}}finally{$?he():H=!1}}}var he;if(typeof N=="function")he=function(){N(V)};else if(typeof MessageChannel<"u"){var ne=new MessageChannel,de=ne.port2;ne.port1.onmessage=V,he=function(){de.postMessage(null)}}else he=function(){_(V,0)};function pe(B,$){z=_(function(){B(r.unstable_now())},$)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(B){B.callback=null},r.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Y=0<B?Math.floor(1e3/B):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(B){switch(x){case 1:case 2:case 3:var $=3;break;default:$=x}var J=x;x=$;try{return B()}finally{x=J}},r.unstable_requestPaint=function(){y=!0},r.unstable_runWithPriority=function(B,$){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var J=x;x=B;try{return $()}finally{x=J}},r.unstable_scheduleCallback=function(B,$,J){var Se=r.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?Se+J:Se):J=Se,B){case 1:var be=-1;break;case 2:be=250;break;case 5:be=1073741823;break;case 4:be=1e4;break;default:be=5e3}return be=J+be,B={id:v++,callback:$,priorityLevel:B,startTime:J,expirationTime:be,sortIndex:-1},J>Se?(B.sortIndex=J,e(m,B),i(p)===null&&B===i(m)&&(b?(L(z),z=-1):b=!0,pe(j,J-Se))):(B.sortIndex=be,e(p,B),E||M||(E=!0,H||(H=!0,he()))),B},r.unstable_shouldYield=w,r.unstable_wrapCallback=function(B){var $=x;return function(){var J=x;x=$;try{return B.apply(this,arguments)}finally{x=J}}}})(Ch)),Ch}var f_;function zy(){return f_||(f_=1,Rh.exports=Py()),Rh.exports}var wh={exports:{}},Cn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h_;function By(){if(h_)return Cn;h_=1;var r=ap();function e(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)m+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,v){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:g==null?null:""+g,children:p,containerInfo:m,implementation:v}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Cn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Cn.createPortal=function(p,m){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(e(299));return c(p,m,null,v)},Cn.flushSync=function(p){var m=f.T,v=s.p;try{if(f.T=null,s.p=2,p)return p()}finally{f.T=m,s.p=v,s.d.f()}},Cn.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,s.d.C(p,m))},Cn.prefetchDNS=function(p){typeof p=="string"&&s.d.D(p)},Cn.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var v=m.as,g=h(v,m.crossOrigin),x=typeof m.integrity=="string"?m.integrity:void 0,M=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;v==="style"?s.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:g,integrity:x,fetchPriority:M}):v==="script"&&s.d.X(p,{crossOrigin:g,integrity:x,fetchPriority:M,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Cn.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var v=h(m.as,m.crossOrigin);s.d.M(p,{crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&s.d.M(p)},Cn.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var v=m.as,g=h(v,m.crossOrigin);s.d.L(p,v,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Cn.preloadModule=function(p,m){if(typeof p=="string")if(m){var v=h(m.as,m.crossOrigin);s.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else s.d.m(p)},Cn.requestFormReset=function(p){s.d.r(p)},Cn.unstable_batchedUpdates=function(p,m){return p(m)},Cn.useFormState=function(p,m,v){return f.H.useFormState(p,m,v)},Cn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Cn.version="19.2.8",Cn}var d_;function Fy(){if(d_)return wh.exports;d_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),wh.exports=By(),wh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p_;function Iy(){if(p_)return zo;p_=1;var r=zy(),e=ap(),i=Fy();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(c(t)!==t)throw Error(s(188))}function m(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return p(u),t;if(d===o)return p(u),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var S=!1,R=u.child;R;){if(R===a){S=!0,a=u,o=d;break}if(R===o){S=!0,o=u,a=d;break}R=R.sibling}if(!S){for(R=d.child;R;){if(R===a){S=!0,a=d,o=u;break}if(R===o){S=!0,o=d,a=u;break}R=R.sibling}if(!S)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}var g=Object.assign,x=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),b=Symbol.for("react.fragment"),y=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),N=Symbol.for("react.context"),D=Symbol.for("react.forward_ref"),j=Symbol.for("react.suspense"),H=Symbol.for("react.suspense_list"),z=Symbol.for("react.memo"),Y=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),w=Symbol.for("react.memo_cache_sentinel"),V=Symbol.iterator;function he(t){return t===null||typeof t!="object"?null:(t=V&&t[V]||t["@@iterator"],typeof t=="function"?t:null)}var ne=Symbol.for("react.client.reference");function de(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ne?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case b:return"Fragment";case _:return"Profiler";case y:return"StrictMode";case j:return"Suspense";case H:return"SuspenseList";case U:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case E:return"Portal";case N:return t.displayName||"Context";case L:return(t._context.displayName||"Context")+".Consumer";case D:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case z:return n=t.displayName||null,n!==null?n:de(t.type)||"Memo";case Y:n=t._payload,t=t._init;try{return de(t(n))}catch{}}return null}var pe=Array.isArray,B=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,$=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,J={pending:!1,data:null,method:null,action:null},Se=[],be=-1;function P(t){return{current:t}}function re(t){0>be||(t.current=Se[be],Se[be]=null,be--)}function ye(t,n){be++,Se[be]=t.current,t.current=n}var K=P(null),me=P(null),Re=P(null),Ee=P(null);function Oe(t,n){switch(ye(Re,n),ye(me,t),ye(K,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?wv(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=wv(n),t=Dv(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}re(K),ye(K,t)}function qe(){re(K),re(me),re(Re)}function Qe(t){t.memoizedState!==null&&ye(Ee,t);var n=K.current,a=Dv(n,t.type);n!==a&&(ye(me,t),ye(K,a))}function Ot(t){me.current===t&&(re(K),re(me)),Ee.current===t&&(re(Ee),Uo._currentValue=J)}var Ct,mt;function I(t){if(Ct===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Ct=n&&n[1]||"",mt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ct+t+mt}var Qt=!1;function dt(t,n){if(!t||Qt)return"";Qt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var _e=function(){throw Error()};if(Object.defineProperty(_e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_e,[])}catch(fe){var se=fe}Reflect.construct(t,[],_e)}else{try{_e.call()}catch(fe){se=fe}t.call(_e.prototype)}}else{try{throw Error()}catch(fe){se=fe}(_e=t())&&typeof _e.catch=="function"&&_e.catch(function(){})}}catch(fe){if(fe&&se&&typeof fe.stack=="string")return[fe.stack,se.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),S=d[0],R=d[1];if(S&&R){var F=S.split(`
`),ae=R.split(`
`);for(u=o=0;o<F.length&&!F[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ae.length&&!ae[u].includes("DetermineComponentFrameRoot");)u++;if(o===F.length||u===ae.length)for(o=F.length-1,u=ae.length-1;1<=o&&0<=u&&F[o]!==ae[u];)u--;for(;1<=o&&0<=u;o--,u--)if(F[o]!==ae[u]){if(o!==1||u!==1)do if(o--,u--,0>u||F[o]!==ae[u]){var ge=`
`+F[o].replace(" at new "," at ");return t.displayName&&ge.includes("<anonymous>")&&(ge=ge.replace("<anonymous>",t.displayName)),ge}while(1<=o&&0<=u);break}}}finally{Qt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?I(a):""}function zt(t,n){switch(t.tag){case 26:case 27:case 5:return I(t.type);case 16:return I("Lazy");case 13:return t.child!==n&&n!==null?I("Suspense Fallback"):I("Suspense");case 19:return I("SuspenseList");case 0:case 15:return dt(t.type,!1);case 11:return dt(t.type.render,!1);case 1:return dt(t.type,!0);case 31:return I("Activity");default:return""}}function je(t){try{var n="",a=null;do n+=zt(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var ct=Object.prototype.hasOwnProperty,Ye=r.unstable_scheduleCallback,at=r.unstable_cancelCallback,Jt=r.unstable_shouldYield,O=r.unstable_requestPaint,T=r.unstable_now,G=r.unstable_getCurrentPriorityLevel,ee=r.unstable_ImmediatePriority,ue=r.unstable_UserBlockingPriority,k=r.unstable_NormalPriority,De=r.unstable_LowPriority,Ce=r.unstable_IdlePriority,Fe=r.log,ke=r.unstable_setDisableYieldValue,Me=null,Ne=null;function Ze(t){if(typeof Fe=="function"&&ke(t),Ne&&typeof Ne.setStrictMode=="function")try{Ne.setStrictMode(Me,t)}catch{}}var Ge=Math.clz32?Math.clz32:W,Ue=Math.log,tt=Math.LN2;function W(t){return t>>>=0,t===0?32:31-(Ue(t)/tt|0)|0}var Le=256,Te=262144,He=4194304;function Ae(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function xe(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,d=t.suspendedLanes,S=t.pingedLanes;t=t.warmLanes;var R=o&134217727;return R!==0?(o=R&~d,o!==0?u=Ae(o):(S&=R,S!==0?u=Ae(S):a||(a=R&~t,a!==0&&(u=Ae(a))))):(R=o&~d,R!==0?u=Ae(R):S!==0?u=Ae(S):a||(a=o&~t,a!==0&&(u=Ae(a)))),u===0?0:n!==0&&n!==u&&(n&d)===0&&(d=u&-u,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:u}function Ve(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function st(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function It(){var t=He;return He<<=1,(He&62914560)===0&&(He=4194304),t}function Rt(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function Sn(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function _i(t,n,a,o,u,d){var S=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var R=t.entanglements,F=t.expirationTimes,ae=t.hiddenUpdates;for(a=S&~a;0<a;){var ge=31-Ge(a),_e=1<<ge;R[ge]=0,F[ge]=-1;var se=ae[ge];if(se!==null)for(ae[ge]=null,ge=0;ge<se.length;ge++){var fe=se[ge];fe!==null&&(fe.lane&=-536870913)}a&=~_e}o!==0&&Vr(t,o,0),d!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=d&~(S&~n))}function Vr(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-Ge(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function kr(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-Ge(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function Ni(t,n){var a=n&-n;return a=(a&42)!==0?1:ts(a),(a&(t.suspendedLanes|n))!==0?0:a}function ts(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Ls(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Xr(){var t=$.p;return t!==0?t:(t=window.event,t===void 0?32:$v(t.type))}function ns(t,n){var a=$.p;try{return $.p=t,n()}finally{$.p=a}}var xi=Math.random().toString(36).slice(2),$t="__reactFiber$"+xi,yn="__reactProps$"+xi,Xi="__reactContainer$"+xi,jr="__reactEvents$"+xi,vu="__reactListeners$"+xi,_u="__reactHandles$"+xi,cl="__reactResources$"+xi,is="__reactMarker$"+xi;function Wr(t){delete t[$t],delete t[yn],delete t[jr],delete t[vu],delete t[_u]}function C(t){var n=t[$t];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Xi]||a[$t]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Bv(t);t!==null;){if(a=t[$t])return a;t=Bv(t)}return n}t=a,a=t.parentNode}return null}function Q(t){if(t=t[$t]||t[Xi]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function oe(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function le(t){var n=t[cl];return n||(n=t[cl]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function q(t){t[is]=!0}var we=new Set,Pe={};function Ie(t,n){Be(t,n),Be(t+"Capture",n)}function Be(t,n){for(Pe[t]=n,t=0;t<n.length;t++)we.add(n[t])}var nt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),it={},Ke={};function vt(t){return ct.call(Ke,t)?!0:ct.call(it,t)?!1:nt.test(t)?Ke[t]=!0:(it[t]=!0,!1)}function bt(t,n,a){if(vt(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Ht(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function wt(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function rt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function $e(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function dn(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(S){a=""+S,d.call(this,S)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(S){a=""+S},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function At(t){if(!t._valueTracker){var n=$e(t)?"checked":"value";t._valueTracker=dn(t,n,""+t[n])}}function Fn(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=$e(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function Si(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Un=/[\n"\\]/g;function vn(t){return t.replace(Un,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Gt(t,n,a,o,u,d,S,R){t.name="",S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"?t.type=S:t.removeAttribute("type"),n!=null?S==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+rt(n)):t.value!==""+rt(n)&&(t.value=""+rt(n)):S!=="submit"&&S!=="reset"||t.removeAttribute("value"),n!=null?Rn(t,S,rt(n)):a!=null?Rn(t,S,rt(a)):o!=null&&t.removeAttribute("value"),u==null&&d!=null&&(t.defaultChecked=!!d),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?t.name=""+rt(R):t.removeAttribute("name")}function Nn(t,n,a,o,u,d,S,R){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){At(t);return}a=a!=null?""+rt(a):"",n=n!=null?""+rt(n):a,R||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=R?t.checked:!!o,t.defaultChecked=!!o,S!=null&&typeof S!="function"&&typeof S!="symbol"&&typeof S!="boolean"&&(t.name=S),At(t)}function Rn(t,n,a){n==="number"&&Si(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function en(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+rt(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function Mn(t,n,a){if(n!=null&&(n=""+rt(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+rt(a):""}function Os(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(pe(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=rt(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),At(t)}function In(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var bx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ap(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||bx.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function Rp(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Ap(t,u,o)}else for(var d in n)n.hasOwnProperty(d)&&Ap(t,d,n[d])}function xu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ax=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Rx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ul(t){return Rx.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ji(){}var Su=null;function yu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ps=null,zs=null;function Cp(t){var n=Q(t);if(n&&(t=n.stateNode)){var a=t[yn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Gt(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+vn(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[yn]||null;if(!u)throw Error(s(90));Gt(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&Fn(o)}break e;case"textarea":Mn(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&en(t,!!a.multiple,n,!1)}}}var Mu=!1;function wp(t,n,a){if(Mu)return t(n,a);Mu=!0;try{var o=t(n);return o}finally{if(Mu=!1,(Ps!==null||zs!==null)&&(Ql(),Ps&&(n=Ps,t=zs,zs=Ps=null,Cp(n),t)))for(n=0;n<t.length;n++)Cp(t[n])}}function qr(t,n){var a=t.stateNode;if(a===null)return null;var o=a[yn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Wi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Eu=!1;if(Wi)try{var Yr={};Object.defineProperty(Yr,"passive",{get:function(){Eu=!0}}),window.addEventListener("test",Yr,Yr),window.removeEventListener("test",Yr,Yr)}catch{Eu=!1}var Ea=null,Tu=null,fl=null;function Dp(){if(fl)return fl;var t,n=Tu,a=n.length,o,u="value"in Ea?Ea.value:Ea.textContent,d=u.length;for(t=0;t<a&&n[t]===u[t];t++);var S=a-t;for(o=1;o<=S&&n[a-o]===u[d-o];o++);return fl=u.slice(t,1<o?1-o:void 0)}function hl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function dl(){return!0}function Up(){return!1}function Hn(t){function n(a,o,u,d,S){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=S,this.currentTarget=null;for(var R in t)t.hasOwnProperty(R)&&(a=t[R],this[R]=a?a(d):d[R]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?dl:Up,this.isPropagationStopped=Up,this}return g(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=dl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=dl)},persist:function(){},isPersistent:dl}),n}var as={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pl=Hn(as),Zr=g({},as,{view:0,detail:0}),Cx=Hn(Zr),bu,Au,Kr,ml=g({},Zr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Kr&&(Kr&&t.type==="mousemove"?(bu=t.screenX-Kr.screenX,Au=t.screenY-Kr.screenY):Au=bu=0,Kr=t),bu)},movementY:function(t){return"movementY"in t?t.movementY:Au}}),Np=Hn(ml),wx=g({},ml,{dataTransfer:0}),Dx=Hn(wx),Ux=g({},Zr,{relatedTarget:0}),Ru=Hn(Ux),Nx=g({},as,{animationName:0,elapsedTime:0,pseudoElement:0}),Lx=Hn(Nx),Ox=g({},as,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Px=Hn(Ox),zx=g({},as,{data:0}),Lp=Hn(zx),Bx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ix={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Hx(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Ix[t])?!!n[t]:!1}function Cu(){return Hx}var Gx=g({},Zr,{key:function(t){if(t.key){var n=Bx[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=hl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Fx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cu,charCode:function(t){return t.type==="keypress"?hl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?hl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Vx=Hn(Gx),kx=g({},ml,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Op=Hn(kx),Xx=g({},Zr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cu}),jx=Hn(Xx),Wx=g({},as,{propertyName:0,elapsedTime:0,pseudoElement:0}),qx=Hn(Wx),Yx=g({},ml,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Zx=Hn(Yx),Kx=g({},as,{newState:0,oldState:0}),Qx=Hn(Kx),Jx=[9,13,27,32],wu=Wi&&"CompositionEvent"in window,Qr=null;Wi&&"documentMode"in document&&(Qr=document.documentMode);var $x=Wi&&"TextEvent"in window&&!Qr,Pp=Wi&&(!wu||Qr&&8<Qr&&11>=Qr),zp=" ",Bp=!1;function Fp(t,n){switch(t){case"keyup":return Jx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ip(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Bs=!1;function eS(t,n){switch(t){case"compositionend":return Ip(n);case"keypress":return n.which!==32?null:(Bp=!0,zp);case"textInput":return t=n.data,t===zp&&Bp?null:t;default:return null}}function tS(t,n){if(Bs)return t==="compositionend"||!wu&&Fp(t,n)?(t=Dp(),fl=Tu=Ea=null,Bs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Pp&&n.locale!=="ko"?null:n.data;default:return null}}var nS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Hp(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!nS[t.type]:n==="textarea"}function Gp(t,n,a,o){Ps?zs?zs.push(o):zs=[o]:Ps=o,n=ac(n,"onChange"),0<n.length&&(a=new pl("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var Jr=null,$r=null;function iS(t){Ev(t,0)}function gl(t){var n=oe(t);if(Fn(n))return t}function Vp(t,n){if(t==="change")return n}var kp=!1;if(Wi){var Du;if(Wi){var Uu="oninput"in document;if(!Uu){var Xp=document.createElement("div");Xp.setAttribute("oninput","return;"),Uu=typeof Xp.oninput=="function"}Du=Uu}else Du=!1;kp=Du&&(!document.documentMode||9<document.documentMode)}function jp(){Jr&&(Jr.detachEvent("onpropertychange",Wp),$r=Jr=null)}function Wp(t){if(t.propertyName==="value"&&gl($r)){var n=[];Gp(n,$r,t,yu(t)),wp(iS,n)}}function aS(t,n,a){t==="focusin"?(jp(),Jr=n,$r=a,Jr.attachEvent("onpropertychange",Wp)):t==="focusout"&&jp()}function sS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return gl($r)}function rS(t,n){if(t==="click")return gl(n)}function oS(t,n){if(t==="input"||t==="change")return gl(n)}function lS(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Qn=typeof Object.is=="function"?Object.is:lS;function eo(t,n){if(Qn(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!ct.call(n,u)||!Qn(t[u],n[u]))return!1}return!0}function qp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Yp(t,n){var a=qp(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=qp(a)}}function Zp(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Zp(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Kp(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Si(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Si(t.document)}return n}function Nu(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var cS=Wi&&"documentMode"in document&&11>=document.documentMode,Fs=null,Lu=null,to=null,Ou=!1;function Qp(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ou||Fs==null||Fs!==Si(o)||(o=Fs,"selectionStart"in o&&Nu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),to&&eo(to,o)||(to=o,o=ac(Lu,"onSelect"),0<o.length&&(n=new pl("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Fs)))}function ss(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Is={animationend:ss("Animation","AnimationEnd"),animationiteration:ss("Animation","AnimationIteration"),animationstart:ss("Animation","AnimationStart"),transitionrun:ss("Transition","TransitionRun"),transitionstart:ss("Transition","TransitionStart"),transitioncancel:ss("Transition","TransitionCancel"),transitionend:ss("Transition","TransitionEnd")},Pu={},Jp={};Wi&&(Jp=document.createElement("div").style,"AnimationEvent"in window||(delete Is.animationend.animation,delete Is.animationiteration.animation,delete Is.animationstart.animation),"TransitionEvent"in window||delete Is.transitionend.transition);function rs(t){if(Pu[t])return Pu[t];if(!Is[t])return t;var n=Is[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Jp)return Pu[t]=n[a];return t}var $p=rs("animationend"),em=rs("animationiteration"),tm=rs("animationstart"),uS=rs("transitionrun"),fS=rs("transitionstart"),hS=rs("transitioncancel"),nm=rs("transitionend"),im=new Map,zu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");zu.push("scrollEnd");function yi(t,n){im.set(t,n),Ie(n,[t])}var vl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},oi=[],Hs=0,Bu=0;function _l(){for(var t=Hs,n=Bu=Hs=0;n<t;){var a=oi[n];oi[n++]=null;var o=oi[n];oi[n++]=null;var u=oi[n];oi[n++]=null;var d=oi[n];if(oi[n++]=null,o!==null&&u!==null){var S=o.pending;S===null?u.next=u:(u.next=S.next,S.next=u),o.pending=u}d!==0&&am(a,u,d)}}function xl(t,n,a,o){oi[Hs++]=t,oi[Hs++]=n,oi[Hs++]=a,oi[Hs++]=o,Bu|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Fu(t,n,a,o){return xl(t,n,a,o),Sl(t)}function os(t,n){return xl(t,null,null,n),Sl(t)}function am(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=t.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(u=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,u&&n!==null&&(u=31-Ge(a),t=d.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),d):null}function Sl(t){if(50<To)throw To=0,Yf=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Gs={};function dS(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Jn(t,n,a,o){return new dS(t,n,a,o)}function Iu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function qi(t,n){var a=t.alternate;return a===null?(a=Jn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function sm(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function yl(t,n,a,o,u,d){var S=0;if(o=t,typeof t=="function")Iu(t)&&(S=1);else if(typeof t=="string")S=_y(t,a,K.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case U:return t=Jn(31,a,n,u),t.elementType=U,t.lanes=d,t;case b:return ls(a.children,u,d,n);case y:S=8,u|=24;break;case _:return t=Jn(12,a,n,u|2),t.elementType=_,t.lanes=d,t;case j:return t=Jn(13,a,n,u),t.elementType=j,t.lanes=d,t;case H:return t=Jn(19,a,n,u),t.elementType=H,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case N:S=10;break e;case L:S=9;break e;case D:S=11;break e;case z:S=14;break e;case Y:S=16,o=null;break e}S=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=Jn(S,a,n,u),n.elementType=t,n.type=o,n.lanes=d,n}function ls(t,n,a,o){return t=Jn(7,t,o,n),t.lanes=a,t}function Hu(t,n,a){return t=Jn(6,t,null,n),t.lanes=a,t}function rm(t){var n=Jn(18,null,null,0);return n.stateNode=t,n}function Gu(t,n,a){return n=Jn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var om=new WeakMap;function li(t,n){if(typeof t=="object"&&t!==null){var a=om.get(t);return a!==void 0?a:(n={value:t,source:n,stack:je(n)},om.set(t,n),n)}return{value:t,source:n,stack:je(n)}}var Vs=[],ks=0,Ml=null,no=0,ci=[],ui=0,Ta=null,Li=1,Oi="";function Yi(t,n){Vs[ks++]=no,Vs[ks++]=Ml,Ml=t,no=n}function lm(t,n,a){ci[ui++]=Li,ci[ui++]=Oi,ci[ui++]=Ta,Ta=t;var o=Li;t=Oi;var u=32-Ge(o)-1;o&=~(1<<u),a+=1;var d=32-Ge(n)+u;if(30<d){var S=u-u%5;d=(o&(1<<S)-1).toString(32),o>>=S,u-=S,Li=1<<32-Ge(n)+u|a<<u|o,Oi=d+t}else Li=1<<d|a<<u|o,Oi=t}function Vu(t){t.return!==null&&(Yi(t,1),lm(t,1,0))}function ku(t){for(;t===Ml;)Ml=Vs[--ks],Vs[ks]=null,no=Vs[--ks],Vs[ks]=null;for(;t===Ta;)Ta=ci[--ui],ci[ui]=null,Oi=ci[--ui],ci[ui]=null,Li=ci[--ui],ci[ui]=null}function cm(t,n){ci[ui++]=Li,ci[ui++]=Oi,ci[ui++]=Ta,Li=n.id,Oi=n.overflow,Ta=t}var En=null,qt=null,Mt=!1,ba=null,fi=!1,Xu=Error(s(519));function Aa(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw io(li(n,t)),Xu}function um(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[$t]=t,n[yn]=o,a){case"dialog":xt("cancel",n),xt("close",n);break;case"iframe":case"object":case"embed":xt("load",n);break;case"video":case"audio":for(a=0;a<Ao.length;a++)xt(Ao[a],n);break;case"source":xt("error",n);break;case"img":case"image":case"link":xt("error",n),xt("load",n);break;case"details":xt("toggle",n);break;case"input":xt("invalid",n),Nn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":xt("invalid",n);break;case"textarea":xt("invalid",n),Os(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||Rv(n.textContent,a)?(o.popover!=null&&(xt("beforetoggle",n),xt("toggle",n)),o.onScroll!=null&&xt("scroll",n),o.onScrollEnd!=null&&xt("scrollend",n),o.onClick!=null&&(n.onclick=ji),n=!0):n=!1,n||Aa(t,!0)}function fm(t){for(En=t.return;En;)switch(En.tag){case 5:case 31:case 13:fi=!1;return;case 27:case 3:fi=!0;return;default:En=En.return}}function Xs(t){if(t!==En)return!1;if(!Mt)return fm(t),Mt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||ch(t.type,t.memoizedProps)),a=!a),a&&qt&&Aa(t),fm(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));qt=zv(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));qt=zv(t)}else n===27?(n=qt,Ha(t.type)?(t=ph,ph=null,qt=t):qt=n):qt=En?di(t.stateNode.nextSibling):null;return!0}function cs(){qt=En=null,Mt=!1}function ju(){var t=ba;return t!==null&&(Xn===null?Xn=t:Xn.push.apply(Xn,t),ba=null),t}function io(t){ba===null?ba=[t]:ba.push(t)}var Wu=P(null),us=null,Zi=null;function Ra(t,n,a){ye(Wu,n._currentValue),n._currentValue=a}function Ki(t){t._currentValue=Wu.current,re(Wu)}function qu(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function Yu(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var d=u.dependencies;if(d!==null){var S=u.child;d=d.firstContext;e:for(;d!==null;){var R=d;d=u;for(var F=0;F<n.length;F++)if(R.context===n[F]){d.lanes|=a,R=d.alternate,R!==null&&(R.lanes|=a),qu(d.return,a,t),o||(S=null);break e}d=R.next}}else if(u.tag===18){if(S=u.return,S===null)throw Error(s(341));S.lanes|=a,d=S.alternate,d!==null&&(d.lanes|=a),qu(S,a,t),S=null}else S=u.child;if(S!==null)S.return=u;else for(S=u;S!==null;){if(S===t){S=null;break}if(u=S.sibling,u!==null){u.return=S.return,S=u;break}S=S.return}u=S}}function js(t,n,a,o){t=null;for(var u=n,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var S=u.alternate;if(S===null)throw Error(s(387));if(S=S.memoizedProps,S!==null){var R=u.type;Qn(u.pendingProps.value,S.value)||(t!==null?t.push(R):t=[R])}}else if(u===Ee.current){if(S=u.alternate,S===null)throw Error(s(387));S.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(Uo):t=[Uo])}u=u.return}t!==null&&Yu(n,t,a,o),n.flags|=262144}function El(t){for(t=t.firstContext;t!==null;){if(!Qn(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function fs(t){us=t,Zi=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Tn(t){return hm(us,t)}function Tl(t,n){return us===null&&fs(t),hm(t,n)}function hm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Zi===null){if(t===null)throw Error(s(308));Zi=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Zi=Zi.next=n;return a}var pS=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},mS=r.unstable_scheduleCallback,gS=r.unstable_NormalPriority,ln={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zu(){return{controller:new pS,data:new Map,refCount:0}}function ao(t){t.refCount--,t.refCount===0&&mS(gS,function(){t.controller.abort()})}var so=null,Ku=0,Ws=0,qs=null;function vS(t,n){if(so===null){var a=so=[];Ku=0,Ws=eh(),qs={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Ku++,n.then(dm,dm),n}function dm(){if(--Ku===0&&so!==null){qs!==null&&(qs.status="fulfilled");var t=so;so=null,Ws=0,qs=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function _S(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var pm=B.S;B.S=function(t,n){Qg=T(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&vS(t,n),pm!==null&&pm(t,n)};var hs=P(null);function Qu(){var t=hs.current;return t!==null?t:Wt.pooledCache}function bl(t,n){n===null?ye(hs,hs.current):ye(hs,n.pool)}function mm(){var t=Qu();return t===null?null:{parent:ln._currentValue,pool:t}}var Ys=Error(s(460)),Ju=Error(s(474)),Al=Error(s(542)),Rl={then:function(){}};function gm(t){return t=t.status,t==="fulfilled"||t==="rejected"}function vm(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(ji,ji),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,xm(t),t;default:if(typeof n.status=="string")n.then(ji,ji);else{if(t=Wt,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,xm(t),t}throw ps=n,Ys}}function ds(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ps=a,Ys):a}}var ps=null;function _m(){if(ps===null)throw Error(s(459));var t=ps;return ps=null,t}function xm(t){if(t===Ys||t===Al)throw Error(s(483))}var Zs=null,ro=0;function Cl(t){var n=ro;return ro+=1,Zs===null&&(Zs=[]),vm(Zs,t,n)}function oo(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function wl(t,n){throw n.$$typeof===x?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function Sm(t){function n(te,X){if(t){var ie=te.deletions;ie===null?(te.deletions=[X],te.flags|=16):ie.push(X)}}function a(te,X){if(!t)return null;for(;X!==null;)n(te,X),X=X.sibling;return null}function o(te){for(var X=new Map;te!==null;)te.key!==null?X.set(te.key,te):X.set(te.index,te),te=te.sibling;return X}function u(te,X){return te=qi(te,X),te.index=0,te.sibling=null,te}function d(te,X,ie){return te.index=ie,t?(ie=te.alternate,ie!==null?(ie=ie.index,ie<X?(te.flags|=67108866,X):ie):(te.flags|=67108866,X)):(te.flags|=1048576,X)}function S(te){return t&&te.alternate===null&&(te.flags|=67108866),te}function R(te,X,ie,ve){return X===null||X.tag!==6?(X=Hu(ie,te.mode,ve),X.return=te,X):(X=u(X,ie),X.return=te,X)}function F(te,X,ie,ve){var Je=ie.type;return Je===b?ge(te,X,ie.props.children,ve,ie.key):X!==null&&(X.elementType===Je||typeof Je=="object"&&Je!==null&&Je.$$typeof===Y&&ds(Je)===X.type)?(X=u(X,ie.props),oo(X,ie),X.return=te,X):(X=yl(ie.type,ie.key,ie.props,null,te.mode,ve),oo(X,ie),X.return=te,X)}function ae(te,X,ie,ve){return X===null||X.tag!==4||X.stateNode.containerInfo!==ie.containerInfo||X.stateNode.implementation!==ie.implementation?(X=Gu(ie,te.mode,ve),X.return=te,X):(X=u(X,ie.children||[]),X.return=te,X)}function ge(te,X,ie,ve,Je){return X===null||X.tag!==7?(X=ls(ie,te.mode,ve,Je),X.return=te,X):(X=u(X,ie),X.return=te,X)}function _e(te,X,ie){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=Hu(""+X,te.mode,ie),X.return=te,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case M:return ie=yl(X.type,X.key,X.props,null,te.mode,ie),oo(ie,X),ie.return=te,ie;case E:return X=Gu(X,te.mode,ie),X.return=te,X;case Y:return X=ds(X),_e(te,X,ie)}if(pe(X)||he(X))return X=ls(X,te.mode,ie,null),X.return=te,X;if(typeof X.then=="function")return _e(te,Cl(X),ie);if(X.$$typeof===N)return _e(te,Tl(te,X),ie);wl(te,X)}return null}function se(te,X,ie,ve){var Je=X!==null?X.key:null;if(typeof ie=="string"&&ie!==""||typeof ie=="number"||typeof ie=="bigint")return Je!==null?null:R(te,X,""+ie,ve);if(typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case M:return ie.key===Je?F(te,X,ie,ve):null;case E:return ie.key===Je?ae(te,X,ie,ve):null;case Y:return ie=ds(ie),se(te,X,ie,ve)}if(pe(ie)||he(ie))return Je!==null?null:ge(te,X,ie,ve,null);if(typeof ie.then=="function")return se(te,X,Cl(ie),ve);if(ie.$$typeof===N)return se(te,X,Tl(te,ie),ve);wl(te,ie)}return null}function fe(te,X,ie,ve,Je){if(typeof ve=="string"&&ve!==""||typeof ve=="number"||typeof ve=="bigint")return te=te.get(ie)||null,R(X,te,""+ve,Je);if(typeof ve=="object"&&ve!==null){switch(ve.$$typeof){case M:return te=te.get(ve.key===null?ie:ve.key)||null,F(X,te,ve,Je);case E:return te=te.get(ve.key===null?ie:ve.key)||null,ae(X,te,ve,Je);case Y:return ve=ds(ve),fe(te,X,ie,ve,Je)}if(pe(ve)||he(ve))return te=te.get(ie)||null,ge(X,te,ve,Je,null);if(typeof ve.then=="function")return fe(te,X,ie,Cl(ve),Je);if(ve.$$typeof===N)return fe(te,X,ie,Tl(X,ve),Je);wl(X,ve)}return null}function Xe(te,X,ie,ve){for(var Je=null,Dt=null,We=X,ut=X=0,yt=null;We!==null&&ut<ie.length;ut++){We.index>ut?(yt=We,We=null):yt=We.sibling;var Ut=se(te,We,ie[ut],ve);if(Ut===null){We===null&&(We=yt);break}t&&We&&Ut.alternate===null&&n(te,We),X=d(Ut,X,ut),Dt===null?Je=Ut:Dt.sibling=Ut,Dt=Ut,We=yt}if(ut===ie.length)return a(te,We),Mt&&Yi(te,ut),Je;if(We===null){for(;ut<ie.length;ut++)We=_e(te,ie[ut],ve),We!==null&&(X=d(We,X,ut),Dt===null?Je=We:Dt.sibling=We,Dt=We);return Mt&&Yi(te,ut),Je}for(We=o(We);ut<ie.length;ut++)yt=fe(We,te,ut,ie[ut],ve),yt!==null&&(t&&yt.alternate!==null&&We.delete(yt.key===null?ut:yt.key),X=d(yt,X,ut),Dt===null?Je=yt:Dt.sibling=yt,Dt=yt);return t&&We.forEach(function(ja){return n(te,ja)}),Mt&&Yi(te,ut),Je}function et(te,X,ie,ve){if(ie==null)throw Error(s(151));for(var Je=null,Dt=null,We=X,ut=X=0,yt=null,Ut=ie.next();We!==null&&!Ut.done;ut++,Ut=ie.next()){We.index>ut?(yt=We,We=null):yt=We.sibling;var ja=se(te,We,Ut.value,ve);if(ja===null){We===null&&(We=yt);break}t&&We&&ja.alternate===null&&n(te,We),X=d(ja,X,ut),Dt===null?Je=ja:Dt.sibling=ja,Dt=ja,We=yt}if(Ut.done)return a(te,We),Mt&&Yi(te,ut),Je;if(We===null){for(;!Ut.done;ut++,Ut=ie.next())Ut=_e(te,Ut.value,ve),Ut!==null&&(X=d(Ut,X,ut),Dt===null?Je=Ut:Dt.sibling=Ut,Dt=Ut);return Mt&&Yi(te,ut),Je}for(We=o(We);!Ut.done;ut++,Ut=ie.next())Ut=fe(We,te,ut,Ut.value,ve),Ut!==null&&(t&&Ut.alternate!==null&&We.delete(Ut.key===null?ut:Ut.key),X=d(Ut,X,ut),Dt===null?Je=Ut:Dt.sibling=Ut,Dt=Ut);return t&&We.forEach(function(wy){return n(te,wy)}),Mt&&Yi(te,ut),Je}function Xt(te,X,ie,ve){if(typeof ie=="object"&&ie!==null&&ie.type===b&&ie.key===null&&(ie=ie.props.children),typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case M:e:{for(var Je=ie.key;X!==null;){if(X.key===Je){if(Je=ie.type,Je===b){if(X.tag===7){a(te,X.sibling),ve=u(X,ie.props.children),ve.return=te,te=ve;break e}}else if(X.elementType===Je||typeof Je=="object"&&Je!==null&&Je.$$typeof===Y&&ds(Je)===X.type){a(te,X.sibling),ve=u(X,ie.props),oo(ve,ie),ve.return=te,te=ve;break e}a(te,X);break}else n(te,X);X=X.sibling}ie.type===b?(ve=ls(ie.props.children,te.mode,ve,ie.key),ve.return=te,te=ve):(ve=yl(ie.type,ie.key,ie.props,null,te.mode,ve),oo(ve,ie),ve.return=te,te=ve)}return S(te);case E:e:{for(Je=ie.key;X!==null;){if(X.key===Je)if(X.tag===4&&X.stateNode.containerInfo===ie.containerInfo&&X.stateNode.implementation===ie.implementation){a(te,X.sibling),ve=u(X,ie.children||[]),ve.return=te,te=ve;break e}else{a(te,X);break}else n(te,X);X=X.sibling}ve=Gu(ie,te.mode,ve),ve.return=te,te=ve}return S(te);case Y:return ie=ds(ie),Xt(te,X,ie,ve)}if(pe(ie))return Xe(te,X,ie,ve);if(he(ie)){if(Je=he(ie),typeof Je!="function")throw Error(s(150));return ie=Je.call(ie),et(te,X,ie,ve)}if(typeof ie.then=="function")return Xt(te,X,Cl(ie),ve);if(ie.$$typeof===N)return Xt(te,X,Tl(te,ie),ve);wl(te,ie)}return typeof ie=="string"&&ie!==""||typeof ie=="number"||typeof ie=="bigint"?(ie=""+ie,X!==null&&X.tag===6?(a(te,X.sibling),ve=u(X,ie),ve.return=te,te=ve):(a(te,X),ve=Hu(ie,te.mode,ve),ve.return=te,te=ve),S(te)):a(te,X)}return function(te,X,ie,ve){try{ro=0;var Je=Xt(te,X,ie,ve);return Zs=null,Je}catch(We){if(We===Ys||We===Al)throw We;var Dt=Jn(29,We,null,te.mode);return Dt.lanes=ve,Dt.return=te,Dt}finally{}}}var ms=Sm(!0),ym=Sm(!1),Ca=!1;function $u(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function ef(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function wa(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Da(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(Pt&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Sl(t),am(t,null,a),n}return xl(t,o,n,a),Sl(t)}function lo(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,kr(t,a)}}function tf(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var S={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=S:d=d.next=S,a=a.next}while(a!==null);d===null?u=d=n:d=d.next=n}else u=d=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var nf=!1;function co(){if(nf){var t=qs;if(t!==null)throw t}}function uo(t,n,a,o){nf=!1;var u=t.updateQueue;Ca=!1;var d=u.firstBaseUpdate,S=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var F=R,ae=F.next;F.next=null,S===null?d=ae:S.next=ae,S=F;var ge=t.alternate;ge!==null&&(ge=ge.updateQueue,R=ge.lastBaseUpdate,R!==S&&(R===null?ge.firstBaseUpdate=ae:R.next=ae,ge.lastBaseUpdate=F))}if(d!==null){var _e=u.baseState;S=0,ge=ae=F=null,R=d;do{var se=R.lane&-536870913,fe=se!==R.lane;if(fe?(St&se)===se:(o&se)===se){se!==0&&se===Ws&&(nf=!0),ge!==null&&(ge=ge.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});e:{var Xe=t,et=R;se=n;var Xt=a;switch(et.tag){case 1:if(Xe=et.payload,typeof Xe=="function"){_e=Xe.call(Xt,_e,se);break e}_e=Xe;break e;case 3:Xe.flags=Xe.flags&-65537|128;case 0:if(Xe=et.payload,se=typeof Xe=="function"?Xe.call(Xt,_e,se):Xe,se==null)break e;_e=g({},_e,se);break e;case 2:Ca=!0}}se=R.callback,se!==null&&(t.flags|=64,fe&&(t.flags|=8192),fe=u.callbacks,fe===null?u.callbacks=[se]:fe.push(se))}else fe={lane:se,tag:R.tag,payload:R.payload,callback:R.callback,next:null},ge===null?(ae=ge=fe,F=_e):ge=ge.next=fe,S|=se;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;fe=R,R=fe.next,fe.next=null,u.lastBaseUpdate=fe,u.shared.pending=null}}while(!0);ge===null&&(F=_e),u.baseState=F,u.firstBaseUpdate=ae,u.lastBaseUpdate=ge,d===null&&(u.shared.lanes=0),Pa|=S,t.lanes=S,t.memoizedState=_e}}function Mm(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function Em(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)Mm(a[t],n)}var Ks=P(null),Dl=P(0);function Tm(t,n){t=sa,ye(Dl,t),ye(Ks,n),sa=t|n.baseLanes}function af(){ye(Dl,sa),ye(Ks,Ks.current)}function sf(){sa=Dl.current,re(Ks),re(Dl)}var $n=P(null),hi=null;function Ua(t){var n=t.alternate;ye(an,an.current&1),ye($n,t),hi===null&&(n===null||Ks.current!==null||n.memoizedState!==null)&&(hi=t)}function rf(t){ye(an,an.current),ye($n,t),hi===null&&(hi=t)}function bm(t){t.tag===22?(ye(an,an.current),ye($n,t),hi===null&&(hi=t)):Na()}function Na(){ye(an,an.current),ye($n,$n.current)}function ei(t){re($n),hi===t&&(hi=null),re(an)}var an=P(0);function Ul(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||hh(a)||dh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Qi=0,lt=null,Vt=null,cn=null,Nl=!1,Qs=!1,gs=!1,Ll=0,fo=0,Js=null,xS=0;function tn(){throw Error(s(321))}function of(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Qn(t[a],n[a]))return!1;return!0}function lf(t,n,a,o,u,d){return Qi=d,lt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,B.H=t===null||t.memoizedState===null?lg:Ef,gs=!1,d=a(o,u),gs=!1,Qs&&(d=Rm(n,a,o,u)),Am(t),d}function Am(t){B.H=mo;var n=Vt!==null&&Vt.next!==null;if(Qi=0,cn=Vt=lt=null,Nl=!1,fo=0,Js=null,n)throw Error(s(300));t===null||un||(t=t.dependencies,t!==null&&El(t)&&(un=!0))}function Rm(t,n,a,o){lt=t;var u=0;do{if(Qs&&(Js=null),fo=0,Qs=!1,25<=u)throw Error(s(301));if(u+=1,cn=Vt=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}B.H=cg,d=n(a,o)}while(Qs);return d}function SS(){var t=B.H,n=t.useState()[0];return n=typeof n.then=="function"?ho(n):n,t=t.useState()[0],(Vt!==null?Vt.memoizedState:null)!==t&&(lt.flags|=1024),n}function cf(){var t=Ll!==0;return Ll=0,t}function uf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function ff(t){if(Nl){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Nl=!1}Qi=0,cn=Vt=lt=null,Qs=!1,fo=Ll=0,Js=null}function Ln(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return cn===null?lt.memoizedState=cn=t:cn=cn.next=t,cn}function sn(){if(Vt===null){var t=lt.alternate;t=t!==null?t.memoizedState:null}else t=Vt.next;var n=cn===null?lt.memoizedState:cn.next;if(n!==null)cn=n,Vt=t;else{if(t===null)throw lt.alternate===null?Error(s(467)):Error(s(310));Vt=t,t={memoizedState:Vt.memoizedState,baseState:Vt.baseState,baseQueue:Vt.baseQueue,queue:Vt.queue,next:null},cn===null?lt.memoizedState=cn=t:cn=cn.next=t}return cn}function Ol(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ho(t){var n=fo;return fo+=1,Js===null&&(Js=[]),t=vm(Js,t,n),n=lt,(cn===null?n.memoizedState:cn.next)===null&&(n=n.alternate,B.H=n===null||n.memoizedState===null?lg:Ef),t}function Pl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ho(t);if(t.$$typeof===N)return Tn(t)}throw Error(s(438,String(t)))}function hf(t){var n=null,a=lt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=lt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Ol(),lt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=w;return n.index++,a}function Ji(t,n){return typeof n=="function"?n(t):n}function zl(t){var n=sn();return df(n,Vt,t)}function df(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,d=o.pending;if(d!==null){if(u!==null){var S=u.next;u.next=d.next,d.next=S}n.baseQueue=u=d,o.pending=null}if(d=t.baseState,u===null)t.memoizedState=d;else{n=u.next;var R=S=null,F=null,ae=n,ge=!1;do{var _e=ae.lane&-536870913;if(_e!==ae.lane?(St&_e)===_e:(Qi&_e)===_e){var se=ae.revertLane;if(se===0)F!==null&&(F=F.next={lane:0,revertLane:0,gesture:null,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null}),_e===Ws&&(ge=!0);else if((Qi&se)===se){ae=ae.next,se===Ws&&(ge=!0);continue}else _e={lane:0,revertLane:ae.revertLane,gesture:null,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null},F===null?(R=F=_e,S=d):F=F.next=_e,lt.lanes|=se,Pa|=se;_e=ae.action,gs&&a(d,_e),d=ae.hasEagerState?ae.eagerState:a(d,_e)}else se={lane:_e,revertLane:ae.revertLane,gesture:ae.gesture,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null},F===null?(R=F=se,S=d):F=F.next=se,lt.lanes|=_e,Pa|=_e;ae=ae.next}while(ae!==null&&ae!==n);if(F===null?S=d:F.next=R,!Qn(d,t.memoizedState)&&(un=!0,ge&&(a=qs,a!==null)))throw a;t.memoizedState=d,t.baseState=S,t.baseQueue=F,o.lastRenderedState=d}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function pf(t){var n=sn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,d=n.memoizedState;if(u!==null){a.pending=null;var S=u=u.next;do d=t(d,S.action),S=S.next;while(S!==u);Qn(d,n.memoizedState)||(un=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function Cm(t,n,a){var o=lt,u=sn(),d=Mt;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var S=!Qn((Vt||u).memoizedState,a);if(S&&(u.memoizedState=a,un=!0),u=u.queue,vf(Um.bind(null,o,u,t),[t]),u.getSnapshot!==n||S||cn!==null&&cn.memoizedState.tag&1){if(o.flags|=2048,$s(9,{destroy:void 0},Dm.bind(null,o,u,a,n),null),Wt===null)throw Error(s(349));d||(Qi&127)!==0||wm(o,n,a)}return a}function wm(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=lt.updateQueue,n===null?(n=Ol(),lt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function Dm(t,n,a,o){n.value=a,n.getSnapshot=o,Nm(n)&&Lm(t)}function Um(t,n,a){return a(function(){Nm(n)&&Lm(t)})}function Nm(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Qn(t,a)}catch{return!0}}function Lm(t){var n=os(t,2);n!==null&&jn(n,t,2)}function mf(t){var n=Ln();if(typeof t=="function"){var a=t;if(t=a(),gs){Ze(!0);try{a()}finally{Ze(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ji,lastRenderedState:t},n}function Om(t,n,a,o){return t.baseState=a,df(t,Vt,typeof o=="function"?o:Ji)}function yS(t,n,a,o,u){if(Il(t))throw Error(s(485));if(t=n.action,t!==null){var d={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){d.listeners.push(S)}};B.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,Pm(n,d)):(d.next=a.next,n.pending=a.next=d)}}function Pm(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var d=B.T,S={};B.T=S;try{var R=a(u,o),F=B.S;F!==null&&F(S,R),zm(t,n,R)}catch(ae){gf(t,n,ae)}finally{d!==null&&S.types!==null&&(d.types=S.types),B.T=d}}else try{d=a(u,o),zm(t,n,d)}catch(ae){gf(t,n,ae)}}function zm(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Bm(t,n,o)},function(o){return gf(t,n,o)}):Bm(t,n,a)}function Bm(t,n,a){n.status="fulfilled",n.value=a,Fm(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Pm(t,a)))}function gf(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Fm(n),n=n.next;while(n!==o)}t.action=null}function Fm(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Im(t,n){return n}function Hm(t,n){if(Mt){var a=Wt.formState;if(a!==null){e:{var o=lt;if(Mt){if(qt){t:{for(var u=qt,d=fi;u.nodeType!==8;){if(!d){u=null;break t}if(u=di(u.nextSibling),u===null){u=null;break t}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){qt=di(u.nextSibling),o=u.data==="F!";break e}}Aa(o)}o=!1}o&&(n=a[0])}}return a=Ln(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Im,lastRenderedState:n},a.queue=o,a=sg.bind(null,lt,o),o.dispatch=a,o=mf(!1),d=Mf.bind(null,lt,!1,o.queue),o=Ln(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=yS.bind(null,lt,u,d,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function Gm(t){var n=sn();return Vm(n,Vt,t)}function Vm(t,n,a){if(n=df(t,n,Im)[0],t=zl(Ji)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=ho(n)}catch(S){throw S===Ys?Al:S}else o=n;n=sn();var u=n.queue,d=u.dispatch;return a!==n.memoizedState&&(lt.flags|=2048,$s(9,{destroy:void 0},MS.bind(null,u,a),null)),[o,d,t]}function MS(t,n){t.action=n}function km(t){var n=sn(),a=Vt;if(a!==null)return Vm(n,a,t);sn(),n=n.memoizedState,a=sn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function $s(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=lt.updateQueue,n===null&&(n=Ol(),lt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Xm(){return sn().memoizedState}function Bl(t,n,a,o){var u=Ln();lt.flags|=t,u.memoizedState=$s(1|n,{destroy:void 0},a,o===void 0?null:o)}function Fl(t,n,a,o){var u=sn();o=o===void 0?null:o;var d=u.memoizedState.inst;Vt!==null&&o!==null&&of(o,Vt.memoizedState.deps)?u.memoizedState=$s(n,d,a,o):(lt.flags|=t,u.memoizedState=$s(1|n,d,a,o))}function jm(t,n){Bl(8390656,8,t,n)}function vf(t,n){Fl(2048,8,t,n)}function ES(t){lt.flags|=4;var n=lt.updateQueue;if(n===null)n=Ol(),lt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Wm(t){var n=sn().memoizedState;return ES({ref:n,nextImpl:t}),function(){if((Pt&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function qm(t,n){return Fl(4,2,t,n)}function Ym(t,n){return Fl(4,4,t,n)}function Zm(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Km(t,n,a){a=a!=null?a.concat([t]):null,Fl(4,4,Zm.bind(null,n,t),a)}function _f(){}function Qm(t,n){var a=sn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&of(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Jm(t,n){var a=sn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&of(n,o[1]))return o[0];if(o=t(),gs){Ze(!0);try{t()}finally{Ze(!1)}}return a.memoizedState=[o,n],o}function xf(t,n,a){return a===void 0||(Qi&1073741824)!==0&&(St&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=$g(),lt.lanes|=t,Pa|=t,a)}function $m(t,n,a,o){return Qn(a,n)?a:Ks.current!==null?(t=xf(t,a,o),Qn(t,n)||(un=!0),t):(Qi&42)===0||(Qi&1073741824)!==0&&(St&261930)===0?(un=!0,t.memoizedState=a):(t=$g(),lt.lanes|=t,Pa|=t,n)}function eg(t,n,a,o,u){var d=$.p;$.p=d!==0&&8>d?d:8;var S=B.T,R={};B.T=R,Mf(t,!1,n,a);try{var F=u(),ae=B.S;if(ae!==null&&ae(R,F),F!==null&&typeof F=="object"&&typeof F.then=="function"){var ge=_S(F,o);po(t,n,ge,ii(t))}else po(t,n,o,ii(t))}catch(_e){po(t,n,{then:function(){},status:"rejected",reason:_e},ii())}finally{$.p=d,S!==null&&R.types!==null&&(S.types=R.types),B.T=S}}function TS(){}function Sf(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=tg(t).queue;eg(t,u,n,J,a===null?TS:function(){return ng(t),a(o)})}function tg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:J,baseState:J,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ji,lastRenderedState:J},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ji,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function ng(t){var n=tg(t);n.next===null&&(n=t.alternate.memoizedState),po(t,n.next.queue,{},ii())}function yf(){return Tn(Uo)}function ig(){return sn().memoizedState}function ag(){return sn().memoizedState}function bS(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ii();t=wa(a);var o=Da(n,t,a);o!==null&&(jn(o,n,a),lo(o,n,a)),n={cache:Zu()},t.payload=n;return}n=n.return}}function AS(t,n,a){var o=ii();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Il(t)?rg(n,a):(a=Fu(t,n,a,o),a!==null&&(jn(a,t,o),og(a,n,o)))}function sg(t,n,a){var o=ii();po(t,n,a,o)}function po(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Il(t))rg(n,u);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var S=n.lastRenderedState,R=d(S,a);if(u.hasEagerState=!0,u.eagerState=R,Qn(R,S))return xl(t,n,u,0),Wt===null&&_l(),!1}catch{}finally{}if(a=Fu(t,n,u,o),a!==null)return jn(a,t,o),og(a,n,o),!0}return!1}function Mf(t,n,a,o){if(o={lane:2,revertLane:eh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Il(t)){if(n)throw Error(s(479))}else n=Fu(t,a,o,2),n!==null&&jn(n,t,2)}function Il(t){var n=t.alternate;return t===lt||n!==null&&n===lt}function rg(t,n){Qs=Nl=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function og(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,kr(t,a)}}var mo={readContext:Tn,use:Pl,useCallback:tn,useContext:tn,useEffect:tn,useImperativeHandle:tn,useLayoutEffect:tn,useInsertionEffect:tn,useMemo:tn,useReducer:tn,useRef:tn,useState:tn,useDebugValue:tn,useDeferredValue:tn,useTransition:tn,useSyncExternalStore:tn,useId:tn,useHostTransitionStatus:tn,useFormState:tn,useActionState:tn,useOptimistic:tn,useMemoCache:tn,useCacheRefresh:tn};mo.useEffectEvent=tn;var lg={readContext:Tn,use:Pl,useCallback:function(t,n){return Ln().memoizedState=[t,n===void 0?null:n],t},useContext:Tn,useEffect:jm,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Bl(4194308,4,Zm.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Bl(4194308,4,t,n)},useInsertionEffect:function(t,n){Bl(4,2,t,n)},useMemo:function(t,n){var a=Ln();n=n===void 0?null:n;var o=t();if(gs){Ze(!0);try{t()}finally{Ze(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=Ln();if(a!==void 0){var u=a(n);if(gs){Ze(!0);try{a(n)}finally{Ze(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=AS.bind(null,lt,t),[o.memoizedState,t]},useRef:function(t){var n=Ln();return t={current:t},n.memoizedState=t},useState:function(t){t=mf(t);var n=t.queue,a=sg.bind(null,lt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:_f,useDeferredValue:function(t,n){var a=Ln();return xf(a,t,n)},useTransition:function(){var t=mf(!1);return t=eg.bind(null,lt,t.queue,!0,!1),Ln().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=lt,u=Ln();if(Mt){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Wt===null)throw Error(s(349));(St&127)!==0||wm(o,n,a)}u.memoizedState=a;var d={value:a,getSnapshot:n};return u.queue=d,jm(Um.bind(null,o,d,t),[t]),o.flags|=2048,$s(9,{destroy:void 0},Dm.bind(null,o,d,a,n),null),a},useId:function(){var t=Ln(),n=Wt.identifierPrefix;if(Mt){var a=Oi,o=Li;a=(o&~(1<<32-Ge(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Ll++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=xS++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:yf,useFormState:Hm,useActionState:Hm,useOptimistic:function(t){var n=Ln();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Mf.bind(null,lt,!0,a),a.dispatch=n,[t,n]},useMemoCache:hf,useCacheRefresh:function(){return Ln().memoizedState=bS.bind(null,lt)},useEffectEvent:function(t){var n=Ln(),a={impl:t};return n.memoizedState=a,function(){if((Pt&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Ef={readContext:Tn,use:Pl,useCallback:Qm,useContext:Tn,useEffect:vf,useImperativeHandle:Km,useInsertionEffect:qm,useLayoutEffect:Ym,useMemo:Jm,useReducer:zl,useRef:Xm,useState:function(){return zl(Ji)},useDebugValue:_f,useDeferredValue:function(t,n){var a=sn();return $m(a,Vt.memoizedState,t,n)},useTransition:function(){var t=zl(Ji)[0],n=sn().memoizedState;return[typeof t=="boolean"?t:ho(t),n]},useSyncExternalStore:Cm,useId:ig,useHostTransitionStatus:yf,useFormState:Gm,useActionState:Gm,useOptimistic:function(t,n){var a=sn();return Om(a,Vt,t,n)},useMemoCache:hf,useCacheRefresh:ag};Ef.useEffectEvent=Wm;var cg={readContext:Tn,use:Pl,useCallback:Qm,useContext:Tn,useEffect:vf,useImperativeHandle:Km,useInsertionEffect:qm,useLayoutEffect:Ym,useMemo:Jm,useReducer:pf,useRef:Xm,useState:function(){return pf(Ji)},useDebugValue:_f,useDeferredValue:function(t,n){var a=sn();return Vt===null?xf(a,t,n):$m(a,Vt.memoizedState,t,n)},useTransition:function(){var t=pf(Ji)[0],n=sn().memoizedState;return[typeof t=="boolean"?t:ho(t),n]},useSyncExternalStore:Cm,useId:ig,useHostTransitionStatus:yf,useFormState:km,useActionState:km,useOptimistic:function(t,n){var a=sn();return Vt!==null?Om(a,Vt,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:hf,useCacheRefresh:ag};cg.useEffectEvent=Wm;function Tf(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:g({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var bf={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=ii(),u=wa(o);u.payload=n,a!=null&&(u.callback=a),n=Da(t,u,o),n!==null&&(jn(n,t,o),lo(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=ii(),u=wa(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Da(t,u,o),n!==null&&(jn(n,t,o),lo(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ii(),o=wa(a);o.tag=2,n!=null&&(o.callback=n),n=Da(t,o,a),n!==null&&(jn(n,t,a),lo(n,t,a))}};function ug(t,n,a,o,u,d,S){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,d,S):n.prototype&&n.prototype.isPureReactComponent?!eo(a,o)||!eo(u,d):!0}function fg(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&bf.enqueueReplaceState(n,n.state,null)}function vs(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=g({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function hg(t){vl(t)}function dg(t){console.error(t)}function pg(t){vl(t)}function Hl(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function mg(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Af(t,n,a){return a=wa(a),a.tag=3,a.payload={element:null},a.callback=function(){Hl(t,n)},a}function gg(t){return t=wa(t),t.tag=3,t}function vg(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;t.payload=function(){return u(d)},t.callback=function(){mg(n,a,o)}}var S=a.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(t.callback=function(){mg(n,a,o),typeof u!="function"&&(za===null?za=new Set([this]):za.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function RS(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&js(n,a,u,!0),a=$n.current,a!==null){switch(a.tag){case 31:case 13:return hi===null?Jl():a.alternate===null&&nn===0&&(nn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Rl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Qf(t,o,u)),!1;case 22:return a.flags|=65536,o===Rl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Qf(t,o,u)),!1}throw Error(s(435,a.tag))}return Qf(t,o,u),Jl(),!1}if(Mt)return n=$n.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Xu&&(t=Error(s(422),{cause:o}),io(li(t,a)))):(o!==Xu&&(n=Error(s(423),{cause:o}),io(li(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=li(o,a),u=Af(t.stateNode,o,u),tf(t,u),nn!==4&&(nn=2)),!1;var d=Error(s(520),{cause:o});if(d=li(d,a),Eo===null?Eo=[d]:Eo.push(d),nn!==4&&(nn=2),n===null)return!0;o=li(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Af(a.stateNode,o,t),tf(a,t),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(za===null||!za.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=gg(u),vg(u,t,a,o),tf(a,u),!1}a=a.return}while(a!==null);return!1}var Rf=Error(s(461)),un=!1;function bn(t,n,a,o){n.child=t===null?ym(n,null,a,o):ms(n,t.child,a,o)}function _g(t,n,a,o,u){a=a.render;var d=n.ref;if("ref"in o){var S={};for(var R in o)R!=="ref"&&(S[R]=o[R])}else S=o;return fs(n),o=lf(t,n,a,S,d,u),R=cf(),t!==null&&!un?(uf(t,n,u),$i(t,n,u)):(Mt&&R&&Vu(n),n.flags|=1,bn(t,n,o,u),n.child)}function xg(t,n,a,o,u){if(t===null){var d=a.type;return typeof d=="function"&&!Iu(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,Sg(t,n,d,o,u)):(t=yl(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(d=t.child,!Pf(t,u)){var S=d.memoizedProps;if(a=a.compare,a=a!==null?a:eo,a(S,o)&&t.ref===n.ref)return $i(t,n,u)}return n.flags|=1,t=qi(d,o),t.ref=n.ref,t.return=n,n.child=t}function Sg(t,n,a,o,u){if(t!==null){var d=t.memoizedProps;if(eo(d,o)&&t.ref===n.ref)if(un=!1,n.pendingProps=o=d,Pf(t,u))(t.flags&131072)!==0&&(un=!0);else return n.lanes=t.lanes,$i(t,n,u)}return Cf(t,n,a,o,u)}function yg(t,n,a,o){var u=o.children,d=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,n.child=null;return Mg(t,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&bl(n,d!==null?d.cachePool:null),d!==null?Tm(n,d):af(),bm(n);else return o=n.lanes=536870912,Mg(t,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(bl(n,d.cachePool),Tm(n,d),Na(),n.memoizedState=null):(t!==null&&bl(n,null),af(),Na());return bn(t,n,u,a),n.child}function go(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Mg(t,n,a,o,u){var d=Qu();return d=d===null?null:{parent:ln._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},t!==null&&bl(n,null),af(),bm(n),t!==null&&js(t,n,o,!0),n.childLanes=u,null}function Gl(t,n){return n=kl({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function Eg(t,n,a){return ms(n,t.child,null,a),t=Gl(n,n.pendingProps),t.flags|=2,ei(n),n.memoizedState=null,t}function CS(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Mt){if(o.mode==="hidden")return t=Gl(n,o),n.lanes=536870912,go(null,t);if(rf(n),(t=qt)?(t=Pv(t,fi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ta!==null?{id:Li,overflow:Oi}:null,retryLane:536870912,hydrationErrors:null},a=rm(t),a.return=n,n.child=a,En=n,qt=null)):t=null,t===null)throw Aa(n);return n.lanes=536870912,null}return Gl(n,o)}var d=t.memoizedState;if(d!==null){var S=d.dehydrated;if(rf(n),u)if(n.flags&256)n.flags&=-257,n=Eg(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(un||js(t,n,a,!1),u=(a&t.childLanes)!==0,un||u){if(o=Wt,o!==null&&(S=Ni(o,a),S!==0&&S!==d.retryLane))throw d.retryLane=S,os(t,S),jn(o,t,S),Rf;Jl(),n=Eg(t,n,a)}else t=d.treeContext,qt=di(S.nextSibling),En=n,Mt=!0,ba=null,fi=!1,t!==null&&cm(n,t),n=Gl(n,o),n.flags|=4096;return n}return t=qi(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Vl(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Cf(t,n,a,o,u){return fs(n),a=lf(t,n,a,o,void 0,u),o=cf(),t!==null&&!un?(uf(t,n,u),$i(t,n,u)):(Mt&&o&&Vu(n),n.flags|=1,bn(t,n,a,u),n.child)}function Tg(t,n,a,o,u,d){return fs(n),n.updateQueue=null,a=Rm(n,o,a,u),Am(t),o=cf(),t!==null&&!un?(uf(t,n,d),$i(t,n,d)):(Mt&&o&&Vu(n),n.flags|=1,bn(t,n,a,d),n.child)}function bg(t,n,a,o,u){if(fs(n),n.stateNode===null){var d=Gs,S=a.contextType;typeof S=="object"&&S!==null&&(d=Tn(S)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=bf,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},$u(n),S=a.contextType,d.context=typeof S=="object"&&S!==null?Tn(S):Gs,d.state=n.memoizedState,S=a.getDerivedStateFromProps,typeof S=="function"&&(Tf(n,a,S,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(S=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),S!==d.state&&bf.enqueueReplaceState(d,d.state,null),uo(n,o,d,u),co(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){d=n.stateNode;var R=n.memoizedProps,F=vs(a,R);d.props=F;var ae=d.context,ge=a.contextType;S=Gs,typeof ge=="object"&&ge!==null&&(S=Tn(ge));var _e=a.getDerivedStateFromProps;ge=typeof _e=="function"||typeof d.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,ge||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(R||ae!==S)&&fg(n,d,o,S),Ca=!1;var se=n.memoizedState;d.state=se,uo(n,o,d,u),co(),ae=n.memoizedState,R||se!==ae||Ca?(typeof _e=="function"&&(Tf(n,a,_e,o),ae=n.memoizedState),(F=Ca||ug(n,a,F,o,se,ae,S))?(ge||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ae),d.props=o,d.state=ae,d.context=S,o=F):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,ef(t,n),S=n.memoizedProps,ge=vs(a,S),d.props=ge,_e=n.pendingProps,se=d.context,ae=a.contextType,F=Gs,typeof ae=="object"&&ae!==null&&(F=Tn(ae)),R=a.getDerivedStateFromProps,(ae=typeof R=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(S!==_e||se!==F)&&fg(n,d,o,F),Ca=!1,se=n.memoizedState,d.state=se,uo(n,o,d,u),co();var fe=n.memoizedState;S!==_e||se!==fe||Ca||t!==null&&t.dependencies!==null&&El(t.dependencies)?(typeof R=="function"&&(Tf(n,a,R,o),fe=n.memoizedState),(ge=Ca||ug(n,a,ge,o,se,fe,F)||t!==null&&t.dependencies!==null&&El(t.dependencies))?(ae||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,fe,F),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,fe,F)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||S===t.memoizedProps&&se===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===t.memoizedProps&&se===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=fe),d.props=o,d.state=fe,d.context=F,o=ge):(typeof d.componentDidUpdate!="function"||S===t.memoizedProps&&se===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||S===t.memoizedProps&&se===t.memoizedState||(n.flags|=1024),o=!1)}return d=o,Vl(t,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,t!==null&&o?(n.child=ms(n,t.child,null,u),n.child=ms(n,null,a,u)):bn(t,n,a,u),n.memoizedState=d.state,t=n.child):t=$i(t,n,u),t}function Ag(t,n,a,o){return cs(),n.flags|=256,bn(t,n,a,o),n.child}var wf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Df(t){return{baseLanes:t,cachePool:mm()}}function Uf(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=ni),t}function Rg(t,n,a){var o=n.pendingProps,u=!1,d=(n.flags&128)!==0,S;if((S=d)||(S=t!==null&&t.memoizedState===null?!1:(an.current&2)!==0),S&&(u=!0,n.flags&=-129),S=(n.flags&32)!==0,n.flags&=-33,t===null){if(Mt){if(u?Ua(n):Na(),(t=qt)?(t=Pv(t,fi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ta!==null?{id:Li,overflow:Oi}:null,retryLane:536870912,hydrationErrors:null},a=rm(t),a.return=n,n.child=a,En=n,qt=null)):t=null,t===null)throw Aa(n);return dh(t)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,u?(Na(),u=n.mode,R=kl({mode:"hidden",children:R},u),o=ls(o,u,a,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=Df(a),o.childLanes=Uf(t,S,a),n.memoizedState=wf,go(null,o)):(Ua(n),Nf(n,R))}var F=t.memoizedState;if(F!==null&&(R=F.dehydrated,R!==null)){if(d)n.flags&256?(Ua(n),n.flags&=-257,n=Lf(t,n,a)):n.memoizedState!==null?(Na(),n.child=t.child,n.flags|=128,n=null):(Na(),R=o.fallback,u=n.mode,o=kl({mode:"visible",children:o.children},u),R=ls(R,u,a,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,ms(n,t.child,null,a),o=n.child,o.memoizedState=Df(a),o.childLanes=Uf(t,S,a),n.memoizedState=wf,n=go(null,o));else if(Ua(n),dh(R)){if(S=R.nextSibling&&R.nextSibling.dataset,S)var ae=S.dgst;S=ae,o=Error(s(419)),o.stack="",o.digest=S,io({value:o,source:null,stack:null}),n=Lf(t,n,a)}else if(un||js(t,n,a,!1),S=(a&t.childLanes)!==0,un||S){if(S=Wt,S!==null&&(o=Ni(S,a),o!==0&&o!==F.retryLane))throw F.retryLane=o,os(t,o),jn(S,t,o),Rf;hh(R)||Jl(),n=Lf(t,n,a)}else hh(R)?(n.flags|=192,n.child=t.child,n=null):(t=F.treeContext,qt=di(R.nextSibling),En=n,Mt=!0,ba=null,fi=!1,t!==null&&cm(n,t),n=Nf(n,o.children),n.flags|=4096);return n}return u?(Na(),R=o.fallback,u=n.mode,F=t.child,ae=F.sibling,o=qi(F,{mode:"hidden",children:o.children}),o.subtreeFlags=F.subtreeFlags&65011712,ae!==null?R=qi(ae,R):(R=ls(R,u,a,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,go(null,o),o=n.child,R=t.child.memoizedState,R===null?R=Df(a):(u=R.cachePool,u!==null?(F=ln._currentValue,u=u.parent!==F?{parent:F,pool:F}:u):u=mm(),R={baseLanes:R.baseLanes|a,cachePool:u}),o.memoizedState=R,o.childLanes=Uf(t,S,a),n.memoizedState=wf,go(t.child,o)):(Ua(n),a=t.child,t=a.sibling,a=qi(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(S=n.deletions,S===null?(n.deletions=[t],n.flags|=16):S.push(t)),n.child=a,n.memoizedState=null,a)}function Nf(t,n){return n=kl({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function kl(t,n){return t=Jn(22,t,null,n),t.lanes=0,t}function Lf(t,n,a){return ms(n,t.child,null,a),t=Nf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function Cg(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),qu(t.return,n,a)}function Of(t,n,a,o,u,d){var S=t.memoizedState;S===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(S.isBackwards=n,S.rendering=null,S.renderingStartTime=0,S.last=o,S.tail=a,S.tailMode=u,S.treeForkCount=d)}function wg(t,n,a){var o=n.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var S=an.current,R=(S&2)!==0;if(R?(S=S&1|2,n.flags|=128):S&=1,ye(an,S),bn(t,n,o,a),o=Mt?no:0,!R&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Cg(t,a,n);else if(t.tag===19)Cg(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&Ul(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Of(n,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&Ul(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Of(n,!0,a,null,d,o);break;case"together":Of(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function $i(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Pa|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(js(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=qi(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=qi(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Pf(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&El(t)))}function wS(t,n,a){switch(n.tag){case 3:Oe(n,n.stateNode.containerInfo),Ra(n,ln,t.memoizedState.cache),cs();break;case 27:case 5:Qe(n);break;case 4:Oe(n,n.stateNode.containerInfo);break;case 10:Ra(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,rf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Ua(n),n.flags|=128,null):(a&n.child.childLanes)!==0?Rg(t,n,a):(Ua(n),t=$i(t,n,a),t!==null?t.sibling:null);Ua(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(js(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return wg(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),ye(an,an.current),o)break;return null;case 22:return n.lanes=0,yg(t,n,a,n.pendingProps);case 24:Ra(n,ln,t.memoizedState.cache)}return $i(t,n,a)}function Dg(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)un=!0;else{if(!Pf(t,a)&&(n.flags&128)===0)return un=!1,wS(t,n,a);un=(t.flags&131072)!==0}else un=!1,Mt&&(n.flags&1048576)!==0&&lm(n,no,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=ds(n.elementType),n.type=t,typeof t=="function")Iu(t)?(o=vs(t,o),n.tag=1,n=bg(null,n,t,o,a)):(n.tag=0,n=Cf(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===D){n.tag=11,n=_g(null,n,t,o,a);break e}else if(u===z){n.tag=14,n=xg(null,n,t,o,a);break e}}throw n=de(t)||t,Error(s(306,n,""))}}return n;case 0:return Cf(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=vs(o,n.pendingProps),bg(t,n,o,u,a);case 3:e:{if(Oe(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;u=d.element,ef(t,n),uo(n,o,null,a);var S=n.memoizedState;if(o=S.cache,Ra(n,ln,o),o!==d.cache&&Yu(n,[ln],a,!0),co(),o=S.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:S.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=Ag(t,n,o,a);break e}else if(o!==u){u=li(Error(s(424)),n),io(u),n=Ag(t,n,o,a);break e}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(qt=di(t.firstChild),En=n,Mt=!0,ba=null,fi=!0,a=ym(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(cs(),o===u){n=$i(t,n,a);break e}bn(t,n,o,a)}n=n.child}return n;case 26:return Vl(t,n),t===null?(a=Gv(n.type,null,n.pendingProps,null))?n.memoizedState=a:Mt||(a=n.type,t=n.pendingProps,o=sc(Re.current).createElement(a),o[$t]=n,o[yn]=t,An(o,a,t),q(o),n.stateNode=o):n.memoizedState=Gv(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return Qe(n),t===null&&Mt&&(o=n.stateNode=Fv(n.type,n.pendingProps,Re.current),En=n,fi=!0,u=qt,Ha(n.type)?(ph=u,qt=di(o.firstChild)):qt=u),bn(t,n,n.pendingProps.children,a),Vl(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Mt&&((u=o=qt)&&(o=sy(o,n.type,n.pendingProps,fi),o!==null?(n.stateNode=o,En=n,qt=di(o.firstChild),fi=!1,u=!0):u=!1),u||Aa(n)),Qe(n),u=n.type,d=n.pendingProps,S=t!==null?t.memoizedProps:null,o=d.children,ch(u,d)?o=null:S!==null&&ch(u,S)&&(n.flags|=32),n.memoizedState!==null&&(u=lf(t,n,SS,null,null,a),Uo._currentValue=u),Vl(t,n),bn(t,n,o,a),n.child;case 6:return t===null&&Mt&&((t=a=qt)&&(a=ry(a,n.pendingProps,fi),a!==null?(n.stateNode=a,En=n,qt=null,t=!0):t=!1),t||Aa(n)),null;case 13:return Rg(t,n,a);case 4:return Oe(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=ms(n,null,o,a):bn(t,n,o,a),n.child;case 11:return _g(t,n,n.type,n.pendingProps,a);case 7:return bn(t,n,n.pendingProps,a),n.child;case 8:return bn(t,n,n.pendingProps.children,a),n.child;case 12:return bn(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ra(n,n.type,o.value),bn(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,fs(n),u=Tn(u),o=o(u),n.flags|=1,bn(t,n,o,a),n.child;case 14:return xg(t,n,n.type,n.pendingProps,a);case 15:return Sg(t,n,n.type,n.pendingProps,a);case 19:return wg(t,n,a);case 31:return CS(t,n,a);case 22:return yg(t,n,a,n.pendingProps);case 24:return fs(n),o=Tn(ln),t===null?(u=Qu(),u===null&&(u=Wt,d=Zu(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),n.memoizedState={parent:o,cache:u},$u(n),Ra(n,ln,u)):((t.lanes&a)!==0&&(ef(t,n),uo(n,null,null,a),co()),u=t.memoizedState,d=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ra(n,ln,o)):(o=d.cache,Ra(n,ln,o),o!==u.cache&&Yu(n,[ln],a,!0))),bn(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function ea(t){t.flags|=4}function zf(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(iv())t.flags|=8192;else throw ps=Rl,Ju}else t.flags&=-16777217}function Ug(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Wv(n))if(iv())t.flags|=8192;else throw ps=Rl,Ju}function Xl(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?It():536870912,t.lanes|=n,ir|=n)}function vo(t,n){if(!Mt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function Yt(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function DS(t,n,a){var o=n.pendingProps;switch(ku(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Yt(n),null;case 1:return Yt(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Ki(ln),qe(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Xs(n)?ea(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,ju())),Yt(n),null;case 26:var u=n.type,d=n.memoizedState;return t===null?(ea(n),d!==null?(Yt(n),Ug(n,d)):(Yt(n),zf(n,u,null,o,a))):d?d!==t.memoizedState?(ea(n),Yt(n),Ug(n,d)):(Yt(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&ea(n),Yt(n),zf(n,u,t,o,a)),null;case 27:if(Ot(n),a=Re.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ea(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Yt(n),null}t=K.current,Xs(n)?um(n):(t=Fv(u,o,a),n.stateNode=t,ea(n))}return Yt(n),null;case 5:if(Ot(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&ea(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Yt(n),null}if(d=K.current,Xs(n))um(n);else{var S=sc(Re.current);switch(d){case 1:d=S.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=S.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=S.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=S.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?S.createElement("select",{is:o.is}):S.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?S.createElement(u,{is:o.is}):S.createElement(u)}}d[$t]=n,d[yn]=o;e:for(S=n.child;S!==null;){if(S.tag===5||S.tag===6)d.appendChild(S.stateNode);else if(S.tag!==4&&S.tag!==27&&S.child!==null){S.child.return=S,S=S.child;continue}if(S===n)break e;for(;S.sibling===null;){if(S.return===null||S.return===n)break e;S=S.return}S.sibling.return=S.return,S=S.sibling}n.stateNode=d;e:switch(An(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&ea(n)}}return Yt(n),zf(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&ea(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=Re.current,Xs(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=En,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[$t]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||Rv(t.nodeValue,a)),t||Aa(n,!0)}else t=sc(t).createTextNode(o),t[$t]=n,n.stateNode=t}return Yt(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=Xs(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[$t]=n}else cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Yt(n),t=!1}else a=ju(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(ei(n),n):(ei(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Yt(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=Xs(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[$t]=n}else cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Yt(n),u=!1}else u=ju(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ei(n),n):(ei(n),null)}return ei(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Xl(n,n.updateQueue),Yt(n),null);case 4:return qe(),t===null&&ah(n.stateNode.containerInfo),Yt(n),null;case 10:return Ki(n.type),Yt(n),null;case 19:if(re(an),o=n.memoizedState,o===null)return Yt(n),null;if(u=(n.flags&128)!==0,d=o.rendering,d===null)if(u)vo(o,!1);else{if(nn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(d=Ul(t),d!==null){for(n.flags|=128,vo(o,!1),t=d.updateQueue,n.updateQueue=t,Xl(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)sm(a,t),a=a.sibling;return ye(an,an.current&1|2),Mt&&Yi(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&T()>Zl&&(n.flags|=128,u=!0,vo(o,!1),n.lanes=4194304)}else{if(!u)if(t=Ul(d),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Xl(n,t),vo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Mt)return Yt(n),null}else 2*T()-o.renderingStartTime>Zl&&a!==536870912&&(n.flags|=128,u=!0,vo(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(t=o.last,t!==null?t.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=T(),t.sibling=null,a=an.current,ye(an,u?a&1|2:a&1),Mt&&Yi(n,o.treeForkCount),t):(Yt(n),null);case 22:case 23:return ei(n),sf(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Yt(n),n.subtreeFlags&6&&(n.flags|=8192)):Yt(n),a=n.updateQueue,a!==null&&Xl(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&re(hs),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Ki(ln),Yt(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function US(t,n){switch(ku(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Ki(ln),qe(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Ot(n),null;case 31:if(n.memoizedState!==null){if(ei(n),n.alternate===null)throw Error(s(340));cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(ei(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return re(an),null;case 4:return qe(),null;case 10:return Ki(n.type),null;case 22:case 23:return ei(n),sf(),t!==null&&re(hs),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Ki(ln),null;case 25:return null;default:return null}}function Ng(t,n){switch(ku(n),n.tag){case 3:Ki(ln),qe();break;case 26:case 27:case 5:Ot(n);break;case 4:qe();break;case 31:n.memoizedState!==null&&ei(n);break;case 13:ei(n);break;case 19:re(an);break;case 10:Ki(n.type);break;case 22:case 23:ei(n),sf(),t!==null&&re(hs);break;case 24:Ki(ln)}}function _o(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var d=a.create,S=a.inst;o=d(),S.destroy=o}a=a.next}while(a!==u)}}catch(R){Ft(n,n.return,R)}}function La(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&t)===t){var S=o.inst,R=S.destroy;if(R!==void 0){S.destroy=void 0,u=n;var F=a,ae=R;try{ae()}catch(ge){Ft(u,F,ge)}}}o=o.next}while(o!==d)}}catch(ge){Ft(n,n.return,ge)}}function Lg(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{Em(n,a)}catch(o){Ft(t,t.return,o)}}}function Og(t,n,a){a.props=vs(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){Ft(t,n,o)}}function xo(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){Ft(t,n,u)}}function Pi(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Ft(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Ft(t,n,u)}else a.current=null}function Pg(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Ft(t,t.return,u)}}function Bf(t,n,a){try{var o=t.stateNode;$S(o,t.type,a,n),o[yn]=n}catch(u){Ft(t,t.return,u)}}function zg(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ha(t.type)||t.tag===4}function Ff(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||zg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ha(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function If(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=ji));else if(o!==4&&(o===27&&Ha(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(If(t,n,a),t=t.sibling;t!==null;)If(t,n,a),t=t.sibling}function jl(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&Ha(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(jl(t,n,a),t=t.sibling;t!==null;)jl(t,n,a),t=t.sibling}function Bg(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);An(n,o,a),n[$t]=t,n[yn]=a}catch(d){Ft(t,t.return,d)}}var ta=!1,fn=!1,Hf=!1,Fg=typeof WeakSet=="function"?WeakSet:Set,_n=null;function NS(t,n){if(t=t.containerInfo,oh=hc,t=Kp(t),Nu(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var S=0,R=-1,F=-1,ae=0,ge=0,_e=t,se=null;t:for(;;){for(var fe;_e!==a||u!==0&&_e.nodeType!==3||(R=S+u),_e!==d||o!==0&&_e.nodeType!==3||(F=S+o),_e.nodeType===3&&(S+=_e.nodeValue.length),(fe=_e.firstChild)!==null;)se=_e,_e=fe;for(;;){if(_e===t)break t;if(se===a&&++ae===u&&(R=S),se===d&&++ge===o&&(F=S),(fe=_e.nextSibling)!==null)break;_e=se,se=_e.parentNode}_e=fe}a=R===-1||F===-1?null:{start:R,end:F}}else a=null}a=a||{start:0,end:0}}else a=null;for(lh={focusedElem:t,selectionRange:a},hc=!1,_n=n;_n!==null;)if(n=_n,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,_n=t;else for(;_n!==null;){switch(n=_n,d=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,a=n,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var Xe=vs(a.type,u);t=o.getSnapshotBeforeUpdate(Xe,d),o.__reactInternalSnapshotBeforeUpdate=t}catch(et){Ft(a,a.return,et)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)fh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":fh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,_n=t;break}_n=n.return}}function Ig(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ia(t,a),o&4&&_o(5,a);break;case 1:if(ia(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(S){Ft(a,a.return,S)}else{var u=vs(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(S){Ft(a,a.return,S)}}o&64&&Lg(a),o&512&&xo(a,a.return);break;case 3:if(ia(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Em(t,n)}catch(S){Ft(a,a.return,S)}}break;case 27:n===null&&o&4&&Bg(a);case 26:case 5:ia(t,a),n===null&&o&4&&Pg(a),o&512&&xo(a,a.return);break;case 12:ia(t,a);break;case 31:ia(t,a),o&4&&Vg(t,a);break;case 13:ia(t,a),o&4&&kg(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=GS.bind(null,a),oy(t,a))));break;case 22:if(o=a.memoizedState!==null||ta,!o){n=n!==null&&n.memoizedState!==null||fn,u=ta;var d=fn;ta=o,(fn=n)&&!d?aa(t,a,(a.subtreeFlags&8772)!==0):ia(t,a),ta=u,fn=d}break;case 30:break;default:ia(t,a)}}function Hg(t){var n=t.alternate;n!==null&&(t.alternate=null,Hg(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Wr(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Zt=null,Gn=!1;function na(t,n,a){for(a=a.child;a!==null;)Gg(t,n,a),a=a.sibling}function Gg(t,n,a){if(Ne&&typeof Ne.onCommitFiberUnmount=="function")try{Ne.onCommitFiberUnmount(Me,a)}catch{}switch(a.tag){case 26:fn||Pi(a,n),na(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:fn||Pi(a,n);var o=Zt,u=Gn;Ha(a.type)&&(Zt=a.stateNode,Gn=!1),na(t,n,a),Co(a.stateNode),Zt=o,Gn=u;break;case 5:fn||Pi(a,n);case 6:if(o=Zt,u=Gn,Zt=null,na(t,n,a),Zt=o,Gn=u,Zt!==null)if(Gn)try{(Zt.nodeType===9?Zt.body:Zt.nodeName==="HTML"?Zt.ownerDocument.body:Zt).removeChild(a.stateNode)}catch(d){Ft(a,n,d)}else try{Zt.removeChild(a.stateNode)}catch(d){Ft(a,n,d)}break;case 18:Zt!==null&&(Gn?(t=Zt,Lv(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),fr(t)):Lv(Zt,a.stateNode));break;case 4:o=Zt,u=Gn,Zt=a.stateNode.containerInfo,Gn=!0,na(t,n,a),Zt=o,Gn=u;break;case 0:case 11:case 14:case 15:La(2,a,n),fn||La(4,a,n),na(t,n,a);break;case 1:fn||(Pi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&Og(a,n,o)),na(t,n,a);break;case 21:na(t,n,a);break;case 22:fn=(o=fn)||a.memoizedState!==null,na(t,n,a),fn=o;break;default:na(t,n,a)}}function Vg(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{fr(t)}catch(a){Ft(n,n.return,a)}}}function kg(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{fr(t)}catch(a){Ft(n,n.return,a)}}function LS(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new Fg),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new Fg),n;default:throw Error(s(435,t.tag))}}function Wl(t,n){var a=LS(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=VS.bind(null,t,o);o.then(u,u)}})}function Vn(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=t,S=n,R=S;e:for(;R!==null;){switch(R.tag){case 27:if(Ha(R.type)){Zt=R.stateNode,Gn=!1;break e}break;case 5:Zt=R.stateNode,Gn=!1;break e;case 3:case 4:Zt=R.stateNode.containerInfo,Gn=!0;break e}R=R.return}if(Zt===null)throw Error(s(160));Gg(d,S,u),Zt=null,Gn=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Xg(n,t),n=n.sibling}var Mi=null;function Xg(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Vn(n,t),kn(t),o&4&&(La(3,t,t.return),_o(3,t),La(5,t,t.return));break;case 1:Vn(n,t),kn(t),o&512&&(fn||a===null||Pi(a,a.return)),o&64&&ta&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Mi;if(Vn(n,t),kn(t),o&512&&(fn||a===null||Pi(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[is]||d[$t]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),An(d,o,a),d[$t]=t,q(d),o=d;break e;case"link":var S=Xv("link","href",u).get(o+(a.href||""));if(S){for(var R=0;R<S.length;R++)if(d=S[R],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){S.splice(R,1);break t}}d=u.createElement(o),An(d,o,a),u.head.appendChild(d);break;case"meta":if(S=Xv("meta","content",u).get(o+(a.content||""))){for(R=0;R<S.length;R++)if(d=S[R],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){S.splice(R,1);break t}}d=u.createElement(o),An(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[$t]=t,q(d),o=d}t.stateNode=o}else jv(u,t.type,t.stateNode);else t.stateNode=kv(u,o,t.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?jv(u,t.type,t.stateNode):kv(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Bf(t,t.memoizedProps,a.memoizedProps)}break;case 27:Vn(n,t),kn(t),o&512&&(fn||a===null||Pi(a,a.return)),a!==null&&o&4&&Bf(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Vn(n,t),kn(t),o&512&&(fn||a===null||Pi(a,a.return)),t.flags&32){u=t.stateNode;try{In(u,"")}catch(Xe){Ft(t,t.return,Xe)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Bf(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Hf=!0);break;case 6:if(Vn(n,t),kn(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(Xe){Ft(t,t.return,Xe)}}break;case 3:if(lc=null,u=Mi,Mi=rc(n.containerInfo),Vn(n,t),Mi=u,kn(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{fr(n.containerInfo)}catch(Xe){Ft(t,t.return,Xe)}Hf&&(Hf=!1,jg(t));break;case 4:o=Mi,Mi=rc(t.stateNode.containerInfo),Vn(n,t),kn(t),Mi=o;break;case 12:Vn(n,t),kn(t);break;case 31:Vn(n,t),kn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Wl(t,o)));break;case 13:Vn(n,t),kn(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Yl=T()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Wl(t,o)));break;case 22:u=t.memoizedState!==null;var F=a!==null&&a.memoizedState!==null,ae=ta,ge=fn;if(ta=ae||u,fn=ge||F,Vn(n,t),fn=ge,ta=ae,kn(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||F||ta||fn||_s(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){F=a=n;try{if(d=F.stateNode,u)S=d.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none";else{R=F.stateNode;var _e=F.memoizedProps.style,se=_e!=null&&_e.hasOwnProperty("display")?_e.display:null;R.style.display=se==null||typeof se=="boolean"?"":(""+se).trim()}}catch(Xe){Ft(F,F.return,Xe)}}}else if(n.tag===6){if(a===null){F=n;try{F.stateNode.nodeValue=u?"":F.memoizedProps}catch(Xe){Ft(F,F.return,Xe)}}}else if(n.tag===18){if(a===null){F=n;try{var fe=F.stateNode;u?Ov(fe,!0):Ov(F.stateNode,!1)}catch(Xe){Ft(F,F.return,Xe)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,Wl(t,a))));break;case 19:Vn(n,t),kn(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,Wl(t,o)));break;case 30:break;case 21:break;default:Vn(n,t),kn(t)}}function kn(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(zg(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Ff(t);jl(t,d,u);break;case 5:var S=a.stateNode;a.flags&32&&(In(S,""),a.flags&=-33);var R=Ff(t);jl(t,R,S);break;case 3:case 4:var F=a.stateNode.containerInfo,ae=Ff(t);If(t,ae,F);break;default:throw Error(s(161))}}catch(ge){Ft(t,t.return,ge)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function jg(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;jg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function ia(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Ig(t,n.alternate,n),n=n.sibling}function _s(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:La(4,n,n.return),_s(n);break;case 1:Pi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Og(n,n.return,a),_s(n);break;case 27:Co(n.stateNode);case 26:case 5:Pi(n,n.return),_s(n);break;case 22:n.memoizedState===null&&_s(n);break;case 30:_s(n);break;default:_s(n)}t=t.sibling}}function aa(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,d=n,S=d.flags;switch(d.tag){case 0:case 11:case 15:aa(u,d,a),_o(4,d);break;case 1:if(aa(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ae){Ft(o,o.return,ae)}if(o=d,u=o.updateQueue,u!==null){var R=o.stateNode;try{var F=u.shared.hiddenCallbacks;if(F!==null)for(u.shared.hiddenCallbacks=null,u=0;u<F.length;u++)Mm(F[u],R)}catch(ae){Ft(o,o.return,ae)}}a&&S&64&&Lg(d),xo(d,d.return);break;case 27:Bg(d);case 26:case 5:aa(u,d,a),a&&o===null&&S&4&&Pg(d),xo(d,d.return);break;case 12:aa(u,d,a);break;case 31:aa(u,d,a),a&&S&4&&Vg(u,d);break;case 13:aa(u,d,a),a&&S&4&&kg(u,d);break;case 22:d.memoizedState===null&&aa(u,d,a),xo(d,d.return);break;case 30:break;default:aa(u,d,a)}n=n.sibling}}function Gf(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&ao(a))}function Vf(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&ao(t))}function Ei(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Wg(t,n,a,o),n=n.sibling}function Wg(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ei(t,n,a,o),u&2048&&_o(9,n);break;case 1:Ei(t,n,a,o);break;case 3:Ei(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&ao(t)));break;case 12:if(u&2048){Ei(t,n,a,o),t=n.stateNode;try{var d=n.memoizedProps,S=d.id,R=d.onPostCommit;typeof R=="function"&&R(S,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(F){Ft(n,n.return,F)}}else Ei(t,n,a,o);break;case 31:Ei(t,n,a,o);break;case 13:Ei(t,n,a,o);break;case 23:break;case 22:d=n.stateNode,S=n.alternate,n.memoizedState!==null?d._visibility&2?Ei(t,n,a,o):So(t,n):d._visibility&2?Ei(t,n,a,o):(d._visibility|=2,er(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Gf(S,n);break;case 24:Ei(t,n,a,o),u&2048&&Vf(n.alternate,n);break;default:Ei(t,n,a,o)}}function er(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=t,S=n,R=a,F=o,ae=S.flags;switch(S.tag){case 0:case 11:case 15:er(d,S,R,F,u),_o(8,S);break;case 23:break;case 22:var ge=S.stateNode;S.memoizedState!==null?ge._visibility&2?er(d,S,R,F,u):So(d,S):(ge._visibility|=2,er(d,S,R,F,u)),u&&ae&2048&&Gf(S.alternate,S);break;case 24:er(d,S,R,F,u),u&&ae&2048&&Vf(S.alternate,S);break;default:er(d,S,R,F,u)}n=n.sibling}}function So(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:So(a,o),u&2048&&Gf(o.alternate,o);break;case 24:So(a,o),u&2048&&Vf(o.alternate,o);break;default:So(a,o)}n=n.sibling}}var yo=8192;function tr(t,n,a){if(t.subtreeFlags&yo)for(t=t.child;t!==null;)qg(t,n,a),t=t.sibling}function qg(t,n,a){switch(t.tag){case 26:tr(t,n,a),t.flags&yo&&t.memoizedState!==null&&xy(a,Mi,t.memoizedState,t.memoizedProps);break;case 5:tr(t,n,a);break;case 3:case 4:var o=Mi;Mi=rc(t.stateNode.containerInfo),tr(t,n,a),Mi=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=yo,yo=16777216,tr(t,n,a),yo=o):tr(t,n,a));break;default:tr(t,n,a)}}function Yg(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Mo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];_n=o,Kg(o,t)}Yg(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Zg(t),t=t.sibling}function Zg(t){switch(t.tag){case 0:case 11:case 15:Mo(t),t.flags&2048&&La(9,t,t.return);break;case 3:Mo(t);break;case 12:Mo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,ql(t)):Mo(t);break;default:Mo(t)}}function ql(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];_n=o,Kg(o,t)}Yg(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:La(8,n,n.return),ql(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,ql(n));break;default:ql(n)}t=t.sibling}}function Kg(t,n){for(;_n!==null;){var a=_n;switch(a.tag){case 0:case 11:case 15:La(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:ao(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,_n=o;else e:for(a=t;_n!==null;){o=_n;var u=o.sibling,d=o.return;if(Hg(o),o===a){_n=null;break e}if(u!==null){u.return=d,_n=u;break e}_n=d}}}var OS={getCacheForType:function(t){var n=Tn(ln),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Tn(ln).controller.signal}},PS=typeof WeakMap=="function"?WeakMap:Map,Pt=0,Wt=null,_t=null,St=0,Bt=0,ti=null,Oa=!1,nr=!1,kf=!1,sa=0,nn=0,Pa=0,xs=0,Xf=0,ni=0,ir=0,Eo=null,Xn=null,jf=!1,Yl=0,Qg=0,Zl=1/0,Kl=null,za=null,pn=0,Ba=null,ar=null,ra=0,Wf=0,qf=null,Jg=null,To=0,Yf=null;function ii(){return(Pt&2)!==0&&St!==0?St&-St:B.T!==null?eh():Xr()}function $g(){if(ni===0)if((St&536870912)===0||Mt){var t=Te;Te<<=1,(Te&3932160)===0&&(Te=262144),ni=t}else ni=536870912;return t=$n.current,t!==null&&(t.flags|=32),ni}function jn(t,n,a){(t===Wt&&(Bt===2||Bt===9)||t.cancelPendingCommit!==null)&&(sr(t,0),Fa(t,St,ni,!1)),Sn(t,a),((Pt&2)===0||t!==Wt)&&(t===Wt&&((Pt&2)===0&&(xs|=a),nn===4&&Fa(t,St,ni,!1)),zi(t))}function ev(t,n,a){if((Pt&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Ve(t,n),u=o?FS(t,n):Kf(t,n,!0),d=o;do{if(u===0){nr&&!o&&Fa(t,n,0,!1);break}else{if(a=t.current.alternate,d&&!zS(a)){u=Kf(t,n,!1),d=!1;continue}if(u===2){if(d=n,t.errorRecoveryDisabledLanes&d)var S=0;else S=t.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){n=S;e:{var R=t;u=Eo;var F=R.current.memoizedState.isDehydrated;if(F&&(sr(R,S).flags|=256),S=Kf(R,S,!1),S!==2){if(kf&&!F){R.errorRecoveryDisabledLanes|=d,xs|=d,u=4;break e}d=Xn,Xn=u,d!==null&&(Xn===null?Xn=d:Xn.push.apply(Xn,d))}u=S}if(d=!1,u!==2)continue}}if(u===1){sr(t,0),Fa(t,n,0,!0);break}e:{switch(o=t,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Fa(o,n,ni,!Oa);break e;case 2:Xn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=Yl+300-T(),10<u)){if(Fa(o,n,ni,!Oa),xe(o,0,!0)!==0)break e;ra=n,o.timeoutHandle=Uv(tv.bind(null,o,a,Xn,Kl,jf,n,ni,xs,ir,Oa,d,"Throttled",-0,0),u);break e}tv(o,a,Xn,Kl,jf,n,ni,xs,ir,Oa,d,null,-0,0)}}break}while(!0);zi(t)}function tv(t,n,a,o,u,d,S,R,F,ae,ge,_e,se,fe){if(t.timeoutHandle=-1,_e=n.subtreeFlags,_e&8192||(_e&16785408)===16785408){_e={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ji},qg(n,d,_e);var Xe=(d&62914560)===d?Yl-T():(d&4194048)===d?Qg-T():0;if(Xe=Sy(_e,Xe),Xe!==null){ra=d,t.cancelPendingCommit=Xe(cv.bind(null,t,n,d,a,o,u,S,R,F,ge,_e,null,se,fe)),Fa(t,d,S,!ae);return}}cv(t,n,d,a,o,u,S,R,F)}function zS(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!Qn(d(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Fa(t,n,a,o){n&=~Xf,n&=~xs,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var d=31-Ge(u),S=1<<d;o[d]=-1,u&=~S}a!==0&&Vr(t,a,n)}function Ql(){return(Pt&6)===0?(bo(0),!1):!0}function Zf(){if(_t!==null){if(Bt===0)var t=_t.return;else t=_t,Zi=us=null,ff(t),Zs=null,ro=0,t=_t;for(;t!==null;)Ng(t.alternate,t),t=t.return;_t=null}}function sr(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,ny(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ra=0,Zf(),Wt=t,_t=a=qi(t.current,null),St=n,Bt=0,ti=null,Oa=!1,nr=Ve(t,n),kf=!1,ir=ni=Xf=xs=Pa=nn=0,Xn=Eo=null,jf=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-Ge(o),d=1<<u;n|=t[u],o&=~d}return sa=n,_l(),a}function nv(t,n){lt=null,B.H=mo,n===Ys||n===Al?(n=_m(),Bt=3):n===Ju?(n=_m(),Bt=4):Bt=n===Rf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ti=n,_t===null&&(nn=1,Hl(t,li(n,t.current)))}function iv(){var t=$n.current;return t===null?!0:(St&4194048)===St?hi===null:(St&62914560)===St||(St&536870912)!==0?t===hi:!1}function av(){var t=B.H;return B.H=mo,t===null?mo:t}function sv(){var t=B.A;return B.A=OS,t}function Jl(){nn=4,Oa||(St&4194048)!==St&&$n.current!==null||(nr=!0),(Pa&134217727)===0&&(xs&134217727)===0||Wt===null||Fa(Wt,St,ni,!1)}function Kf(t,n,a){var o=Pt;Pt|=2;var u=av(),d=sv();(Wt!==t||St!==n)&&(Kl=null,sr(t,n)),n=!1;var S=nn;e:do try{if(Bt!==0&&_t!==null){var R=_t,F=ti;switch(Bt){case 8:Zf(),S=6;break e;case 3:case 2:case 9:case 6:$n.current===null&&(n=!0);var ae=Bt;if(Bt=0,ti=null,rr(t,R,F,ae),a&&nr){S=0;break e}break;default:ae=Bt,Bt=0,ti=null,rr(t,R,F,ae)}}BS(),S=nn;break}catch(ge){nv(t,ge)}while(!0);return n&&t.shellSuspendCounter++,Zi=us=null,Pt=o,B.H=u,B.A=d,_t===null&&(Wt=null,St=0,_l()),S}function BS(){for(;_t!==null;)rv(_t)}function FS(t,n){var a=Pt;Pt|=2;var o=av(),u=sv();Wt!==t||St!==n?(Kl=null,Zl=T()+500,sr(t,n)):nr=Ve(t,n);e:do try{if(Bt!==0&&_t!==null){n=_t;var d=ti;t:switch(Bt){case 1:Bt=0,ti=null,rr(t,n,d,1);break;case 2:case 9:if(gm(d)){Bt=0,ti=null,ov(n);break}n=function(){Bt!==2&&Bt!==9||Wt!==t||(Bt=7),zi(t)},d.then(n,n);break e;case 3:Bt=7;break e;case 4:Bt=5;break e;case 7:gm(d)?(Bt=0,ti=null,ov(n)):(Bt=0,ti=null,rr(t,n,d,7));break;case 5:var S=null;switch(_t.tag){case 26:S=_t.memoizedState;case 5:case 27:var R=_t;if(S?Wv(S):R.stateNode.complete){Bt=0,ti=null;var F=R.sibling;if(F!==null)_t=F;else{var ae=R.return;ae!==null?(_t=ae,$l(ae)):_t=null}break t}}Bt=0,ti=null,rr(t,n,d,5);break;case 6:Bt=0,ti=null,rr(t,n,d,6);break;case 8:Zf(),nn=6;break e;default:throw Error(s(462))}}IS();break}catch(ge){nv(t,ge)}while(!0);return Zi=us=null,B.H=o,B.A=u,Pt=a,_t!==null?0:(Wt=null,St=0,_l(),nn)}function IS(){for(;_t!==null&&!Jt();)rv(_t)}function rv(t){var n=Dg(t.alternate,t,sa);t.memoizedProps=t.pendingProps,n===null?$l(t):_t=n}function ov(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=Tg(a,n,n.pendingProps,n.type,void 0,St);break;case 11:n=Tg(a,n,n.pendingProps,n.type.render,n.ref,St);break;case 5:ff(n);default:Ng(a,n),n=_t=sm(n,sa),n=Dg(a,n,sa)}t.memoizedProps=t.pendingProps,n===null?$l(t):_t=n}function rr(t,n,a,o){Zi=us=null,ff(n),Zs=null,ro=0;var u=n.return;try{if(RS(t,u,n,a,St)){nn=1,Hl(t,li(a,t.current)),_t=null;return}}catch(d){if(u!==null)throw _t=u,d;nn=1,Hl(t,li(a,t.current)),_t=null;return}n.flags&32768?(Mt||o===1?t=!0:nr||(St&536870912)!==0?t=!1:(Oa=t=!0,(o===2||o===9||o===3||o===6)&&(o=$n.current,o!==null&&o.tag===13&&(o.flags|=16384))),lv(n,t)):$l(n)}function $l(t){var n=t;do{if((n.flags&32768)!==0){lv(n,Oa);return}t=n.return;var a=DS(n.alternate,n,sa);if(a!==null){_t=a;return}if(n=n.sibling,n!==null){_t=n;return}_t=n=t}while(n!==null);nn===0&&(nn=5)}function lv(t,n){do{var a=US(t.alternate,t);if(a!==null){a.flags&=32767,_t=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){_t=t;return}_t=t=a}while(t!==null);nn=6,_t=null}function cv(t,n,a,o,u,d,S,R,F){t.cancelPendingCommit=null;do ec();while(pn!==0);if((Pt&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=Bu,_i(t,a,d,S,R,F),t===Wt&&(_t=Wt=null,St=0),ar=n,Ba=t,ra=a,Wf=d,qf=u,Jg=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,kS(k,function(){return pv(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=B.T,B.T=null,u=$.p,$.p=2,S=Pt,Pt|=4;try{NS(t,n,a)}finally{Pt=S,$.p=u,B.T=o}}pn=1,uv(),fv(),hv()}}function uv(){if(pn===1){pn=0;var t=Ba,n=ar,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=B.T,B.T=null;var o=$.p;$.p=2;var u=Pt;Pt|=4;try{Xg(n,t);var d=lh,S=Kp(t.containerInfo),R=d.focusedElem,F=d.selectionRange;if(S!==R&&R&&R.ownerDocument&&Zp(R.ownerDocument.documentElement,R)){if(F!==null&&Nu(R)){var ae=F.start,ge=F.end;if(ge===void 0&&(ge=ae),"selectionStart"in R)R.selectionStart=ae,R.selectionEnd=Math.min(ge,R.value.length);else{var _e=R.ownerDocument||document,se=_e&&_e.defaultView||window;if(se.getSelection){var fe=se.getSelection(),Xe=R.textContent.length,et=Math.min(F.start,Xe),Xt=F.end===void 0?et:Math.min(F.end,Xe);!fe.extend&&et>Xt&&(S=Xt,Xt=et,et=S);var te=Yp(R,et),X=Yp(R,Xt);if(te&&X&&(fe.rangeCount!==1||fe.anchorNode!==te.node||fe.anchorOffset!==te.offset||fe.focusNode!==X.node||fe.focusOffset!==X.offset)){var ie=_e.createRange();ie.setStart(te.node,te.offset),fe.removeAllRanges(),et>Xt?(fe.addRange(ie),fe.extend(X.node,X.offset)):(ie.setEnd(X.node,X.offset),fe.addRange(ie))}}}}for(_e=[],fe=R;fe=fe.parentNode;)fe.nodeType===1&&_e.push({element:fe,left:fe.scrollLeft,top:fe.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<_e.length;R++){var ve=_e[R];ve.element.scrollLeft=ve.left,ve.element.scrollTop=ve.top}}hc=!!oh,lh=oh=null}finally{Pt=u,$.p=o,B.T=a}}t.current=n,pn=2}}function fv(){if(pn===2){pn=0;var t=Ba,n=ar,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=B.T,B.T=null;var o=$.p;$.p=2;var u=Pt;Pt|=4;try{Ig(t,n.alternate,n)}finally{Pt=u,$.p=o,B.T=a}}pn=3}}function hv(){if(pn===4||pn===3){pn=0,O();var t=Ba,n=ar,a=ra,o=Jg;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?pn=5:(pn=0,ar=Ba=null,dv(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(za=null),Ls(a),n=n.stateNode,Ne&&typeof Ne.onCommitFiberRoot=="function")try{Ne.onCommitFiberRoot(Me,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=B.T,u=$.p,$.p=2,B.T=null;try{for(var d=t.onRecoverableError,S=0;S<o.length;S++){var R=o[S];d(R.value,{componentStack:R.stack})}}finally{B.T=n,$.p=u}}(ra&3)!==0&&ec(),zi(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===Yf?To++:(To=0,Yf=t):To=0,bo(0)}}function dv(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,ao(n)))}function ec(){return uv(),fv(),hv(),pv()}function pv(){if(pn!==5)return!1;var t=Ba,n=Wf;Wf=0;var a=Ls(ra),o=B.T,u=$.p;try{$.p=32>a?32:a,B.T=null,a=qf,qf=null;var d=Ba,S=ra;if(pn=0,ar=Ba=null,ra=0,(Pt&6)!==0)throw Error(s(331));var R=Pt;if(Pt|=4,Zg(d.current),Wg(d,d.current,S,a),Pt=R,bo(0,!1),Ne&&typeof Ne.onPostCommitFiberRoot=="function")try{Ne.onPostCommitFiberRoot(Me,d)}catch{}return!0}finally{$.p=u,B.T=o,dv(t,n)}}function mv(t,n,a){n=li(a,n),n=Af(t.stateNode,n,2),t=Da(t,n,2),t!==null&&(Sn(t,2),zi(t))}function Ft(t,n,a){if(t.tag===3)mv(t,t,a);else for(;n!==null;){if(n.tag===3){mv(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(za===null||!za.has(o))){t=li(a,t),a=gg(2),o=Da(n,a,2),o!==null&&(vg(a,o,n,t),Sn(o,2),zi(o));break}}n=n.return}}function Qf(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new PS;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(kf=!0,u.add(a),t=HS.bind(null,t,n,a),n.then(t,t))}function HS(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Wt===t&&(St&a)===a&&(nn===4||nn===3&&(St&62914560)===St&&300>T()-Yl?(Pt&2)===0&&sr(t,0):Xf|=a,ir===St&&(ir=0)),zi(t)}function gv(t,n){n===0&&(n=It()),t=os(t,n),t!==null&&(Sn(t,n),zi(t))}function GS(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),gv(t,a)}function VS(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),gv(t,a)}function kS(t,n){return Ye(t,n)}var tc=null,or=null,Jf=!1,nc=!1,$f=!1,Ia=0;function zi(t){t!==or&&t.next===null&&(or===null?tc=or=t:or=or.next=t),nc=!0,Jf||(Jf=!0,jS())}function bo(t,n){if(!$f&&nc){$f=!0;do for(var a=!1,o=tc;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var S=o.suspendedLanes,R=o.pingedLanes;d=(1<<31-Ge(42|t)+1)-1,d&=u&~(S&~R),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,Sv(o,d))}else d=St,d=xe(o,o===Wt?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||Ve(o,d)||(a=!0,Sv(o,d));o=o.next}while(a);$f=!1}}function XS(){vv()}function vv(){nc=Jf=!1;var t=0;Ia!==0&&ty()&&(t=Ia);for(var n=T(),a=null,o=tc;o!==null;){var u=o.next,d=_v(o,n);d===0?(o.next=null,a===null?tc=u:a.next=u,u===null&&(or=a)):(a=o,(t!==0||(d&3)!==0)&&(nc=!0)),o=u}pn!==0&&pn!==5||bo(t),Ia!==0&&(Ia=0)}function _v(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var S=31-Ge(d),R=1<<S,F=u[S];F===-1?((R&a)===0||(R&o)!==0)&&(u[S]=st(R,n)):F<=n&&(t.expiredLanes|=R),d&=~R}if(n=Wt,a=St,a=xe(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(Bt===2||Bt===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&at(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ve(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&at(o),Ls(a)){case 2:case 8:a=ue;break;case 32:a=k;break;case 268435456:a=Ce;break;default:a=k}return o=xv.bind(null,t),a=Ye(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&at(o),t.callbackPriority=2,t.callbackNode=null,2}function xv(t,n){if(pn!==0&&pn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(ec()&&t.callbackNode!==a)return null;var o=St;return o=xe(t,t===Wt?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(ev(t,o,n),_v(t,T()),t.callbackNode!=null&&t.callbackNode===a?xv.bind(null,t):null)}function Sv(t,n){if(ec())return null;ev(t,n,!0)}function jS(){iy(function(){(Pt&6)!==0?Ye(ee,XS):vv()})}function eh(){if(Ia===0){var t=Ws;t===0&&(t=Le,Le<<=1,(Le&261888)===0&&(Le=256)),Ia=t}return Ia}function yv(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:ul(""+t)}function Mv(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function WS(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var d=yv((u[yn]||null).action),S=o.submitter;S&&(n=(n=S[yn]||null)?yv(n.formAction):S.getAttribute("formAction"),n!==null&&(d=n,S=null));var R=new pl("action","action",null,o,u);t.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Ia!==0){var F=S?Mv(u,S):new FormData(u);Sf(a,{pending:!0,data:F,method:u.method,action:d},null,F)}}else typeof d=="function"&&(R.preventDefault(),F=S?Mv(u,S):new FormData(u),Sf(a,{pending:!0,data:F,method:u.method,action:d},d,F))},currentTarget:u}]})}}for(var th=0;th<zu.length;th++){var nh=zu[th],qS=nh.toLowerCase(),YS=nh[0].toUpperCase()+nh.slice(1);yi(qS,"on"+YS)}yi($p,"onAnimationEnd"),yi(em,"onAnimationIteration"),yi(tm,"onAnimationStart"),yi("dblclick","onDoubleClick"),yi("focusin","onFocus"),yi("focusout","onBlur"),yi(uS,"onTransitionRun"),yi(fS,"onTransitionStart"),yi(hS,"onTransitionCancel"),yi(nm,"onTransitionEnd"),Be("onMouseEnter",["mouseout","mouseover"]),Be("onMouseLeave",["mouseout","mouseover"]),Be("onPointerEnter",["pointerout","pointerover"]),Be("onPointerLeave",["pointerout","pointerover"]),Ie("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ie("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ie("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ie("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ie("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ie("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ao="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ZS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ao));function Ev(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var d=void 0;if(n)for(var S=o.length-1;0<=S;S--){var R=o[S],F=R.instance,ae=R.currentTarget;if(R=R.listener,F!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=ae;try{d(u)}catch(ge){vl(ge)}u.currentTarget=null,d=F}else for(S=0;S<o.length;S++){if(R=o[S],F=R.instance,ae=R.currentTarget,R=R.listener,F!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=ae;try{d(u)}catch(ge){vl(ge)}u.currentTarget=null,d=F}}}}function xt(t,n){var a=n[jr];a===void 0&&(a=n[jr]=new Set);var o=t+"__bubble";a.has(o)||(Tv(n,t,2,!1),a.add(o))}function ih(t,n,a){var o=0;n&&(o|=4),Tv(a,t,o,n)}var ic="_reactListening"+Math.random().toString(36).slice(2);function ah(t){if(!t[ic]){t[ic]=!0,we.forEach(function(a){a!=="selectionchange"&&(ZS.has(a)||ih(a,!1,t),ih(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[ic]||(n[ic]=!0,ih("selectionchange",!1,n))}}function Tv(t,n,a,o){switch($v(n)){case 2:var u=Ey;break;case 8:u=Ty;break;default:u=xh}a=u.bind(null,n,a,t),u=void 0,!Eu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function sh(t,n,a,o,u){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var S=o.tag;if(S===3||S===4){var R=o.stateNode.containerInfo;if(R===u)break;if(S===4)for(S=o.return;S!==null;){var F=S.tag;if((F===3||F===4)&&S.stateNode.containerInfo===u)return;S=S.return}for(;R!==null;){if(S=C(R),S===null)return;if(F=S.tag,F===5||F===6||F===26||F===27){o=d=S;continue e}R=R.parentNode}}o=o.return}wp(function(){var ae=d,ge=yu(a),_e=[];e:{var se=im.get(t);if(se!==void 0){var fe=pl,Xe=t;switch(t){case"keypress":if(hl(a)===0)break e;case"keydown":case"keyup":fe=Vx;break;case"focusin":Xe="focus",fe=Ru;break;case"focusout":Xe="blur",fe=Ru;break;case"beforeblur":case"afterblur":fe=Ru;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":fe=Np;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":fe=Dx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":fe=jx;break;case $p:case em:case tm:fe=Lx;break;case nm:fe=qx;break;case"scroll":case"scrollend":fe=Cx;break;case"wheel":fe=Zx;break;case"copy":case"cut":case"paste":fe=Px;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":fe=Op;break;case"toggle":case"beforetoggle":fe=Qx}var et=(n&4)!==0,Xt=!et&&(t==="scroll"||t==="scrollend"),te=et?se!==null?se+"Capture":null:se;et=[];for(var X=ae,ie;X!==null;){var ve=X;if(ie=ve.stateNode,ve=ve.tag,ve!==5&&ve!==26&&ve!==27||ie===null||te===null||(ve=qr(X,te),ve!=null&&et.push(Ro(X,ve,ie))),Xt)break;X=X.return}0<et.length&&(se=new fe(se,Xe,null,a,ge),_e.push({event:se,listeners:et}))}}if((n&7)===0){e:{if(se=t==="mouseover"||t==="pointerover",fe=t==="mouseout"||t==="pointerout",se&&a!==Su&&(Xe=a.relatedTarget||a.fromElement)&&(C(Xe)||Xe[Xi]))break e;if((fe||se)&&(se=ge.window===ge?ge:(se=ge.ownerDocument)?se.defaultView||se.parentWindow:window,fe?(Xe=a.relatedTarget||a.toElement,fe=ae,Xe=Xe?C(Xe):null,Xe!==null&&(Xt=c(Xe),et=Xe.tag,Xe!==Xt||et!==5&&et!==27&&et!==6)&&(Xe=null)):(fe=null,Xe=ae),fe!==Xe)){if(et=Np,ve="onMouseLeave",te="onMouseEnter",X="mouse",(t==="pointerout"||t==="pointerover")&&(et=Op,ve="onPointerLeave",te="onPointerEnter",X="pointer"),Xt=fe==null?se:oe(fe),ie=Xe==null?se:oe(Xe),se=new et(ve,X+"leave",fe,a,ge),se.target=Xt,se.relatedTarget=ie,ve=null,C(ge)===ae&&(et=new et(te,X+"enter",Xe,a,ge),et.target=ie,et.relatedTarget=Xt,ve=et),Xt=ve,fe&&Xe)t:{for(et=KS,te=fe,X=Xe,ie=0,ve=te;ve;ve=et(ve))ie++;ve=0;for(var Je=X;Je;Je=et(Je))ve++;for(;0<ie-ve;)te=et(te),ie--;for(;0<ve-ie;)X=et(X),ve--;for(;ie--;){if(te===X||X!==null&&te===X.alternate){et=te;break t}te=et(te),X=et(X)}et=null}else et=null;fe!==null&&bv(_e,se,fe,et,!1),Xe!==null&&Xt!==null&&bv(_e,Xt,Xe,et,!0)}}e:{if(se=ae?oe(ae):window,fe=se.nodeName&&se.nodeName.toLowerCase(),fe==="select"||fe==="input"&&se.type==="file")var Dt=Vp;else if(Hp(se))if(kp)Dt=oS;else{Dt=sS;var We=aS}else fe=se.nodeName,!fe||fe.toLowerCase()!=="input"||se.type!=="checkbox"&&se.type!=="radio"?ae&&xu(ae.elementType)&&(Dt=Vp):Dt=rS;if(Dt&&(Dt=Dt(t,ae))){Gp(_e,Dt,a,ge);break e}We&&We(t,se,ae),t==="focusout"&&ae&&se.type==="number"&&ae.memoizedProps.value!=null&&Rn(se,"number",se.value)}switch(We=ae?oe(ae):window,t){case"focusin":(Hp(We)||We.contentEditable==="true")&&(Fs=We,Lu=ae,to=null);break;case"focusout":to=Lu=Fs=null;break;case"mousedown":Ou=!0;break;case"contextmenu":case"mouseup":case"dragend":Ou=!1,Qp(_e,a,ge);break;case"selectionchange":if(cS)break;case"keydown":case"keyup":Qp(_e,a,ge)}var ut;if(wu)e:{switch(t){case"compositionstart":var yt="onCompositionStart";break e;case"compositionend":yt="onCompositionEnd";break e;case"compositionupdate":yt="onCompositionUpdate";break e}yt=void 0}else Bs?Fp(t,a)&&(yt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(yt="onCompositionStart");yt&&(Pp&&a.locale!=="ko"&&(Bs||yt!=="onCompositionStart"?yt==="onCompositionEnd"&&Bs&&(ut=Dp()):(Ea=ge,Tu="value"in Ea?Ea.value:Ea.textContent,Bs=!0)),We=ac(ae,yt),0<We.length&&(yt=new Lp(yt,t,null,a,ge),_e.push({event:yt,listeners:We}),ut?yt.data=ut:(ut=Ip(a),ut!==null&&(yt.data=ut)))),(ut=$x?eS(t,a):tS(t,a))&&(yt=ac(ae,"onBeforeInput"),0<yt.length&&(We=new Lp("onBeforeInput","beforeinput",null,a,ge),_e.push({event:We,listeners:yt}),We.data=ut)),WS(_e,t,ae,a,ge)}Ev(_e,n)})}function Ro(t,n,a){return{instance:t,listener:n,currentTarget:a}}function ac(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=qr(t,a),u!=null&&o.unshift(Ro(t,u,d)),u=qr(t,n),u!=null&&o.push(Ro(t,u,d))),t.tag===3)return o;t=t.return}return[]}function KS(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function bv(t,n,a,o,u){for(var d=n._reactName,S=[];a!==null&&a!==o;){var R=a,F=R.alternate,ae=R.stateNode;if(R=R.tag,F!==null&&F===o)break;R!==5&&R!==26&&R!==27||ae===null||(F=ae,u?(ae=qr(a,d),ae!=null&&S.unshift(Ro(a,ae,F))):u||(ae=qr(a,d),ae!=null&&S.push(Ro(a,ae,F)))),a=a.return}S.length!==0&&t.push({event:n,listeners:S})}var QS=/\r\n?/g,JS=/\u0000|\uFFFD/g;function Av(t){return(typeof t=="string"?t:""+t).replace(QS,`
`).replace(JS,"")}function Rv(t,n){return n=Av(n),Av(t)===n}function kt(t,n,a,o,u,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||In(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&In(t,""+o);break;case"className":Ht(t,"class",o);break;case"tabIndex":Ht(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Ht(t,a,o);break;case"style":Rp(t,o,d);break;case"data":if(n!=="object"){Ht(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=ul(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&kt(t,n,"name",u.name,u,null),kt(t,n,"formEncType",u.formEncType,u,null),kt(t,n,"formMethod",u.formMethod,u,null),kt(t,n,"formTarget",u.formTarget,u,null)):(kt(t,n,"encType",u.encType,u,null),kt(t,n,"method",u.method,u,null),kt(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=ul(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=ji);break;case"onScroll":o!=null&&xt("scroll",t);break;case"onScrollEnd":o!=null&&xt("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=ul(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":xt("beforetoggle",t),xt("toggle",t),bt(t,"popover",o);break;case"xlinkActuate":wt(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":wt(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":wt(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":wt(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":wt(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":wt(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":wt(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":wt(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":wt(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":bt(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Ax.get(a)||a,bt(t,a,o))}}function rh(t,n,a,o,u,d){switch(a){case"style":Rp(t,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?In(t,o):(typeof o=="number"||typeof o=="bigint")&&In(t,""+o);break;case"onScroll":o!=null&&xt("scroll",t);break;case"onScrollEnd":o!=null&&xt("scrollend",t);break;case"onClick":o!=null&&(t.onclick=ji);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Pe.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),d=t[yn]||null,d=d!=null?d[a]:null,typeof d=="function"&&t.removeEventListener(n,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):bt(t,a,o)}}}function An(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xt("error",t),xt("load",t);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var S=a[d];if(S!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:kt(t,n,d,S,a,null)}}u&&kt(t,n,"srcSet",a.srcSet,a,null),o&&kt(t,n,"src",a.src,a,null);return;case"input":xt("invalid",t);var R=d=S=u=null,F=null,ae=null;for(o in a)if(a.hasOwnProperty(o)){var ge=a[o];if(ge!=null)switch(o){case"name":u=ge;break;case"type":S=ge;break;case"checked":F=ge;break;case"defaultChecked":ae=ge;break;case"value":d=ge;break;case"defaultValue":R=ge;break;case"children":case"dangerouslySetInnerHTML":if(ge!=null)throw Error(s(137,n));break;default:kt(t,n,o,ge,a,null)}}Nn(t,d,R,F,ae,S,u,!1);return;case"select":xt("invalid",t),o=S=d=null;for(u in a)if(a.hasOwnProperty(u)&&(R=a[u],R!=null))switch(u){case"value":d=R;break;case"defaultValue":S=R;break;case"multiple":o=R;default:kt(t,n,u,R,a,null)}n=d,a=S,t.multiple=!!o,n!=null?en(t,!!o,n,!1):a!=null&&en(t,!!o,a,!0);return;case"textarea":xt("invalid",t),d=u=o=null;for(S in a)if(a.hasOwnProperty(S)&&(R=a[S],R!=null))switch(S){case"value":o=R;break;case"defaultValue":u=R;break;case"children":d=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(91));break;default:kt(t,n,S,R,a,null)}Os(t,o,u,d);return;case"option":for(F in a)if(a.hasOwnProperty(F)&&(o=a[F],o!=null))switch(F){case"selected":t.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:kt(t,n,F,o,a,null)}return;case"dialog":xt("beforetoggle",t),xt("toggle",t),xt("cancel",t),xt("close",t);break;case"iframe":case"object":xt("load",t);break;case"video":case"audio":for(o=0;o<Ao.length;o++)xt(Ao[o],t);break;case"image":xt("error",t),xt("load",t);break;case"details":xt("toggle",t);break;case"embed":case"source":case"link":xt("error",t),xt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ae in a)if(a.hasOwnProperty(ae)&&(o=a[ae],o!=null))switch(ae){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:kt(t,n,ae,o,a,null)}return;default:if(xu(n)){for(ge in a)a.hasOwnProperty(ge)&&(o=a[ge],o!==void 0&&rh(t,n,ge,o,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(o=a[R],o!=null&&kt(t,n,R,o,a,null))}function $S(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,S=null,R=null,F=null,ae=null,ge=null;for(fe in a){var _e=a[fe];if(a.hasOwnProperty(fe)&&_e!=null)switch(fe){case"checked":break;case"value":break;case"defaultValue":F=_e;default:o.hasOwnProperty(fe)||kt(t,n,fe,null,o,_e)}}for(var se in o){var fe=o[se];if(_e=a[se],o.hasOwnProperty(se)&&(fe!=null||_e!=null))switch(se){case"type":d=fe;break;case"name":u=fe;break;case"checked":ae=fe;break;case"defaultChecked":ge=fe;break;case"value":S=fe;break;case"defaultValue":R=fe;break;case"children":case"dangerouslySetInnerHTML":if(fe!=null)throw Error(s(137,n));break;default:fe!==_e&&kt(t,n,se,fe,o,_e)}}Gt(t,S,R,F,ae,ge,d,u);return;case"select":fe=S=R=se=null;for(d in a)if(F=a[d],a.hasOwnProperty(d)&&F!=null)switch(d){case"value":break;case"multiple":fe=F;default:o.hasOwnProperty(d)||kt(t,n,d,null,o,F)}for(u in o)if(d=o[u],F=a[u],o.hasOwnProperty(u)&&(d!=null||F!=null))switch(u){case"value":se=d;break;case"defaultValue":R=d;break;case"multiple":S=d;default:d!==F&&kt(t,n,u,d,o,F)}n=R,a=S,o=fe,se!=null?en(t,!!a,se,!1):!!o!=!!a&&(n!=null?en(t,!!a,n,!0):en(t,!!a,a?[]:"",!1));return;case"textarea":fe=se=null;for(R in a)if(u=a[R],a.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:kt(t,n,R,null,o,u)}for(S in o)if(u=o[S],d=a[S],o.hasOwnProperty(S)&&(u!=null||d!=null))switch(S){case"value":se=u;break;case"defaultValue":fe=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&kt(t,n,S,u,o,d)}Mn(t,se,fe);return;case"option":for(var Xe in a)if(se=a[Xe],a.hasOwnProperty(Xe)&&se!=null&&!o.hasOwnProperty(Xe))switch(Xe){case"selected":t.selected=!1;break;default:kt(t,n,Xe,null,o,se)}for(F in o)if(se=o[F],fe=a[F],o.hasOwnProperty(F)&&se!==fe&&(se!=null||fe!=null))switch(F){case"selected":t.selected=se&&typeof se!="function"&&typeof se!="symbol";break;default:kt(t,n,F,se,o,fe)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var et in a)se=a[et],a.hasOwnProperty(et)&&se!=null&&!o.hasOwnProperty(et)&&kt(t,n,et,null,o,se);for(ae in o)if(se=o[ae],fe=a[ae],o.hasOwnProperty(ae)&&se!==fe&&(se!=null||fe!=null))switch(ae){case"children":case"dangerouslySetInnerHTML":if(se!=null)throw Error(s(137,n));break;default:kt(t,n,ae,se,o,fe)}return;default:if(xu(n)){for(var Xt in a)se=a[Xt],a.hasOwnProperty(Xt)&&se!==void 0&&!o.hasOwnProperty(Xt)&&rh(t,n,Xt,void 0,o,se);for(ge in o)se=o[ge],fe=a[ge],!o.hasOwnProperty(ge)||se===fe||se===void 0&&fe===void 0||rh(t,n,ge,se,o,fe);return}}for(var te in a)se=a[te],a.hasOwnProperty(te)&&se!=null&&!o.hasOwnProperty(te)&&kt(t,n,te,null,o,se);for(_e in o)se=o[_e],fe=a[_e],!o.hasOwnProperty(_e)||se===fe||se==null&&fe==null||kt(t,n,_e,se,o,fe)}function Cv(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ey(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,S=u.initiatorType,R=u.duration;if(d&&R&&Cv(S)){for(S=0,R=u.responseEnd,o+=1;o<a.length;o++){var F=a[o],ae=F.startTime;if(ae>R)break;var ge=F.transferSize,_e=F.initiatorType;ge&&Cv(_e)&&(F=F.responseEnd,S+=ge*(F<R?1:(R-ae)/(F-ae)))}if(--o,n+=8*(d+S)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var oh=null,lh=null;function sc(t){return t.nodeType===9?t:t.ownerDocument}function wv(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Dv(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function ch(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var uh=null;function ty(){var t=window.event;return t&&t.type==="popstate"?t===uh?!1:(uh=t,!0):(uh=null,!1)}var Uv=typeof setTimeout=="function"?setTimeout:void 0,ny=typeof clearTimeout=="function"?clearTimeout:void 0,Nv=typeof Promise=="function"?Promise:void 0,iy=typeof queueMicrotask=="function"?queueMicrotask:typeof Nv<"u"?function(t){return Nv.resolve(null).then(t).catch(ay)}:Uv;function ay(t){setTimeout(function(){throw t})}function Ha(t){return t==="head"}function Lv(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),fr(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Co(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Co(a);for(var d=a.firstChild;d;){var S=d.nextSibling,R=d.nodeName;d[is]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=S}}else a==="body"&&Co(t.ownerDocument.body);a=u}while(a);fr(n)}function Ov(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function fh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":fh(a),Wr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function sy(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[is])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=di(t.nextSibling),t===null)break}return null}function ry(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=di(t.nextSibling),t===null))return null;return t}function Pv(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=di(t.nextSibling),t===null))return null;return t}function hh(t){return t.data==="$?"||t.data==="$~"}function dh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function oy(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function di(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var ph=null;function zv(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return di(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Bv(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Fv(t,n,a){switch(n=sc(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Co(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Wr(t)}var pi=new Map,Iv=new Set;function rc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var oa=$.d;$.d={f:ly,r:cy,D:uy,C:fy,L:hy,m:dy,X:my,S:py,M:gy};function ly(){var t=oa.f(),n=Ql();return t||n}function cy(t){var n=Q(t);n!==null&&n.tag===5&&n.type==="form"?ng(n):oa.r(t)}var lr=typeof document>"u"?null:document;function Hv(t,n,a){var o=lr;if(o&&typeof n=="string"&&n){var u=vn(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Iv.has(u)||(Iv.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),An(n,"link",t),q(n),o.head.appendChild(n)))}}function uy(t){oa.D(t),Hv("dns-prefetch",t,null)}function fy(t,n){oa.C(t,n),Hv("preconnect",t,n)}function hy(t,n,a){oa.L(t,n,a);var o=lr;if(o&&t&&n){var u='link[rel="preload"][as="'+vn(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+vn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+vn(a.imageSizes)+'"]')):u+='[href="'+vn(t)+'"]';var d=u;switch(n){case"style":d=cr(t);break;case"script":d=ur(t)}pi.has(d)||(t=g({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),pi.set(d,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(wo(d))||n==="script"&&o.querySelector(Do(d))||(n=o.createElement("link"),An(n,"link",t),q(n),o.head.appendChild(n)))}}function dy(t,n){oa.m(t,n);var a=lr;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+vn(o)+'"][href="'+vn(t)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=ur(t)}if(!pi.has(d)&&(t=g({rel:"modulepreload",href:t},n),pi.set(d,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Do(d)))return}o=a.createElement("link"),An(o,"link",t),q(o),a.head.appendChild(o)}}}function py(t,n,a){oa.S(t,n,a);var o=lr;if(o&&t){var u=le(o).hoistableStyles,d=cr(t);n=n||"default";var S=u.get(d);if(!S){var R={loading:0,preload:null};if(S=o.querySelector(wo(d)))R.loading=5;else{t=g({rel:"stylesheet",href:t,"data-precedence":n},a),(a=pi.get(d))&&mh(t,a);var F=S=o.createElement("link");q(F),An(F,"link",t),F._p=new Promise(function(ae,ge){F.onload=ae,F.onerror=ge}),F.addEventListener("load",function(){R.loading|=1}),F.addEventListener("error",function(){R.loading|=2}),R.loading|=4,oc(S,n,o)}S={type:"stylesheet",instance:S,count:1,state:R},u.set(d,S)}}}function my(t,n){oa.X(t,n);var a=lr;if(a&&t){var o=le(a).hoistableScripts,u=ur(t),d=o.get(u);d||(d=a.querySelector(Do(u)),d||(t=g({src:t,async:!0},n),(n=pi.get(u))&&gh(t,n),d=a.createElement("script"),q(d),An(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function gy(t,n){oa.M(t,n);var a=lr;if(a&&t){var o=le(a).hoistableScripts,u=ur(t),d=o.get(u);d||(d=a.querySelector(Do(u)),d||(t=g({src:t,async:!0,type:"module"},n),(n=pi.get(u))&&gh(t,n),d=a.createElement("script"),q(d),An(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Gv(t,n,a,o){var u=(u=Re.current)?rc(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=cr(a.href),a=le(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=cr(a.href);var d=le(u).hoistableStyles,S=d.get(t);if(S||(u=u.ownerDocument||u,S={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,S),(d=u.querySelector(wo(t)))&&!d._p&&(S.instance=d,S.state.loading=5),pi.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},pi.set(t,a),d||vy(u,t,a,S.state))),n&&o===null)throw Error(s(528,""));return S}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ur(a),a=le(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function cr(t){return'href="'+vn(t)+'"'}function wo(t){return'link[rel="stylesheet"]['+t+"]"}function Vv(t){return g({},t,{"data-precedence":t.precedence,precedence:null})}function vy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),An(n,"link",a),q(n),t.head.appendChild(n))}function ur(t){return'[src="'+vn(t)+'"]'}function Do(t){return"script[async]"+t}function kv(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+vn(a.href)+'"]');if(o)return n.instance=o,q(o),o;var u=g({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),q(o),An(o,"style",u),oc(o,a.precedence,t),n.instance=o;case"stylesheet":u=cr(a.href);var d=t.querySelector(wo(u));if(d)return n.state.loading|=4,n.instance=d,q(d),d;o=Vv(a),(u=pi.get(u))&&mh(o,u),d=(t.ownerDocument||t).createElement("link"),q(d);var S=d;return S._p=new Promise(function(R,F){S.onload=R,S.onerror=F}),An(d,"link",o),n.state.loading|=4,oc(d,a.precedence,t),n.instance=d;case"script":return d=ur(a.src),(u=t.querySelector(Do(d)))?(n.instance=u,q(u),u):(o=a,(u=pi.get(d))&&(o=g({},a),gh(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),q(u),An(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,oc(o,a.precedence,t));return n.instance}function oc(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,S=0;S<o.length;S++){var R=o[S];if(R.dataset.precedence===n)d=R;else if(d!==u)break}d?d.parentNode.insertBefore(t,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function mh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function gh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var lc=null;function Xv(t,n,a){if(lc===null){var o=new Map,u=lc=new Map;u.set(a,o)}else u=lc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var d=a[u];if(!(d[is]||d[$t]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var S=d.getAttribute(n)||"";S=t+S;var R=o.get(S);R?R.push(d):o.set(S,[d])}}return o}function jv(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function _y(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Wv(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function xy(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=cr(o.href),d=n.querySelector(wo(u));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=cc.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=d,q(d);return}d=n.ownerDocument||n,o=Vv(o),(u=pi.get(u))&&mh(o,u),d=d.createElement("link"),q(d);var S=d;S._p=new Promise(function(R,F){S.onload=R,S.onerror=F}),An(d,"link",o),a.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=cc.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var vh=0;function Sy(t,n){return t.stylesheets&&t.count===0&&fc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&fc(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+n);0<t.imgBytes&&vh===0&&(vh=62500*ey());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&fc(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>vh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function cc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)fc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var uc=null;function fc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,uc=new Map,n.forEach(yy,t),uc=null,cc.call(t))}function yy(t,n){if(!(n.state.loading&4)){var a=uc.get(t);if(a)var o=a.get(null);else{a=new Map,uc.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var S=u[d];(S.nodeName==="LINK"||S.getAttribute("media")!=="not all")&&(a.set(S.dataset.precedence,S),o=S)}o&&a.set(null,o)}u=n.instance,S=u.getAttribute("data-precedence"),d=a.get(S)||o,d===o&&a.set(null,u),a.set(S,u),this.count++,o=cc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var Uo={$$typeof:N,Provider:null,Consumer:null,_currentValue:J,_currentValue2:J,_threadCount:0};function My(t,n,a,o,u,d,S,R,F){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Rt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Rt(0),this.hiddenUpdates=Rt(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=F,this.incompleteTransitions=new Map}function qv(t,n,a,o,u,d,S,R,F,ae,ge,_e){return t=new My(t,n,a,S,F,ae,ge,_e,R),n=1,d===!0&&(n|=24),d=Jn(3,null,null,n),t.current=d,d.stateNode=t,n=Zu(),n.refCount++,t.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},$u(d),t}function Yv(t){return t?(t=Gs,t):Gs}function Zv(t,n,a,o,u,d){u=Yv(u),o.context===null?o.context=u:o.pendingContext=u,o=wa(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=Da(t,o,n),a!==null&&(jn(a,t,n),lo(a,t,n))}function Kv(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function _h(t,n){Kv(t,n),(t=t.alternate)&&Kv(t,n)}function Qv(t){if(t.tag===13||t.tag===31){var n=os(t,67108864);n!==null&&jn(n,t,67108864),_h(t,67108864)}}function Jv(t){if(t.tag===13||t.tag===31){var n=ii();n=ts(n);var a=os(t,n);a!==null&&jn(a,t,n),_h(t,n)}}var hc=!0;function Ey(t,n,a,o){var u=B.T;B.T=null;var d=$.p;try{$.p=2,xh(t,n,a,o)}finally{$.p=d,B.T=u}}function Ty(t,n,a,o){var u=B.T;B.T=null;var d=$.p;try{$.p=8,xh(t,n,a,o)}finally{$.p=d,B.T=u}}function xh(t,n,a,o){if(hc){var u=Sh(o);if(u===null)sh(t,n,o,dc,a),e_(t,o);else if(Ay(u,t,n,a,o))o.stopPropagation();else if(e_(t,o),n&4&&-1<by.indexOf(t)){for(;u!==null;){var d=Q(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var S=Ae(d.pendingLanes);if(S!==0){var R=d;for(R.pendingLanes|=2,R.entangledLanes|=2;S;){var F=1<<31-Ge(S);R.entanglements[1]|=F,S&=~F}zi(d),(Pt&6)===0&&(Zl=T()+500,bo(0))}}break;case 31:case 13:R=os(d,2),R!==null&&jn(R,d,2),Ql(),_h(d,2)}if(d=Sh(o),d===null&&sh(t,n,o,dc,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else sh(t,n,o,null,a)}}function Sh(t){return t=yu(t),yh(t)}var dc=null;function yh(t){if(dc=null,t=C(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return dc=t,null}function $v(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(G()){case ee:return 2;case ue:return 8;case k:case De:return 32;case Ce:return 268435456;default:return 32}default:return 32}}var Mh=!1,Ga=null,Va=null,ka=null,No=new Map,Lo=new Map,Xa=[],by="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function e_(t,n){switch(t){case"focusin":case"focusout":Ga=null;break;case"dragenter":case"dragleave":Va=null;break;case"mouseover":case"mouseout":ka=null;break;case"pointerover":case"pointerout":No.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Lo.delete(n.pointerId)}}function Oo(t,n,a,o,u,d){return t===null||t.nativeEvent!==d?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},n!==null&&(n=Q(n),n!==null&&Qv(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function Ay(t,n,a,o,u){switch(n){case"focusin":return Ga=Oo(Ga,t,n,a,o,u),!0;case"dragenter":return Va=Oo(Va,t,n,a,o,u),!0;case"mouseover":return ka=Oo(ka,t,n,a,o,u),!0;case"pointerover":var d=u.pointerId;return No.set(d,Oo(No.get(d)||null,t,n,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,Lo.set(d,Oo(Lo.get(d)||null,t,n,a,o,u)),!0}return!1}function t_(t){var n=C(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,ns(t.priority,function(){Jv(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,ns(t.priority,function(){Jv(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function pc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Sh(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);Su=o,a.target.dispatchEvent(o),Su=null}else return n=Q(a),n!==null&&Qv(n),t.blockedOn=a,!1;n.shift()}return!0}function n_(t,n,a){pc(t)&&a.delete(n)}function Ry(){Mh=!1,Ga!==null&&pc(Ga)&&(Ga=null),Va!==null&&pc(Va)&&(Va=null),ka!==null&&pc(ka)&&(ka=null),No.forEach(n_),Lo.forEach(n_)}function mc(t,n){t.blockedOn===n&&(t.blockedOn=null,Mh||(Mh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,Ry)))}var gc=null;function i_(t){gc!==t&&(gc=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){gc===t&&(gc=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(yh(o||a)===null)continue;break}var d=Q(a);d!==null&&(t.splice(n,3),n-=3,Sf(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function fr(t){function n(F){return mc(F,t)}Ga!==null&&mc(Ga,t),Va!==null&&mc(Va,t),ka!==null&&mc(ka,t),No.forEach(n),Lo.forEach(n);for(var a=0;a<Xa.length;a++){var o=Xa[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<Xa.length&&(a=Xa[0],a.blockedOn===null);)t_(a),a.blockedOn===null&&Xa.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],S=u[yn]||null;if(typeof d=="function")S||i_(a);else if(S){var R=null;if(d&&d.hasAttribute("formAction")){if(u=d,S=d[yn]||null)R=S.formAction;else if(yh(u)!==null)continue}else R=S.action;typeof R=="function"?a[o+1]=R:(a.splice(o,3),o-=3),i_(a)}}}function a_(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(S){return u=S})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function Eh(t){this._internalRoot=t}vc.prototype.render=Eh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=ii();Zv(a,o,t,n,null,null)},vc.prototype.unmount=Eh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Zv(t.current,2,null,t,null,null),Ql(),n[Xi]=null}};function vc(t){this._internalRoot=t}vc.prototype.unstable_scheduleHydration=function(t){if(t){var n=Xr();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Xa.length&&n!==0&&n<Xa[a].priority;a++);Xa.splice(a,0,t),a===0&&t_(t)}};var s_=e.version;if(s_!=="19.2.8")throw Error(s(527,s_,"19.2.8"));$.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=m(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var Cy={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:B,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _c=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_c.isDisabled&&_c.supportsFiber)try{Me=_c.inject(Cy),Ne=_c}catch{}}return zo.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=hg,d=dg,S=pg;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(S=n.onRecoverableError)),n=qv(t,1,!1,null,null,a,o,null,u,d,S,a_),t[Xi]=n.current,ah(t),new Eh(n)},zo.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",d=hg,S=dg,R=pg,F=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(S=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(F=a.formState)),n=qv(t,1,!0,n,a??null,o,u,F,d,S,R,a_),n.context=Yv(null),a=n.current,o=ii(),o=ts(o),u=wa(o),u.callback=null,Da(a,u,o),a=o,n.current.lanes=a,Sn(n,a),zi(n),t[Xi]=n.current,ah(t),new vc(n)},zo.version="19.2.8",zo}var m_;function Hy(){if(m_)return Ah.exports;m_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Ah.exports=Iy(),Ah.exports}var Gy=Hy();/**
 * react-router v7.18.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var sp=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,b0=/^[\\/]{2}/;function Vy(r,e){return e+r.replace(/\\/g,"/")}var g_="popstate";function v_(r){return typeof r=="object"&&r!=null&&"pathname"in r&&"search"in r&&"hash"in r&&"state"in r&&"key"in r}function ky(r={}){function e(s,l){var m;let c=(m=l.state)==null?void 0:m.masked,{pathname:f,search:h,hash:p}=c||s.location;return hd("",{pathname:f,search:h,hash:p},l.state&&l.state.usr||null,l.state&&l.state.key||"default",c?{pathname:s.location.pathname,search:s.location.search,hash:s.location.hash}:void 0)}function i(s,l){return typeof l=="string"?l:Zo(l)}return jy(e,i,null,r)}function Kt(r,e){if(r===!1||r===null||typeof r>"u")throw new Error(e)}function Ui(r,e){if(!r){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Xy(){return Math.random().toString(36).substring(2,10)}function __(r,e){return{usr:r.state,key:r.key,idx:e,masked:r.mask?{pathname:r.pathname,search:r.search,hash:r.hash}:void 0}}function hd(r,e,i=null,s,l){return{pathname:typeof r=="string"?r:r.pathname,search:"",hash:"",...typeof e=="string"?Br(e):e,state:i,key:e&&e.key||s||Xy(),mask:l}}function Zo({pathname:r="/",search:e="",hash:i=""}){return e&&e!=="?"&&(r+=e.charAt(0)==="?"?e:"?"+e),i&&i!=="#"&&(r+=i.charAt(0)==="#"?i:"#"+i),r}function Br(r){let e={};if(r){let i=r.indexOf("#");i>=0&&(e.hash=r.substring(i),r=r.substring(0,i));let s=r.indexOf("?");s>=0&&(e.search=r.substring(s),r=r.substring(0,s)),r&&(e.pathname=r)}return e}function jy(r,e,i,s={}){let{window:l=document.defaultView,v5Compat:c=!1}=s,f=l.history,h="POP",p=null,m=v();m==null&&(m=0,f.replaceState({...f.state,idx:m},""));function v(){return(f.state||{idx:null}).idx}function g(){h="POP";let y=v(),_=y==null?null:y-m;m=y,p&&p({action:h,location:b.location,delta:_})}function x(y,_){h="PUSH";let L=v_(y)?y:hd(b.location,y,_);m=v()+1;let N=__(L,m),D=b.createHref(L.mask||L);try{f.pushState(N,"",D)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;l.location.assign(D)}c&&p&&p({action:h,location:b.location,delta:1})}function M(y,_){h="REPLACE";let L=v_(y)?y:hd(b.location,y,_);m=v();let N=__(L,m),D=b.createHref(L.mask||L);f.replaceState(N,"",D),c&&p&&p({action:h,location:b.location,delta:0})}function E(y){return Wy(l,y)}let b={get action(){return h},get location(){return r(l,f)},listen(y){if(p)throw new Error("A history only accepts one active listener");return l.addEventListener(g_,g),p=y,()=>{l.removeEventListener(g_,g),p=null}},createHref(y){return e(l,y)},createURL:E,encodeLocation(y){let _=E(y);return{pathname:_.pathname,search:_.search,hash:_.hash}},push:x,replace:M,go(y){return f.go(y)}};return b}function Wy(r,e,i=!1){let s="http://localhost";r&&(s=r.location.origin!=="null"?r.location.origin:r.location.href),Kt(s,"No window.location.(origin|href) available to create URL");let l=typeof e=="string"?e:Zo(e);return l=l.replace(/ $/,"%20"),!i&&b0.test(l)&&(l=s+l),new URL(l,s)}function A0(r,e,i="/"){return qy(r,e,i,!1)}function qy(r,e,i,s,l){let c=typeof e=="string"?Br(e):e,f=Sa(c.pathname||"/",i);if(f==null)return null;let h=Yy(r),p=null,m=sM(f);for(let v=0;p==null&&v<h.length;++v)p=aM(h[v],m,s);return p}function Yy(r){let e=R0(r);return Zy(e),e}function R0(r,e=[],i=[],s="",l=!1){let c=(f,h,p=l,m)=>{let v={relativePath:m===void 0?f.path||"":m,caseSensitive:f.caseSensitive===!0,childrenIndex:h,route:f};if(v.relativePath.startsWith("/")){if(!v.relativePath.startsWith(s)&&p)return;Kt(v.relativePath.startsWith(s),`Absolute route path "${v.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),v.relativePath=v.relativePath.slice(s.length)}let g=wi([s,v.relativePath]),x=i.concat(v);f.children&&f.children.length>0&&(Kt(f.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${g}".`),R0(f.children,e,x,g,p)),!(f.path==null&&!f.index)&&e.push({path:g,score:nM(g,f.index),routesMeta:x.map((M,E)=>{let[b,y]=D0(M.relativePath,M.caseSensitive,E===x.length-1);return{...M,matcher:b,compiledParams:y}})})};return r.forEach((f,h)=>{var p;if(f.path===""||!((p=f.path)!=null&&p.includes("?")))c(f,h);else for(let m of C0(f.path))c(f,h,!0,m)}),e}function C0(r){let e=r.split("/");if(e.length===0)return[];let[i,...s]=e,l=i.endsWith("?"),c=i.replace(/\?$/,"");if(s.length===0)return l?[c,""]:[c];let f=C0(s.join("/")),h=[];return h.push(...f.map(p=>p===""?c:[c,p].join("/"))),l&&h.push(...f),h.map(p=>r.startsWith("/")&&p===""?"/":p)}function Zy(r){r.sort((e,i)=>e.score!==i.score?i.score-e.score:iM(e.routesMeta.map(s=>s.childrenIndex),i.routesMeta.map(s=>s.childrenIndex)))}var Ky=/^:[\w-]+$/,Qy=3,Jy=2,$y=1,eM=10,tM=-2,x_=r=>r==="*";function nM(r,e){let i=r.split("/"),s=i.length;return i.some(x_)&&(s+=tM),e&&(s+=Jy),i.filter(l=>!x_(l)).reduce((l,c)=>l+(Ky.test(c)?Qy:c===""?$y:eM),s)}function iM(r,e){return r.length===e.length&&r.slice(0,-1).every((s,l)=>s===e[l])?r[r.length-1]-e[e.length-1]:0}function aM(r,e,i=!1){let{routesMeta:s}=r,l={},c="/",f=[];for(let h=0;h<s.length;++h){let p=s[h],m=h===s.length-1,v=c==="/"?e:e.slice(c.length)||"/",g={path:p.relativePath,caseSensitive:p.caseSensitive,end:m},x=p.matcher&&p.compiledParams?w0(g,v,p.matcher,p.compiledParams):tu(g,v),M=p.route;if(!x&&m&&i&&!s[s.length-1].route.index&&(x=tu({path:p.relativePath,caseSensitive:p.caseSensitive,end:!1},v)),!x)return null;Object.assign(l,x.params),f.push({params:l,pathname:wi([c,x.pathname]),pathnameBase:lM(wi([c,x.pathnameBase])),route:M}),x.pathnameBase!=="/"&&(c=wi([c,x.pathnameBase]))}return f}function tu(r,e){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[i,s]=D0(r.path,r.caseSensitive,r.end);return w0(r,e,i,s)}function w0(r,e,i,s){let l=e.match(i);if(!l)return null;let c=l[0],f=c.replace(/(.)\/+$/,"$1"),h=l.slice(1);return{params:s.reduce((m,{paramName:v,isOptional:g},x)=>{if(v==="*"){let E=h[x]||"";f=c.slice(0,c.length-E.length).replace(/(.)\/+$/,"$1")}const M=h[x];return g&&!M?m[v]=void 0:m[v]=(M||"").replace(/%2F/g,"/"),m},{}),pathname:c,pathnameBase:f,pattern:r}}function D0(r,e=!1,i=!0){Ui(r==="*"||!r.endsWith("*")||r.endsWith("/*"),`Route path "${r}" will be treated as if it were "${r.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${r.replace(/\*$/,"/*")}".`);let s=[],l="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,h,p,m,v)=>{if(s.push({paramName:h,isOptional:p!=null}),p){let g=v.charAt(m+f.length);return g&&g!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return r.endsWith("*")?(s.push({paramName:"*"}),l+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):i?l+="\\/*$":r!==""&&r!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,e?void 0:"i"),s]}function sM(r){try{return r.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Ui(!1,`The URL path "${r}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),r}}function Sa(r,e){if(e==="/")return r;if(!r.toLowerCase().startsWith(e.toLowerCase()))return null;let i=e.endsWith("/")?e.length-1:e.length,s=r.charAt(i);return s&&s!=="/"?null:r.slice(i)||"/"}function rM(r,e="/"){let{pathname:i,search:s="",hash:l=""}=typeof r=="string"?Br(r):r,c;return i?(i=U0(i),i.startsWith("/")?c=S_(i.substring(1),"/"):c=S_(i,e)):c=e,{pathname:c,search:cM(s),hash:uM(l)}}function S_(r,e){let i=nu(e).split("/");return r.split("/").forEach(l=>{l===".."?i.length>1&&i.pop():l!=="."&&i.push(l)}),i.length>1?i.join("/"):"/"}function Dh(r,e,i,s){return`Cannot include a '${r}' character in a manually specified \`to.${e}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function oM(r){return r.filter((e,i)=>i===0||e.route.path&&e.route.path.length>0)}function rp(r){let e=oM(r);return e.map((i,s)=>s===e.length-1?i.pathname:i.pathnameBase)}function lu(r,e,i,s=!1){let l;typeof r=="string"?l=Br(r):(l={...r},Kt(!l.pathname||!l.pathname.includes("?"),Dh("?","pathname","search",l)),Kt(!l.pathname||!l.pathname.includes("#"),Dh("#","pathname","hash",l)),Kt(!l.search||!l.search.includes("#"),Dh("#","search","hash",l)));let c=r===""||l.pathname==="",f=c?"/":l.pathname,h;if(f==null)h=i;else{let g=e.length-1;if(!s&&f.startsWith("..")){let x=f.split("/");for(;x[0]==="..";)x.shift(),g-=1;l.pathname=x.join("/")}h=g>=0?e[g]:"/"}let p=rM(l,h),m=f&&f!=="/"&&f.endsWith("/"),v=(c||f===".")&&i.endsWith("/");return!p.pathname.endsWith("/")&&(m||v)&&(p.pathname+="/"),p}var U0=r=>r.replace(/[\\/]{2,}/g,"/"),wi=r=>U0(r.join("/")),nu=r=>r.replace(/\/+$/,""),lM=r=>nu(r).replace(/^\/*/,"/"),cM=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,uM=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r,fM=class{constructor(r,e,i,s=!1){this.status=r,this.statusText=e||"",this.internal=s,i instanceof Error?(this.data=i.toString(),this.error=i):this.data=i}};function hM(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}function dM(r){let e=r.map(i=>i.route.path).filter(Boolean);return wi(e)||"/"}var N0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function L0(r,e){let i=r;if(typeof i!="string"||!sp.test(i))return{absoluteURL:void 0,isExternal:!1,to:i};let s=i,l=!1;if(N0)try{let c=new URL(window.location.href),f=b0.test(i)?new URL(Vy(i,c.protocol)):new URL(i),h=Sa(f.pathname,e);f.origin===c.origin&&h!=null?i=h+f.search+f.hash:l=!0}catch{Ui(!1,`<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:s,isExternal:l,to:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var O0=["POST","PUT","PATCH","DELETE"];new Set(O0);var pM=["GET",...O0];new Set(pM);var mM=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function gM(r){try{return mM.includes(new URL(r).protocol)}catch{return!1}}var Fr=Z.createContext(null);Fr.displayName="DataRouter";var cu=Z.createContext(null);cu.displayName="DataRouterState";var P0=Z.createContext(!1);function vM(){return Z.useContext(P0)}var z0=Z.createContext({isTransitioning:!1});z0.displayName="ViewTransition";var _M=Z.createContext(new Map);_M.displayName="Fetchers";var xM=Z.createContext(null);xM.displayName="Await";var ri=Z.createContext(null);ri.displayName="Navigation";var tl=Z.createContext(null);tl.displayName="Location";var Gi=Z.createContext({outlet:null,matches:[],isDataRoute:!1});Gi.displayName="Route";var op=Z.createContext(null);op.displayName="RouteError";var B0="REACT_ROUTER_ERROR",SM="REDIRECT",yM="ROUTE_ERROR_RESPONSE";function MM(r){if(r.startsWith(`${B0}:${SM}:{`))try{let e=JSON.parse(r.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function EM(r){if(r.startsWith(`${B0}:${yM}:{`))try{let e=JSON.parse(r.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new fM(e.status,e.statusText,e.data)}catch{}}function TM(r,{relative:e}={}){Kt(Ir(),"useHref() may be used only in the context of a <Router> component.");let{basename:i,navigator:s}=Z.useContext(ri),{hash:l,pathname:c,search:f}=nl(r,{relative:e}),h=c;return i!=="/"&&(h=c==="/"?i:wi([i,c])),s.createHref({pathname:h,search:f,hash:l})}function Ir(){return Z.useContext(tl)!=null}function Vi(){return Kt(Ir(),"useLocation() may be used only in the context of a <Router> component."),Z.useContext(tl).location}var F0="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function I0(r){Z.useContext(ri).static||Z.useLayoutEffect(r)}function uu(){let{isDataRoute:r}=Z.useContext(Gi);return r?BM():bM()}function bM(){Kt(Ir(),"useNavigate() may be used only in the context of a <Router> component.");let r=Z.useContext(Fr),{basename:e,navigator:i}=Z.useContext(ri),{matches:s}=Z.useContext(Gi),{pathname:l}=Vi(),c=JSON.stringify(rp(s)),f=Z.useRef(!1);return I0(()=>{f.current=!0}),Z.useCallback((p,m={})=>{if(Ui(f.current,F0),!f.current)return;if(typeof p=="number"){i.go(p);return}let v=lu(p,JSON.parse(c),l,m.relative==="path");r==null&&e!=="/"&&(v.pathname=v.pathname==="/"?e:wi([e,v.pathname])),(m.replace?i.replace:i.push)(v,m.state,m)},[e,i,c,l,r])}Z.createContext(null);function nl(r,{relative:e}={}){let{matches:i}=Z.useContext(Gi),{pathname:s}=Vi(),l=JSON.stringify(rp(i));return Z.useMemo(()=>lu(r,JSON.parse(l),s,e==="path"),[r,l,s,e])}function AM(r,e){return H0(r,e)}function H0(r,e,i){var y;Kt(Ir(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=Z.useContext(ri),{matches:l}=Z.useContext(Gi),c=l[l.length-1],f=c?c.params:{},h=c?c.pathname:"/",p=c?c.pathnameBase:"/",m=c&&c.route;{let _=m&&m.path||"";V0(h,!m||_.endsWith("*")||_.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${_}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${_}"> to <Route path="${_==="/"?"*":`${_}/*`}">.`)}let v=Vi(),g;if(e){let _=typeof e=="string"?Br(e):e;Kt(p==="/"||((y=_.pathname)==null?void 0:y.startsWith(p)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${_.pathname}" was given in the \`location\` prop.`),g=_}else g=v;let x=g.pathname||"/",M=x;if(p!=="/"){let _=p.replace(/^\//,"").split("/");M="/"+x.replace(/^\//,"").split("/").slice(_.length).join("/")}let E=i&&i.state.matches.length?i.state.matches.map(_=>Object.assign(_,{route:i.manifest[_.route.id]||_.route})):A0(r,{pathname:M});Ui(m||E!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),Ui(E==null||E[E.length-1].route.element!==void 0||E[E.length-1].route.Component!==void 0||E[E.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let b=UM(E&&E.map(_=>Object.assign({},_,{params:Object.assign({},f,_.params),pathname:wi([p,s.encodeLocation?s.encodeLocation(_.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:_.pathname]),pathnameBase:_.pathnameBase==="/"?p:wi([p,s.encodeLocation?s.encodeLocation(_.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:_.pathnameBase])})),l,i);return e&&b?Z.createElement(tl.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...g},navigationType:"POP"}},b):b}function RM(){let r=zM(),e=hM(r)?`${r.status} ${r.statusText}`:r instanceof Error?r.message:JSON.stringify(r),i=r instanceof Error?r.stack:null,s="rgba(200,200,200, 0.5)",l={padding:"0.5rem",backgroundColor:s},c={padding:"2px 4px",backgroundColor:s},f=null;return console.error("Error handled by React Router default ErrorBoundary:",r),f=Z.createElement(Z.Fragment,null,Z.createElement("p",null,"💿 Hey developer 👋"),Z.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",Z.createElement("code",{style:c},"ErrorBoundary")," or"," ",Z.createElement("code",{style:c},"errorElement")," prop on your route.")),Z.createElement(Z.Fragment,null,Z.createElement("h2",null,"Unexpected Application Error!"),Z.createElement("h3",{style:{fontStyle:"italic"}},e),i?Z.createElement("pre",{style:l},i):null,f)}var CM=Z.createElement(RM,null),G0=class extends Z.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,e){return e.location!==r.location||e.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:e.error,location:e.location,revalidation:r.revalidation||e.revalidation}}componentDidCatch(r,e){this.props.onError?this.props.onError(r,e):console.error("React Router caught the following error during render",r)}render(){let r=this.state.error;if(this.context&&typeof r=="object"&&r&&"digest"in r&&typeof r.digest=="string"){const i=EM(r.digest);i&&(r=i)}let e=r!==void 0?Z.createElement(Gi.Provider,{value:this.props.routeContext},Z.createElement(op.Provider,{value:r,children:this.props.component})):this.props.children;return this.context?Z.createElement(wM,{error:r},e):e}};G0.contextType=P0;var Uh=new WeakMap;function wM({children:r,error:e}){let{basename:i}=Z.useContext(ri);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let s=MM(e.digest);if(s){let l=Uh.get(e);if(l)throw l;let c=L0(s.location,i),f=c.absoluteURL||c.to;if(gM(f))throw new Error("Invalid redirect location");if(N0&&!Uh.get(e))if(c.isExternal||s.reloadDocument)window.location.href=f;else{const h=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(c.to,{replace:s.replace}));throw Uh.set(e,h),h}return Z.createElement("meta",{httpEquiv:"refresh",content:`0;url=${f}`})}}return r}function DM({routeContext:r,match:e,children:i}){let s=Z.useContext(Fr);return s&&s.static&&s.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=e.route.id),Z.createElement(Gi.Provider,{value:r},i)}function UM(r,e=[],i){let s=i==null?void 0:i.state;if(r==null){if(!s)return null;if(s.errors)r=s.matches;else if(e.length===0&&!s.initialized&&s.matches.length>0)r=s.matches;else return null}let l=r,c=s==null?void 0:s.errors;if(c!=null){let v=l.findIndex(g=>g.route.id&&(c==null?void 0:c[g.route.id])!==void 0);Kt(v>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(c).join(",")}`),l=l.slice(0,Math.min(l.length,v+1))}let f=!1,h=-1;if(i&&s){f=s.renderFallback;for(let v=0;v<l.length;v++){let g=l[v];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(h=v),g.route.id){let{loaderData:x,errors:M}=s,E=g.route.loader&&!x.hasOwnProperty(g.route.id)&&(!M||M[g.route.id]===void 0);if(g.route.lazy||E){i.isStatic&&(f=!0),h>=0?l=l.slice(0,h+1):l=[l[0]];break}}}}let p=i==null?void 0:i.onError,m=s&&p?(v,g)=>{var x,M;p(v,{location:s.location,params:((M=(x=s.matches)==null?void 0:x[0])==null?void 0:M.params)??{},pattern:dM(s.matches),errorInfo:g})}:void 0;return l.reduceRight((v,g,x)=>{let M,E=!1,b=null,y=null;s&&(M=c&&g.route.id?c[g.route.id]:void 0,b=g.route.errorElement||CM,f&&(h<0&&x===0?(V0("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),E=!0,y=null):h===x&&(E=!0,y=g.route.hydrateFallbackElement||null)));let _=e.concat(l.slice(0,x+1)),L=()=>{let N;return M?N=b:E?N=y:g.route.Component?N=Z.createElement(g.route.Component,null):g.route.element?N=g.route.element:N=v,Z.createElement(DM,{match:g,routeContext:{outlet:v,matches:_,isDataRoute:s!=null},children:N})};return s&&(g.route.ErrorBoundary||g.route.errorElement||x===0)?Z.createElement(G0,{location:s.location,revalidation:s.revalidation,component:b,error:M,children:L(),routeContext:{outlet:null,matches:_,isDataRoute:!0},onError:m}):L()},null)}function lp(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function NM(r){let e=Z.useContext(Fr);return Kt(e,lp(r)),e}function LM(r){let e=Z.useContext(cu);return Kt(e,lp(r)),e}function OM(r){let e=Z.useContext(Gi);return Kt(e,lp(r)),e}function cp(r){let e=OM(r),i=e.matches[e.matches.length-1];return Kt(i.route.id,`${r} can only be used on routes that contain a unique "id"`),i.route.id}function PM(){return cp("useRouteId")}function zM(){var s;let r=Z.useContext(op),e=LM("useRouteError"),i=cp("useRouteError");return r!==void 0?r:(s=e.errors)==null?void 0:s[i]}function BM(){let{router:r}=NM("useNavigate"),e=cp("useNavigate"),i=Z.useRef(!1);return I0(()=>{i.current=!0}),Z.useCallback(async(l,c={})=>{Ui(i.current,F0),i.current&&(typeof l=="number"?await r.navigate(l):await r.navigate(l,{fromRouteId:e,...c}))},[r,e])}var y_={};function V0(r,e,i){!e&&!y_[r]&&(y_[r]=!0,Ui(!1,i))}Z.memo(FM);function FM({routes:r,manifest:e,future:i,state:s,isStatic:l,onError:c}){return H0(r,void 0,{manifest:e,state:s,isStatic:l,onError:c})}function IM({to:r,replace:e,state:i,relative:s}){Kt(Ir(),"<Navigate> may be used only in the context of a <Router> component.");let{static:l}=Z.useContext(ri);Ui(!l,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:c}=Z.useContext(Gi),{pathname:f}=Vi(),h=uu(),p=lu(r,rp(c),f,s==="path"),m=JSON.stringify(p);return Z.useEffect(()=>{h(JSON.parse(m),{replace:e,state:i,relative:s})},[h,m,s,e,i]),null}function Xc(r){Kt(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function HM({basename:r="/",children:e=null,location:i,navigationType:s="POP",navigator:l,static:c=!1,useTransitions:f}){Kt(!Ir(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let h=r.replace(/^\/*/,"/"),p=Z.useMemo(()=>({basename:h,navigator:l,static:c,useTransitions:f,future:{}}),[h,l,c,f]);typeof i=="string"&&(i=Br(i));let{pathname:m="/",search:v="",hash:g="",state:x=null,key:M="default",mask:E}=i,b=Z.useMemo(()=>{let y=Sa(m,h);return y==null?null:{location:{pathname:y,search:v,hash:g,state:x,key:M,mask:E},navigationType:s}},[h,m,v,g,x,M,s,E]);return Ui(b!=null,`<Router basename="${h}"> is not able to match the URL "${m}${v}${g}" because it does not start with the basename, so the <Router> won't render anything.`),b==null?null:Z.createElement(ri.Provider,{value:p},Z.createElement(tl.Provider,{children:e,value:b}))}function GM({children:r,location:e}){return AM(dd(r),e)}function dd(r,e=[]){let i=[];return Z.Children.forEach(r,(s,l)=>{if(!Z.isValidElement(s))return;let c=[...e,l];if(s.type===Z.Fragment){i.push.apply(i,dd(s.props.children,c));return}Kt(s.type===Xc,`[${typeof s.type=="string"?s.type:s.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Kt(!s.props.index||!s.props.children,"An index route cannot have child routes.");let f={id:s.props.id||c.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,middleware:s.props.middleware,loader:s.props.loader,action:s.props.action,hydrateFallbackElement:s.props.hydrateFallbackElement,HydrateFallback:s.props.HydrateFallback,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.hasErrorBoundary===!0||s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(f.children=dd(s.props.children,c)),i.push(f)}),i}var jc="get",Wc="application/x-www-form-urlencoded";function fu(r){return typeof HTMLElement<"u"&&r instanceof HTMLElement}function VM(r){return fu(r)&&r.tagName.toLowerCase()==="button"}function kM(r){return fu(r)&&r.tagName.toLowerCase()==="form"}function XM(r){return fu(r)&&r.tagName.toLowerCase()==="input"}function jM(r){return!!(r.metaKey||r.altKey||r.ctrlKey||r.shiftKey)}function WM(r,e){return r.button===0&&(!e||e==="_self")&&!jM(r)}var xc=null;function qM(){if(xc===null)try{new FormData(document.createElement("form"),0),xc=!1}catch{xc=!0}return xc}var YM=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Nh(r){return r!=null&&!YM.has(r)?(Ui(!1,`"${r}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Wc}"`),null):r}function ZM(r,e){let i,s,l,c,f;if(kM(r)){let h=r.getAttribute("action");s=h?Sa(h,e):null,i=r.getAttribute("method")||jc,l=Nh(r.getAttribute("enctype"))||Wc,c=new FormData(r)}else if(VM(r)||XM(r)&&(r.type==="submit"||r.type==="image")){let h=r.form;if(h==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let p=r.getAttribute("formaction")||h.getAttribute("action");if(s=p?Sa(p,e):null,i=r.getAttribute("formmethod")||h.getAttribute("method")||jc,l=Nh(r.getAttribute("formenctype"))||Nh(h.getAttribute("enctype"))||Wc,c=new FormData(h,r),!qM()){let{name:m,type:v,value:g}=r;if(v==="image"){let x=m?`${m}.`:"";c.append(`${x}x`,"0"),c.append(`${x}y`,"0")}else m&&c.append(m,g)}}else{if(fu(r))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');i=jc,s=null,l=Wc,f=r}return c&&l==="text/plain"&&(f=c,c=void 0),{action:s,method:i.toLowerCase(),encType:l,formData:c,body:f}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function up(r,e){if(r===!1||r===null||typeof r>"u")throw new Error(e)}function k0(r,e,i,s){let l=typeof r=="string"?new URL(r,typeof window>"u"?"server://singlefetch/":window.location.origin):r;return i?l.pathname.endsWith("/")?l.pathname=`${l.pathname}_.${s}`:l.pathname=`${l.pathname}.${s}`:l.pathname==="/"?l.pathname=`_root.${s}`:e&&Sa(l.pathname,e)==="/"?l.pathname=`${nu(e)}/_root.${s}`:l.pathname=`${nu(l.pathname)}.${s}`,l}async function KM(r,e){if(r.id in e)return e[r.id];try{let i=await import(r.module);return e[r.id]=i,i}catch(i){return console.error(`Error loading route module \`${r.module}\`, reloading page...`),console.error(i),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function QM(r){return r==null?!1:r.href==null?r.rel==="preload"&&typeof r.imageSrcSet=="string"&&typeof r.imageSizes=="string":typeof r.rel=="string"&&typeof r.href=="string"}async function JM(r,e,i){let s=await Promise.all(r.map(async l=>{let c=e.routes[l.route.id];if(c){let f=await KM(c,i);return f.links?f.links():[]}return[]}));return nE(s.flat(1).filter(QM).filter(l=>l.rel==="stylesheet"||l.rel==="preload").map(l=>l.rel==="stylesheet"?{...l,rel:"prefetch",as:"style"}:{...l,rel:"prefetch"}))}function M_(r,e,i,s,l,c){let f=(p,m)=>i[m]?p.route.id!==i[m].route.id:!0,h=(p,m)=>{var v;return i[m].pathname!==p.pathname||((v=i[m].route.path)==null?void 0:v.endsWith("*"))&&i[m].params["*"]!==p.params["*"]};return c==="assets"?e.filter((p,m)=>f(p,m)||h(p,m)):c==="data"?e.filter((p,m)=>{var g;let v=s.routes[p.route.id];if(!v||!v.hasLoader)return!1;if(f(p,m)||h(p,m))return!0;if(p.route.shouldRevalidate){let x=p.route.shouldRevalidate({currentUrl:new URL(l.pathname+l.search+l.hash,window.origin),currentParams:((g=i[0])==null?void 0:g.params)||{},nextUrl:new URL(r,window.origin),nextParams:p.params,defaultShouldRevalidate:!0});if(typeof x=="boolean")return x}return!0}):[]}function $M(r,e,{includeHydrateFallback:i}={}){return eE(r.map(s=>{let l=e.routes[s.route.id];if(!l)return[];let c=[l.module];return l.clientActionModule&&(c=c.concat(l.clientActionModule)),l.clientLoaderModule&&(c=c.concat(l.clientLoaderModule)),i&&l.hydrateFallbackModule&&(c=c.concat(l.hydrateFallbackModule)),l.imports&&(c=c.concat(l.imports)),c}).flat(1))}function eE(r){return[...new Set(r)]}function tE(r){let e={},i=Object.keys(r).sort();for(let s of i)e[s]=r[s];return e}function nE(r,e){let i=new Set;return new Set(e),r.reduce((s,l)=>{let c=JSON.stringify(tE(l));return i.has(c)||(i.add(c),s.push({key:c,link:l})),s},[])}function fp(){let r=Z.useContext(Fr);return up(r,"You must render this element inside a <DataRouterContext.Provider> element"),r}function iE(){let r=Z.useContext(cu);return up(r,"You must render this element inside a <DataRouterStateContext.Provider> element"),r}var hp=Z.createContext(void 0);hp.displayName="FrameworkContext";function hu(){let r=Z.useContext(hp);return up(r,"You must render this element inside a <HydratedRouter> element"),r}function aE(r,e){let i=Z.useContext(hp),[s,l]=Z.useState(!1),[c,f]=Z.useState(!1),{onFocus:h,onBlur:p,onMouseEnter:m,onMouseLeave:v,onTouchStart:g}=e,x=Z.useRef(null);Z.useEffect(()=>{if(r==="render"&&f(!0),r==="viewport"){let b=_=>{_.forEach(L=>{f(L.isIntersecting)})},y=new IntersectionObserver(b,{threshold:.5});return x.current&&y.observe(x.current),()=>{y.disconnect()}}},[r]),Z.useEffect(()=>{if(s){let b=setTimeout(()=>{f(!0)},100);return()=>{clearTimeout(b)}}},[s]);let M=()=>{l(!0)},E=()=>{l(!1),f(!1)};return i?r!=="intent"?[c,x,{}]:[c,x,{onFocus:Bo(h,M),onBlur:Bo(p,E),onMouseEnter:Bo(m,M),onMouseLeave:Bo(v,E),onTouchStart:Bo(g,M)}]:[!1,x,{}]}function Bo(r,e){return i=>{r&&r(i),i.defaultPrevented||e(i)}}function sE({page:r,...e}){let i=vM(),{nonce:s}=hu(),{router:l}=fp(),c=Z.useMemo(()=>A0(l.routes,r,l.basename),[l.routes,r,l.basename]);return c?(e.nonce==null&&s&&(e={...e,nonce:s}),i?Z.createElement(oE,{page:r,matches:c,...e}):Z.createElement(lE,{page:r,matches:c,...e})):null}function rE(r){let{manifest:e,routeModules:i}=hu(),[s,l]=Z.useState([]);return Z.useEffect(()=>{let c=!1;return JM(r,e,i).then(f=>{c||l(f)}),()=>{c=!0}},[r,e,i]),s}function oE({page:r,matches:e,...i}){let s=Vi(),{future:l}=hu(),{basename:c}=fp(),f=Z.useMemo(()=>{if(r===s.pathname+s.search+s.hash)return[];let h=k0(r,c,l.v8_trailingSlashAwareDataRequests,"rsc"),p=!1,m=[];for(let v of e)typeof v.route.shouldRevalidate=="function"?p=!0:m.push(v.route.id);return p&&m.length>0&&h.searchParams.set("_routes",m.join(",")),[h.pathname+h.search]},[c,l.v8_trailingSlashAwareDataRequests,r,s,e]);return Z.createElement(Z.Fragment,null,f.map(h=>Z.createElement("link",{key:h,rel:"prefetch",as:"fetch",href:h,...i})))}function lE({page:r,matches:e,...i}){let s=Vi(),{future:l,manifest:c,routeModules:f}=hu(),{basename:h}=fp(),{loaderData:p,matches:m}=iE(),v=Z.useMemo(()=>M_(r,e,m,c,s,"data"),[r,e,m,c,s]),g=Z.useMemo(()=>M_(r,e,m,c,s,"assets"),[r,e,m,c,s]),x=Z.useMemo(()=>{if(r===s.pathname+s.search+s.hash)return[];let b=new Set,y=!1;if(e.forEach(L=>{var D;let N=c.routes[L.route.id];!N||!N.hasLoader||(!v.some(j=>j.route.id===L.route.id)&&L.route.id in p&&((D=f[L.route.id])!=null&&D.shouldRevalidate)||N.hasClientLoader?y=!0:b.add(L.route.id))}),b.size===0)return[];let _=k0(r,h,l.v8_trailingSlashAwareDataRequests,"data");return y&&b.size>0&&_.searchParams.set("_routes",e.filter(L=>b.has(L.route.id)).map(L=>L.route.id).join(",")),[_.pathname+_.search]},[h,l.v8_trailingSlashAwareDataRequests,p,s,c,v,e,r,f]),M=Z.useMemo(()=>$M(g,c),[g,c]),E=rE(g);return Z.createElement(Z.Fragment,null,x.map(b=>Z.createElement("link",{key:b,rel:"prefetch",as:"fetch",href:b,...i})),M.map(b=>Z.createElement("link",{key:b,rel:"modulepreload",href:b,...i})),E.map(({key:b,link:y})=>Z.createElement("link",{key:b,nonce:i.nonce,...y,crossOrigin:y.crossOrigin??i.crossOrigin})))}function cE(...r){return e=>{r.forEach(i=>{typeof i=="function"?i(e):i!=null&&(i.current=e)})}}var uE=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{uE&&(window.__reactRouterVersion="7.18.2")}catch{}function fE({basename:r,children:e,useTransitions:i,window:s}){let l=Z.useRef();l.current==null&&(l.current=ky({window:s,v5Compat:!0}));let c=l.current,[f,h]=Z.useState({action:c.action,location:c.location}),p=Z.useCallback(m=>{i===!1?h(m):Z.startTransition(()=>h(m))},[i]);return Z.useLayoutEffect(()=>c.listen(p),[c,p]),Z.createElement(HM,{basename:r,children:e,location:f.location,navigationType:f.action,navigator:c,useTransitions:i})}var X0=Z.forwardRef(function({onClick:e,discover:i="render",prefetch:s="none",relative:l,reloadDocument:c,replace:f,mask:h,state:p,target:m,to:v,preventScrollReset:g,viewTransition:x,defaultShouldRevalidate:M,...E},b){let{basename:y,navigator:_,useTransitions:L}=Z.useContext(ri),N=typeof v=="string"&&sp.test(v),D=L0(v,y);v=D.to;let j=TM(v,{relative:l}),H=Vi(),z=null;if(h){let pe=lu(h,[],H.mask?H.mask.pathname:"/",!0);y!=="/"&&(pe.pathname=pe.pathname==="/"?y:wi([y,pe.pathname])),z=_.createHref(pe)}let[Y,U,w]=aE(s,E),V=mE(v,{replace:f,mask:h,state:p,target:m,preventScrollReset:g,relative:l,viewTransition:x,defaultShouldRevalidate:M,useTransitions:L});function he(pe){e&&e(pe),pe.defaultPrevented||V(pe)}let ne=!(D.isExternal||c),de=Z.createElement("a",{...E,...w,href:(ne?z:void 0)||D.absoluteURL||j,onClick:ne?he:e,ref:cE(b,U),target:m,"data-discover":!N&&i==="render"?"true":void 0});return Y&&!N?Z.createElement(Z.Fragment,null,de,Z.createElement(sE,{page:j})):de});X0.displayName="Link";var hE=Z.forwardRef(function({"aria-current":e="page",caseSensitive:i=!1,className:s="",end:l=!1,style:c,to:f,viewTransition:h,children:p,...m},v){let g=nl(f,{relative:m.relative}),x=Vi(),M=Z.useContext(cu),{navigator:E,basename:b}=Z.useContext(ri),y=M!=null&&SE(g)&&h===!0,_=E.encodeLocation?E.encodeLocation(g).pathname:g.pathname,L=x.pathname,N=M&&M.navigation&&M.navigation.location?M.navigation.location.pathname:null;i||(L=L.toLowerCase(),N=N?N.toLowerCase():null,_=_.toLowerCase()),N&&b&&(N=Sa(N,b)||N);const D=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let j=L===_||!l&&L.startsWith(_)&&L.charAt(D)==="/",H=N!=null&&(N===_||!l&&N.startsWith(_)&&N.charAt(_.length)==="/"),z={isActive:j,isPending:H,isTransitioning:y},Y=j?e:void 0,U;typeof s=="function"?U=s(z):U=[s,j?"active":null,H?"pending":null,y?"transitioning":null].filter(Boolean).join(" ");let w=typeof c=="function"?c(z):c;return Z.createElement(X0,{...m,"aria-current":Y,className:U,ref:v,style:w,to:f,viewTransition:h},typeof p=="function"?p(z):p)});hE.displayName="NavLink";var dE=Z.forwardRef(({discover:r="render",fetcherKey:e,navigate:i,reloadDocument:s,replace:l,state:c,method:f=jc,action:h,onSubmit:p,relative:m,preventScrollReset:v,viewTransition:g,defaultShouldRevalidate:x,...M},E)=>{let{useTransitions:b}=Z.useContext(ri),y=_E(),_=xE(h,{relative:m}),L=f.toLowerCase()==="get"?"get":"post",N=typeof h=="string"&&sp.test(h),D=j=>{if(p&&p(j),j.defaultPrevented)return;j.preventDefault();let H=j.nativeEvent.submitter,z=(H==null?void 0:H.getAttribute("formmethod"))||f,Y=()=>y(H||j.currentTarget,{fetcherKey:e,method:z,navigate:i,replace:l,state:c,relative:m,preventScrollReset:v,viewTransition:g,defaultShouldRevalidate:x});b&&i!==!1?Z.startTransition(()=>Y()):Y()};return Z.createElement("form",{ref:E,method:L,action:_,onSubmit:s?p:D,...M,"data-discover":!N&&r==="render"?"true":void 0})});dE.displayName="Form";function pE(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function j0(r){let e=Z.useContext(Fr);return Kt(e,pE(r)),e}function mE(r,{target:e,replace:i,mask:s,state:l,preventScrollReset:c,relative:f,viewTransition:h,defaultShouldRevalidate:p,useTransitions:m}={}){let v=uu(),g=Vi(),x=nl(r,{relative:f});return Z.useCallback(M=>{if(WM(M,e)){M.preventDefault();let E=i!==void 0?i:Zo(g)===Zo(x),b=()=>v(r,{replace:E,mask:s,state:l,preventScrollReset:c,relative:f,viewTransition:h,defaultShouldRevalidate:p});m?Z.startTransition(()=>b()):b()}},[g,v,x,i,s,l,e,r,c,f,h,p,m])}var gE=0,vE=()=>`__${String(++gE)}__`;function _E(){let{router:r}=j0("useSubmit"),{basename:e}=Z.useContext(ri),i=PM(),s=r.fetch,l=r.navigate;return Z.useCallback(async(c,f={})=>{let{action:h,method:p,encType:m,formData:v,body:g}=ZM(c,e);if(f.navigate===!1){let x=f.fetcherKey||vE();await s(x,i,f.action||h,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:v,body:g,formMethod:f.method||p,formEncType:f.encType||m,flushSync:f.flushSync})}else await l(f.action||h,{defaultShouldRevalidate:f.defaultShouldRevalidate,preventScrollReset:f.preventScrollReset,formData:v,body:g,formMethod:f.method||p,formEncType:f.encType||m,replace:f.replace,state:f.state,fromRouteId:i,flushSync:f.flushSync,viewTransition:f.viewTransition})},[s,l,e,i])}function xE(r,{relative:e}={}){let{basename:i}=Z.useContext(ri),s=Z.useContext(Gi);Kt(s,"useFormAction must be used inside a RouteContext");let[l]=s.matches.slice(-1),c={...nl(r||".",{relative:e})},f=Vi();if(r==null){c.search=f.search;let h=new URLSearchParams(c.search),p=h.getAll("index");if(p.some(v=>v==="")){h.delete("index"),p.filter(g=>g).forEach(g=>h.append("index",g));let v=h.toString();c.search=v?`?${v}`:""}}return(!r||r===".")&&l.route.index&&(c.search=c.search?c.search.replace(/^\?/,"?index&"):"?index"),i!=="/"&&(c.pathname=c.pathname==="/"?i:wi([i,c.pathname])),Zo(c)}function SE(r,{relative:e}={}){let i=Z.useContext(z0);Kt(i!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:s}=j0("useViewTransitionState"),l=nl(r,{relative:e});if(!i.isTransitioning)return!1;let c=Sa(i.currentLocation.pathname,s)||i.currentLocation.pathname,f=Sa(i.nextLocation.pathname,s)||i.nextLocation.pathname;return tu(l.pathname,f)!=null||tu(l.pathname,c)!=null}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const dp="177",yE=0,E_=1,ME=2,W0=1,EE=2,da=3,es=0,Zn=1,pa=2,ga=0,Cr=1,iu=2,T_=3,b_=4,TE=5,Cs=100,bE=101,AE=102,RE=103,CE=104,wE=200,DE=201,UE=202,NE=203,pd=204,md=205,LE=206,OE=207,PE=208,zE=209,BE=210,FE=211,IE=212,HE=213,GE=214,gd=0,vd=1,_d=2,Ur=3,xd=4,Sd=5,yd=6,Md=7,q0=0,VE=1,kE=2,$a=0,XE=1,jE=2,WE=3,qE=4,YE=5,ZE=6,KE=7,Y0=300,Nr=301,Lr=302,Ed=303,Td=304,du=306,bd=1e3,Ds=1001,Ad=1002,zn=1003,QE=1004,Sc=1005,Fi=1006,Lh=1007,Us=1008,ya=1009,Z0=1010,K0=1011,Ko=1012,pp=1013,Ns=1014,Ii=1015,va=1016,mp=1017,gp=1018,Qo=1020,Q0=35902,J0=1021,$0=1022,Ci=1023,Jo=1026,$o=1027,vp=1028,_p=1029,ex=1030,xp=1031,Sp=1033,qc=33776,Yc=33777,Zc=33778,Kc=33779,Rd=35840,Cd=35841,wd=35842,Dd=35843,Ud=36196,Nd=37492,Ld=37496,Od=37808,Pd=37809,zd=37810,Bd=37811,Fd=37812,Id=37813,Hd=37814,Gd=37815,Vd=37816,kd=37817,Xd=37818,jd=37819,Wd=37820,qd=37821,Qc=36492,Yd=36494,Zd=36495,tx=36283,Kd=36284,Qd=36285,Jd=36286,JE=3200,$E=3201,eT=0,tT=1,Ja="",gi="srgb",Or="srgb-linear",au="linear",jt="srgb",hr=7680,A_=519,nT=512,iT=513,aT=514,nx=515,sT=516,rT=517,oT=518,lT=519,R_=35044,C_="300 es",ma=2e3,su=2001;class Hr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,e);e.target=null}}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Oh=Math.PI/180,$d=180/Math.PI;function il(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(wn[r&255]+wn[r>>8&255]+wn[r>>16&255]+wn[r>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[i&63|128]+wn[i>>8&255]+"-"+wn[i>>16&255]+wn[i>>24&255]+wn[s&255]+wn[s>>8&255]+wn[s>>16&255]+wn[s>>24&255]).toLowerCase()}function Tt(r,e,i){return Math.max(e,Math.min(i,r))}function cT(r,e){return(r%e+e)%e}function Ph(r,e,i){return(1-i)*r+i*e}function Fo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Wn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class gt{constructor(e=0,i=0){gt.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Tt(this.x,e.x,i.x),this.y=Tt(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Tt(this.x,e,i),this.y=Tt(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Tt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Tt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,f=this.y-e.y;return this.x=c*s-f*l+e.x,this.y=c*l+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class al{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,f,h){let p=s[l+0],m=s[l+1],v=s[l+2],g=s[l+3];const x=c[f+0],M=c[f+1],E=c[f+2],b=c[f+3];if(h===0){e[i+0]=p,e[i+1]=m,e[i+2]=v,e[i+3]=g;return}if(h===1){e[i+0]=x,e[i+1]=M,e[i+2]=E,e[i+3]=b;return}if(g!==b||p!==x||m!==M||v!==E){let y=1-h;const _=p*x+m*M+v*E+g*b,L=_>=0?1:-1,N=1-_*_;if(N>Number.EPSILON){const j=Math.sqrt(N),H=Math.atan2(j,_*L);y=Math.sin(y*H)/j,h=Math.sin(h*H)/j}const D=h*L;if(p=p*y+x*D,m=m*y+M*D,v=v*y+E*D,g=g*y+b*D,y===1-h){const j=1/Math.sqrt(p*p+m*m+v*v+g*g);p*=j,m*=j,v*=j,g*=j}}e[i]=p,e[i+1]=m,e[i+2]=v,e[i+3]=g}static multiplyQuaternionsFlat(e,i,s,l,c,f){const h=s[l],p=s[l+1],m=s[l+2],v=s[l+3],g=c[f],x=c[f+1],M=c[f+2],E=c[f+3];return e[i]=h*E+v*g+p*M-m*x,e[i+1]=p*E+v*x+m*g-h*M,e[i+2]=m*E+v*M+h*x-p*g,e[i+3]=v*E-h*g-p*x-m*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,f=e._order,h=Math.cos,p=Math.sin,m=h(s/2),v=h(l/2),g=h(c/2),x=p(s/2),M=p(l/2),E=p(c/2);switch(f){case"XYZ":this._x=x*v*g+m*M*E,this._y=m*M*g-x*v*E,this._z=m*v*E+x*M*g,this._w=m*v*g-x*M*E;break;case"YXZ":this._x=x*v*g+m*M*E,this._y=m*M*g-x*v*E,this._z=m*v*E-x*M*g,this._w=m*v*g+x*M*E;break;case"ZXY":this._x=x*v*g-m*M*E,this._y=m*M*g+x*v*E,this._z=m*v*E+x*M*g,this._w=m*v*g-x*M*E;break;case"ZYX":this._x=x*v*g-m*M*E,this._y=m*M*g+x*v*E,this._z=m*v*E-x*M*g,this._w=m*v*g+x*M*E;break;case"YZX":this._x=x*v*g+m*M*E,this._y=m*M*g+x*v*E,this._z=m*v*E-x*M*g,this._w=m*v*g-x*M*E;break;case"XZY":this._x=x*v*g-m*M*E,this._y=m*M*g-x*v*E,this._z=m*v*E+x*M*g,this._w=m*v*g+x*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],f=i[1],h=i[5],p=i[9],m=i[2],v=i[6],g=i[10],x=s+h+g;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(v-p)*M,this._y=(c-m)*M,this._z=(f-l)*M}else if(s>h&&s>g){const M=2*Math.sqrt(1+s-h-g);this._w=(v-p)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+m)/M}else if(h>g){const M=2*Math.sqrt(1+h-s-g);this._w=(c-m)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(p+v)/M}else{const M=2*Math.sqrt(1+g-s-h);this._w=(f-l)/M,this._x=(c+m)/M,this._y=(p+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,f=e._w,h=i._x,p=i._y,m=i._z,v=i._w;return this._x=s*v+f*h+l*m-c*p,this._y=l*v+f*p+c*h-s*m,this._z=c*v+f*m+s*p-l*h,this._w=f*v-s*h-l*p-c*m,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const s=this._x,l=this._y,c=this._z,f=this._w;let h=f*e._w+s*e._x+l*e._y+c*e._z;if(h<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,h=-h):this.copy(e),h>=1)return this._w=f,this._x=s,this._y=l,this._z=c,this;const p=1-h*h;if(p<=Number.EPSILON){const M=1-i;return this._w=M*f+i*this._w,this._x=M*s+i*this._x,this._y=M*l+i*this._y,this._z=M*c+i*this._z,this.normalize(),this}const m=Math.sqrt(p),v=Math.atan2(m,h),g=Math.sin((1-i)*v)/m,x=Math.sin(i*v)/m;return this._w=f*g+this._w*x,this._x=s*g+this._x*x,this._y=l*g+this._y*x,this._z=c*g+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ce{constructor(e=0,i=0,s=0){ce.prototype.isVector3=!0,this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(w_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(w_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,f=e.y,h=e.z,p=e.w,m=2*(f*l-h*s),v=2*(h*i-c*l),g=2*(c*s-f*i);return this.x=i+p*m+f*g-h*v,this.y=s+p*v+h*m-c*g,this.z=l+p*g+c*v-f*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Tt(this.x,e.x,i.x),this.y=Tt(this.y,e.y,i.y),this.z=Tt(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Tt(this.x,e,i),this.y=Tt(this.y,e,i),this.z=Tt(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Tt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,f=i.x,h=i.y,p=i.z;return this.x=l*p-c*h,this.y=c*f-s*p,this.z=s*h-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return zh.copy(this).projectOnVector(e),this.sub(zh)}reflect(e){return this.sub(zh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Tt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zh=new ce,w_=new al;class ft{constructor(e,i,s,l,c,f,h,p,m){ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,p,m)}set(e,i,s,l,c,f,h,p,m){const v=this.elements;return v[0]=e,v[1]=l,v[2]=h,v[3]=i,v[4]=c,v[5]=p,v[6]=s,v[7]=f,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[3],p=s[6],m=s[1],v=s[4],g=s[7],x=s[2],M=s[5],E=s[8],b=l[0],y=l[3],_=l[6],L=l[1],N=l[4],D=l[7],j=l[2],H=l[5],z=l[8];return c[0]=f*b+h*L+p*j,c[3]=f*y+h*N+p*H,c[6]=f*_+h*D+p*z,c[1]=m*b+v*L+g*j,c[4]=m*y+v*N+g*H,c[7]=m*_+v*D+g*z,c[2]=x*b+M*L+E*j,c[5]=x*y+M*N+E*H,c[8]=x*_+M*D+E*z,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],p=e[6],m=e[7],v=e[8];return i*f*v-i*h*m-s*c*v+s*h*p+l*c*m-l*f*p}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],p=e[6],m=e[7],v=e[8],g=v*f-h*m,x=h*p-v*c,M=m*c-f*p,E=i*g+s*x+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/E;return e[0]=g*b,e[1]=(l*m-v*s)*b,e[2]=(h*s-l*f)*b,e[3]=x*b,e[4]=(v*i-l*p)*b,e[5]=(l*c-h*i)*b,e[6]=M*b,e[7]=(s*p-m*i)*b,e[8]=(f*i-s*c)*b,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,f,h){const p=Math.cos(c),m=Math.sin(c);return this.set(s*p,s*m,-s*(p*f+m*h)+f+e,-l*m,l*p,-l*(-m*f+p*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Bh.makeScale(e,i)),this}rotate(e){return this.premultiply(Bh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Bh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Bh=new ft;function ix(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ru(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function uT(){const r=ru("canvas");return r.style.display="block",r}const D_={};function wr(r){r in D_||(D_[r]=!0,console.warn(r))}function fT(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}function hT(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function dT(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const U_=new ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),N_=new ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pT(){const r={enabled:!0,workingColorSpace:Or,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===jt&&(l.r=_a(l.r),l.g=_a(l.g),l.b=_a(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===jt&&(l.r=Dr(l.r),l.g=Dr(l.g),l.b=Dr(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===Ja?au:this.spaces[l].transfer},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return wr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return wr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[Or]:{primaries:e,whitePoint:s,transfer:au,toXYZ:U_,fromXYZ:N_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:gi},outputColorSpaceConfig:{drawingBufferColorSpace:gi}},[gi]:{primaries:e,whitePoint:s,transfer:jt,toXYZ:U_,fromXYZ:N_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:gi}}}),r}const Lt=pT();function _a(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Dr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let dr;class mT{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{dr===void 0&&(dr=ru("canvas")),dr.width=e.width,dr.height=e.height;const l=dr.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=dr}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=ru("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=_a(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(_a(i[s]/255)*255):i[s]=_a(i[s]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gT=0;class yp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gT++}),this.uuid=il(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Fh(l[f].image)):c.push(Fh(l[f]))}else c=Fh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function Fh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?mT.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vT=0;const Ih=new ce;class Bn extends Hr{constructor(e=Bn.DEFAULT_IMAGE,i=Bn.DEFAULT_MAPPING,s=Ds,l=Ds,c=Fi,f=Us,h=Ci,p=ya,m=Bn.DEFAULT_ANISOTROPY,v=Ja){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vT++}),this.uuid=il(),this.name="",this.source=new yp(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ih).x}get height(){return this.source.getSize(Ih).y}get depth(){return this.source.getSize(Ih).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){console.warn(`THREE.Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Y0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bd:e.x=e.x-Math.floor(e.x);break;case Ds:e.x=e.x<0?0:1;break;case Ad:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bd:e.y=e.y-Math.floor(e.y);break;case Ds:e.y=e.y<0?0:1;break;case Ad:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bn.DEFAULT_IMAGE=null;Bn.DEFAULT_MAPPING=Y0;Bn.DEFAULT_ANISOTROPY=1;class rn{constructor(e=0,i=0,s=0,l=1){rn.prototype.isVector4=!0,this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const p=e.elements,m=p[0],v=p[4],g=p[8],x=p[1],M=p[5],E=p[9],b=p[2],y=p[6],_=p[10];if(Math.abs(v-x)<.01&&Math.abs(g-b)<.01&&Math.abs(E-y)<.01){if(Math.abs(v+x)<.1&&Math.abs(g+b)<.1&&Math.abs(E+y)<.1&&Math.abs(m+M+_-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const N=(m+1)/2,D=(M+1)/2,j=(_+1)/2,H=(v+x)/4,z=(g+b)/4,Y=(E+y)/4;return N>D&&N>j?N<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(N),l=H/s,c=z/s):D>j?D<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(D),s=H/l,c=Y/l):j<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(j),s=z/c,l=Y/c),this.set(s,l,c,i),this}let L=Math.sqrt((y-E)*(y-E)+(g-b)*(g-b)+(x-v)*(x-v));return Math.abs(L)<.001&&(L=1),this.x=(y-E)/L,this.y=(g-b)/L,this.z=(x-v)/L,this.w=Math.acos((m+M+_-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Tt(this.x,e.x,i.x),this.y=Tt(this.y,e.y,i.y),this.z=Tt(this.z,e.z,i.z),this.w=Tt(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Tt(this.x,e,i),this.y=Tt(this.y,e,i),this.z=Tt(this.z,e,i),this.w=Tt(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Tt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _T extends Hr{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new rn(0,0,e,i),this.scissorTest=!1,this.viewport=new rn(0,0,e,i);const l={width:e,height:i,depth:s.depth},c=new Bn(l);this.textures=[];const f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:Fi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isArrayTexture=this.textures[l].image.depth>1;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new yp(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Di extends _T{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class ax extends Bn{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=zn,this.minFilter=zn,this.wrapR=Ds,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xT extends Bn{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=zn,this.minFilter=zn,this.wrapR=Ds,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sl{constructor(e=new ce(1/0,1/0,1/0),i=new ce(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Ti.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Ti.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Ti.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,Ti):Ti.fromBufferAttribute(c,f),Ti.applyMatrix4(e.matrixWorld),this.expandByPoint(Ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yc.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),yc.copy(s.boundingBox)),yc.applyMatrix4(e.matrixWorld),this.union(yc)}const l=e.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ti),Ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Io),Mc.subVectors(this.max,Io),pr.subVectors(e.a,Io),mr.subVectors(e.b,Io),gr.subVectors(e.c,Io),Wa.subVectors(mr,pr),qa.subVectors(gr,mr),Ss.subVectors(pr,gr);let i=[0,-Wa.z,Wa.y,0,-qa.z,qa.y,0,-Ss.z,Ss.y,Wa.z,0,-Wa.x,qa.z,0,-qa.x,Ss.z,0,-Ss.x,-Wa.y,Wa.x,0,-qa.y,qa.x,0,-Ss.y,Ss.x,0];return!Hh(i,pr,mr,gr,Mc)||(i=[1,0,0,0,1,0,0,0,1],!Hh(i,pr,mr,gr,Mc))?!1:(Ec.crossVectors(Wa,qa),i=[Ec.x,Ec.y,Ec.z],Hh(i,pr,mr,gr,Mc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(la[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),la[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),la[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),la[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),la[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),la[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),la[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),la[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(la),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const la=[new ce,new ce,new ce,new ce,new ce,new ce,new ce,new ce],Ti=new ce,yc=new sl,pr=new ce,mr=new ce,gr=new ce,Wa=new ce,qa=new ce,Ss=new ce,Io=new ce,Mc=new ce,Ec=new ce,ys=new ce;function Hh(r,e,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){ys.fromArray(r,c);const h=l.x*Math.abs(ys.x)+l.y*Math.abs(ys.y)+l.z*Math.abs(ys.z),p=e.dot(ys),m=i.dot(ys),v=s.dot(ys);if(Math.max(-Math.max(p,m,v),Math.min(p,m,v))>h)return!1}return!0}const ST=new sl,Ho=new ce,Gh=new ce;class pu{constructor(e=new ce,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):ST.setFromPoints(e).getCenter(s);let l=0;for(let c=0,f=e.length;c<f;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ho.subVectors(e,this.center);const i=Ho.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Ho,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ho.copy(e.center).add(Gh)),this.expandByPoint(Ho.copy(e.center).sub(Gh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ca=new ce,Vh=new ce,Tc=new ce,Ya=new ce,kh=new ce,bc=new ce,Xh=new ce;class sx{constructor(e=new ce,i=new ce(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ca)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ca.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ca.copy(this.origin).addScaledVector(this.direction,i),ca.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){Vh.copy(e).add(i).multiplyScalar(.5),Tc.copy(i).sub(e).normalize(),Ya.copy(this.origin).sub(Vh);const c=e.distanceTo(i)*.5,f=-this.direction.dot(Tc),h=Ya.dot(this.direction),p=-Ya.dot(Tc),m=Ya.lengthSq(),v=Math.abs(1-f*f);let g,x,M,E;if(v>0)if(g=f*p-h,x=f*h-p,E=c*v,g>=0)if(x>=-E)if(x<=E){const b=1/v;g*=b,x*=b,M=g*(g+f*x+2*h)+x*(f*g+x+2*p)+m}else x=c,g=Math.max(0,-(f*x+h)),M=-g*g+x*(x+2*p)+m;else x=-c,g=Math.max(0,-(f*x+h)),M=-g*g+x*(x+2*p)+m;else x<=-E?(g=Math.max(0,-(-f*c+h)),x=g>0?-c:Math.min(Math.max(-c,-p),c),M=-g*g+x*(x+2*p)+m):x<=E?(g=0,x=Math.min(Math.max(-c,-p),c),M=x*(x+2*p)+m):(g=Math.max(0,-(f*c+h)),x=g>0?c:Math.min(Math.max(-c,-p),c),M=-g*g+x*(x+2*p)+m);else x=f>0?-c:c,g=Math.max(0,-(f*x+h)),M=-g*g+x*(x+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,g),l&&l.copy(Vh).addScaledVector(Tc,x),M}intersectSphere(e,i){ca.subVectors(e.center,this.origin);const s=ca.dot(this.direction),l=ca.dot(ca)-s*s,c=e.radius*e.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,p=s+f;return p<0?null:h<0?this.at(p,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,f,h,p;const m=1/this.direction.x,v=1/this.direction.y,g=1/this.direction.z,x=this.origin;return m>=0?(s=(e.min.x-x.x)*m,l=(e.max.x-x.x)*m):(s=(e.max.x-x.x)*m,l=(e.min.x-x.x)*m),v>=0?(c=(e.min.y-x.y)*v,f=(e.max.y-x.y)*v):(c=(e.max.y-x.y)*v,f=(e.min.y-x.y)*v),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),g>=0?(h=(e.min.z-x.z)*g,p=(e.max.z-x.z)*g):(h=(e.max.z-x.z)*g,p=(e.min.z-x.z)*g),s>p||h>l)||((h>s||s!==s)&&(s=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,ca)!==null}intersectTriangle(e,i,s,l,c){kh.subVectors(i,e),bc.subVectors(s,e),Xh.crossVectors(kh,bc);let f=this.direction.dot(Xh),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;Ya.subVectors(this.origin,e);const p=h*this.direction.dot(bc.crossVectors(Ya,bc));if(p<0)return null;const m=h*this.direction.dot(kh.cross(Ya));if(m<0||p+m>f)return null;const v=-h*Ya.dot(Xh);return v<0?null:this.at(v/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class on{constructor(e,i,s,l,c,f,h,p,m,v,g,x,M,E,b,y){on.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,p,m,v,g,x,M,E,b,y)}set(e,i,s,l,c,f,h,p,m,v,g,x,M,E,b,y){const _=this.elements;return _[0]=e,_[4]=i,_[8]=s,_[12]=l,_[1]=c,_[5]=f,_[9]=h,_[13]=p,_[2]=m,_[6]=v,_[10]=g,_[14]=x,_[3]=M,_[7]=E,_[11]=b,_[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new on().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,s=e.elements,l=1/vr.setFromMatrixColumn(e,0).length(),c=1/vr.setFromMatrixColumn(e,1).length(),f=1/vr.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,f=Math.cos(s),h=Math.sin(s),p=Math.cos(l),m=Math.sin(l),v=Math.cos(c),g=Math.sin(c);if(e.order==="XYZ"){const x=f*v,M=f*g,E=h*v,b=h*g;i[0]=p*v,i[4]=-p*g,i[8]=m,i[1]=M+E*m,i[5]=x-b*m,i[9]=-h*p,i[2]=b-x*m,i[6]=E+M*m,i[10]=f*p}else if(e.order==="YXZ"){const x=p*v,M=p*g,E=m*v,b=m*g;i[0]=x+b*h,i[4]=E*h-M,i[8]=f*m,i[1]=f*g,i[5]=f*v,i[9]=-h,i[2]=M*h-E,i[6]=b+x*h,i[10]=f*p}else if(e.order==="ZXY"){const x=p*v,M=p*g,E=m*v,b=m*g;i[0]=x-b*h,i[4]=-f*g,i[8]=E+M*h,i[1]=M+E*h,i[5]=f*v,i[9]=b-x*h,i[2]=-f*m,i[6]=h,i[10]=f*p}else if(e.order==="ZYX"){const x=f*v,M=f*g,E=h*v,b=h*g;i[0]=p*v,i[4]=E*m-M,i[8]=x*m+b,i[1]=p*g,i[5]=b*m+x,i[9]=M*m-E,i[2]=-m,i[6]=h*p,i[10]=f*p}else if(e.order==="YZX"){const x=f*p,M=f*m,E=h*p,b=h*m;i[0]=p*v,i[4]=b-x*g,i[8]=E*g+M,i[1]=g,i[5]=f*v,i[9]=-h*v,i[2]=-m*v,i[6]=M*g+E,i[10]=x-b*g}else if(e.order==="XZY"){const x=f*p,M=f*m,E=h*p,b=h*m;i[0]=p*v,i[4]=-g,i[8]=m*v,i[1]=x*g+b,i[5]=f*v,i[9]=M*g-E,i[2]=E*g-M,i[6]=h*v,i[10]=b*g+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yT,e,MT)}lookAt(e,i,s){const l=this.elements;return ai.subVectors(e,i),ai.lengthSq()===0&&(ai.z=1),ai.normalize(),Za.crossVectors(s,ai),Za.lengthSq()===0&&(Math.abs(s.z)===1?ai.x+=1e-4:ai.z+=1e-4,ai.normalize(),Za.crossVectors(s,ai)),Za.normalize(),Ac.crossVectors(ai,Za),l[0]=Za.x,l[4]=Ac.x,l[8]=ai.x,l[1]=Za.y,l[5]=Ac.y,l[9]=ai.y,l[2]=Za.z,l[6]=Ac.z,l[10]=ai.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[4],p=s[8],m=s[12],v=s[1],g=s[5],x=s[9],M=s[13],E=s[2],b=s[6],y=s[10],_=s[14],L=s[3],N=s[7],D=s[11],j=s[15],H=l[0],z=l[4],Y=l[8],U=l[12],w=l[1],V=l[5],he=l[9],ne=l[13],de=l[2],pe=l[6],B=l[10],$=l[14],J=l[3],Se=l[7],be=l[11],P=l[15];return c[0]=f*H+h*w+p*de+m*J,c[4]=f*z+h*V+p*pe+m*Se,c[8]=f*Y+h*he+p*B+m*be,c[12]=f*U+h*ne+p*$+m*P,c[1]=v*H+g*w+x*de+M*J,c[5]=v*z+g*V+x*pe+M*Se,c[9]=v*Y+g*he+x*B+M*be,c[13]=v*U+g*ne+x*$+M*P,c[2]=E*H+b*w+y*de+_*J,c[6]=E*z+b*V+y*pe+_*Se,c[10]=E*Y+b*he+y*B+_*be,c[14]=E*U+b*ne+y*$+_*P,c[3]=L*H+N*w+D*de+j*J,c[7]=L*z+N*V+D*pe+j*Se,c[11]=L*Y+N*he+D*B+j*be,c[15]=L*U+N*ne+D*$+j*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],f=e[1],h=e[5],p=e[9],m=e[13],v=e[2],g=e[6],x=e[10],M=e[14],E=e[3],b=e[7],y=e[11],_=e[15];return E*(+c*p*g-l*m*g-c*h*x+s*m*x+l*h*M-s*p*M)+b*(+i*p*M-i*m*x+c*f*x-l*f*M+l*m*v-c*p*v)+y*(+i*m*g-i*h*M-c*f*g+s*f*M+c*h*v-s*m*v)+_*(-l*h*v-i*p*g+i*h*x+l*f*g-s*f*x+s*p*v)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],p=e[6],m=e[7],v=e[8],g=e[9],x=e[10],M=e[11],E=e[12],b=e[13],y=e[14],_=e[15],L=g*y*m-b*x*m+b*p*M-h*y*M-g*p*_+h*x*_,N=E*x*m-v*y*m-E*p*M+f*y*M+v*p*_-f*x*_,D=v*b*m-E*g*m+E*h*M-f*b*M-v*h*_+f*g*_,j=E*g*p-v*b*p-E*h*x+f*b*x+v*h*y-f*g*y,H=i*L+s*N+l*D+c*j;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/H;return e[0]=L*z,e[1]=(b*x*c-g*y*c-b*l*M+s*y*M+g*l*_-s*x*_)*z,e[2]=(h*y*c-b*p*c+b*l*m-s*y*m-h*l*_+s*p*_)*z,e[3]=(g*p*c-h*x*c-g*l*m+s*x*m+h*l*M-s*p*M)*z,e[4]=N*z,e[5]=(v*y*c-E*x*c+E*l*M-i*y*M-v*l*_+i*x*_)*z,e[6]=(E*p*c-f*y*c-E*l*m+i*y*m+f*l*_-i*p*_)*z,e[7]=(f*x*c-v*p*c+v*l*m-i*x*m-f*l*M+i*p*M)*z,e[8]=D*z,e[9]=(E*g*c-v*b*c-E*s*M+i*b*M+v*s*_-i*g*_)*z,e[10]=(f*b*c-E*h*c+E*s*m-i*b*m-f*s*_+i*h*_)*z,e[11]=(v*h*c-f*g*c-v*s*m+i*g*m+f*s*M-i*h*M)*z,e[12]=j*z,e[13]=(v*b*l-E*g*l+E*s*x-i*b*x-v*s*y+i*g*y)*z,e[14]=(E*h*l-f*b*l-E*s*p+i*b*p+f*s*y-i*h*y)*z,e[15]=(f*g*l-v*h*l+v*s*p-i*g*p-f*s*x+i*h*x)*z,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=e.x,h=e.y,p=e.z,m=c*f,v=c*h;return this.set(m*f+s,m*h-l*p,m*p+l*h,0,m*h+l*p,v*h+s,v*p-l*f,0,m*p-l*h,v*p+l*f,c*p*p+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,f){return this.set(1,s,c,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,f=i._y,h=i._z,p=i._w,m=c+c,v=f+f,g=h+h,x=c*m,M=c*v,E=c*g,b=f*v,y=f*g,_=h*g,L=p*m,N=p*v,D=p*g,j=s.x,H=s.y,z=s.z;return l[0]=(1-(b+_))*j,l[1]=(M+D)*j,l[2]=(E-N)*j,l[3]=0,l[4]=(M-D)*H,l[5]=(1-(x+_))*H,l[6]=(y+L)*H,l[7]=0,l[8]=(E+N)*z,l[9]=(y-L)*z,l[10]=(1-(x+b))*z,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;let c=vr.set(l[0],l[1],l[2]).length();const f=vr.set(l[4],l[5],l[6]).length(),h=vr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),e.x=l[12],e.y=l[13],e.z=l[14],bi.copy(this);const m=1/c,v=1/f,g=1/h;return bi.elements[0]*=m,bi.elements[1]*=m,bi.elements[2]*=m,bi.elements[4]*=v,bi.elements[5]*=v,bi.elements[6]*=v,bi.elements[8]*=g,bi.elements[9]*=g,bi.elements[10]*=g,i.setFromRotationMatrix(bi),s.x=c,s.y=f,s.z=h,this}makePerspective(e,i,s,l,c,f,h=ma){const p=this.elements,m=2*c/(i-e),v=2*c/(s-l),g=(i+e)/(i-e),x=(s+l)/(s-l);let M,E;if(h===ma)M=-(f+c)/(f-c),E=-2*f*c/(f-c);else if(h===su)M=-f/(f-c),E=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=m,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=v,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,f,h=ma){const p=this.elements,m=1/(i-e),v=1/(s-l),g=1/(f-c),x=(i+e)*m,M=(s+l)*v;let E,b;if(h===ma)E=(f+c)*g,b=-2*g;else if(h===su)E=c*g,b=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*v,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=b,p[14]=-E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const vr=new ce,bi=new on,yT=new ce(0,0,0),MT=new ce(1,1,1),Za=new ce,Ac=new ce,ai=new ce,L_=new on,O_=new al;class Ma{constructor(e=0,i=0,s=0,l=Ma.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],f=l[4],h=l[8],p=l[1],m=l[5],v=l[9],g=l[2],x=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(Tt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(h,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-g,c),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-g,M),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-Tt(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(Tt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-g,c)):(this._x=0,this._y=Math.atan2(h,M));break;case"XZY":this._z=Math.asin(-Tt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-v,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return L_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(L_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return O_.setFromEuler(this),this.setFromQuaternion(O_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ma.DEFAULT_ORDER="XYZ";class rx{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ET=0;const P_=new ce,_r=new al,ua=new on,Rc=new ce,Go=new ce,TT=new ce,bT=new al,z_=new ce(1,0,0),B_=new ce(0,1,0),F_=new ce(0,0,1),I_={type:"added"},AT={type:"removed"},xr={type:"childadded",child:null},jh={type:"childremoved",child:null};class Kn extends Hr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ET++}),this.uuid=il(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Kn.DEFAULT_UP.clone();const e=new ce,i=new Ma,s=new al,l=new ce(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new on},normalMatrix:{value:new ft}}),this.matrix=new on,this.matrixWorld=new on,this.matrixAutoUpdate=Kn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Kn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return _r.setFromAxisAngle(e,i),this.quaternion.multiply(_r),this}rotateOnWorldAxis(e,i){return _r.setFromAxisAngle(e,i),this.quaternion.premultiply(_r),this}rotateX(e){return this.rotateOnAxis(z_,e)}rotateY(e){return this.rotateOnAxis(B_,e)}rotateZ(e){return this.rotateOnAxis(F_,e)}translateOnAxis(e,i){return P_.copy(e).applyQuaternion(this.quaternion),this.position.add(P_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(z_,e)}translateY(e){return this.translateOnAxis(B_,e)}translateZ(e){return this.translateOnAxis(F_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ua.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Rc.copy(e):Rc.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ua.lookAt(Go,Rc,this.up):ua.lookAt(Rc,Go,this.up),this.quaternion.setFromRotationMatrix(ua),l&&(ua.extractRotation(l.matrixWorld),_r.setFromRotationMatrix(ua),this.quaternion.premultiply(_r.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(I_),xr.child=e,this.dispatchEvent(xr),xr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(AT),jh.child=e,this.dispatchEvent(jh),jh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ua.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ua.multiply(e.parent.matrixWorld)),e.applyMatrix4(ua),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(I_),xr.child=e,this.dispatchEvent(xr),xr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,e,TT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,bT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,v=p.length;m<v;m++){const g=p[m];c(e.shapes,g)}else c(e.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(c(e.materials,this.material[p]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(c(e.animations,p))}}if(i){const h=f(e.geometries),p=f(e.materials),m=f(e.textures),v=f(e.images),g=f(e.shapes),x=f(e.skeletons),M=f(e.animations),E=f(e.nodes);h.length>0&&(s.geometries=h),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),v.length>0&&(s.images=v),g.length>0&&(s.shapes=g),x.length>0&&(s.skeletons=x),M.length>0&&(s.animations=M),E.length>0&&(s.nodes=E)}return s.object=l,s;function f(h){const p=[];for(const m in h){const v=h[m];delete v.metadata,p.push(v)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}Kn.DEFAULT_UP=new ce(0,1,0);Kn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Kn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ai=new ce,fa=new ce,Wh=new ce,ha=new ce,Sr=new ce,yr=new ce,H_=new ce,qh=new ce,Yh=new ce,Zh=new ce,Kh=new rn,Qh=new rn,Jh=new rn;class Ri{constructor(e=new ce,i=new ce,s=new ce){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),Ai.subVectors(e,i),l.cross(Ai);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){Ai.subVectors(l,i),fa.subVectors(s,i),Wh.subVectors(e,i);const f=Ai.dot(Ai),h=Ai.dot(fa),p=Ai.dot(Wh),m=fa.dot(fa),v=fa.dot(Wh),g=f*m-h*h;if(g===0)return c.set(0,0,0),null;const x=1/g,M=(m*p-h*v)*x,E=(f*v-h*p)*x;return c.set(1-M-E,E,M)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,ha)===null?!1:ha.x>=0&&ha.y>=0&&ha.x+ha.y<=1}static getInterpolation(e,i,s,l,c,f,h,p){return this.getBarycoord(e,i,s,l,ha)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,ha.x),p.addScaledVector(f,ha.y),p.addScaledVector(h,ha.z),p)}static getInterpolatedAttribute(e,i,s,l,c,f){return Kh.setScalar(0),Qh.setScalar(0),Jh.setScalar(0),Kh.fromBufferAttribute(e,i),Qh.fromBufferAttribute(e,s),Jh.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(Kh,c.x),f.addScaledVector(Qh,c.y),f.addScaledVector(Jh,c.z),f}static isFrontFacing(e,i,s,l){return Ai.subVectors(s,i),fa.subVectors(e,i),Ai.cross(fa).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),fa.subVectors(this.a,this.b),Ai.cross(fa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ri.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ri.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return Ri.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return Ri.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ri.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let f,h;Sr.subVectors(l,s),yr.subVectors(c,s),qh.subVectors(e,s);const p=Sr.dot(qh),m=yr.dot(qh);if(p<=0&&m<=0)return i.copy(s);Yh.subVectors(e,l);const v=Sr.dot(Yh),g=yr.dot(Yh);if(v>=0&&g<=v)return i.copy(l);const x=p*g-v*m;if(x<=0&&p>=0&&v<=0)return f=p/(p-v),i.copy(s).addScaledVector(Sr,f);Zh.subVectors(e,c);const M=Sr.dot(Zh),E=yr.dot(Zh);if(E>=0&&M<=E)return i.copy(c);const b=M*m-p*E;if(b<=0&&m>=0&&E<=0)return h=m/(m-E),i.copy(s).addScaledVector(yr,h);const y=v*E-M*g;if(y<=0&&g-v>=0&&M-E>=0)return H_.subVectors(c,l),h=(g-v)/(g-v+(M-E)),i.copy(l).addScaledVector(H_,h);const _=1/(y+b+x);return f=b*_,h=x*_,i.copy(s).addScaledVector(Sr,f).addScaledVector(yr,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ox={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ka={h:0,s:0,l:0},Cc={h:0,s:0,l:0};function $h(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class pt{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=gi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Lt.workingColorSpace){return this.r=e,this.g=i,this.b=s,Lt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Lt.workingColorSpace){if(e=cT(e,1),i=Tt(i,0,1),s=Tt(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=$h(f,c,e+1/3),this.g=$h(f,c,e),this.b=$h(f,c,e-1/3)}return Lt.colorSpaceToWorking(this,l),this}setStyle(e,i=gi){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=gi){const s=ox[e.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_a(e.r),this.g=_a(e.g),this.b=_a(e.b),this}copyLinearToSRGB(e){return this.r=Dr(e.r),this.g=Dr(e.g),this.b=Dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gi){return Lt.workingToColorSpace(Dn.copy(this),e),Math.round(Tt(Dn.r*255,0,255))*65536+Math.round(Tt(Dn.g*255,0,255))*256+Math.round(Tt(Dn.b*255,0,255))}getHexString(e=gi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Lt.workingColorSpace){Lt.workingToColorSpace(Dn.copy(this),i);const s=Dn.r,l=Dn.g,c=Dn.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let p,m;const v=(h+f)/2;if(h===f)p=0,m=0;else{const g=f-h;switch(m=v<=.5?g/(f+h):g/(2-f-h),f){case s:p=(l-c)/g+(l<c?6:0);break;case l:p=(c-s)/g+2;break;case c:p=(s-l)/g+4;break}p/=6}return e.h=p,e.s=m,e.l=v,e}getRGB(e,i=Lt.workingColorSpace){return Lt.workingToColorSpace(Dn.copy(this),i),e.r=Dn.r,e.g=Dn.g,e.b=Dn.b,e}getStyle(e=gi){Lt.workingToColorSpace(Dn.copy(this),e);const i=Dn.r,s=Dn.g,l=Dn.b;return e!==gi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(Ka),this.setHSL(Ka.h+e,Ka.s+i,Ka.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(Ka),e.getHSL(Cc);const s=Ph(Ka.h,Cc.h,i),l=Ph(Ka.s,Cc.s,i),c=Ph(Ka.l,Cc.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dn=new pt;pt.NAMES=ox;let RT=0;class rl extends Hr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:RT++}),this.uuid=il(),this.name="",this.type="Material",this.blending=Cr,this.side=es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pd,this.blendDst=md,this.blendEquation=Cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pt(0,0,0),this.blendAlpha=0,this.depthFunc=Ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=A_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hr,this.stencilZFail=hr,this.stencilZPass=hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Cr&&(s.blending=this.blending),this.side!==es&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==pd&&(s.blendSrc=this.blendSrc),this.blendDst!==md&&(s.blendDst=this.blendDst),this.blendEquation!==Cs&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Ur&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==A_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==hr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==hr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const p=c[h];delete p.metadata,f.push(p)}return f}if(i){const c=l(e.textures),f=l(e.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Mp extends rl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ma,this.combine=q0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hn=new ce,wc=new gt;let CT=0;class Yn{constructor(e,i,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:CT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=R_,this.updateRanges=[],this.gpuType=Ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)wc.fromBufferAttribute(this,i),wc.applyMatrix3(e),this.setXY(i,wc.x,wc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)hn.fromBufferAttribute(this,i),hn.applyMatrix3(e),this.setXYZ(i,hn.x,hn.y,hn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)hn.fromBufferAttribute(this,i),hn.applyMatrix4(e),this.setXYZ(i,hn.x,hn.y,hn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)hn.fromBufferAttribute(this,i),hn.applyNormalMatrix(e),this.setXYZ(i,hn.x,hn.y,hn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)hn.fromBufferAttribute(this,i),hn.transformDirection(e),this.setXYZ(i,hn.x,hn.y,hn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=Fo(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=Wn(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=Fo(i,this.array)),i}setX(e,i){return this.normalized&&(i=Wn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=Fo(i,this.array)),i}setY(e,i){return this.normalized&&(i=Wn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=Fo(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Wn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=Fo(i,this.array)),i}setW(e,i){return this.normalized&&(i=Wn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=Wn(i,this.array),s=Wn(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=Wn(i,this.array),s=Wn(s,this.array),l=Wn(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=Wn(i,this.array),s=Wn(s,this.array),l=Wn(l,this.array),c=Wn(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==R_&&(e.usage=this.usage),e}}class lx extends Yn{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class cx extends Yn{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class xa extends Yn{constructor(e,i,s){super(new Float32Array(e),i,s)}}let wT=0;const mi=new on,ed=new Kn,Mr=new ce,si=new sl,Vo=new sl,xn=new ce;class ki extends Hr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wT++}),this.uuid=il(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ix(e)?cx:lx)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new ft().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mi.makeRotationFromQuaternion(e),this.applyMatrix4(mi),this}rotateX(e){return mi.makeRotationX(e),this.applyMatrix4(mi),this}rotateY(e){return mi.makeRotationY(e),this.applyMatrix4(mi),this}rotateZ(e){return mi.makeRotationZ(e),this.applyMatrix4(mi),this}translate(e,i,s){return mi.makeTranslation(e,i,s),this.applyMatrix4(mi),this}scale(e,i,s){return mi.makeScale(e,i,s),this.applyMatrix4(mi),this}lookAt(e){return ed.lookAt(e),ed.updateMatrix(),this.applyMatrix4(ed.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const f=e[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new xa(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ce(-1/0,-1/0,-1/0),new ce(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];si.setFromBufferAttribute(c),this.morphTargetsRelative?(xn.addVectors(this.boundingBox.min,si.min),this.boundingBox.expandByPoint(xn),xn.addVectors(this.boundingBox.max,si.max),this.boundingBox.expandByPoint(xn)):(this.boundingBox.expandByPoint(si.min),this.boundingBox.expandByPoint(si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pu);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ce,1/0);return}if(e){const s=this.boundingSphere.center;if(si.setFromBufferAttribute(e),i)for(let c=0,f=i.length;c<f;c++){const h=i[c];Vo.setFromBufferAttribute(h),this.morphTargetsRelative?(xn.addVectors(si.min,Vo.min),si.expandByPoint(xn),xn.addVectors(si.max,Vo.max),si.expandByPoint(xn)):(si.expandByPoint(Vo.min),si.expandByPoint(Vo.max))}si.getCenter(s);let l=0;for(let c=0,f=e.count;c<f;c++)xn.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(xn));if(i)for(let c=0,f=i.length;c<f;c++){const h=i[c],p=this.morphTargetsRelative;for(let m=0,v=h.count;m<v;m++)xn.fromBufferAttribute(h,m),p&&(Mr.fromBufferAttribute(e,m),xn.add(Mr)),l=Math.max(l,s.distanceToSquared(xn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yn(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],p=[];for(let Y=0;Y<s.count;Y++)h[Y]=new ce,p[Y]=new ce;const m=new ce,v=new ce,g=new ce,x=new gt,M=new gt,E=new gt,b=new ce,y=new ce;function _(Y,U,w){m.fromBufferAttribute(s,Y),v.fromBufferAttribute(s,U),g.fromBufferAttribute(s,w),x.fromBufferAttribute(c,Y),M.fromBufferAttribute(c,U),E.fromBufferAttribute(c,w),v.sub(m),g.sub(m),M.sub(x),E.sub(x);const V=1/(M.x*E.y-E.x*M.y);isFinite(V)&&(b.copy(v).multiplyScalar(E.y).addScaledVector(g,-M.y).multiplyScalar(V),y.copy(g).multiplyScalar(M.x).addScaledVector(v,-E.x).multiplyScalar(V),h[Y].add(b),h[U].add(b),h[w].add(b),p[Y].add(y),p[U].add(y),p[w].add(y))}let L=this.groups;L.length===0&&(L=[{start:0,count:e.count}]);for(let Y=0,U=L.length;Y<U;++Y){const w=L[Y],V=w.start,he=w.count;for(let ne=V,de=V+he;ne<de;ne+=3)_(e.getX(ne+0),e.getX(ne+1),e.getX(ne+2))}const N=new ce,D=new ce,j=new ce,H=new ce;function z(Y){j.fromBufferAttribute(l,Y),H.copy(j);const U=h[Y];N.copy(U),N.sub(j.multiplyScalar(j.dot(U))).normalize(),D.crossVectors(H,U);const V=D.dot(p[Y])<0?-1:1;f.setXYZW(Y,N.x,N.y,N.z,V)}for(let Y=0,U=L.length;Y<U;++Y){const w=L[Y],V=w.start,he=w.count;for(let ne=V,de=V+he;ne<de;ne+=3)z(e.getX(ne+0)),z(e.getX(ne+1)),z(e.getX(ne+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Yn(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let x=0,M=s.count;x<M;x++)s.setXYZ(x,0,0,0);const l=new ce,c=new ce,f=new ce,h=new ce,p=new ce,m=new ce,v=new ce,g=new ce;if(e)for(let x=0,M=e.count;x<M;x+=3){const E=e.getX(x+0),b=e.getX(x+1),y=e.getX(x+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,b),f.fromBufferAttribute(i,y),v.subVectors(f,c),g.subVectors(l,c),v.cross(g),h.fromBufferAttribute(s,E),p.fromBufferAttribute(s,b),m.fromBufferAttribute(s,y),h.add(v),p.add(v),m.add(v),s.setXYZ(E,h.x,h.y,h.z),s.setXYZ(b,p.x,p.y,p.z),s.setXYZ(y,m.x,m.y,m.z)}else for(let x=0,M=i.count;x<M;x+=3)l.fromBufferAttribute(i,x+0),c.fromBufferAttribute(i,x+1),f.fromBufferAttribute(i,x+2),v.subVectors(f,c),g.subVectors(l,c),v.cross(g),s.setXYZ(x+0,v.x,v.y,v.z),s.setXYZ(x+1,v.x,v.y,v.z),s.setXYZ(x+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)xn.fromBufferAttribute(e,i),xn.normalize(),e.setXYZ(i,xn.x,xn.y,xn.z)}toNonIndexed(){function e(h,p){const m=h.array,v=h.itemSize,g=h.normalized,x=new m.constructor(p.length*v);let M=0,E=0;for(let b=0,y=p.length;b<y;b++){h.isInterleavedBufferAttribute?M=p[b]*h.data.stride+h.offset:M=p[b]*v;for(let _=0;_<v;_++)x[E++]=m[M++]}return new Yn(x,v,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new ki,s=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=e(p,s);i.setAttribute(h,m)}const c=this.morphAttributes;for(const h in c){const p=[],m=c[h];for(let v=0,g=m.length;v<g;v++){const x=m[v],M=e(x,s);p.push(M)}i.morphAttributes[h]=p}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,p=f.length;h<p;h++){const m=f[h];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const m=s[p];e.data.attributes[p]=m.toJSON(e.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],v=[];for(let g=0,x=m.length;g<x;g++){const M=m[g];v.push(M.toJSON(e.data))}v.length>0&&(l[p]=v,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const m in l){const v=l[m];this.setAttribute(m,v.clone(i))}const c=e.morphAttributes;for(const m in c){const v=[],g=c[m];for(let x=0,M=g.length;x<M;x++)v.push(g[x].clone(i));this.morphAttributes[m]=v}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let m=0,v=f.length;m<v;m++){const g=f[m];this.addGroup(g.start,g.count,g.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const G_=new on,Ms=new sx,Dc=new pu,V_=new ce,Uc=new ce,Nc=new ce,Lc=new ce,td=new ce,Oc=new ce,k_=new ce,Pc=new ce;class Hi extends Kn{constructor(e=new ki,i=new Mp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){Oc.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const v=h[p],g=c[p];v!==0&&(td.fromBufferAttribute(g,e),f?Oc.addScaledVector(td,v):Oc.addScaledVector(td.sub(i),v))}i.add(Oc)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Dc.copy(s.boundingSphere),Dc.applyMatrix4(c),Ms.copy(e.ray).recast(e.near),!(Dc.containsPoint(Ms.origin)===!1&&(Ms.intersectSphere(Dc,V_)===null||Ms.origin.distanceToSquared(V_)>(e.far-e.near)**2))&&(G_.copy(c).invert(),Ms.copy(e.ray).applyMatrix4(G_),!(s.boundingBox!==null&&Ms.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Ms)))}_computeIntersections(e,i,s){let l;const c=this.geometry,f=this.material,h=c.index,p=c.attributes.position,m=c.attributes.uv,v=c.attributes.uv1,g=c.attributes.normal,x=c.groups,M=c.drawRange;if(h!==null)if(Array.isArray(f))for(let E=0,b=x.length;E<b;E++){const y=x[E],_=f[y.materialIndex],L=Math.max(y.start,M.start),N=Math.min(h.count,Math.min(y.start+y.count,M.start+M.count));for(let D=L,j=N;D<j;D+=3){const H=h.getX(D),z=h.getX(D+1),Y=h.getX(D+2);l=zc(this,_,e,s,m,v,g,H,z,Y),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),b=Math.min(h.count,M.start+M.count);for(let y=E,_=b;y<_;y+=3){const L=h.getX(y),N=h.getX(y+1),D=h.getX(y+2);l=zc(this,f,e,s,m,v,g,L,N,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(f))for(let E=0,b=x.length;E<b;E++){const y=x[E],_=f[y.materialIndex],L=Math.max(y.start,M.start),N=Math.min(p.count,Math.min(y.start+y.count,M.start+M.count));for(let D=L,j=N;D<j;D+=3){const H=D,z=D+1,Y=D+2;l=zc(this,_,e,s,m,v,g,H,z,Y),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),b=Math.min(p.count,M.start+M.count);for(let y=E,_=b;y<_;y+=3){const L=y,N=y+1,D=y+2;l=zc(this,f,e,s,m,v,g,L,N,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function DT(r,e,i,s,l,c,f,h){let p;if(e.side===Zn?p=s.intersectTriangle(f,c,l,!0,h):p=s.intersectTriangle(l,c,f,e.side===es,h),p===null)return null;Pc.copy(h),Pc.applyMatrix4(r.matrixWorld);const m=i.ray.origin.distanceTo(Pc);return m<i.near||m>i.far?null:{distance:m,point:Pc.clone(),object:r}}function zc(r,e,i,s,l,c,f,h,p,m){r.getVertexPosition(h,Uc),r.getVertexPosition(p,Nc),r.getVertexPosition(m,Lc);const v=DT(r,e,i,s,Uc,Nc,Lc,k_);if(v){const g=new ce;Ri.getBarycoord(k_,Uc,Nc,Lc,g),l&&(v.uv=Ri.getInterpolatedAttribute(l,h,p,m,g,new gt)),c&&(v.uv1=Ri.getInterpolatedAttribute(c,h,p,m,g,new gt)),f&&(v.normal=Ri.getInterpolatedAttribute(f,h,p,m,g,new ce),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const x={a:h,b:p,c:m,normal:new ce,materialIndex:0};Ri.getNormal(Uc,Nc,Lc,x.normal),v.face=x,v.barycoord=g}return v}class ol extends ki{constructor(e=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const p=[],m=[],v=[],g=[];let x=0,M=0;E("z","y","x",-1,-1,s,i,e,f,c,0),E("z","y","x",1,-1,s,i,-e,f,c,1),E("x","z","y",1,1,e,s,i,l,f,2),E("x","z","y",1,-1,e,s,-i,l,f,3),E("x","y","z",1,-1,e,i,s,l,c,4),E("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(p),this.setAttribute("position",new xa(m,3)),this.setAttribute("normal",new xa(v,3)),this.setAttribute("uv",new xa(g,2));function E(b,y,_,L,N,D,j,H,z,Y,U){const w=D/z,V=j/Y,he=D/2,ne=j/2,de=H/2,pe=z+1,B=Y+1;let $=0,J=0;const Se=new ce;for(let be=0;be<B;be++){const P=be*V-ne;for(let re=0;re<pe;re++){const ye=re*w-he;Se[b]=ye*L,Se[y]=P*N,Se[_]=de,m.push(Se.x,Se.y,Se.z),Se[b]=0,Se[y]=0,Se[_]=H>0?1:-1,v.push(Se.x,Se.y,Se.z),g.push(re/z),g.push(1-be/Y),$+=1}}for(let be=0;be<Y;be++)for(let P=0;P<z;P++){const re=x+P+pe*be,ye=x+P+pe*(be+1),K=x+(P+1)+pe*(be+1),me=x+(P+1)+pe*be;p.push(re,ye,me),p.push(ye,K,me),J+=6}h.addGroup(M,J,U),M+=J,x+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ol(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Pr(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone():Array.isArray(l)?e[i][s]=l.slice():e[i][s]=l}}return e}function On(r){const e={};for(let i=0;i<r.length;i++){const s=Pr(r[i]);for(const l in s)e[l]=s[l]}return e}function UT(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function ux(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Lt.workingColorSpace}const ou={clone:Pr,merge:On};var NT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,LT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends rl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=NT,this.fragmentShader=LT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pr(e.uniforms),this.uniformsGroups=UT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class fx extends Kn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new on,this.projectionMatrix=new on,this.projectionMatrixInverse=new on,this.coordinateSystem=ma}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qa=new ce,X_=new gt,j_=new gt;class vi extends fx{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=$d*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Oh*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $d*2*Math.atan(Math.tan(Oh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){Qa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qa.x,Qa.y).multiplyScalar(-e/Qa.z),Qa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Qa.x,Qa.y).multiplyScalar(-e/Qa.z)}getViewSize(e,i){return this.getViewBounds(e,X_,j_),i.subVectors(j_,X_)}setViewOffset(e,i,s,l,c,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Oh*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;c+=f.offsetX*l/p,i-=f.offsetY*s/m,l*=f.width/p,s*=f.height/m}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Er=-90,Tr=1;class OT extends Kn{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new vi(Er,Tr,e,i);l.layers=this.layers,this.add(l);const c=new vi(Er,Tr,e,i);c.layers=this.layers,this.add(c);const f=new vi(Er,Tr,e,i);f.layers=this.layers,this.add(f);const h=new vi(Er,Tr,e,i);h.layers=this.layers,this.add(h);const p=new vi(Er,Tr,e,i);p.layers=this.layers,this.add(p);const m=new vi(Er,Tr,e,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,h,p]=i;for(const m of i)this.remove(m);if(e===ma)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===su)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of i)this.add(m),m.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,p,m,v]=this.children,g=e.getRenderTarget(),x=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const b=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,l),e.render(i,c),e.setRenderTarget(s,1,l),e.render(i,f),e.setRenderTarget(s,2,l),e.render(i,h),e.setRenderTarget(s,3,l),e.render(i,p),e.setRenderTarget(s,4,l),e.render(i,m),s.texture.generateMipmaps=b,e.setRenderTarget(s,5,l),e.render(i,v),e.setRenderTarget(g,x,M),e.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class hx extends Bn{constructor(e=[],i=Nr,s,l,c,f,h,p,m,v){super(e,i,s,l,c,f,h,p,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class PT extends Di{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new hx(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new ol(5,5,5),c=new Pn({name:"CubemapFromEquirect",uniforms:Pr(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Zn,blending:ga});c.uniforms.tEquirect.value=i;const f=new Hi(l,c),h=i.minFilter;return i.minFilter===Us&&(i.minFilter=Fi),new OT(1,10,this).update(e,f),i.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,s,l);e.setRenderTarget(c)}}class Bc extends Kn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zT={type:"move"};class nd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ce,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ce),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ce,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ce),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,f=null;const h=this._targetRay,p=this._grip,m=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(m&&e.hand){f=!0;for(const b of e.hand.values()){const y=i.getJointPose(b,s),_=this._getHandJoint(m,b);y!==null&&(_.matrix.fromArray(y.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=y.radius),_.visible=y!==null}const v=m.joints["index-finger-tip"],g=m.joints["thumb-tip"],x=v.position.distanceTo(g.position),M=.02,E=.005;m.inputState.pinching&&x>M+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=M-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(zT)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Bc;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}class BT extends Kn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ma,this.environmentIntensity=1,this.environmentRotation=new Ma,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class FT extends Bn{constructor(e=null,i=1,s=1,l,c,f,h,p,m=zn,v=zn,g,x){super(null,f,h,p,m,v,l,c,g,x),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const id=new ce,IT=new ce,HT=new ft;class As{constructor(e=new ce(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=id.subVectors(s,i).cross(IT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const s=e.delta(id),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(e.start).addScaledVector(s,c)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||HT.getNormalMatrix(e),l=this.coplanarPoint(id).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Es=new pu,Fc=new ce;class dx{constructor(e=new As,i=new As,s=new As,l=new As,c=new As,f=new As){this.planes=[e,i,s,l,c,f]}set(e,i,s,l,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=ma){const s=this.planes,l=e.elements,c=l[0],f=l[1],h=l[2],p=l[3],m=l[4],v=l[5],g=l[6],x=l[7],M=l[8],E=l[9],b=l[10],y=l[11],_=l[12],L=l[13],N=l[14],D=l[15];if(s[0].setComponents(p-c,x-m,y-M,D-_).normalize(),s[1].setComponents(p+c,x+m,y+M,D+_).normalize(),s[2].setComponents(p+f,x+v,y+E,D+L).normalize(),s[3].setComponents(p-f,x-v,y-E,D-L).normalize(),s[4].setComponents(p-h,x-g,y-b,D-N).normalize(),i===ma)s[5].setComponents(p+h,x+g,y+b,D+N).normalize();else if(i===su)s[5].setComponents(h,g,b,N).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Es.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Es.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Es)}intersectsSprite(e){return Es.center.set(0,0,0),Es.radius=.7071067811865476,Es.applyMatrix4(e.matrixWorld),this.intersectsSphere(Es)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Fc.x=l.normal.x>0?e.max.x:e.min.x,Fc.y=l.normal.y>0?e.max.y:e.min.y,Fc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Fc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class GT extends rl{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const W_=new on,ep=new sx,Ic=new pu,Hc=new ce;class VT extends Kn{constructor(e=new ki,i=new GT){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,i){const s=this.geometry,l=this.matrixWorld,c=e.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Ic.copy(s.boundingSphere),Ic.applyMatrix4(l),Ic.radius+=c,e.ray.intersectsSphere(Ic)===!1)return;W_.copy(l).invert(),ep.copy(e.ray).applyMatrix4(W_);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=s.index,g=s.attributes.position;if(m!==null){const x=Math.max(0,f.start),M=Math.min(m.count,f.start+f.count);for(let E=x,b=M;E<b;E++){const y=m.getX(E);Hc.fromBufferAttribute(g,y),q_(Hc,y,p,l,e,i,this)}}else{const x=Math.max(0,f.start),M=Math.min(g.count,f.start+f.count);for(let E=x,b=M;E<b;E++)Hc.fromBufferAttribute(g,E),q_(Hc,E,p,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function q_(r,e,i,s,l,c,f){const h=ep.distanceSqToPoint(r);if(h<i){const p=new ce;ep.closestPointToPoint(r,p),p.applyMatrix4(s);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;c.push({distance:m,distanceToRay:Math.sqrt(h),point:p,index:e,face:null,faceIndex:null,barycoord:null,object:f})}}class px extends Bn{constructor(e,i,s=Ns,l,c,f,h=zn,p=zn,m,v=Jo,g=1){if(v!==Jo&&v!==$o)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:e,height:i,depth:g};super(x,l,c,f,h,p,v,s,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new yp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class mu extends ki{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,f=i/2,h=Math.floor(s),p=Math.floor(l),m=h+1,v=p+1,g=e/h,x=i/p,M=[],E=[],b=[],y=[];for(let _=0;_<v;_++){const L=_*x-f;for(let N=0;N<m;N++){const D=N*g-c;E.push(D,-L,0),b.push(0,0,1),y.push(N/h),y.push(1-_/p)}}for(let _=0;_<p;_++)for(let L=0;L<h;L++){const N=L+m*_,D=L+m*(_+1),j=L+1+m*(_+1),H=L+1+m*_;M.push(N,D,H),M.push(D,j,H)}this.setIndex(M),this.setAttribute("position",new xa(E,3)),this.setAttribute("normal",new xa(b,3)),this.setAttribute("uv",new xa(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mu(e.width,e.height,e.widthSegments,e.heightSegments)}}class kT extends rl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=JE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class XT extends rl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class mx extends fx{constructor(e=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,f=s+e,h=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,f=c+m*this.view.width,h-=v*this.view.offsetY,p=h-v*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class jT extends vi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class gx{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Y_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const i=Y_();e=(i-this.oldTime)/1e3,this.oldTime=i,this.elapsedTime+=e}return e}}function Y_(){return performance.now()}function Z_(r,e,i,s){const l=WT(s);switch(i){case J0:return r*e;case vp:return r*e/l.components*l.byteLength;case _p:return r*e/l.components*l.byteLength;case ex:return r*e*2/l.components*l.byteLength;case xp:return r*e*2/l.components*l.byteLength;case $0:return r*e*3/l.components*l.byteLength;case Ci:return r*e*4/l.components*l.byteLength;case Sp:return r*e*4/l.components*l.byteLength;case qc:case Yc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Zc:case Kc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Cd:case Dd:return Math.max(r,16)*Math.max(e,8)/4;case Rd:case wd:return Math.max(r,8)*Math.max(e,8)/2;case Ud:case Nd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Ld:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Od:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Pd:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case zd:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Bd:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Fd:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Id:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Hd:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Gd:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Vd:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case kd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Xd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case jd:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Wd:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case qd:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Qc:case Yd:case Zd:return Math.ceil(r/4)*Math.ceil(e/4)*16;case tx:case Kd:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Qd:case Jd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function WT(r){switch(r){case ya:case Z0:return{byteLength:1,components:1};case Ko:case K0:case va:return{byteLength:2,components:1};case mp:case gp:return{byteLength:2,components:4};case Ns:case pp:case Ii:return{byteLength:4,components:1};case Q0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dp);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function vx(){let r=null,e=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function qT(r){const e=new WeakMap;function i(h,p){const m=h.array,v=h.usage,g=m.byteLength,x=r.createBuffer();r.bindBuffer(p,x),r.bufferData(p,m,v),h.onUploadCallback();let M;if(m instanceof Float32Array)M=r.FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=r.SHORT;else if(m instanceof Uint32Array)M=r.UNSIGNED_INT;else if(m instanceof Int32Array)M=r.INT;else if(m instanceof Int8Array)M=r.BYTE;else if(m instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:g}}function s(h,p,m){const v=p.array,g=p.updateRanges;if(r.bindBuffer(m,h),g.length===0)r.bufferSubData(m,0,v);else{g.sort((M,E)=>M.start-E.start);let x=0;for(let M=1;M<g.length;M++){const E=g[x],b=g[M];b.start<=E.start+E.count+1?E.count=Math.max(E.count,b.start+b.count-E.start):(++x,g[x]=b)}g.length=x+1;for(let M=0,E=g.length;M<E;M++){const b=g[M];r.bufferSubData(m,b.start*v.BYTES_PER_ELEMENT,v,b.start,b.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=e.get(h);p&&(r.deleteBuffer(p.buffer),e.delete(h))}function f(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const v=e.get(h);(!v||v.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=e.get(h);if(m===void 0)e.set(h,i(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,h,p),m.version=h.version}}return{get:l,remove:c,update:f}}var YT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ZT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,KT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,QT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,JT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$T=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,eb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,tb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nb=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ib=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ab=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ob=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ub=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,db=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,vb=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_b=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Eb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tb="gl_FragColor = linearToOutputTexel( gl_FragColor );",bb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ab=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Db=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ub=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ob=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pb=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ib=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Wb=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Yb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kb=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qb=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jb=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$b=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,eA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,iA=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,aA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,oA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cA=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,uA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,vA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_A=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,SA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,MA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,EA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,TA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,AA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,RA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,CA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,DA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,UA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,NA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,LA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,OA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,PA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,BA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,FA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,IA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,HA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,GA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,VA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,kA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,XA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,WA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,YA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,KA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$A=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,e1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,t1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,n1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,i1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,r1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,l1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,u1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,h1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,p1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,m1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,M1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,b1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,A1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:YT,alphahash_pars_fragment:ZT,alphamap_fragment:KT,alphamap_pars_fragment:QT,alphatest_fragment:JT,alphatest_pars_fragment:$T,aomap_fragment:eb,aomap_pars_fragment:tb,batching_pars_vertex:nb,batching_vertex:ib,begin_vertex:ab,beginnormal_vertex:sb,bsdfs:rb,iridescence_fragment:ob,bumpmap_pars_fragment:lb,clipping_planes_fragment:cb,clipping_planes_pars_fragment:ub,clipping_planes_pars_vertex:fb,clipping_planes_vertex:hb,color_fragment:db,color_pars_fragment:pb,color_pars_vertex:mb,color_vertex:gb,common:vb,cube_uv_reflection_fragment:_b,defaultnormal_vertex:xb,displacementmap_pars_vertex:Sb,displacementmap_vertex:yb,emissivemap_fragment:Mb,emissivemap_pars_fragment:Eb,colorspace_fragment:Tb,colorspace_pars_fragment:bb,envmap_fragment:Ab,envmap_common_pars_fragment:Rb,envmap_pars_fragment:Cb,envmap_pars_vertex:wb,envmap_physical_pars_fragment:Hb,envmap_vertex:Db,fog_vertex:Ub,fog_pars_vertex:Nb,fog_fragment:Lb,fog_pars_fragment:Ob,gradientmap_pars_fragment:Pb,lightmap_pars_fragment:zb,lights_lambert_fragment:Bb,lights_lambert_pars_fragment:Fb,lights_pars_begin:Ib,lights_toon_fragment:Gb,lights_toon_pars_fragment:Vb,lights_phong_fragment:kb,lights_phong_pars_fragment:Xb,lights_physical_fragment:jb,lights_physical_pars_fragment:Wb,lights_fragment_begin:qb,lights_fragment_maps:Yb,lights_fragment_end:Zb,logdepthbuf_fragment:Kb,logdepthbuf_pars_fragment:Qb,logdepthbuf_pars_vertex:Jb,logdepthbuf_vertex:$b,map_fragment:eA,map_pars_fragment:tA,map_particle_fragment:nA,map_particle_pars_fragment:iA,metalnessmap_fragment:aA,metalnessmap_pars_fragment:sA,morphinstance_vertex:rA,morphcolor_vertex:oA,morphnormal_vertex:lA,morphtarget_pars_vertex:cA,morphtarget_vertex:uA,normal_fragment_begin:fA,normal_fragment_maps:hA,normal_pars_fragment:dA,normal_pars_vertex:pA,normal_vertex:mA,normalmap_pars_fragment:gA,clearcoat_normal_fragment_begin:vA,clearcoat_normal_fragment_maps:_A,clearcoat_pars_fragment:xA,iridescence_pars_fragment:SA,opaque_fragment:yA,packing:MA,premultiplied_alpha_fragment:EA,project_vertex:TA,dithering_fragment:bA,dithering_pars_fragment:AA,roughnessmap_fragment:RA,roughnessmap_pars_fragment:CA,shadowmap_pars_fragment:wA,shadowmap_pars_vertex:DA,shadowmap_vertex:UA,shadowmask_pars_fragment:NA,skinbase_vertex:LA,skinning_pars_vertex:OA,skinning_vertex:PA,skinnormal_vertex:zA,specularmap_fragment:BA,specularmap_pars_fragment:FA,tonemapping_fragment:IA,tonemapping_pars_fragment:HA,transmission_fragment:GA,transmission_pars_fragment:VA,uv_pars_fragment:kA,uv_pars_vertex:XA,uv_vertex:jA,worldpos_vertex:WA,background_vert:qA,background_frag:YA,backgroundCube_vert:ZA,backgroundCube_frag:KA,cube_vert:QA,cube_frag:JA,depth_vert:$A,depth_frag:e1,distanceRGBA_vert:t1,distanceRGBA_frag:n1,equirect_vert:i1,equirect_frag:a1,linedashed_vert:s1,linedashed_frag:r1,meshbasic_vert:o1,meshbasic_frag:l1,meshlambert_vert:c1,meshlambert_frag:u1,meshmatcap_vert:f1,meshmatcap_frag:h1,meshnormal_vert:d1,meshnormal_frag:p1,meshphong_vert:m1,meshphong_frag:g1,meshphysical_vert:v1,meshphysical_frag:_1,meshtoon_vert:x1,meshtoon_frag:S1,points_vert:y1,points_frag:M1,shadow_vert:E1,shadow_frag:T1,sprite_vert:b1,sprite_frag:A1},ze={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ft}},envmap:{envMap:{value:null},envMapRotation:{value:new ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ft},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0},uvTransform:{value:new ft}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}}},Bi={basic:{uniforms:On([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:On([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new pt(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:On([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:On([ze.common,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.roughnessmap,ze.metalnessmap,ze.fog,ze.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:On([ze.common,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.gradientmap,ze.fog,ze.lights,{emissive:{value:new pt(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:On([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:On([ze.points,ze.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:On([ze.common,ze.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:On([ze.common,ze.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:On([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:On([ze.sprite,ze.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ft}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:On([ze.common,ze.displacementmap,{referencePosition:{value:new ce},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:On([ze.lights,ze.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Bi.physical={uniforms:On([Bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ft},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ft},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ft},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ft},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ft},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ft}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const Gc={r:0,b:0,g:0},Ts=new Ma,R1=new on;function C1(r,e,i,s,l,c,f){const h=new pt(0);let p=c===!0?0:1,m,v,g=null,x=0,M=null;function E(N){let D=N.isScene===!0?N.background:null;return D&&D.isTexture&&(D=(N.backgroundBlurriness>0?i:e).get(D)),D}function b(N){let D=!1;const j=E(N);j===null?_(h,p):j&&j.isColor&&(_(j,1),D=!0);const H=r.xr.getEnvironmentBlendMode();H==="additive"?s.buffers.color.setClear(0,0,0,1,f):H==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,f),(r.autoClear||D)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function y(N,D){const j=E(D);j&&(j.isCubeTexture||j.mapping===du)?(v===void 0&&(v=new Hi(new ol(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:Pr(Bi.backgroundCube.uniforms),vertexShader:Bi.backgroundCube.vertexShader,fragmentShader:Bi.backgroundCube.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(H,z,Y){this.matrixWorld.copyPosition(Y.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(v)),Ts.copy(D.backgroundRotation),Ts.x*=-1,Ts.y*=-1,Ts.z*=-1,j.isCubeTexture&&j.isRenderTargetTexture===!1&&(Ts.y*=-1,Ts.z*=-1),v.material.uniforms.envMap.value=j,v.material.uniforms.flipEnvMap.value=j.isCubeTexture&&j.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(R1.makeRotationFromEuler(Ts)),v.material.toneMapped=Lt.getTransfer(j.colorSpace)!==jt,(g!==j||x!==j.version||M!==r.toneMapping)&&(v.material.needsUpdate=!0,g=j,x=j.version,M=r.toneMapping),v.layers.enableAll(),N.unshift(v,v.geometry,v.material,0,0,null)):j&&j.isTexture&&(m===void 0&&(m=new Hi(new mu(2,2),new Pn({name:"BackgroundMaterial",uniforms:Pr(Bi.background.uniforms),vertexShader:Bi.background.vertexShader,fragmentShader:Bi.background.fragmentShader,side:es,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=j,m.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,m.material.toneMapped=Lt.getTransfer(j.colorSpace)!==jt,j.matrixAutoUpdate===!0&&j.updateMatrix(),m.material.uniforms.uvTransform.value.copy(j.matrix),(g!==j||x!==j.version||M!==r.toneMapping)&&(m.material.needsUpdate=!0,g=j,x=j.version,M=r.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function _(N,D){N.getRGB(Gc,ux(r)),s.buffers.color.setClear(Gc.r,Gc.g,Gc.b,D,f)}function L(){v!==void 0&&(v.geometry.dispose(),v.material.dispose(),v=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return h},setClearColor:function(N,D=1){h.set(N),p=D,_(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(N){p=N,_(h,p)},render:b,addToRenderList:y,dispose:L}}function w1(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=x(null);let c=l,f=!1;function h(w,V,he,ne,de){let pe=!1;const B=g(ne,he,V);c!==B&&(c=B,m(c.object)),pe=M(w,ne,he,de),pe&&E(w,ne,he,de),de!==null&&e.update(de,r.ELEMENT_ARRAY_BUFFER),(pe||f)&&(f=!1,D(w,V,he,ne),de!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(de).buffer))}function p(){return r.createVertexArray()}function m(w){return r.bindVertexArray(w)}function v(w){return r.deleteVertexArray(w)}function g(w,V,he){const ne=he.wireframe===!0;let de=s[w.id];de===void 0&&(de={},s[w.id]=de);let pe=de[V.id];pe===void 0&&(pe={},de[V.id]=pe);let B=pe[ne];return B===void 0&&(B=x(p()),pe[ne]=B),B}function x(w){const V=[],he=[],ne=[];for(let de=0;de<i;de++)V[de]=0,he[de]=0,ne[de]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:he,attributeDivisors:ne,object:w,attributes:{},index:null}}function M(w,V,he,ne){const de=c.attributes,pe=V.attributes;let B=0;const $=he.getAttributes();for(const J in $)if($[J].location>=0){const be=de[J];let P=pe[J];if(P===void 0&&(J==="instanceMatrix"&&w.instanceMatrix&&(P=w.instanceMatrix),J==="instanceColor"&&w.instanceColor&&(P=w.instanceColor)),be===void 0||be.attribute!==P||P&&be.data!==P.data)return!0;B++}return c.attributesNum!==B||c.index!==ne}function E(w,V,he,ne){const de={},pe=V.attributes;let B=0;const $=he.getAttributes();for(const J in $)if($[J].location>=0){let be=pe[J];be===void 0&&(J==="instanceMatrix"&&w.instanceMatrix&&(be=w.instanceMatrix),J==="instanceColor"&&w.instanceColor&&(be=w.instanceColor));const P={};P.attribute=be,be&&be.data&&(P.data=be.data),de[J]=P,B++}c.attributes=de,c.attributesNum=B,c.index=ne}function b(){const w=c.newAttributes;for(let V=0,he=w.length;V<he;V++)w[V]=0}function y(w){_(w,0)}function _(w,V){const he=c.newAttributes,ne=c.enabledAttributes,de=c.attributeDivisors;he[w]=1,ne[w]===0&&(r.enableVertexAttribArray(w),ne[w]=1),de[w]!==V&&(r.vertexAttribDivisor(w,V),de[w]=V)}function L(){const w=c.newAttributes,V=c.enabledAttributes;for(let he=0,ne=V.length;he<ne;he++)V[he]!==w[he]&&(r.disableVertexAttribArray(he),V[he]=0)}function N(w,V,he,ne,de,pe,B){B===!0?r.vertexAttribIPointer(w,V,he,de,pe):r.vertexAttribPointer(w,V,he,ne,de,pe)}function D(w,V,he,ne){b();const de=ne.attributes,pe=he.getAttributes(),B=V.defaultAttributeValues;for(const $ in pe){const J=pe[$];if(J.location>=0){let Se=de[$];if(Se===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(Se=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(Se=w.instanceColor)),Se!==void 0){const be=Se.normalized,P=Se.itemSize,re=e.get(Se);if(re===void 0)continue;const ye=re.buffer,K=re.type,me=re.bytesPerElement,Re=K===r.INT||K===r.UNSIGNED_INT||Se.gpuType===pp;if(Se.isInterleavedBufferAttribute){const Ee=Se.data,Oe=Ee.stride,qe=Se.offset;if(Ee.isInstancedInterleavedBuffer){for(let Qe=0;Qe<J.locationSize;Qe++)_(J.location+Qe,Ee.meshPerAttribute);w.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let Qe=0;Qe<J.locationSize;Qe++)y(J.location+Qe);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let Qe=0;Qe<J.locationSize;Qe++)N(J.location+Qe,P/J.locationSize,K,be,Oe*me,(qe+P/J.locationSize*Qe)*me,Re)}else{if(Se.isInstancedBufferAttribute){for(let Ee=0;Ee<J.locationSize;Ee++)_(J.location+Ee,Se.meshPerAttribute);w.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let Ee=0;Ee<J.locationSize;Ee++)y(J.location+Ee);r.bindBuffer(r.ARRAY_BUFFER,ye);for(let Ee=0;Ee<J.locationSize;Ee++)N(J.location+Ee,P/J.locationSize,K,be,P*me,P/J.locationSize*Ee*me,Re)}}else if(B!==void 0){const be=B[$];if(be!==void 0)switch(be.length){case 2:r.vertexAttrib2fv(J.location,be);break;case 3:r.vertexAttrib3fv(J.location,be);break;case 4:r.vertexAttrib4fv(J.location,be);break;default:r.vertexAttrib1fv(J.location,be)}}}}L()}function j(){Y();for(const w in s){const V=s[w];for(const he in V){const ne=V[he];for(const de in ne)v(ne[de].object),delete ne[de];delete V[he]}delete s[w]}}function H(w){if(s[w.id]===void 0)return;const V=s[w.id];for(const he in V){const ne=V[he];for(const de in ne)v(ne[de].object),delete ne[de];delete V[he]}delete s[w.id]}function z(w){for(const V in s){const he=s[V];if(he[w.id]===void 0)continue;const ne=he[w.id];for(const de in ne)v(ne[de].object),delete ne[de];delete he[w.id]}}function Y(){U(),f=!0,c!==l&&(c=l,m(c.object))}function U(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:Y,resetDefaultState:U,dispose:j,releaseStatesOfGeometry:H,releaseStatesOfProgram:z,initAttributes:b,enableAttribute:y,disableUnusedAttributes:L}}function D1(r,e,i){let s;function l(m){s=m}function c(m,v){r.drawArrays(s,m,v),i.update(v,s,1)}function f(m,v,g){g!==0&&(r.drawArraysInstanced(s,m,v,g),i.update(v,s,g))}function h(m,v,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,v,0,g);let M=0;for(let E=0;E<g;E++)M+=v[E];i.update(M,s,1)}function p(m,v,g,x){if(g===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<m.length;E++)f(m[E],v[E],x[E]);else{M.multiDrawArraysInstancedWEBGL(s,m,0,v,0,x,0,g);let E=0;for(let b=0;b<g;b++)E+=v[b]*x[b];i.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function U1(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const z=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(z){return!(z!==Ci&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(z){const Y=z===va&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(z!==ya&&s.convert(z)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&z!==Ii&&!Y)}function p(z){if(z==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";z="mediump"}return z==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const v=p(m);v!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const g=i.logarithmicDepthBuffer===!0,x=i.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=r.getParameter(r.MAX_TEXTURE_SIZE),y=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),L=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),N=r.getParameter(r.MAX_VARYING_VECTORS),D=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),j=E>0,H=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:g,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:E,maxTextureSize:b,maxCubemapSize:y,maxAttributes:_,maxVertexUniforms:L,maxVaryings:N,maxFragmentUniforms:D,vertexTextures:j,maxSamples:H}}function N1(r){const e=this;let i=null,s=0,l=!1,c=!1;const f=new As,h=new ft,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(g,x){const M=g.length!==0||x||s!==0||l;return l=x,s=g.length,M},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(g,x){i=v(g,x,0)},this.setState=function(g,x,M){const E=g.clippingPlanes,b=g.clipIntersection,y=g.clipShadows,_=r.get(g);if(!l||E===null||E.length===0||c&&!y)c?v(null):m();else{const L=c?0:s,N=L*4;let D=_.clippingState||null;p.value=D,D=v(E,x,N,M);for(let j=0;j!==N;++j)D[j]=i[j];_.clippingState=D,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=L}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function v(g,x,M,E){const b=g!==null?g.length:0;let y=null;if(b!==0){if(y=p.value,E!==!0||y===null){const _=M+b*4,L=x.matrixWorldInverse;h.getNormalMatrix(L),(y===null||y.length<_)&&(y=new Float32Array(_));for(let N=0,D=M;N!==b;++N,D+=4)f.copy(g[N]).applyMatrix4(L,h),f.normal.toArray(y,D),y[D+3]=f.constant}p.value=y,p.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,y}}function L1(r){let e=new WeakMap;function i(f,h){return h===Ed?f.mapping=Nr:h===Td&&(f.mapping=Lr),f}function s(f){if(f&&f.isTexture){const h=f.mapping;if(h===Ed||h===Td)if(e.has(f)){const p=e.get(f).texture;return i(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new PT(p.height);return m.fromEquirectangularTexture(r,f),e.set(f,m),f.addEventListener("dispose",l),i(m.texture,f.mapping)}else return null}}return f}function l(f){const h=f.target;h.removeEventListener("dispose",l);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function c(){e=new WeakMap}return{get:s,dispose:c}}const Rr=4,K_=[.125,.215,.35,.446,.526,.582],ws=20,ad=new mx,Q_=new pt;let sd=null,rd=0,od=0,ld=!1;const Rs=(1+Math.sqrt(5))/2,br=1/Rs,J_=[new ce(-Rs,br,0),new ce(Rs,br,0),new ce(-br,0,Rs),new ce(br,0,Rs),new ce(0,Rs,-br),new ce(0,Rs,br),new ce(-1,1,-1),new ce(1,1,-1),new ce(-1,1,1),new ce(1,1,1)],O1=new ce;class $_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,s=.1,l=100,c={}){const{size:f=256,position:h=O1}=c;sd=this._renderer.getRenderTarget(),rd=this._renderer.getActiveCubeFace(),od=this._renderer.getActiveMipmapLevel(),ld=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,s,l,p,h),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=n0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=t0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(sd,rd,od),this._renderer.xr.enabled=ld,e.scissorTest=!1,Vc(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Nr||e.mapping===Lr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sd=this._renderer.getRenderTarget(),rd=this._renderer.getActiveCubeFace(),od=this._renderer.getActiveMipmapLevel(),ld=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Fi,minFilter:Fi,generateMipmaps:!1,type:va,format:Ci,colorSpace:Or,depthBuffer:!1},l=e0(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=e0(e,i,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=P1(c)),this._blurMaterial=z1(c,e,i)}return l}_compileMaterial(e){const i=new Hi(this._lodPlanes[0],e);this._renderer.compile(i,ad)}_sceneToCubeUV(e,i,s,l,c){const p=new vi(90,1,i,s),m=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],g=this._renderer,x=g.autoClear,M=g.toneMapping;g.getClearColor(Q_),g.toneMapping=$a,g.autoClear=!1;const E=new Mp({name:"PMREM.Background",side:Zn,depthWrite:!1,depthTest:!1}),b=new Hi(new ol,E);let y=!1;const _=e.background;_?_.isColor&&(E.color.copy(_),e.background=null,y=!0):(E.color.copy(Q_),y=!0);for(let L=0;L<6;L++){const N=L%3;N===0?(p.up.set(0,m[L],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x+v[L],c.y,c.z)):N===1?(p.up.set(0,0,m[L]),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y+v[L],c.z)):(p.up.set(0,m[L],0),p.position.set(c.x,c.y,c.z),p.lookAt(c.x,c.y,c.z+v[L]));const D=this._cubeSize;Vc(l,N*D,L>2?D:0,D,D),g.setRenderTarget(l),y&&g.render(b,p),g.render(e,p)}b.geometry.dispose(),b.material.dispose(),g.toneMapping=M,g.autoClear=x,e.background=_}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Nr||e.mapping===Lr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=n0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=t0());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new Hi(this._lodPlanes[0],c),h=c.uniforms;h.envMap.value=e;const p=this._cubeSize;Vc(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(f,ad)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),h=J_[(l-c-1)%J_.length];this._blur(e,c-1,c,f,h)}i.autoClear=s}_blur(e,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,s,l,"latitudinal",c),this._halfBlur(f,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,f,h){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,g=new Hi(this._lodPlanes[l],m),x=m.uniforms,M=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*ws-1),b=c/E,y=isFinite(c)?1+Math.floor(v*b):ws;y>ws&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${ws}`);const _=[];let L=0;for(let z=0;z<ws;++z){const Y=z/b,U=Math.exp(-Y*Y/2);_.push(U),z===0?L+=U:z<y&&(L+=2*U)}for(let z=0;z<_.length;z++)_[z]=_[z]/L;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=_,x.latitudinal.value=f==="latitudinal",h&&(x.poleAxis.value=h);const{_lodMax:N}=this;x.dTheta.value=E,x.mipInt.value=N-s;const D=this._sizeLods[l],j=3*D*(l>N-Rr?l-N+Rr:0),H=4*(this._cubeSize-D);Vc(i,j,H,3*D,2*D),p.setRenderTarget(i),p.render(g,ad)}}function P1(r){const e=[],i=[],s=[];let l=r;const c=r-Rr+1+K_.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);i.push(h);let p=1/h;f>r-Rr?p=K_[f-r+Rr-1]:f===0&&(p=0),s.push(p);const m=1/(h-2),v=-m,g=1+m,x=[v,v,g,v,g,g,v,v,g,g,v,g],M=6,E=6,b=3,y=2,_=1,L=new Float32Array(b*E*M),N=new Float32Array(y*E*M),D=new Float32Array(_*E*M);for(let H=0;H<M;H++){const z=H%3*2/3-1,Y=H>2?0:-1,U=[z,Y,0,z+2/3,Y,0,z+2/3,Y+1,0,z,Y,0,z+2/3,Y+1,0,z,Y+1,0];L.set(U,b*E*H),N.set(x,y*E*H);const w=[H,H,H,H,H,H];D.set(w,_*E*H)}const j=new ki;j.setAttribute("position",new Yn(L,b)),j.setAttribute("uv",new Yn(N,y)),j.setAttribute("faceIndex",new Yn(D,_)),e.push(j),l>Rr&&l--}return{lodPlanes:e,sizeLods:i,sigmas:s}}function e0(r,e,i){const s=new Di(r,e,i);return s.texture.mapping=du,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Vc(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function z1(r,e,i){const s=new Float32Array(ws),l=new ce(0,1,0);return new Pn({name:"SphericalGaussianBlur",defines:{n:ws,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Ep(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ga,depthTest:!1,depthWrite:!1})}function t0(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ep(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ga,depthTest:!1,depthWrite:!1})}function n0(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ep(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ga,depthTest:!1,depthWrite:!1})}function Ep(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function B1(r){let e=new WeakMap,i=null;function s(h){if(h&&h.isTexture){const p=h.mapping,m=p===Ed||p===Td,v=p===Nr||p===Lr;if(m||v){let g=e.get(h);const x=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==x)return i===null&&(i=new $_(r)),g=m?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{const M=h.image;return m&&M&&M.height>0||v&&M&&l(M)?(i===null&&(i=new $_(r)),g=m?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",c),g.texture):null}}}return h}function l(h){let p=0;const m=6;for(let v=0;v<m;v++)h[v]!==void 0&&p++;return p===m}function c(h){const p=h.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function f(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function F1(r){const e={};function i(s){if(e[s]!==void 0)return e[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&wr("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function I1(r,e,i,s){const l={},c=new WeakMap;function f(g){const x=g.target;x.index!==null&&e.remove(x.index);for(const E in x.attributes)e.remove(x.attributes[E]);x.removeEventListener("dispose",f),delete l[x.id];const M=c.get(x);M&&(e.remove(M),c.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function h(g,x){return l[x.id]===!0||(x.addEventListener("dispose",f),l[x.id]=!0,i.memory.geometries++),x}function p(g){const x=g.attributes;for(const M in x)e.update(x[M],r.ARRAY_BUFFER)}function m(g){const x=[],M=g.index,E=g.attributes.position;let b=0;if(M!==null){const L=M.array;b=M.version;for(let N=0,D=L.length;N<D;N+=3){const j=L[N+0],H=L[N+1],z=L[N+2];x.push(j,H,H,z,z,j)}}else if(E!==void 0){const L=E.array;b=E.version;for(let N=0,D=L.length/3-1;N<D;N+=3){const j=N+0,H=N+1,z=N+2;x.push(j,H,H,z,z,j)}}else return;const y=new(ix(x)?cx:lx)(x,1);y.version=b;const _=c.get(g);_&&e.remove(_),c.set(g,y)}function v(g){const x=c.get(g);if(x){const M=g.index;M!==null&&x.version<M.version&&m(g)}else m(g);return c.get(g)}return{get:h,update:p,getWireframeAttribute:v}}function H1(r,e,i){let s;function l(x){s=x}let c,f;function h(x){c=x.type,f=x.bytesPerElement}function p(x,M){r.drawElements(s,M,c,x*f),i.update(M,s,1)}function m(x,M,E){E!==0&&(r.drawElementsInstanced(s,M,c,x*f,E),i.update(M,s,E))}function v(x,M,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,c,x,0,E);let y=0;for(let _=0;_<E;_++)y+=M[_];i.update(y,s,1)}function g(x,M,E,b){if(E===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let _=0;_<x.length;_++)m(x[_]/f,M[_],b[_]);else{y.multiDrawElementsInstancedWEBGL(s,M,0,c,x,0,b,0,E);let _=0;for(let L=0;L<E;L++)_+=M[L]*b[L];i.update(_,s,1)}}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=v,this.renderMultiDrawInstances=g}function G1(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function V1(r,e,i){const s=new WeakMap,l=new rn;function c(f,h,p){const m=f.morphTargetInfluences,v=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=v!==void 0?v.length:0;let x=s.get(h);if(x===void 0||x.count!==g){let w=function(){Y.dispose(),s.delete(h),h.removeEventListener("dispose",w)};var M=w;x!==void 0&&x.texture.dispose();const E=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,y=h.morphAttributes.color!==void 0,_=h.morphAttributes.position||[],L=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let D=0;E===!0&&(D=1),b===!0&&(D=2),y===!0&&(D=3);let j=h.attributes.position.count*D,H=1;j>e.maxTextureSize&&(H=Math.ceil(j/e.maxTextureSize),j=e.maxTextureSize);const z=new Float32Array(j*H*4*g),Y=new ax(z,j,H,g);Y.type=Ii,Y.needsUpdate=!0;const U=D*4;for(let V=0;V<g;V++){const he=_[V],ne=L[V],de=N[V],pe=j*H*4*V;for(let B=0;B<he.count;B++){const $=B*U;E===!0&&(l.fromBufferAttribute(he,B),z[pe+$+0]=l.x,z[pe+$+1]=l.y,z[pe+$+2]=l.z,z[pe+$+3]=0),b===!0&&(l.fromBufferAttribute(ne,B),z[pe+$+4]=l.x,z[pe+$+5]=l.y,z[pe+$+6]=l.z,z[pe+$+7]=0),y===!0&&(l.fromBufferAttribute(de,B),z[pe+$+8]=l.x,z[pe+$+9]=l.y,z[pe+$+10]=l.z,z[pe+$+11]=de.itemSize===4?l.w:1)}}x={count:g,texture:Y,size:new gt(j,H)},s.set(h,x),h.addEventListener("dispose",w)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let E=0;for(let y=0;y<m.length;y++)E+=m[y];const b=h.morphTargetsRelative?1:1-E;p.getUniforms().setValue(r,"morphTargetBaseInfluence",b),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",x.texture,i),p.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function k1(r,e,i,s){let l=new WeakMap;function c(p){const m=s.render.frame,v=p.geometry,g=e.get(p,v);if(l.get(g)!==m&&(e.update(g),l.set(g,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",h)===!1&&p.addEventListener("dispose",h),l.get(p)!==m&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;l.get(x)!==m&&(x.update(),l.set(x,m))}return g}function f(){l=new WeakMap}function h(p){const m=p.target;m.removeEventListener("dispose",h),i.remove(m.instanceMatrix),m.instanceColor!==null&&i.remove(m.instanceColor)}return{update:c,dispose:f}}const _x=new Bn,i0=new px(1,1),xx=new ax,Sx=new xT,yx=new hx,a0=[],s0=[],r0=new Float32Array(16),o0=new Float32Array(9),l0=new Float32Array(4);function Gr(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=a0[l];if(c===void 0&&(c=new Float32Array(l),a0[l]=c),e!==0){s.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=i,r[f].toArray(c,h)}return c}function mn(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function gn(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function gu(r,e){let i=s0[e];i===void 0&&(i=new Int32Array(e),s0[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function X1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function j1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(mn(i,e))return;r.uniform2fv(this.addr,e),gn(i,e)}}function W1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(mn(i,e))return;r.uniform3fv(this.addr,e),gn(i,e)}}function q1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(mn(i,e))return;r.uniform4fv(this.addr,e),gn(i,e)}}function Y1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(mn(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),gn(i,e)}else{if(mn(i,s))return;l0.set(s),r.uniformMatrix2fv(this.addr,!1,l0),gn(i,s)}}function Z1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(mn(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),gn(i,e)}else{if(mn(i,s))return;o0.set(s),r.uniformMatrix3fv(this.addr,!1,o0),gn(i,s)}}function K1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(mn(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),gn(i,e)}else{if(mn(i,s))return;r0.set(s),r.uniformMatrix4fv(this.addr,!1,r0),gn(i,s)}}function Q1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function J1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(mn(i,e))return;r.uniform2iv(this.addr,e),gn(i,e)}}function $1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(mn(i,e))return;r.uniform3iv(this.addr,e),gn(i,e)}}function eR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(mn(i,e))return;r.uniform4iv(this.addr,e),gn(i,e)}}function tR(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function nR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(mn(i,e))return;r.uniform2uiv(this.addr,e),gn(i,e)}}function iR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(mn(i,e))return;r.uniform3uiv(this.addr,e),gn(i,e)}}function aR(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(mn(i,e))return;r.uniform4uiv(this.addr,e),gn(i,e)}}function sR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(i0.compareFunction=nx,c=i0):c=_x,i.setTexture2D(e||c,l)}function rR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||Sx,l)}function oR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||yx,l)}function lR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||xx,l)}function cR(r){switch(r){case 5126:return X1;case 35664:return j1;case 35665:return W1;case 35666:return q1;case 35674:return Y1;case 35675:return Z1;case 35676:return K1;case 5124:case 35670:return Q1;case 35667:case 35671:return J1;case 35668:case 35672:return $1;case 35669:case 35673:return eR;case 5125:return tR;case 36294:return nR;case 36295:return iR;case 36296:return aR;case 35678:case 36198:case 36298:case 36306:case 35682:return sR;case 35679:case 36299:case 36307:return rR;case 35680:case 36300:case 36308:case 36293:return oR;case 36289:case 36303:case 36311:case 36292:return lR}}function uR(r,e){r.uniform1fv(this.addr,e)}function fR(r,e){const i=Gr(e,this.size,2);r.uniform2fv(this.addr,i)}function hR(r,e){const i=Gr(e,this.size,3);r.uniform3fv(this.addr,i)}function dR(r,e){const i=Gr(e,this.size,4);r.uniform4fv(this.addr,i)}function pR(r,e){const i=Gr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function mR(r,e){const i=Gr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function gR(r,e){const i=Gr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function vR(r,e){r.uniform1iv(this.addr,e)}function _R(r,e){r.uniform2iv(this.addr,e)}function xR(r,e){r.uniform3iv(this.addr,e)}function SR(r,e){r.uniform4iv(this.addr,e)}function yR(r,e){r.uniform1uiv(this.addr,e)}function MR(r,e){r.uniform2uiv(this.addr,e)}function ER(r,e){r.uniform3uiv(this.addr,e)}function TR(r,e){r.uniform4uiv(this.addr,e)}function bR(r,e,i){const s=this.cache,l=e.length,c=gu(i,l);mn(s,c)||(r.uniform1iv(this.addr,c),gn(s,c));for(let f=0;f!==l;++f)i.setTexture2D(e[f]||_x,c[f])}function AR(r,e,i){const s=this.cache,l=e.length,c=gu(i,l);mn(s,c)||(r.uniform1iv(this.addr,c),gn(s,c));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||Sx,c[f])}function RR(r,e,i){const s=this.cache,l=e.length,c=gu(i,l);mn(s,c)||(r.uniform1iv(this.addr,c),gn(s,c));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||yx,c[f])}function CR(r,e,i){const s=this.cache,l=e.length,c=gu(i,l);mn(s,c)||(r.uniform1iv(this.addr,c),gn(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||xx,c[f])}function wR(r){switch(r){case 5126:return uR;case 35664:return fR;case 35665:return hR;case 35666:return dR;case 35674:return pR;case 35675:return mR;case 35676:return gR;case 5124:case 35670:return vR;case 35667:case 35671:return _R;case 35668:case 35672:return xR;case 35669:case 35673:return SR;case 5125:return yR;case 36294:return MR;case 36295:return ER;case 36296:return TR;case 35678:case 36198:case 36298:case 36306:case 35682:return bR;case 35679:case 36299:case 36307:return AR;case 35680:case 36300:case 36308:case 36293:return RR;case 36289:case 36303:case 36311:case 36292:return CR}}class DR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=cR(i.type)}}class UR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=wR(i.type)}}class NR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const cd=/(\w+)(\])?(\[|\.)?/g;function c0(r,e){r.seq.push(e),r.map[e.id]=e}function LR(r,e,i){const s=r.name,l=s.length;for(cd.lastIndex=0;;){const c=cd.exec(s),f=cd.lastIndex;let h=c[1];const p=c[2]==="]",m=c[3];if(p&&(h=h|0),m===void 0||m==="["&&f+2===l){c0(i,m===void 0?new DR(h,r,e):new UR(h,r,e));break}else{let g=i.map[h];g===void 0&&(g=new NR(h),c0(i,g)),i=g}}}class Jc{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=e.getActiveUniform(i,l),f=e.getUniformLocation(i,c.name);LR(c,f,this)}}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,f=i.length;c!==f;++c){const h=i[c],p=s[h.id];p.needsUpdate!==!1&&h.setValue(e,p.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const f=e[l];f.id in i&&s.push(f)}return s}}function u0(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const OR=37297;let PR=0;function zR(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===e?">":" "} ${h}: ${i[f]}`)}return s.join(`
`)}const f0=new ft;function BR(r){Lt._getMatrix(f0,Lt.workingColorSpace,r);const e=`mat3( ${f0.elements.map(i=>i.toFixed(4))} )`;switch(Lt.getTransfer(r)){case au:return[e,"LinearTransferOETF"];case jt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function h0(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),l=r.getShaderInfoLog(e).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+zR(r.getShaderSource(e),f)}else return l}function FR(r,e){const i=BR(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function IR(r,e){let i;switch(e){case XE:i="Linear";break;case jE:i="Reinhard";break;case WE:i="Cineon";break;case qE:i="ACESFilmic";break;case ZE:i="AgX";break;case KE:i="Neutral";break;case YE:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const kc=new ce;function HR(){Lt.getLuminanceCoefficients(kc);const r=kc.x.toFixed(4),e=kc.y.toFixed(4),i=kc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function GR(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qo).join(`
`)}function VR(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function kR(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[f]={type:c.type,location:r.getAttribLocation(e,f),locationSize:h}}return i}function qo(r){return r!==""}function d0(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function p0(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const XR=/^[ \t]*#include +<([\w\d./]+)>/gm;function tp(r){return r.replace(XR,WR)}const jR=new Map;function WR(r,e){let i=ht[e];if(i===void 0){const s=jR.get(e);if(s!==void 0)i=ht[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return tp(i)}const qR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function m0(r){return r.replace(qR,YR)}function YR(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function g0(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ZR(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===W0?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===EE?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===da&&(e="SHADOWMAP_TYPE_VSM"),e}function KR(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Nr:case Lr:e="ENVMAP_TYPE_CUBE";break;case du:e="ENVMAP_TYPE_CUBE_UV";break}return e}function QR(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Lr:e="ENVMAP_MODE_REFRACTION";break}return e}function JR(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case q0:e="ENVMAP_BLENDING_MULTIPLY";break;case VE:e="ENVMAP_BLENDING_MIX";break;case kE:e="ENVMAP_BLENDING_ADD";break}return e}function $R(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function eC(r,e,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,h=i.fragmentShader;const p=ZR(i),m=KR(i),v=QR(i),g=JR(i),x=$R(i),M=GR(i),E=VR(c),b=l.createProgram();let y,_,L=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(qo).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(qo).join(`
`),_.length>0&&(_+=`
`)):(y=[g0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qo).join(`
`),_=[g0(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+v:"",i.envMap?"#define "+g:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==$a?"#define TONE_MAPPING":"",i.toneMapping!==$a?ht.tonemapping_pars_fragment:"",i.toneMapping!==$a?IR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,FR("linearToOutputTexel",i.outputColorSpace),HR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(qo).join(`
`)),f=tp(f),f=d0(f,i),f=p0(f,i),h=tp(h),h=d0(h,i),h=p0(h,i),f=m0(f),h=m0(h),i.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,y=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",i.glslVersion===C_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===C_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const N=L+y+f,D=L+_+h,j=u0(l,l.VERTEX_SHADER,N),H=u0(l,l.FRAGMENT_SHADER,D);l.attachShader(b,j),l.attachShader(b,H),i.index0AttributeName!==void 0?l.bindAttribLocation(b,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(b,0,"position"),l.linkProgram(b);function z(V){if(r.debug.checkShaderErrors){const he=l.getProgramInfoLog(b).trim(),ne=l.getShaderInfoLog(j).trim(),de=l.getShaderInfoLog(H).trim();let pe=!0,B=!0;if(l.getProgramParameter(b,l.LINK_STATUS)===!1)if(pe=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,b,j,H);else{const $=h0(l,j,"vertex"),J=h0(l,H,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(b,l.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+he+`
`+$+`
`+J)}else he!==""?console.warn("THREE.WebGLProgram: Program Info Log:",he):(ne===""||de==="")&&(B=!1);B&&(V.diagnostics={runnable:pe,programLog:he,vertexShader:{log:ne,prefix:y},fragmentShader:{log:de,prefix:_}})}l.deleteShader(j),l.deleteShader(H),Y=new Jc(l,b),U=kR(l,b)}let Y;this.getUniforms=function(){return Y===void 0&&z(this),Y};let U;this.getAttributes=function(){return U===void 0&&z(this),U};let w=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=l.getProgramParameter(b,OR)),w},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(b),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=PR++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=j,this.fragmentShader=H,this}let tC=0;class nC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new iC(e),i.set(e,s)),s}}class iC{constructor(e){this.id=tC++,this.code=e,this.usedTimes=0}}function aC(r,e,i,s,l,c,f){const h=new rx,p=new nC,m=new Set,v=[],g=l.logarithmicDepthBuffer,x=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(U){return m.add(U),U===0?"uv":`uv${U}`}function y(U,w,V,he,ne){const de=he.fog,pe=ne.geometry,B=U.isMeshStandardMaterial?he.environment:null,$=(U.isMeshStandardMaterial?i:e).get(U.envMap||B),J=$&&$.mapping===du?$.image.height:null,Se=E[U.type];U.precision!==null&&(M=l.getMaxPrecision(U.precision),M!==U.precision&&console.warn("THREE.WebGLProgram.getParameters:",U.precision,"not supported, using",M,"instead."));const be=pe.morphAttributes.position||pe.morphAttributes.normal||pe.morphAttributes.color,P=be!==void 0?be.length:0;let re=0;pe.morphAttributes.position!==void 0&&(re=1),pe.morphAttributes.normal!==void 0&&(re=2),pe.morphAttributes.color!==void 0&&(re=3);let ye,K,me,Re;if(Se){const Rt=Bi[Se];ye=Rt.vertexShader,K=Rt.fragmentShader}else ye=U.vertexShader,K=U.fragmentShader,p.update(U),me=p.getVertexShaderID(U),Re=p.getFragmentShaderID(U);const Ee=r.getRenderTarget(),Oe=r.state.buffers.depth.getReversed(),qe=ne.isInstancedMesh===!0,Qe=ne.isBatchedMesh===!0,Ot=!!U.map,Ct=!!U.matcap,mt=!!$,I=!!U.aoMap,Qt=!!U.lightMap,dt=!!U.bumpMap,zt=!!U.normalMap,je=!!U.displacementMap,ct=!!U.emissiveMap,Ye=!!U.metalnessMap,at=!!U.roughnessMap,Jt=U.anisotropy>0,O=U.clearcoat>0,T=U.dispersion>0,G=U.iridescence>0,ee=U.sheen>0,ue=U.transmission>0,k=Jt&&!!U.anisotropyMap,De=O&&!!U.clearcoatMap,Ce=O&&!!U.clearcoatNormalMap,Fe=O&&!!U.clearcoatRoughnessMap,ke=G&&!!U.iridescenceMap,Me=G&&!!U.iridescenceThicknessMap,Ne=ee&&!!U.sheenColorMap,Ze=ee&&!!U.sheenRoughnessMap,Ge=!!U.specularMap,Ue=!!U.specularColorMap,tt=!!U.specularIntensityMap,W=ue&&!!U.transmissionMap,Le=ue&&!!U.thicknessMap,Te=!!U.gradientMap,He=!!U.alphaMap,Ae=U.alphaTest>0,xe=!!U.alphaHash,Ve=!!U.extensions;let st=$a;U.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(st=r.toneMapping);const It={shaderID:Se,shaderType:U.type,shaderName:U.name,vertexShader:ye,fragmentShader:K,defines:U.defines,customVertexShaderID:me,customFragmentShaderID:Re,isRawShaderMaterial:U.isRawShaderMaterial===!0,glslVersion:U.glslVersion,precision:M,batching:Qe,batchingColor:Qe&&ne._colorsTexture!==null,instancing:qe,instancingColor:qe&&ne.instanceColor!==null,instancingMorph:qe&&ne.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:Ee===null?r.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:Or,alphaToCoverage:!!U.alphaToCoverage,map:Ot,matcap:Ct,envMap:mt,envMapMode:mt&&$.mapping,envMapCubeUVHeight:J,aoMap:I,lightMap:Qt,bumpMap:dt,normalMap:zt,displacementMap:x&&je,emissiveMap:ct,normalMapObjectSpace:zt&&U.normalMapType===tT,normalMapTangentSpace:zt&&U.normalMapType===eT,metalnessMap:Ye,roughnessMap:at,anisotropy:Jt,anisotropyMap:k,clearcoat:O,clearcoatMap:De,clearcoatNormalMap:Ce,clearcoatRoughnessMap:Fe,dispersion:T,iridescence:G,iridescenceMap:ke,iridescenceThicknessMap:Me,sheen:ee,sheenColorMap:Ne,sheenRoughnessMap:Ze,specularMap:Ge,specularColorMap:Ue,specularIntensityMap:tt,transmission:ue,transmissionMap:W,thicknessMap:Le,gradientMap:Te,opaque:U.transparent===!1&&U.blending===Cr&&U.alphaToCoverage===!1,alphaMap:He,alphaTest:Ae,alphaHash:xe,combine:U.combine,mapUv:Ot&&b(U.map.channel),aoMapUv:I&&b(U.aoMap.channel),lightMapUv:Qt&&b(U.lightMap.channel),bumpMapUv:dt&&b(U.bumpMap.channel),normalMapUv:zt&&b(U.normalMap.channel),displacementMapUv:je&&b(U.displacementMap.channel),emissiveMapUv:ct&&b(U.emissiveMap.channel),metalnessMapUv:Ye&&b(U.metalnessMap.channel),roughnessMapUv:at&&b(U.roughnessMap.channel),anisotropyMapUv:k&&b(U.anisotropyMap.channel),clearcoatMapUv:De&&b(U.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&b(U.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&b(U.clearcoatRoughnessMap.channel),iridescenceMapUv:ke&&b(U.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&b(U.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&b(U.sheenColorMap.channel),sheenRoughnessMapUv:Ze&&b(U.sheenRoughnessMap.channel),specularMapUv:Ge&&b(U.specularMap.channel),specularColorMapUv:Ue&&b(U.specularColorMap.channel),specularIntensityMapUv:tt&&b(U.specularIntensityMap.channel),transmissionMapUv:W&&b(U.transmissionMap.channel),thicknessMapUv:Le&&b(U.thicknessMap.channel),alphaMapUv:He&&b(U.alphaMap.channel),vertexTangents:!!pe.attributes.tangent&&(zt||Jt),vertexColors:U.vertexColors,vertexAlphas:U.vertexColors===!0&&!!pe.attributes.color&&pe.attributes.color.itemSize===4,pointsUvs:ne.isPoints===!0&&!!pe.attributes.uv&&(Ot||He),fog:!!de,useFog:U.fog===!0,fogExp2:!!de&&de.isFogExp2,flatShading:U.flatShading===!0,sizeAttenuation:U.sizeAttenuation===!0,logarithmicDepthBuffer:g,reverseDepthBuffer:Oe,skinning:ne.isSkinnedMesh===!0,morphTargets:pe.morphAttributes.position!==void 0,morphNormals:pe.morphAttributes.normal!==void 0,morphColors:pe.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:re,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:U.dithering,shadowMapEnabled:r.shadowMap.enabled&&V.length>0,shadowMapType:r.shadowMap.type,toneMapping:st,decodeVideoTexture:Ot&&U.map.isVideoTexture===!0&&Lt.getTransfer(U.map.colorSpace)===jt,decodeVideoTextureEmissive:ct&&U.emissiveMap.isVideoTexture===!0&&Lt.getTransfer(U.emissiveMap.colorSpace)===jt,premultipliedAlpha:U.premultipliedAlpha,doubleSided:U.side===pa,flipSided:U.side===Zn,useDepthPacking:U.depthPacking>=0,depthPacking:U.depthPacking||0,index0AttributeName:U.index0AttributeName,extensionClipCullDistance:Ve&&U.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&U.extensions.multiDraw===!0||Qe)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:U.customProgramCacheKey()};return It.vertexUv1s=m.has(1),It.vertexUv2s=m.has(2),It.vertexUv3s=m.has(3),m.clear(),It}function _(U){const w=[];if(U.shaderID?w.push(U.shaderID):(w.push(U.customVertexShaderID),w.push(U.customFragmentShaderID)),U.defines!==void 0)for(const V in U.defines)w.push(V),w.push(U.defines[V]);return U.isRawShaderMaterial===!1&&(L(w,U),N(w,U),w.push(r.outputColorSpace)),w.push(U.customProgramCacheKey),w.join()}function L(U,w){U.push(w.precision),U.push(w.outputColorSpace),U.push(w.envMapMode),U.push(w.envMapCubeUVHeight),U.push(w.mapUv),U.push(w.alphaMapUv),U.push(w.lightMapUv),U.push(w.aoMapUv),U.push(w.bumpMapUv),U.push(w.normalMapUv),U.push(w.displacementMapUv),U.push(w.emissiveMapUv),U.push(w.metalnessMapUv),U.push(w.roughnessMapUv),U.push(w.anisotropyMapUv),U.push(w.clearcoatMapUv),U.push(w.clearcoatNormalMapUv),U.push(w.clearcoatRoughnessMapUv),U.push(w.iridescenceMapUv),U.push(w.iridescenceThicknessMapUv),U.push(w.sheenColorMapUv),U.push(w.sheenRoughnessMapUv),U.push(w.specularMapUv),U.push(w.specularColorMapUv),U.push(w.specularIntensityMapUv),U.push(w.transmissionMapUv),U.push(w.thicknessMapUv),U.push(w.combine),U.push(w.fogExp2),U.push(w.sizeAttenuation),U.push(w.morphTargetsCount),U.push(w.morphAttributeCount),U.push(w.numDirLights),U.push(w.numPointLights),U.push(w.numSpotLights),U.push(w.numSpotLightMaps),U.push(w.numHemiLights),U.push(w.numRectAreaLights),U.push(w.numDirLightShadows),U.push(w.numPointLightShadows),U.push(w.numSpotLightShadows),U.push(w.numSpotLightShadowsWithMaps),U.push(w.numLightProbes),U.push(w.shadowMapType),U.push(w.toneMapping),U.push(w.numClippingPlanes),U.push(w.numClipIntersection),U.push(w.depthPacking)}function N(U,w){h.disableAll(),w.supportsVertexTextures&&h.enable(0),w.instancing&&h.enable(1),w.instancingColor&&h.enable(2),w.instancingMorph&&h.enable(3),w.matcap&&h.enable(4),w.envMap&&h.enable(5),w.normalMapObjectSpace&&h.enable(6),w.normalMapTangentSpace&&h.enable(7),w.clearcoat&&h.enable(8),w.iridescence&&h.enable(9),w.alphaTest&&h.enable(10),w.vertexColors&&h.enable(11),w.vertexAlphas&&h.enable(12),w.vertexUv1s&&h.enable(13),w.vertexUv2s&&h.enable(14),w.vertexUv3s&&h.enable(15),w.vertexTangents&&h.enable(16),w.anisotropy&&h.enable(17),w.alphaHash&&h.enable(18),w.batching&&h.enable(19),w.dispersion&&h.enable(20),w.batchingColor&&h.enable(21),U.push(h.mask),h.disableAll(),w.fog&&h.enable(0),w.useFog&&h.enable(1),w.flatShading&&h.enable(2),w.logarithmicDepthBuffer&&h.enable(3),w.reverseDepthBuffer&&h.enable(4),w.skinning&&h.enable(5),w.morphTargets&&h.enable(6),w.morphNormals&&h.enable(7),w.morphColors&&h.enable(8),w.premultipliedAlpha&&h.enable(9),w.shadowMapEnabled&&h.enable(10),w.doubleSided&&h.enable(11),w.flipSided&&h.enable(12),w.useDepthPacking&&h.enable(13),w.dithering&&h.enable(14),w.transmission&&h.enable(15),w.sheen&&h.enable(16),w.opaque&&h.enable(17),w.pointsUvs&&h.enable(18),w.decodeVideoTexture&&h.enable(19),w.decodeVideoTextureEmissive&&h.enable(20),w.alphaToCoverage&&h.enable(21),U.push(h.mask)}function D(U){const w=E[U.type];let V;if(w){const he=Bi[w];V=ou.clone(he.uniforms)}else V=U.uniforms;return V}function j(U,w){let V;for(let he=0,ne=v.length;he<ne;he++){const de=v[he];if(de.cacheKey===w){V=de,++V.usedTimes;break}}return V===void 0&&(V=new eC(r,w,U,c),v.push(V)),V}function H(U){if(--U.usedTimes===0){const w=v.indexOf(U);v[w]=v[v.length-1],v.pop(),U.destroy()}}function z(U){p.remove(U)}function Y(){p.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:D,acquireProgram:j,releaseProgram:H,releaseShaderCache:z,programs:v,dispose:Y}}function sC(){let r=new WeakMap;function e(f){return r.has(f)}function i(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,p){r.get(f)[h]=p}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function rC(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function v0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function _0(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function f(g,x,M,E,b,y){let _=r[e];return _===void 0?(_={id:g.id,object:g,geometry:x,material:M,groupOrder:E,renderOrder:g.renderOrder,z:b,group:y},r[e]=_):(_.id=g.id,_.object=g,_.geometry=x,_.material=M,_.groupOrder=E,_.renderOrder=g.renderOrder,_.z=b,_.group=y),e++,_}function h(g,x,M,E,b,y){const _=f(g,x,M,E,b,y);M.transmission>0?s.push(_):M.transparent===!0?l.push(_):i.push(_)}function p(g,x,M,E,b,y){const _=f(g,x,M,E,b,y);M.transmission>0?s.unshift(_):M.transparent===!0?l.unshift(_):i.unshift(_)}function m(g,x){i.length>1&&i.sort(g||rC),s.length>1&&s.sort(x||v0),l.length>1&&l.sort(x||v0)}function v(){for(let g=e,x=r.length;g<x;g++){const M=r[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:h,unshift:p,finish:v,sort:m}}function oC(){let r=new WeakMap;function e(s,l){const c=r.get(s);let f;return c===void 0?(f=new _0,r.set(s,[f])):l>=c.length?(f=new _0,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:e,dispose:i}}function lC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ce,color:new pt};break;case"SpotLight":i={position:new ce,direction:new ce,color:new pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ce,color:new pt,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ce,skyColor:new pt,groundColor:new pt};break;case"RectAreaLight":i={color:new pt,position:new ce,halfWidth:new ce,halfHeight:new ce};break}return r[e.id]=i,i}}}function cC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let uC=0;function fC(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function hC(r){const e=new lC,i=cC(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new ce);const l=new ce,c=new on,f=new on;function h(m){let v=0,g=0,x=0;for(let U=0;U<9;U++)s.probe[U].set(0,0,0);let M=0,E=0,b=0,y=0,_=0,L=0,N=0,D=0,j=0,H=0,z=0;m.sort(fC);for(let U=0,w=m.length;U<w;U++){const V=m[U],he=V.color,ne=V.intensity,de=V.distance,pe=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)v+=he.r*ne,g+=he.g*ne,x+=he.b*ne;else if(V.isLightProbe){for(let B=0;B<9;B++)s.probe[B].addScaledVector(V.sh.coefficients[B],ne);z++}else if(V.isDirectionalLight){const B=e.get(V);if(B.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const $=V.shadow,J=i.get(V);J.shadowIntensity=$.intensity,J.shadowBias=$.bias,J.shadowNormalBias=$.normalBias,J.shadowRadius=$.radius,J.shadowMapSize=$.mapSize,s.directionalShadow[M]=J,s.directionalShadowMap[M]=pe,s.directionalShadowMatrix[M]=V.shadow.matrix,L++}s.directional[M]=B,M++}else if(V.isSpotLight){const B=e.get(V);B.position.setFromMatrixPosition(V.matrixWorld),B.color.copy(he).multiplyScalar(ne),B.distance=de,B.coneCos=Math.cos(V.angle),B.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),B.decay=V.decay,s.spot[b]=B;const $=V.shadow;if(V.map&&(s.spotLightMap[j]=V.map,j++,$.updateMatrices(V),V.castShadow&&H++),s.spotLightMatrix[b]=$.matrix,V.castShadow){const J=i.get(V);J.shadowIntensity=$.intensity,J.shadowBias=$.bias,J.shadowNormalBias=$.normalBias,J.shadowRadius=$.radius,J.shadowMapSize=$.mapSize,s.spotShadow[b]=J,s.spotShadowMap[b]=pe,D++}b++}else if(V.isRectAreaLight){const B=e.get(V);B.color.copy(he).multiplyScalar(ne),B.halfWidth.set(V.width*.5,0,0),B.halfHeight.set(0,V.height*.5,0),s.rectArea[y]=B,y++}else if(V.isPointLight){const B=e.get(V);if(B.color.copy(V.color).multiplyScalar(V.intensity),B.distance=V.distance,B.decay=V.decay,V.castShadow){const $=V.shadow,J=i.get(V);J.shadowIntensity=$.intensity,J.shadowBias=$.bias,J.shadowNormalBias=$.normalBias,J.shadowRadius=$.radius,J.shadowMapSize=$.mapSize,J.shadowCameraNear=$.camera.near,J.shadowCameraFar=$.camera.far,s.pointShadow[E]=J,s.pointShadowMap[E]=pe,s.pointShadowMatrix[E]=V.shadow.matrix,N++}s.point[E]=B,E++}else if(V.isHemisphereLight){const B=e.get(V);B.skyColor.copy(V.color).multiplyScalar(ne),B.groundColor.copy(V.groundColor).multiplyScalar(ne),s.hemi[_]=B,_++}}y>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ze.LTC_FLOAT_1,s.rectAreaLTC2=ze.LTC_FLOAT_2):(s.rectAreaLTC1=ze.LTC_HALF_1,s.rectAreaLTC2=ze.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=g,s.ambient[2]=x;const Y=s.hash;(Y.directionalLength!==M||Y.pointLength!==E||Y.spotLength!==b||Y.rectAreaLength!==y||Y.hemiLength!==_||Y.numDirectionalShadows!==L||Y.numPointShadows!==N||Y.numSpotShadows!==D||Y.numSpotMaps!==j||Y.numLightProbes!==z)&&(s.directional.length=M,s.spot.length=b,s.rectArea.length=y,s.point.length=E,s.hemi.length=_,s.directionalShadow.length=L,s.directionalShadowMap.length=L,s.pointShadow.length=N,s.pointShadowMap.length=N,s.spotShadow.length=D,s.spotShadowMap.length=D,s.directionalShadowMatrix.length=L,s.pointShadowMatrix.length=N,s.spotLightMatrix.length=D+j-H,s.spotLightMap.length=j,s.numSpotLightShadowsWithMaps=H,s.numLightProbes=z,Y.directionalLength=M,Y.pointLength=E,Y.spotLength=b,Y.rectAreaLength=y,Y.hemiLength=_,Y.numDirectionalShadows=L,Y.numPointShadows=N,Y.numSpotShadows=D,Y.numSpotMaps=j,Y.numLightProbes=z,s.version=uC++)}function p(m,v){let g=0,x=0,M=0,E=0,b=0;const y=v.matrixWorldInverse;for(let _=0,L=m.length;_<L;_++){const N=m[_];if(N.isDirectionalLight){const D=s.directional[g];D.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(y),g++}else if(N.isSpotLight){const D=s.spot[M];D.position.setFromMatrixPosition(N.matrixWorld),D.position.applyMatrix4(y),D.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),D.direction.sub(l),D.direction.transformDirection(y),M++}else if(N.isRectAreaLight){const D=s.rectArea[E];D.position.setFromMatrixPosition(N.matrixWorld),D.position.applyMatrix4(y),f.identity(),c.copy(N.matrixWorld),c.premultiply(y),f.extractRotation(c),D.halfWidth.set(N.width*.5,0,0),D.halfHeight.set(0,N.height*.5,0),D.halfWidth.applyMatrix4(f),D.halfHeight.applyMatrix4(f),E++}else if(N.isPointLight){const D=s.point[x];D.position.setFromMatrixPosition(N.matrixWorld),D.position.applyMatrix4(y),x++}else if(N.isHemisphereLight){const D=s.hemi[b];D.direction.setFromMatrixPosition(N.matrixWorld),D.direction.transformDirection(y),b++}}}return{setup:h,setupView:p,state:s}}function x0(r){const e=new hC(r),i=[],s=[];function l(v){m.camera=v,i.length=0,s.length=0}function c(v){i.push(v)}function f(v){s.push(v)}function h(){e.setup(i)}function p(v){e.setupView(i,v)}const m={lightsArray:i,shadowsArray:s,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:h,setupLightsView:p,pushLight:c,pushShadow:f}}function dC(r){let e=new WeakMap;function i(l,c=0){const f=e.get(l);let h;return f===void 0?(h=new x0(r),e.set(l,[h])):c>=f.length?(h=new x0(r),f.push(h)):h=f[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const pC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gC(r,e,i){let s=new dx;const l=new gt,c=new gt,f=new rn,h=new kT({depthPacking:$E}),p=new XT,m={},v=i.maxTextureSize,g={[es]:Zn,[Zn]:es,[pa]:pa},x=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:pC,fragmentShader:mC}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const E=new ki;E.setAttribute("position",new Yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Hi(E,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=W0;let _=this.type;this.render=function(H,z,Y){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||H.length===0)return;const U=r.getRenderTarget(),w=r.getActiveCubeFace(),V=r.getActiveMipmapLevel(),he=r.state;he.setBlending(ga),he.buffers.color.setClear(1,1,1,1),he.buffers.depth.setTest(!0),he.setScissorTest(!1);const ne=_!==da&&this.type===da,de=_===da&&this.type!==da;for(let pe=0,B=H.length;pe<B;pe++){const $=H[pe],J=$.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;l.copy(J.mapSize);const Se=J.getFrameExtents();if(l.multiply(Se),c.copy(J.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/Se.x),l.x=c.x*Se.x,J.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/Se.y),l.y=c.y*Se.y,J.mapSize.y=c.y)),J.map===null||ne===!0||de===!0){const P=this.type!==da?{minFilter:zn,magFilter:zn}:{};J.map!==null&&J.map.dispose(),J.map=new Di(l.x,l.y,P),J.map.texture.name=$.name+".shadowMap",J.camera.updateProjectionMatrix()}r.setRenderTarget(J.map),r.clear();const be=J.getViewportCount();for(let P=0;P<be;P++){const re=J.getViewport(P);f.set(c.x*re.x,c.y*re.y,c.x*re.z,c.y*re.w),he.viewport(f),J.updateMatrices($,P),s=J.getFrustum(),D(z,Y,J.camera,$,this.type)}J.isPointLightShadow!==!0&&this.type===da&&L(J,Y),J.needsUpdate=!1}_=this.type,y.needsUpdate=!1,r.setRenderTarget(U,w,V)};function L(H,z){const Y=e.update(b);x.defines.VSM_SAMPLES!==H.blurSamples&&(x.defines.VSM_SAMPLES=H.blurSamples,M.defines.VSM_SAMPLES=H.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),H.mapPass===null&&(H.mapPass=new Di(l.x,l.y)),x.uniforms.shadow_pass.value=H.map.texture,x.uniforms.resolution.value=H.mapSize,x.uniforms.radius.value=H.radius,r.setRenderTarget(H.mapPass),r.clear(),r.renderBufferDirect(z,null,Y,x,b,null),M.uniforms.shadow_pass.value=H.mapPass.texture,M.uniforms.resolution.value=H.mapSize,M.uniforms.radius.value=H.radius,r.setRenderTarget(H.map),r.clear(),r.renderBufferDirect(z,null,Y,M,b,null)}function N(H,z,Y,U){let w=null;const V=Y.isPointLight===!0?H.customDistanceMaterial:H.customDepthMaterial;if(V!==void 0)w=V;else if(w=Y.isPointLight===!0?p:h,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){const he=w.uuid,ne=z.uuid;let de=m[he];de===void 0&&(de={},m[he]=de);let pe=de[ne];pe===void 0&&(pe=w.clone(),de[ne]=pe,z.addEventListener("dispose",j)),w=pe}if(w.visible=z.visible,w.wireframe=z.wireframe,U===da?w.side=z.shadowSide!==null?z.shadowSide:z.side:w.side=z.shadowSide!==null?z.shadowSide:g[z.side],w.alphaMap=z.alphaMap,w.alphaTest=z.alphaToCoverage===!0?.5:z.alphaTest,w.map=z.map,w.clipShadows=z.clipShadows,w.clippingPlanes=z.clippingPlanes,w.clipIntersection=z.clipIntersection,w.displacementMap=z.displacementMap,w.displacementScale=z.displacementScale,w.displacementBias=z.displacementBias,w.wireframeLinewidth=z.wireframeLinewidth,w.linewidth=z.linewidth,Y.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const he=r.properties.get(w);he.light=Y}return w}function D(H,z,Y,U,w){if(H.visible===!1)return;if(H.layers.test(z.layers)&&(H.isMesh||H.isLine||H.isPoints)&&(H.castShadow||H.receiveShadow&&w===da)&&(!H.frustumCulled||s.intersectsObject(H))){H.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,H.matrixWorld);const ne=e.update(H),de=H.material;if(Array.isArray(de)){const pe=ne.groups;for(let B=0,$=pe.length;B<$;B++){const J=pe[B],Se=de[J.materialIndex];if(Se&&Se.visible){const be=N(H,Se,U,w);H.onBeforeShadow(r,H,z,Y,ne,be,J),r.renderBufferDirect(Y,null,ne,be,H,J),H.onAfterShadow(r,H,z,Y,ne,be,J)}}}else if(de.visible){const pe=N(H,de,U,w);H.onBeforeShadow(r,H,z,Y,ne,pe,null),r.renderBufferDirect(Y,null,ne,pe,H,null),H.onAfterShadow(r,H,z,Y,ne,pe,null)}}const he=H.children;for(let ne=0,de=he.length;ne<de;ne++)D(he[ne],z,Y,U,w)}function j(H){H.target.removeEventListener("dispose",j);for(const Y in m){const U=m[Y],w=H.target.uuid;w in U&&(U[w].dispose(),delete U[w])}}}const vC={[gd]:vd,[_d]:yd,[xd]:Md,[Ur]:Sd,[vd]:gd,[yd]:_d,[Md]:xd,[Sd]:Ur};function _C(r,e){function i(){let W=!1;const Le=new rn;let Te=null;const He=new rn(0,0,0,0);return{setMask:function(Ae){Te!==Ae&&!W&&(r.colorMask(Ae,Ae,Ae,Ae),Te=Ae)},setLocked:function(Ae){W=Ae},setClear:function(Ae,xe,Ve,st,It){It===!0&&(Ae*=st,xe*=st,Ve*=st),Le.set(Ae,xe,Ve,st),He.equals(Le)===!1&&(r.clearColor(Ae,xe,Ve,st),He.copy(Le))},reset:function(){W=!1,Te=null,He.set(-1,0,0,0)}}}function s(){let W=!1,Le=!1,Te=null,He=null,Ae=null;return{setReversed:function(xe){if(Le!==xe){const Ve=e.get("EXT_clip_control");xe?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),Le=xe;const st=Ae;Ae=null,this.setClear(st)}},getReversed:function(){return Le},setTest:function(xe){xe?Ee(r.DEPTH_TEST):Oe(r.DEPTH_TEST)},setMask:function(xe){Te!==xe&&!W&&(r.depthMask(xe),Te=xe)},setFunc:function(xe){if(Le&&(xe=vC[xe]),He!==xe){switch(xe){case gd:r.depthFunc(r.NEVER);break;case vd:r.depthFunc(r.ALWAYS);break;case _d:r.depthFunc(r.LESS);break;case Ur:r.depthFunc(r.LEQUAL);break;case xd:r.depthFunc(r.EQUAL);break;case Sd:r.depthFunc(r.GEQUAL);break;case yd:r.depthFunc(r.GREATER);break;case Md:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}He=xe}},setLocked:function(xe){W=xe},setClear:function(xe){Ae!==xe&&(Le&&(xe=1-xe),r.clearDepth(xe),Ae=xe)},reset:function(){W=!1,Te=null,He=null,Ae=null,Le=!1}}}function l(){let W=!1,Le=null,Te=null,He=null,Ae=null,xe=null,Ve=null,st=null,It=null;return{setTest:function(Rt){W||(Rt?Ee(r.STENCIL_TEST):Oe(r.STENCIL_TEST))},setMask:function(Rt){Le!==Rt&&!W&&(r.stencilMask(Rt),Le=Rt)},setFunc:function(Rt,Sn,_i){(Te!==Rt||He!==Sn||Ae!==_i)&&(r.stencilFunc(Rt,Sn,_i),Te=Rt,He=Sn,Ae=_i)},setOp:function(Rt,Sn,_i){(xe!==Rt||Ve!==Sn||st!==_i)&&(r.stencilOp(Rt,Sn,_i),xe=Rt,Ve=Sn,st=_i)},setLocked:function(Rt){W=Rt},setClear:function(Rt){It!==Rt&&(r.clearStencil(Rt),It=Rt)},reset:function(){W=!1,Le=null,Te=null,He=null,Ae=null,xe=null,Ve=null,st=null,It=null}}}const c=new i,f=new s,h=new l,p=new WeakMap,m=new WeakMap;let v={},g={},x=new WeakMap,M=[],E=null,b=!1,y=null,_=null,L=null,N=null,D=null,j=null,H=null,z=new pt(0,0,0),Y=0,U=!1,w=null,V=null,he=null,ne=null,de=null;const pe=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,$=0;const J=r.getParameter(r.VERSION);J.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(J)[1]),B=$>=1):J.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),B=$>=2);let Se=null,be={};const P=r.getParameter(r.SCISSOR_BOX),re=r.getParameter(r.VIEWPORT),ye=new rn().fromArray(P),K=new rn().fromArray(re);function me(W,Le,Te,He){const Ae=new Uint8Array(4),xe=r.createTexture();r.bindTexture(W,xe),r.texParameteri(W,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(W,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ve=0;Ve<Te;Ve++)W===r.TEXTURE_3D||W===r.TEXTURE_2D_ARRAY?r.texImage3D(Le,0,r.RGBA,1,1,He,0,r.RGBA,r.UNSIGNED_BYTE,Ae):r.texImage2D(Le+Ve,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ae);return xe}const Re={};Re[r.TEXTURE_2D]=me(r.TEXTURE_2D,r.TEXTURE_2D,1),Re[r.TEXTURE_CUBE_MAP]=me(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[r.TEXTURE_2D_ARRAY]=me(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Re[r.TEXTURE_3D]=me(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),Ee(r.DEPTH_TEST),f.setFunc(Ur),dt(!1),zt(E_),Ee(r.CULL_FACE),I(ga);function Ee(W){v[W]!==!0&&(r.enable(W),v[W]=!0)}function Oe(W){v[W]!==!1&&(r.disable(W),v[W]=!1)}function qe(W,Le){return g[W]!==Le?(r.bindFramebuffer(W,Le),g[W]=Le,W===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Le),W===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Le),!0):!1}function Qe(W,Le){let Te=M,He=!1;if(W){Te=x.get(Le),Te===void 0&&(Te=[],x.set(Le,Te));const Ae=W.textures;if(Te.length!==Ae.length||Te[0]!==r.COLOR_ATTACHMENT0){for(let xe=0,Ve=Ae.length;xe<Ve;xe++)Te[xe]=r.COLOR_ATTACHMENT0+xe;Te.length=Ae.length,He=!0}}else Te[0]!==r.BACK&&(Te[0]=r.BACK,He=!0);He&&r.drawBuffers(Te)}function Ot(W){return E!==W?(r.useProgram(W),E=W,!0):!1}const Ct={[Cs]:r.FUNC_ADD,[bE]:r.FUNC_SUBTRACT,[AE]:r.FUNC_REVERSE_SUBTRACT};Ct[RE]=r.MIN,Ct[CE]=r.MAX;const mt={[wE]:r.ZERO,[DE]:r.ONE,[UE]:r.SRC_COLOR,[pd]:r.SRC_ALPHA,[BE]:r.SRC_ALPHA_SATURATE,[PE]:r.DST_COLOR,[LE]:r.DST_ALPHA,[NE]:r.ONE_MINUS_SRC_COLOR,[md]:r.ONE_MINUS_SRC_ALPHA,[zE]:r.ONE_MINUS_DST_COLOR,[OE]:r.ONE_MINUS_DST_ALPHA,[FE]:r.CONSTANT_COLOR,[IE]:r.ONE_MINUS_CONSTANT_COLOR,[HE]:r.CONSTANT_ALPHA,[GE]:r.ONE_MINUS_CONSTANT_ALPHA};function I(W,Le,Te,He,Ae,xe,Ve,st,It,Rt){if(W===ga){b===!0&&(Oe(r.BLEND),b=!1);return}if(b===!1&&(Ee(r.BLEND),b=!0),W!==TE){if(W!==y||Rt!==U){if((_!==Cs||D!==Cs)&&(r.blendEquation(r.FUNC_ADD),_=Cs,D=Cs),Rt)switch(W){case Cr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case iu:r.blendFunc(r.ONE,r.ONE);break;case T_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case b_:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case Cr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case iu:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case T_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case b_:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}L=null,N=null,j=null,H=null,z.set(0,0,0),Y=0,y=W,U=Rt}return}Ae=Ae||Le,xe=xe||Te,Ve=Ve||He,(Le!==_||Ae!==D)&&(r.blendEquationSeparate(Ct[Le],Ct[Ae]),_=Le,D=Ae),(Te!==L||He!==N||xe!==j||Ve!==H)&&(r.blendFuncSeparate(mt[Te],mt[He],mt[xe],mt[Ve]),L=Te,N=He,j=xe,H=Ve),(st.equals(z)===!1||It!==Y)&&(r.blendColor(st.r,st.g,st.b,It),z.copy(st),Y=It),y=W,U=!1}function Qt(W,Le){W.side===pa?Oe(r.CULL_FACE):Ee(r.CULL_FACE);let Te=W.side===Zn;Le&&(Te=!Te),dt(Te),W.blending===Cr&&W.transparent===!1?I(ga):I(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),f.setFunc(W.depthFunc),f.setTest(W.depthTest),f.setMask(W.depthWrite),c.setMask(W.colorWrite);const He=W.stencilWrite;h.setTest(He),He&&(h.setMask(W.stencilWriteMask),h.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),h.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),ct(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?Ee(r.SAMPLE_ALPHA_TO_COVERAGE):Oe(r.SAMPLE_ALPHA_TO_COVERAGE)}function dt(W){w!==W&&(W?r.frontFace(r.CW):r.frontFace(r.CCW),w=W)}function zt(W){W!==yE?(Ee(r.CULL_FACE),W!==V&&(W===E_?r.cullFace(r.BACK):W===ME?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Oe(r.CULL_FACE),V=W}function je(W){W!==he&&(B&&r.lineWidth(W),he=W)}function ct(W,Le,Te){W?(Ee(r.POLYGON_OFFSET_FILL),(ne!==Le||de!==Te)&&(r.polygonOffset(Le,Te),ne=Le,de=Te)):Oe(r.POLYGON_OFFSET_FILL)}function Ye(W){W?Ee(r.SCISSOR_TEST):Oe(r.SCISSOR_TEST)}function at(W){W===void 0&&(W=r.TEXTURE0+pe-1),Se!==W&&(r.activeTexture(W),Se=W)}function Jt(W,Le,Te){Te===void 0&&(Se===null?Te=r.TEXTURE0+pe-1:Te=Se);let He=be[Te];He===void 0&&(He={type:void 0,texture:void 0},be[Te]=He),(He.type!==W||He.texture!==Le)&&(Se!==Te&&(r.activeTexture(Te),Se=Te),r.bindTexture(W,Le||Re[W]),He.type=W,He.texture=Le)}function O(){const W=be[Se];W!==void 0&&W.type!==void 0&&(r.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function T(){try{r.compressedTexImage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function G(){try{r.compressedTexImage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ee(){try{r.texSubImage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ue(){try{r.texSubImage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function k(){try{r.compressedTexSubImage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function De(){try{r.compressedTexSubImage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ce(){try{r.texStorage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Fe(){try{r.texStorage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ke(){try{r.texImage2D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Me(){try{r.texImage3D(...arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ne(W){ye.equals(W)===!1&&(r.scissor(W.x,W.y,W.z,W.w),ye.copy(W))}function Ze(W){K.equals(W)===!1&&(r.viewport(W.x,W.y,W.z,W.w),K.copy(W))}function Ge(W,Le){let Te=m.get(Le);Te===void 0&&(Te=new WeakMap,m.set(Le,Te));let He=Te.get(W);He===void 0&&(He=r.getUniformBlockIndex(Le,W.name),Te.set(W,He))}function Ue(W,Le){const He=m.get(Le).get(W);p.get(Le)!==He&&(r.uniformBlockBinding(Le,He,W.__bindingPointIndex),p.set(Le,He))}function tt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),v={},Se=null,be={},g={},x=new WeakMap,M=[],E=null,b=!1,y=null,_=null,L=null,N=null,D=null,j=null,H=null,z=new pt(0,0,0),Y=0,U=!1,w=null,V=null,he=null,ne=null,de=null,ye.set(0,0,r.canvas.width,r.canvas.height),K.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:Ee,disable:Oe,bindFramebuffer:qe,drawBuffers:Qe,useProgram:Ot,setBlending:I,setMaterial:Qt,setFlipSided:dt,setCullFace:zt,setLineWidth:je,setPolygonOffset:ct,setScissorTest:Ye,activeTexture:at,bindTexture:Jt,unbindTexture:O,compressedTexImage2D:T,compressedTexImage3D:G,texImage2D:ke,texImage3D:Me,updateUBOMapping:Ge,uniformBlockBinding:Ue,texStorage2D:Ce,texStorage3D:Fe,texSubImage2D:ee,texSubImage3D:ue,compressedTexSubImage2D:k,compressedTexSubImage3D:De,scissor:Ne,viewport:Ze,reset:tt}}function xC(r,e,i,s,l,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new gt,v=new WeakMap;let g;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(O,T){return M?new OffscreenCanvas(O,T):ru("canvas")}function b(O,T,G){let ee=1;const ue=Jt(O);if((ue.width>G||ue.height>G)&&(ee=G/Math.max(ue.width,ue.height)),ee<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const k=Math.floor(ee*ue.width),De=Math.floor(ee*ue.height);g===void 0&&(g=E(k,De));const Ce=T?E(k,De):g;return Ce.width=k,Ce.height=De,Ce.getContext("2d").drawImage(O,0,0,k,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ue.width+"x"+ue.height+") to ("+k+"x"+De+")."),Ce}else return"data"in O&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ue.width+"x"+ue.height+")."),O;return O}function y(O){return O.generateMipmaps}function _(O){r.generateMipmap(O)}function L(O){return O.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?r.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function N(O,T,G,ee,ue=!1){if(O!==null){if(r[O]!==void 0)return r[O];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let k=T;if(T===r.RED&&(G===r.FLOAT&&(k=r.R32F),G===r.HALF_FLOAT&&(k=r.R16F),G===r.UNSIGNED_BYTE&&(k=r.R8)),T===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&(k=r.R8UI),G===r.UNSIGNED_SHORT&&(k=r.R16UI),G===r.UNSIGNED_INT&&(k=r.R32UI),G===r.BYTE&&(k=r.R8I),G===r.SHORT&&(k=r.R16I),G===r.INT&&(k=r.R32I)),T===r.RG&&(G===r.FLOAT&&(k=r.RG32F),G===r.HALF_FLOAT&&(k=r.RG16F),G===r.UNSIGNED_BYTE&&(k=r.RG8)),T===r.RG_INTEGER&&(G===r.UNSIGNED_BYTE&&(k=r.RG8UI),G===r.UNSIGNED_SHORT&&(k=r.RG16UI),G===r.UNSIGNED_INT&&(k=r.RG32UI),G===r.BYTE&&(k=r.RG8I),G===r.SHORT&&(k=r.RG16I),G===r.INT&&(k=r.RG32I)),T===r.RGB_INTEGER&&(G===r.UNSIGNED_BYTE&&(k=r.RGB8UI),G===r.UNSIGNED_SHORT&&(k=r.RGB16UI),G===r.UNSIGNED_INT&&(k=r.RGB32UI),G===r.BYTE&&(k=r.RGB8I),G===r.SHORT&&(k=r.RGB16I),G===r.INT&&(k=r.RGB32I)),T===r.RGBA_INTEGER&&(G===r.UNSIGNED_BYTE&&(k=r.RGBA8UI),G===r.UNSIGNED_SHORT&&(k=r.RGBA16UI),G===r.UNSIGNED_INT&&(k=r.RGBA32UI),G===r.BYTE&&(k=r.RGBA8I),G===r.SHORT&&(k=r.RGBA16I),G===r.INT&&(k=r.RGBA32I)),T===r.RGB&&G===r.UNSIGNED_INT_5_9_9_9_REV&&(k=r.RGB9_E5),T===r.RGBA){const De=ue?au:Lt.getTransfer(ee);G===r.FLOAT&&(k=r.RGBA32F),G===r.HALF_FLOAT&&(k=r.RGBA16F),G===r.UNSIGNED_BYTE&&(k=De===jt?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT_4_4_4_4&&(k=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&(k=r.RGB5_A1)}return(k===r.R16F||k===r.R32F||k===r.RG16F||k===r.RG32F||k===r.RGBA16F||k===r.RGBA32F)&&e.get("EXT_color_buffer_float"),k}function D(O,T){let G;return O?T===null||T===Ns||T===Qo?G=r.DEPTH24_STENCIL8:T===Ii?G=r.DEPTH32F_STENCIL8:T===Ko&&(G=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ns||T===Qo?G=r.DEPTH_COMPONENT24:T===Ii?G=r.DEPTH_COMPONENT32F:T===Ko&&(G=r.DEPTH_COMPONENT16),G}function j(O,T){return y(O)===!0||O.isFramebufferTexture&&O.minFilter!==zn&&O.minFilter!==Fi?Math.log2(Math.max(T.width,T.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?T.mipmaps.length:1}function H(O){const T=O.target;T.removeEventListener("dispose",H),Y(T),T.isVideoTexture&&v.delete(T)}function z(O){const T=O.target;T.removeEventListener("dispose",z),w(T)}function Y(O){const T=s.get(O);if(T.__webglInit===void 0)return;const G=O.source,ee=x.get(G);if(ee){const ue=ee[T.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&U(O),Object.keys(ee).length===0&&x.delete(G)}s.remove(O)}function U(O){const T=s.get(O);r.deleteTexture(T.__webglTexture);const G=O.source,ee=x.get(G);delete ee[T.__cacheKey],f.memory.textures--}function w(O){const T=s.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),s.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(T.__webglFramebuffer[ee]))for(let ue=0;ue<T.__webglFramebuffer[ee].length;ue++)r.deleteFramebuffer(T.__webglFramebuffer[ee][ue]);else r.deleteFramebuffer(T.__webglFramebuffer[ee]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ee])}else{if(Array.isArray(T.__webglFramebuffer))for(let ee=0;ee<T.__webglFramebuffer.length;ee++)r.deleteFramebuffer(T.__webglFramebuffer[ee]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ee=0;ee<T.__webglColorRenderbuffer.length;ee++)T.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ee]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const G=O.textures;for(let ee=0,ue=G.length;ee<ue;ee++){const k=s.get(G[ee]);k.__webglTexture&&(r.deleteTexture(k.__webglTexture),f.memory.textures--),s.remove(G[ee])}s.remove(O)}let V=0;function he(){V=0}function ne(){const O=V;return O>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),V+=1,O}function de(O){const T=[];return T.push(O.wrapS),T.push(O.wrapT),T.push(O.wrapR||0),T.push(O.magFilter),T.push(O.minFilter),T.push(O.anisotropy),T.push(O.internalFormat),T.push(O.format),T.push(O.type),T.push(O.generateMipmaps),T.push(O.premultiplyAlpha),T.push(O.flipY),T.push(O.unpackAlignment),T.push(O.colorSpace),T.join()}function pe(O,T){const G=s.get(O);if(O.isVideoTexture&&Ye(O),O.isRenderTargetTexture===!1&&O.version>0&&G.__version!==O.version){const ee=O.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Re(G,O,T);return}}i.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+T)}function B(O,T){const G=s.get(O);if(O.version>0&&G.__version!==O.version){Re(G,O,T);return}i.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+T)}function $(O,T){const G=s.get(O);if(O.version>0&&G.__version!==O.version){Re(G,O,T);return}i.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+T)}function J(O,T){const G=s.get(O);if(O.version>0&&G.__version!==O.version){Ee(G,O,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+T)}const Se={[bd]:r.REPEAT,[Ds]:r.CLAMP_TO_EDGE,[Ad]:r.MIRRORED_REPEAT},be={[zn]:r.NEAREST,[QE]:r.NEAREST_MIPMAP_NEAREST,[Sc]:r.NEAREST_MIPMAP_LINEAR,[Fi]:r.LINEAR,[Lh]:r.LINEAR_MIPMAP_NEAREST,[Us]:r.LINEAR_MIPMAP_LINEAR},P={[nT]:r.NEVER,[lT]:r.ALWAYS,[iT]:r.LESS,[nx]:r.LEQUAL,[aT]:r.EQUAL,[oT]:r.GEQUAL,[sT]:r.GREATER,[rT]:r.NOTEQUAL};function re(O,T){if(T.type===Ii&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Fi||T.magFilter===Lh||T.magFilter===Sc||T.magFilter===Us||T.minFilter===Fi||T.minFilter===Lh||T.minFilter===Sc||T.minFilter===Us)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(O,r.TEXTURE_WRAP_S,Se[T.wrapS]),r.texParameteri(O,r.TEXTURE_WRAP_T,Se[T.wrapT]),(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)&&r.texParameteri(O,r.TEXTURE_WRAP_R,Se[T.wrapR]),r.texParameteri(O,r.TEXTURE_MAG_FILTER,be[T.magFilter]),r.texParameteri(O,r.TEXTURE_MIN_FILTER,be[T.minFilter]),T.compareFunction&&(r.texParameteri(O,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(O,r.TEXTURE_COMPARE_FUNC,P[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===zn||T.minFilter!==Sc&&T.minFilter!==Us||T.type===Ii&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");r.texParameterf(O,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function ye(O,T){let G=!1;O.__webglInit===void 0&&(O.__webglInit=!0,T.addEventListener("dispose",H));const ee=T.source;let ue=x.get(ee);ue===void 0&&(ue={},x.set(ee,ue));const k=de(T);if(k!==O.__cacheKey){ue[k]===void 0&&(ue[k]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,G=!0),ue[k].usedTimes++;const De=ue[O.__cacheKey];De!==void 0&&(ue[O.__cacheKey].usedTimes--,De.usedTimes===0&&U(T)),O.__cacheKey=k,O.__webglTexture=ue[k].texture}return G}function K(O,T,G){return Math.floor(Math.floor(O/G)/T)}function me(O,T,G,ee){const k=O.updateRanges;if(k.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,G,ee,T.data);else{k.sort((Me,Ne)=>Me.start-Ne.start);let De=0;for(let Me=1;Me<k.length;Me++){const Ne=k[De],Ze=k[Me],Ge=Ne.start+Ne.count,Ue=K(Ze.start,T.width,4),tt=K(Ne.start,T.width,4);Ze.start<=Ge+1&&Ue===tt&&K(Ze.start+Ze.count-1,T.width,4)===Ue?Ne.count=Math.max(Ne.count,Ze.start+Ze.count-Ne.start):(++De,k[De]=Ze)}k.length=De+1;const Ce=r.getParameter(r.UNPACK_ROW_LENGTH),Fe=r.getParameter(r.UNPACK_SKIP_PIXELS),ke=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let Me=0,Ne=k.length;Me<Ne;Me++){const Ze=k[Me],Ge=Math.floor(Ze.start/4),Ue=Math.ceil(Ze.count/4),tt=Ge%T.width,W=Math.floor(Ge/T.width),Le=Ue,Te=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,tt),r.pixelStorei(r.UNPACK_SKIP_ROWS,W),i.texSubImage2D(r.TEXTURE_2D,0,tt,W,Le,Te,G,ee,T.data)}O.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,Ce),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Fe),r.pixelStorei(r.UNPACK_SKIP_ROWS,ke)}}function Re(O,T,G){let ee=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ee=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ee=r.TEXTURE_3D);const ue=ye(O,T),k=T.source;i.bindTexture(ee,O.__webglTexture,r.TEXTURE0+G);const De=s.get(k);if(k.version!==De.__version||ue===!0){i.activeTexture(r.TEXTURE0+G);const Ce=Lt.getPrimaries(Lt.workingColorSpace),Fe=T.colorSpace===Ja?null:Lt.getPrimaries(T.colorSpace),ke=T.colorSpace===Ja||Ce===Fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let Me=b(T.image,!1,l.maxTextureSize);Me=at(T,Me);const Ne=c.convert(T.format,T.colorSpace),Ze=c.convert(T.type);let Ge=N(T.internalFormat,Ne,Ze,T.colorSpace,T.isVideoTexture);re(ee,T);let Ue;const tt=T.mipmaps,W=T.isVideoTexture!==!0,Le=De.__version===void 0||ue===!0,Te=k.dataReady,He=j(T,Me);if(T.isDepthTexture)Ge=D(T.format===$o,T.type),Le&&(W?i.texStorage2D(r.TEXTURE_2D,1,Ge,Me.width,Me.height):i.texImage2D(r.TEXTURE_2D,0,Ge,Me.width,Me.height,0,Ne,Ze,null));else if(T.isDataTexture)if(tt.length>0){W&&Le&&i.texStorage2D(r.TEXTURE_2D,He,Ge,tt[0].width,tt[0].height);for(let Ae=0,xe=tt.length;Ae<xe;Ae++)Ue=tt[Ae],W?Te&&i.texSubImage2D(r.TEXTURE_2D,Ae,0,0,Ue.width,Ue.height,Ne,Ze,Ue.data):i.texImage2D(r.TEXTURE_2D,Ae,Ge,Ue.width,Ue.height,0,Ne,Ze,Ue.data);T.generateMipmaps=!1}else W?(Le&&i.texStorage2D(r.TEXTURE_2D,He,Ge,Me.width,Me.height),Te&&me(T,Me,Ne,Ze)):i.texImage2D(r.TEXTURE_2D,0,Ge,Me.width,Me.height,0,Ne,Ze,Me.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){W&&Le&&i.texStorage3D(r.TEXTURE_2D_ARRAY,He,Ge,tt[0].width,tt[0].height,Me.depth);for(let Ae=0,xe=tt.length;Ae<xe;Ae++)if(Ue=tt[Ae],T.format!==Ci)if(Ne!==null)if(W){if(Te)if(T.layerUpdates.size>0){const Ve=Z_(Ue.width,Ue.height,T.format,T.type);for(const st of T.layerUpdates){const It=Ue.data.subarray(st*Ve/Ue.data.BYTES_PER_ELEMENT,(st+1)*Ve/Ue.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ae,0,0,st,Ue.width,Ue.height,1,Ne,It)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ae,0,0,0,Ue.width,Ue.height,Me.depth,Ne,Ue.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ae,Ge,Ue.width,Ue.height,Me.depth,0,Ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else W?Te&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,Ae,0,0,0,Ue.width,Ue.height,Me.depth,Ne,Ze,Ue.data):i.texImage3D(r.TEXTURE_2D_ARRAY,Ae,Ge,Ue.width,Ue.height,Me.depth,0,Ne,Ze,Ue.data)}else{W&&Le&&i.texStorage2D(r.TEXTURE_2D,He,Ge,tt[0].width,tt[0].height);for(let Ae=0,xe=tt.length;Ae<xe;Ae++)Ue=tt[Ae],T.format!==Ci?Ne!==null?W?Te&&i.compressedTexSubImage2D(r.TEXTURE_2D,Ae,0,0,Ue.width,Ue.height,Ne,Ue.data):i.compressedTexImage2D(r.TEXTURE_2D,Ae,Ge,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):W?Te&&i.texSubImage2D(r.TEXTURE_2D,Ae,0,0,Ue.width,Ue.height,Ne,Ze,Ue.data):i.texImage2D(r.TEXTURE_2D,Ae,Ge,Ue.width,Ue.height,0,Ne,Ze,Ue.data)}else if(T.isDataArrayTexture)if(W){if(Le&&i.texStorage3D(r.TEXTURE_2D_ARRAY,He,Ge,Me.width,Me.height,Me.depth),Te)if(T.layerUpdates.size>0){const Ae=Z_(Me.width,Me.height,T.format,T.type);for(const xe of T.layerUpdates){const Ve=Me.data.subarray(xe*Ae/Me.data.BYTES_PER_ELEMENT,(xe+1)*Ae/Me.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,xe,Me.width,Me.height,1,Ne,Ze,Ve)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Me.width,Me.height,Me.depth,Ne,Ze,Me.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Ge,Me.width,Me.height,Me.depth,0,Ne,Ze,Me.data);else if(T.isData3DTexture)W?(Le&&i.texStorage3D(r.TEXTURE_3D,He,Ge,Me.width,Me.height,Me.depth),Te&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Me.width,Me.height,Me.depth,Ne,Ze,Me.data)):i.texImage3D(r.TEXTURE_3D,0,Ge,Me.width,Me.height,Me.depth,0,Ne,Ze,Me.data);else if(T.isFramebufferTexture){if(Le)if(W)i.texStorage2D(r.TEXTURE_2D,He,Ge,Me.width,Me.height);else{let Ae=Me.width,xe=Me.height;for(let Ve=0;Ve<He;Ve++)i.texImage2D(r.TEXTURE_2D,Ve,Ge,Ae,xe,0,Ne,Ze,null),Ae>>=1,xe>>=1}}else if(tt.length>0){if(W&&Le){const Ae=Jt(tt[0]);i.texStorage2D(r.TEXTURE_2D,He,Ge,Ae.width,Ae.height)}for(let Ae=0,xe=tt.length;Ae<xe;Ae++)Ue=tt[Ae],W?Te&&i.texSubImage2D(r.TEXTURE_2D,Ae,0,0,Ne,Ze,Ue):i.texImage2D(r.TEXTURE_2D,Ae,Ge,Ne,Ze,Ue);T.generateMipmaps=!1}else if(W){if(Le){const Ae=Jt(Me);i.texStorage2D(r.TEXTURE_2D,He,Ge,Ae.width,Ae.height)}Te&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Ne,Ze,Me)}else i.texImage2D(r.TEXTURE_2D,0,Ge,Ne,Ze,Me);y(T)&&_(ee),De.__version=k.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function Ee(O,T,G){if(T.image.length!==6)return;const ee=ye(O,T),ue=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+G);const k=s.get(ue);if(ue.version!==k.__version||ee===!0){i.activeTexture(r.TEXTURE0+G);const De=Lt.getPrimaries(Lt.workingColorSpace),Ce=T.colorSpace===Ja?null:Lt.getPrimaries(T.colorSpace),Fe=T.colorSpace===Ja||De===Ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const ke=T.isCompressedTexture||T.image[0].isCompressedTexture,Me=T.image[0]&&T.image[0].isDataTexture,Ne=[];for(let xe=0;xe<6;xe++)!ke&&!Me?Ne[xe]=b(T.image[xe],!0,l.maxCubemapSize):Ne[xe]=Me?T.image[xe].image:T.image[xe],Ne[xe]=at(T,Ne[xe]);const Ze=Ne[0],Ge=c.convert(T.format,T.colorSpace),Ue=c.convert(T.type),tt=N(T.internalFormat,Ge,Ue,T.colorSpace),W=T.isVideoTexture!==!0,Le=k.__version===void 0||ee===!0,Te=ue.dataReady;let He=j(T,Ze);re(r.TEXTURE_CUBE_MAP,T);let Ae;if(ke){W&&Le&&i.texStorage2D(r.TEXTURE_CUBE_MAP,He,tt,Ze.width,Ze.height);for(let xe=0;xe<6;xe++){Ae=Ne[xe].mipmaps;for(let Ve=0;Ve<Ae.length;Ve++){const st=Ae[Ve];T.format!==Ci?Ge!==null?W?Te&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ve,0,0,st.width,st.height,Ge,st.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ve,tt,st.width,st.height,0,st.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?Te&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ve,0,0,st.width,st.height,Ge,Ue,st.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ve,tt,st.width,st.height,0,Ge,Ue,st.data)}}}else{if(Ae=T.mipmaps,W&&Le){Ae.length>0&&He++;const xe=Jt(Ne[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,He,tt,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(Me){W?Te&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Ne[xe].width,Ne[xe].height,Ge,Ue,Ne[xe].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,tt,Ne[xe].width,Ne[xe].height,0,Ge,Ue,Ne[xe].data);for(let Ve=0;Ve<Ae.length;Ve++){const It=Ae[Ve].image[xe].image;W?Te&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ve+1,0,0,It.width,It.height,Ge,Ue,It.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ve+1,tt,It.width,It.height,0,Ge,Ue,It.data)}}else{W?Te&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Ge,Ue,Ne[xe]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,tt,Ge,Ue,Ne[xe]);for(let Ve=0;Ve<Ae.length;Ve++){const st=Ae[Ve];W?Te&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ve+1,0,0,Ge,Ue,st.image[xe]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ve+1,tt,Ge,Ue,st.image[xe])}}}y(T)&&_(r.TEXTURE_CUBE_MAP),k.__version=ue.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function Oe(O,T,G,ee,ue,k){const De=c.convert(G.format,G.colorSpace),Ce=c.convert(G.type),Fe=N(G.internalFormat,De,Ce,G.colorSpace),ke=s.get(T),Me=s.get(G);if(Me.__renderTarget=T,!ke.__hasExternalTextures){const Ne=Math.max(1,T.width>>k),Ze=Math.max(1,T.height>>k);ue===r.TEXTURE_3D||ue===r.TEXTURE_2D_ARRAY?i.texImage3D(ue,k,Fe,Ne,Ze,T.depth,0,De,Ce,null):i.texImage2D(ue,k,Fe,Ne,Ze,0,De,Ce,null)}i.bindFramebuffer(r.FRAMEBUFFER,O),ct(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ee,ue,Me.__webglTexture,0,je(T)):(ue===r.TEXTURE_2D||ue>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ee,ue,Me.__webglTexture,k),i.bindFramebuffer(r.FRAMEBUFFER,null)}function qe(O,T,G){if(r.bindRenderbuffer(r.RENDERBUFFER,O),T.depthBuffer){const ee=T.depthTexture,ue=ee&&ee.isDepthTexture?ee.type:null,k=D(T.stencilBuffer,ue),De=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ce=je(T);ct(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ce,k,T.width,T.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ce,k,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,k,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,De,r.RENDERBUFFER,O)}else{const ee=T.textures;for(let ue=0;ue<ee.length;ue++){const k=ee[ue],De=c.convert(k.format,k.colorSpace),Ce=c.convert(k.type),Fe=N(k.internalFormat,De,Ce,k.colorSpace),ke=je(T);G&&ct(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ke,Fe,T.width,T.height):ct(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ke,Fe,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Fe,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Qe(O,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(r.FRAMEBUFFER,O),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=s.get(T.depthTexture);ee.__renderTarget=T,(!ee.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),pe(T.depthTexture,0);const ue=ee.__webglTexture,k=je(T);if(T.depthTexture.format===Jo)ct(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ue,0,k):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ue,0);else if(T.depthTexture.format===$o)ct(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ue,0,k):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ue,0);else throw new Error("Unknown depthTexture format")}function Ot(O){const T=s.get(O),G=O.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==O.depthTexture){const ee=O.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ee){const ue=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ee.removeEventListener("dispose",ue)};ee.addEventListener("dispose",ue),T.__depthDisposeCallback=ue}T.__boundDepthTexture=ee}if(O.depthTexture&&!T.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");const ee=O.texture.mipmaps;ee&&ee.length>0?Qe(T.__webglFramebuffer[0],O):Qe(T.__webglFramebuffer,O)}else if(G){T.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ee]),T.__webglDepthbuffer[ee]===void 0)T.__webglDepthbuffer[ee]=r.createRenderbuffer(),qe(T.__webglDepthbuffer[ee],O,!1);else{const ue=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,k=T.__webglDepthbuffer[ee];r.bindRenderbuffer(r.RENDERBUFFER,k),r.framebufferRenderbuffer(r.FRAMEBUFFER,ue,r.RENDERBUFFER,k)}}else{const ee=O.texture.mipmaps;if(ee&&ee.length>0?i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),qe(T.__webglDepthbuffer,O,!1);else{const ue=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,k=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,k),r.framebufferRenderbuffer(r.FRAMEBUFFER,ue,r.RENDERBUFFER,k)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function Ct(O,T,G){const ee=s.get(O);T!==void 0&&Oe(ee.__webglFramebuffer,O,O.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&Ot(O)}function mt(O){const T=O.texture,G=s.get(O),ee=s.get(T);O.addEventListener("dispose",z);const ue=O.textures,k=O.isWebGLCubeRenderTarget===!0,De=ue.length>1;if(De||(ee.__webglTexture===void 0&&(ee.__webglTexture=r.createTexture()),ee.__version=T.version,f.memory.textures++),k){G.__webglFramebuffer=[];for(let Ce=0;Ce<6;Ce++)if(T.mipmaps&&T.mipmaps.length>0){G.__webglFramebuffer[Ce]=[];for(let Fe=0;Fe<T.mipmaps.length;Fe++)G.__webglFramebuffer[Ce][Fe]=r.createFramebuffer()}else G.__webglFramebuffer[Ce]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){G.__webglFramebuffer=[];for(let Ce=0;Ce<T.mipmaps.length;Ce++)G.__webglFramebuffer[Ce]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(De)for(let Ce=0,Fe=ue.length;Ce<Fe;Ce++){const ke=s.get(ue[Ce]);ke.__webglTexture===void 0&&(ke.__webglTexture=r.createTexture(),f.memory.textures++)}if(O.samples>0&&ct(O)===!1){G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let Ce=0;Ce<ue.length;Ce++){const Fe=ue[Ce];G.__webglColorRenderbuffer[Ce]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[Ce]);const ke=c.convert(Fe.format,Fe.colorSpace),Me=c.convert(Fe.type),Ne=N(Fe.internalFormat,ke,Me,Fe.colorSpace,O.isXRRenderTarget===!0),Ze=je(O);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ze,Ne,O.width,O.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.RENDERBUFFER,G.__webglColorRenderbuffer[Ce])}r.bindRenderbuffer(r.RENDERBUFFER,null),O.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),qe(G.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(k){i.bindTexture(r.TEXTURE_CUBE_MAP,ee.__webglTexture),re(r.TEXTURE_CUBE_MAP,T);for(let Ce=0;Ce<6;Ce++)if(T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)Oe(G.__webglFramebuffer[Ce][Fe],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,Fe);else Oe(G.__webglFramebuffer[Ce],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0);y(T)&&_(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(De){for(let Ce=0,Fe=ue.length;Ce<Fe;Ce++){const ke=ue[Ce],Me=s.get(ke);i.bindTexture(r.TEXTURE_2D,Me.__webglTexture),re(r.TEXTURE_2D,ke),Oe(G.__webglFramebuffer,O,ke,r.COLOR_ATTACHMENT0+Ce,r.TEXTURE_2D,0),y(ke)&&_(r.TEXTURE_2D)}i.unbindTexture()}else{let Ce=r.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Ce=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Ce,ee.__webglTexture),re(Ce,T),T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)Oe(G.__webglFramebuffer[Fe],O,T,r.COLOR_ATTACHMENT0,Ce,Fe);else Oe(G.__webglFramebuffer,O,T,r.COLOR_ATTACHMENT0,Ce,0);y(T)&&_(Ce),i.unbindTexture()}O.depthBuffer&&Ot(O)}function I(O){const T=O.textures;for(let G=0,ee=T.length;G<ee;G++){const ue=T[G];if(y(ue)){const k=L(O),De=s.get(ue).__webglTexture;i.bindTexture(k,De),_(k),i.unbindTexture()}}}const Qt=[],dt=[];function zt(O){if(O.samples>0){if(ct(O)===!1){const T=O.textures,G=O.width,ee=O.height;let ue=r.COLOR_BUFFER_BIT;const k=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,De=s.get(O),Ce=T.length>1;if(Ce)for(let ke=0;ke<T.length;ke++)i.bindFramebuffer(r.FRAMEBUFFER,De.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ke,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,De.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ke,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);const Fe=O.texture.mipmaps;Fe&&Fe.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let ke=0;ke<T.length;ke++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(ue|=r.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(ue|=r.STENCIL_BUFFER_BIT)),Ce){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,De.__webglColorRenderbuffer[ke]);const Me=s.get(T[ke]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Me,0)}r.blitFramebuffer(0,0,G,ee,0,0,G,ee,ue,r.NEAREST),p===!0&&(Qt.length=0,dt.length=0,Qt.push(r.COLOR_ATTACHMENT0+ke),O.depthBuffer&&O.resolveDepthBuffer===!1&&(Qt.push(k),dt.push(k),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,dt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Qt))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Ce)for(let ke=0;ke<T.length;ke++){i.bindFramebuffer(r.FRAMEBUFFER,De.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ke,r.RENDERBUFFER,De.__webglColorRenderbuffer[ke]);const Me=s.get(T[ke]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,De.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ke,r.TEXTURE_2D,Me,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&p){const T=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function je(O){return Math.min(l.maxSamples,O.samples)}function ct(O){const T=s.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ye(O){const T=f.render.frame;v.get(O)!==T&&(v.set(O,T),O.update())}function at(O,T){const G=O.colorSpace,ee=O.format,ue=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||G!==Or&&G!==Ja&&(Lt.getTransfer(G)===jt?(ee!==Ci||ue!==ya)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),T}function Jt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(m.width=O.naturalWidth||O.width,m.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(m.width=O.displayWidth,m.height=O.displayHeight):(m.width=O.width,m.height=O.height),m}this.allocateTextureUnit=ne,this.resetTextureUnits=he,this.setTexture2D=pe,this.setTexture2DArray=B,this.setTexture3D=$,this.setTextureCube=J,this.rebindTextures=Ct,this.setupRenderTarget=mt,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=ct}function SC(r,e){function i(s,l=Ja){let c;const f=Lt.getTransfer(l);if(s===ya)return r.UNSIGNED_BYTE;if(s===mp)return r.UNSIGNED_SHORT_4_4_4_4;if(s===gp)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Q0)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===Z0)return r.BYTE;if(s===K0)return r.SHORT;if(s===Ko)return r.UNSIGNED_SHORT;if(s===pp)return r.INT;if(s===Ns)return r.UNSIGNED_INT;if(s===Ii)return r.FLOAT;if(s===va)return r.HALF_FLOAT;if(s===J0)return r.ALPHA;if(s===$0)return r.RGB;if(s===Ci)return r.RGBA;if(s===Jo)return r.DEPTH_COMPONENT;if(s===$o)return r.DEPTH_STENCIL;if(s===vp)return r.RED;if(s===_p)return r.RED_INTEGER;if(s===ex)return r.RG;if(s===xp)return r.RG_INTEGER;if(s===Sp)return r.RGBA_INTEGER;if(s===qc||s===Yc||s===Zc||s===Kc)if(f===jt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===qc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Yc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Zc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Kc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===qc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Yc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Zc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Kc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Rd||s===Cd||s===wd||s===Dd)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Rd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Cd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===wd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Dd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ud||s===Nd||s===Ld)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Ud||s===Nd)return f===jt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Ld)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Od||s===Pd||s===zd||s===Bd||s===Fd||s===Id||s===Hd||s===Gd||s===Vd||s===kd||s===Xd||s===jd||s===Wd||s===qd)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Od)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Pd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===zd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Bd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Fd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Id)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Hd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Gd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Vd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===kd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Xd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===jd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Wd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===qd)return f===jt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Qc||s===Yd||s===Zd)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Qc)return f===jt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Yd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Zd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===tx||s===Kd||s===Qd||s===Jd)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===Qc)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Kd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Qd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Jd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Qo?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const yC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,MC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class EC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i,s){if(this.texture===null){const l=new Bn,c=e.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!==s.depthNear||i.depthFar!==s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new Pn({vertexShader:yC,fragmentShader:MC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Hi(new mu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class TC extends Hr{constructor(e,i){super();const s=this;let l=null,c=1,f=null,h="local-floor",p=1,m=null,v=null,g=null,x=null,M=null,E=null;const b=new EC,y=i.getContextAttributes();let _=null,L=null;const N=[],D=[],j=new gt;let H=null;const z=new vi;z.viewport=new rn;const Y=new vi;Y.viewport=new rn;const U=[z,Y],w=new jT;let V=null,he=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let me=N[K];return me===void 0&&(me=new nd,N[K]=me),me.getTargetRaySpace()},this.getControllerGrip=function(K){let me=N[K];return me===void 0&&(me=new nd,N[K]=me),me.getGripSpace()},this.getHand=function(K){let me=N[K];return me===void 0&&(me=new nd,N[K]=me),me.getHandSpace()};function ne(K){const me=D.indexOf(K.inputSource);if(me===-1)return;const Re=N[me];Re!==void 0&&(Re.update(K.inputSource,K.frame,m||f),Re.dispatchEvent({type:K.type,data:K.inputSource}))}function de(){l.removeEventListener("select",ne),l.removeEventListener("selectstart",ne),l.removeEventListener("selectend",ne),l.removeEventListener("squeeze",ne),l.removeEventListener("squeezestart",ne),l.removeEventListener("squeezeend",ne),l.removeEventListener("end",de),l.removeEventListener("inputsourceschange",pe);for(let K=0;K<N.length;K++){const me=D[K];me!==null&&(D[K]=null,N[K].disconnect(me))}V=null,he=null,b.reset(),e.setRenderTarget(_),M=null,x=null,g=null,l=null,L=null,ye.stop(),s.isPresenting=!1,e.setPixelRatio(H),e.setSize(j.width,j.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){c=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){h=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(K){m=K},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return g},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(K){if(l=K,l!==null){if(_=e.getRenderTarget(),l.addEventListener("select",ne),l.addEventListener("selectstart",ne),l.addEventListener("selectend",ne),l.addEventListener("squeeze",ne),l.addEventListener("squeezestart",ne),l.addEventListener("squeezeend",ne),l.addEventListener("end",de),l.addEventListener("inputsourceschange",pe),y.xrCompatible!==!0&&await i.makeXRCompatible(),H=e.getPixelRatio(),e.getSize(j),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Re=null,Ee=null,Oe=null;y.depth&&(Oe=y.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Re=y.stencil?$o:Jo,Ee=y.stencil?Qo:Ns);const qe={colorFormat:i.RGBA8,depthFormat:Oe,scaleFactor:c};g=new XRWebGLBinding(l,i),x=g.createProjectionLayer(qe),l.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),L=new Di(x.textureWidth,x.textureHeight,{format:Ci,type:ya,depthTexture:new px(x.textureWidth,x.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}else{const Re={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,i,Re),l.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),L=new Di(M.framebufferWidth,M.framebufferHeight,{format:Ci,type:ya,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await l.requestReferenceSpace(h),ye.setContext(l),ye.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function pe(K){for(let me=0;me<K.removed.length;me++){const Re=K.removed[me],Ee=D.indexOf(Re);Ee>=0&&(D[Ee]=null,N[Ee].disconnect(Re))}for(let me=0;me<K.added.length;me++){const Re=K.added[me];let Ee=D.indexOf(Re);if(Ee===-1){for(let qe=0;qe<N.length;qe++)if(qe>=D.length){D.push(Re),Ee=qe;break}else if(D[qe]===null){D[qe]=Re,Ee=qe;break}if(Ee===-1)break}const Oe=N[Ee];Oe&&Oe.connect(Re)}}const B=new ce,$=new ce;function J(K,me,Re){B.setFromMatrixPosition(me.matrixWorld),$.setFromMatrixPosition(Re.matrixWorld);const Ee=B.distanceTo($),Oe=me.projectionMatrix.elements,qe=Re.projectionMatrix.elements,Qe=Oe[14]/(Oe[10]-1),Ot=Oe[14]/(Oe[10]+1),Ct=(Oe[9]+1)/Oe[5],mt=(Oe[9]-1)/Oe[5],I=(Oe[8]-1)/Oe[0],Qt=(qe[8]+1)/qe[0],dt=Qe*I,zt=Qe*Qt,je=Ee/(-I+Qt),ct=je*-I;if(me.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(ct),K.translateZ(je),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Oe[10]===-1)K.projectionMatrix.copy(me.projectionMatrix),K.projectionMatrixInverse.copy(me.projectionMatrixInverse);else{const Ye=Qe+je,at=Ot+je,Jt=dt-ct,O=zt+(Ee-ct),T=Ct*Ot/at*Ye,G=mt*Ot/at*Ye;K.projectionMatrix.makePerspective(Jt,O,T,G,Ye,at),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Se(K,me){me===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(me.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(l===null)return;let me=K.near,Re=K.far;b.texture!==null&&(b.depthNear>0&&(me=b.depthNear),b.depthFar>0&&(Re=b.depthFar)),w.near=Y.near=z.near=me,w.far=Y.far=z.far=Re,(V!==w.near||he!==w.far)&&(l.updateRenderState({depthNear:w.near,depthFar:w.far}),V=w.near,he=w.far),z.layers.mask=K.layers.mask|2,Y.layers.mask=K.layers.mask|4,w.layers.mask=z.layers.mask|Y.layers.mask;const Ee=K.parent,Oe=w.cameras;Se(w,Ee);for(let qe=0;qe<Oe.length;qe++)Se(Oe[qe],Ee);Oe.length===2?J(w,z,Y):w.projectionMatrix.copy(z.projectionMatrix),be(K,w,Ee)};function be(K,me,Re){Re===null?K.matrix.copy(me.matrixWorld):(K.matrix.copy(Re.matrixWorld),K.matrix.invert(),K.matrix.multiply(me.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(me.projectionMatrix),K.projectionMatrixInverse.copy(me.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=$d*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(x===null&&M===null))return p},this.setFoveation=function(K){p=K,x!==null&&(x.fixedFoveation=K),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=K)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(w)};let P=null;function re(K,me){if(v=me.getViewerPose(m||f),E=me,v!==null){const Re=v.views;M!==null&&(e.setRenderTargetFramebuffer(L,M.framebuffer),e.setRenderTarget(L));let Ee=!1;Re.length!==w.cameras.length&&(w.cameras.length=0,Ee=!0);for(let Qe=0;Qe<Re.length;Qe++){const Ot=Re[Qe];let Ct=null;if(M!==null)Ct=M.getViewport(Ot);else{const I=g.getViewSubImage(x,Ot);Ct=I.viewport,Qe===0&&(e.setRenderTargetTextures(L,I.colorTexture,I.depthStencilTexture),e.setRenderTarget(L))}let mt=U[Qe];mt===void 0&&(mt=new vi,mt.layers.enable(Qe),mt.viewport=new rn,U[Qe]=mt),mt.matrix.fromArray(Ot.transform.matrix),mt.matrix.decompose(mt.position,mt.quaternion,mt.scale),mt.projectionMatrix.fromArray(Ot.projectionMatrix),mt.projectionMatrixInverse.copy(mt.projectionMatrix).invert(),mt.viewport.set(Ct.x,Ct.y,Ct.width,Ct.height),Qe===0&&(w.matrix.copy(mt.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),Ee===!0&&w.cameras.push(mt)}const Oe=l.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&g){const Qe=g.getDepthInformation(Re[0]);Qe&&Qe.isValid&&Qe.texture&&b.init(e,Qe,l.renderState)}}for(let Re=0;Re<N.length;Re++){const Ee=D[Re],Oe=N[Re];Ee!==null&&Oe!==void 0&&Oe.update(Ee,me,m||f)}P&&P(K,me),me.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:me}),E=null}const ye=new vx;ye.setAnimationLoop(re),this.setAnimationLoop=function(K){P=K},this.dispose=function(){}}}const bs=new Ma,bC=new on;function AC(r,e){function i(y,_){y.matrixAutoUpdate===!0&&y.updateMatrix(),_.value.copy(y.matrix)}function s(y,_){_.color.getRGB(y.fogColor.value,ux(r)),_.isFog?(y.fogNear.value=_.near,y.fogFar.value=_.far):_.isFogExp2&&(y.fogDensity.value=_.density)}function l(y,_,L,N,D){_.isMeshBasicMaterial||_.isMeshLambertMaterial?c(y,_):_.isMeshToonMaterial?(c(y,_),g(y,_)):_.isMeshPhongMaterial?(c(y,_),v(y,_)):_.isMeshStandardMaterial?(c(y,_),x(y,_),_.isMeshPhysicalMaterial&&M(y,_,D)):_.isMeshMatcapMaterial?(c(y,_),E(y,_)):_.isMeshDepthMaterial?c(y,_):_.isMeshDistanceMaterial?(c(y,_),b(y,_)):_.isMeshNormalMaterial?c(y,_):_.isLineBasicMaterial?(f(y,_),_.isLineDashedMaterial&&h(y,_)):_.isPointsMaterial?p(y,_,L,N):_.isSpriteMaterial?m(y,_):_.isShadowMaterial?(y.color.value.copy(_.color),y.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function c(y,_){y.opacity.value=_.opacity,_.color&&y.diffuse.value.copy(_.color),_.emissive&&y.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.bumpMap&&(y.bumpMap.value=_.bumpMap,i(_.bumpMap,y.bumpMapTransform),y.bumpScale.value=_.bumpScale,_.side===Zn&&(y.bumpScale.value*=-1)),_.normalMap&&(y.normalMap.value=_.normalMap,i(_.normalMap,y.normalMapTransform),y.normalScale.value.copy(_.normalScale),_.side===Zn&&y.normalScale.value.negate()),_.displacementMap&&(y.displacementMap.value=_.displacementMap,i(_.displacementMap,y.displacementMapTransform),y.displacementScale.value=_.displacementScale,y.displacementBias.value=_.displacementBias),_.emissiveMap&&(y.emissiveMap.value=_.emissiveMap,i(_.emissiveMap,y.emissiveMapTransform)),_.specularMap&&(y.specularMap.value=_.specularMap,i(_.specularMap,y.specularMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest);const L=e.get(_),N=L.envMap,D=L.envMapRotation;N&&(y.envMap.value=N,bs.copy(D),bs.x*=-1,bs.y*=-1,bs.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),y.envMapRotation.value.setFromMatrix4(bC.makeRotationFromEuler(bs)),y.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=_.reflectivity,y.ior.value=_.ior,y.refractionRatio.value=_.refractionRatio),_.lightMap&&(y.lightMap.value=_.lightMap,y.lightMapIntensity.value=_.lightMapIntensity,i(_.lightMap,y.lightMapTransform)),_.aoMap&&(y.aoMap.value=_.aoMap,y.aoMapIntensity.value=_.aoMapIntensity,i(_.aoMap,y.aoMapTransform))}function f(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform))}function h(y,_){y.dashSize.value=_.dashSize,y.totalSize.value=_.dashSize+_.gapSize,y.scale.value=_.scale}function p(y,_,L,N){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.size.value=_.size*L,y.scale.value=N*.5,_.map&&(y.map.value=_.map,i(_.map,y.uvTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function m(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.rotation.value=_.rotation,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function v(y,_){y.specular.value.copy(_.specular),y.shininess.value=Math.max(_.shininess,1e-4)}function g(y,_){_.gradientMap&&(y.gradientMap.value=_.gradientMap)}function x(y,_){y.metalness.value=_.metalness,_.metalnessMap&&(y.metalnessMap.value=_.metalnessMap,i(_.metalnessMap,y.metalnessMapTransform)),y.roughness.value=_.roughness,_.roughnessMap&&(y.roughnessMap.value=_.roughnessMap,i(_.roughnessMap,y.roughnessMapTransform)),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)}function M(y,_,L){y.ior.value=_.ior,_.sheen>0&&(y.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),y.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(y.sheenColorMap.value=_.sheenColorMap,i(_.sheenColorMap,y.sheenColorMapTransform)),_.sheenRoughnessMap&&(y.sheenRoughnessMap.value=_.sheenRoughnessMap,i(_.sheenRoughnessMap,y.sheenRoughnessMapTransform))),_.clearcoat>0&&(y.clearcoat.value=_.clearcoat,y.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(y.clearcoatMap.value=_.clearcoatMap,i(_.clearcoatMap,y.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,i(_.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(y.clearcoatNormalMap.value=_.clearcoatNormalMap,i(_.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Zn&&y.clearcoatNormalScale.value.negate())),_.dispersion>0&&(y.dispersion.value=_.dispersion),_.iridescence>0&&(y.iridescence.value=_.iridescence,y.iridescenceIOR.value=_.iridescenceIOR,y.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(y.iridescenceMap.value=_.iridescenceMap,i(_.iridescenceMap,y.iridescenceMapTransform)),_.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=_.iridescenceThicknessMap,i(_.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),_.transmission>0&&(y.transmission.value=_.transmission,y.transmissionSamplerMap.value=L.texture,y.transmissionSamplerSize.value.set(L.width,L.height),_.transmissionMap&&(y.transmissionMap.value=_.transmissionMap,i(_.transmissionMap,y.transmissionMapTransform)),y.thickness.value=_.thickness,_.thicknessMap&&(y.thicknessMap.value=_.thicknessMap,i(_.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=_.attenuationDistance,y.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(y.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(y.anisotropyMap.value=_.anisotropyMap,i(_.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=_.specularIntensity,y.specularColor.value.copy(_.specularColor),_.specularColorMap&&(y.specularColorMap.value=_.specularColorMap,i(_.specularColorMap,y.specularColorMapTransform)),_.specularIntensityMap&&(y.specularIntensityMap.value=_.specularIntensityMap,i(_.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,_){_.matcap&&(y.matcap.value=_.matcap)}function b(y,_){const L=e.get(_).light;y.referencePosition.value.setFromMatrixPosition(L.matrixWorld),y.nearDistance.value=L.shadow.camera.near,y.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function RC(r,e,i,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(L,N){const D=N.program;s.uniformBlockBinding(L,D)}function m(L,N){let D=l[L.id];D===void 0&&(E(L),D=v(L),l[L.id]=D,L.addEventListener("dispose",y));const j=N.program;s.updateUBOMapping(L,j);const H=e.render.frame;c[L.id]!==H&&(x(L),c[L.id]=H)}function v(L){const N=g();L.__bindingPointIndex=N;const D=r.createBuffer(),j=L.__size,H=L.usage;return r.bindBuffer(r.UNIFORM_BUFFER,D),r.bufferData(r.UNIFORM_BUFFER,j,H),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,N,D),D}function g(){for(let L=0;L<h;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(L){const N=l[L.id],D=L.uniforms,j=L.__cache;r.bindBuffer(r.UNIFORM_BUFFER,N);for(let H=0,z=D.length;H<z;H++){const Y=Array.isArray(D[H])?D[H]:[D[H]];for(let U=0,w=Y.length;U<w;U++){const V=Y[U];if(M(V,H,U,j)===!0){const he=V.__offset,ne=Array.isArray(V.value)?V.value:[V.value];let de=0;for(let pe=0;pe<ne.length;pe++){const B=ne[pe],$=b(B);typeof B=="number"||typeof B=="boolean"?(V.__data[0]=B,r.bufferSubData(r.UNIFORM_BUFFER,he+de,V.__data)):B.isMatrix3?(V.__data[0]=B.elements[0],V.__data[1]=B.elements[1],V.__data[2]=B.elements[2],V.__data[3]=0,V.__data[4]=B.elements[3],V.__data[5]=B.elements[4],V.__data[6]=B.elements[5],V.__data[7]=0,V.__data[8]=B.elements[6],V.__data[9]=B.elements[7],V.__data[10]=B.elements[8],V.__data[11]=0):(B.toArray(V.__data,de),de+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,he,V.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(L,N,D,j){const H=L.value,z=N+"_"+D;if(j[z]===void 0)return typeof H=="number"||typeof H=="boolean"?j[z]=H:j[z]=H.clone(),!0;{const Y=j[z];if(typeof H=="number"||typeof H=="boolean"){if(Y!==H)return j[z]=H,!0}else if(Y.equals(H)===!1)return Y.copy(H),!0}return!1}function E(L){const N=L.uniforms;let D=0;const j=16;for(let z=0,Y=N.length;z<Y;z++){const U=Array.isArray(N[z])?N[z]:[N[z]];for(let w=0,V=U.length;w<V;w++){const he=U[w],ne=Array.isArray(he.value)?he.value:[he.value];for(let de=0,pe=ne.length;de<pe;de++){const B=ne[de],$=b(B),J=D%j,Se=J%$.boundary,be=J+Se;D+=Se,be!==0&&j-be<$.storage&&(D+=j-be),he.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),he.__offset=D,D+=$.storage}}}const H=D%j;return H>0&&(D+=j-H),L.__size=D,L.__cache={},this}function b(L){const N={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(N.boundary=4,N.storage=4):L.isVector2?(N.boundary=8,N.storage=8):L.isVector3||L.isColor?(N.boundary=16,N.storage=12):L.isVector4?(N.boundary=16,N.storage=16):L.isMatrix3?(N.boundary=48,N.storage=48):L.isMatrix4?(N.boundary=64,N.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),N}function y(L){const N=L.target;N.removeEventListener("dispose",y);const D=f.indexOf(N.__bindingPointIndex);f.splice(D,1),r.deleteBuffer(l[N.id]),delete l[N.id],delete c[N.id]}function _(){for(const L in l)r.deleteBuffer(l[L]);f=[],l={},c={}}return{bind:p,update:m,dispose:_}}class CC{constructor(e={}){const{canvas:i=uT(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:g=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=f;const E=new Uint32Array(4),b=new Int32Array(4);let y=null,_=null;const L=[],N=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$a,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let j=!1;this._outputColorSpace=gi;let H=0,z=0,Y=null,U=-1,w=null;const V=new rn,he=new rn;let ne=null;const de=new pt(0);let pe=0,B=i.width,$=i.height,J=1,Se=null,be=null;const P=new rn(0,0,B,$),re=new rn(0,0,B,$);let ye=!1;const K=new dx;let me=!1,Re=!1;const Ee=new on,Oe=new on,qe=new ce,Qe=new rn,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ct=!1;function mt(){return Y===null?J:1}let I=s;function Qt(C,Q){return i.getContext(C,Q)}try{const C={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:g};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${dp}`),i.addEventListener("webglcontextlost",He,!1),i.addEventListener("webglcontextrestored",Ae,!1),i.addEventListener("webglcontextcreationerror",xe,!1),I===null){const Q="webgl2";if(I=Qt(Q,C),I===null)throw Qt(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let dt,zt,je,ct,Ye,at,Jt,O,T,G,ee,ue,k,De,Ce,Fe,ke,Me,Ne,Ze,Ge,Ue,tt,W;function Le(){dt=new F1(I),dt.init(),Ue=new SC(I,dt),zt=new U1(I,dt,e,Ue),je=new _C(I,dt),zt.reverseDepthBuffer&&x&&je.buffers.depth.setReversed(!0),ct=new G1(I),Ye=new sC,at=new xC(I,dt,je,Ye,zt,Ue,ct),Jt=new L1(D),O=new B1(D),T=new qT(I),tt=new w1(I,T),G=new I1(I,T,ct,tt),ee=new k1(I,G,T,ct),Ne=new V1(I,zt,at),Fe=new N1(Ye),ue=new aC(D,Jt,O,dt,zt,tt,Fe),k=new AC(D,Ye),De=new oC,Ce=new dC(dt),Me=new C1(D,Jt,O,je,ee,M,p),ke=new gC(D,ee,zt),W=new RC(I,ct,zt,je),Ze=new D1(I,dt,ct),Ge=new H1(I,dt,ct),ct.programs=ue.programs,D.capabilities=zt,D.extensions=dt,D.properties=Ye,D.renderLists=De,D.shadowMap=ke,D.state=je,D.info=ct}Le();const Te=new TC(D,I);this.xr=Te,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const C=dt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=dt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(C){C!==void 0&&(J=C,this.setSize(B,$,!1))},this.getSize=function(C){return C.set(B,$)},this.setSize=function(C,Q,oe=!0){if(Te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=C,$=Q,i.width=Math.floor(C*J),i.height=Math.floor(Q*J),oe===!0&&(i.style.width=C+"px",i.style.height=Q+"px"),this.setViewport(0,0,C,Q)},this.getDrawingBufferSize=function(C){return C.set(B*J,$*J).floor()},this.setDrawingBufferSize=function(C,Q,oe){B=C,$=Q,J=oe,i.width=Math.floor(C*oe),i.height=Math.floor(Q*oe),this.setViewport(0,0,C,Q)},this.getCurrentViewport=function(C){return C.copy(V)},this.getViewport=function(C){return C.copy(P)},this.setViewport=function(C,Q,oe,le){C.isVector4?P.set(C.x,C.y,C.z,C.w):P.set(C,Q,oe,le),je.viewport(V.copy(P).multiplyScalar(J).round())},this.getScissor=function(C){return C.copy(re)},this.setScissor=function(C,Q,oe,le){C.isVector4?re.set(C.x,C.y,C.z,C.w):re.set(C,Q,oe,le),je.scissor(he.copy(re).multiplyScalar(J).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(C){je.setScissorTest(ye=C)},this.setOpaqueSort=function(C){Se=C},this.setTransparentSort=function(C){be=C},this.getClearColor=function(C){return C.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(C=!0,Q=!0,oe=!0){let le=0;if(C){let q=!1;if(Y!==null){const we=Y.texture.format;q=we===Sp||we===xp||we===_p}if(q){const we=Y.texture.type,Pe=we===ya||we===Ns||we===Ko||we===Qo||we===mp||we===gp,Ie=Me.getClearColor(),Be=Me.getClearAlpha(),nt=Ie.r,it=Ie.g,Ke=Ie.b;Pe?(E[0]=nt,E[1]=it,E[2]=Ke,E[3]=Be,I.clearBufferuiv(I.COLOR,0,E)):(b[0]=nt,b[1]=it,b[2]=Ke,b[3]=Be,I.clearBufferiv(I.COLOR,0,b))}else le|=I.COLOR_BUFFER_BIT}Q&&(le|=I.DEPTH_BUFFER_BIT),oe&&(le|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(le)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",He,!1),i.removeEventListener("webglcontextrestored",Ae,!1),i.removeEventListener("webglcontextcreationerror",xe,!1),Me.dispose(),De.dispose(),Ce.dispose(),Ye.dispose(),Jt.dispose(),O.dispose(),ee.dispose(),tt.dispose(),W.dispose(),ue.dispose(),Te.dispose(),Te.removeEventListener("sessionstart",Vr),Te.removeEventListener("sessionend",kr),Ni.stop()};function He(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),j=!0}function Ae(){console.log("THREE.WebGLRenderer: Context Restored."),j=!1;const C=ct.autoReset,Q=ke.enabled,oe=ke.autoUpdate,le=ke.needsUpdate,q=ke.type;Le(),ct.autoReset=C,ke.enabled=Q,ke.autoUpdate=oe,ke.needsUpdate=le,ke.type=q}function xe(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Ve(C){const Q=C.target;Q.removeEventListener("dispose",Ve),st(Q)}function st(C){It(C),Ye.remove(C)}function It(C){const Q=Ye.get(C).programs;Q!==void 0&&(Q.forEach(function(oe){ue.releaseProgram(oe)}),C.isShaderMaterial&&ue.releaseShaderCache(C))}this.renderBufferDirect=function(C,Q,oe,le,q,we){Q===null&&(Q=Ot);const Pe=q.isMesh&&q.matrixWorld.determinant()<0,Ie=jr(C,Q,oe,le,q);je.setMaterial(le,Pe);let Be=oe.index,nt=1;if(le.wireframe===!0){if(Be=G.getWireframeAttribute(oe),Be===void 0)return;nt=2}const it=oe.drawRange,Ke=oe.attributes.position;let vt=it.start*nt,bt=(it.start+it.count)*nt;we!==null&&(vt=Math.max(vt,we.start*nt),bt=Math.min(bt,(we.start+we.count)*nt)),Be!==null?(vt=Math.max(vt,0),bt=Math.min(bt,Be.count)):Ke!=null&&(vt=Math.max(vt,0),bt=Math.min(bt,Ke.count));const Ht=bt-vt;if(Ht<0||Ht===1/0)return;tt.setup(q,le,Ie,oe,Be);let wt,rt=Ze;if(Be!==null&&(wt=T.get(Be),rt=Ge,rt.setIndex(wt)),q.isMesh)le.wireframe===!0?(je.setLineWidth(le.wireframeLinewidth*mt()),rt.setMode(I.LINES)):rt.setMode(I.TRIANGLES);else if(q.isLine){let $e=le.linewidth;$e===void 0&&($e=1),je.setLineWidth($e*mt()),q.isLineSegments?rt.setMode(I.LINES):q.isLineLoop?rt.setMode(I.LINE_LOOP):rt.setMode(I.LINE_STRIP)}else q.isPoints?rt.setMode(I.POINTS):q.isSprite&&rt.setMode(I.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)wr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),rt.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(dt.get("WEBGL_multi_draw"))rt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const $e=q._multiDrawStarts,dn=q._multiDrawCounts,At=q._multiDrawCount,Fn=Be?T.get(Be).bytesPerElement:1,Si=Ye.get(le).currentProgram.getUniforms();for(let Un=0;Un<At;Un++)Si.setValue(I,"_gl_DrawID",Un),rt.render($e[Un]/Fn,dn[Un])}else if(q.isInstancedMesh)rt.renderInstances(vt,Ht,q.count);else if(oe.isInstancedBufferGeometry){const $e=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,dn=Math.min(oe.instanceCount,$e);rt.renderInstances(vt,Ht,dn)}else rt.render(vt,Ht)};function Rt(C,Q,oe){C.transparent===!0&&C.side===pa&&C.forceSinglePass===!1?(C.side=Zn,C.needsUpdate=!0,$t(C,Q,oe),C.side=es,C.needsUpdate=!0,$t(C,Q,oe),C.side=pa):$t(C,Q,oe)}this.compile=function(C,Q,oe=null){oe===null&&(oe=C),_=Ce.get(oe),_.init(Q),N.push(_),oe.traverseVisible(function(q){q.isLight&&q.layers.test(Q.layers)&&(_.pushLight(q),q.castShadow&&_.pushShadow(q))}),C!==oe&&C.traverseVisible(function(q){q.isLight&&q.layers.test(Q.layers)&&(_.pushLight(q),q.castShadow&&_.pushShadow(q))}),_.setupLights();const le=new Set;return C.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const we=q.material;if(we)if(Array.isArray(we))for(let Pe=0;Pe<we.length;Pe++){const Ie=we[Pe];Rt(Ie,oe,q),le.add(Ie)}else Rt(we,oe,q),le.add(we)}),_=N.pop(),le},this.compileAsync=function(C,Q,oe=null){const le=this.compile(C,Q,oe);return new Promise(q=>{function we(){if(le.forEach(function(Pe){Ye.get(Pe).currentProgram.isReady()&&le.delete(Pe)}),le.size===0){q(C);return}setTimeout(we,10)}dt.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Sn=null;function _i(C){Sn&&Sn(C)}function Vr(){Ni.stop()}function kr(){Ni.start()}const Ni=new vx;Ni.setAnimationLoop(_i),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(C){Sn=C,Te.setAnimationLoop(C),C===null?Ni.stop():Ni.start()},Te.addEventListener("sessionstart",Vr),Te.addEventListener("sessionend",kr),this.render=function(C,Q){if(Q!==void 0&&Q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(j===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),Te.enabled===!0&&Te.isPresenting===!0&&(Te.cameraAutoUpdate===!0&&Te.updateCamera(Q),Q=Te.getCamera()),C.isScene===!0&&C.onBeforeRender(D,C,Q,Y),_=Ce.get(C,N.length),_.init(Q),N.push(_),Oe.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),K.setFromProjectionMatrix(Oe),Re=this.localClippingEnabled,me=Fe.init(this.clippingPlanes,Re),y=De.get(C,L.length),y.init(),L.push(y),Te.enabled===!0&&Te.isPresenting===!0){const we=D.xr.getDepthSensingMesh();we!==null&&ts(we,Q,-1/0,D.sortObjects)}ts(C,Q,0,D.sortObjects),y.finish(),D.sortObjects===!0&&y.sort(Se,be),Ct=Te.enabled===!1||Te.isPresenting===!1||Te.hasDepthSensing()===!1,Ct&&Me.addToRenderList(y,C),this.info.render.frame++,me===!0&&Fe.beginShadows();const oe=_.state.shadowsArray;ke.render(oe,C,Q),me===!0&&Fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const le=y.opaque,q=y.transmissive;if(_.setupLights(),Q.isArrayCamera){const we=Q.cameras;if(q.length>0)for(let Pe=0,Ie=we.length;Pe<Ie;Pe++){const Be=we[Pe];Xr(le,q,C,Be)}Ct&&Me.render(C);for(let Pe=0,Ie=we.length;Pe<Ie;Pe++){const Be=we[Pe];Ls(y,C,Be,Be.viewport)}}else q.length>0&&Xr(le,q,C,Q),Ct&&Me.render(C),Ls(y,C,Q);Y!==null&&z===0&&(at.updateMultisampleRenderTarget(Y),at.updateRenderTargetMipmap(Y)),C.isScene===!0&&C.onAfterRender(D,C,Q),tt.resetDefaultState(),U=-1,w=null,N.pop(),N.length>0?(_=N[N.length-1],me===!0&&Fe.setGlobalState(D.clippingPlanes,_.state.camera)):_=null,L.pop(),L.length>0?y=L[L.length-1]:y=null};function ts(C,Q,oe,le){if(C.visible===!1)return;if(C.layers.test(Q.layers)){if(C.isGroup)oe=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(Q);else if(C.isLight)_.pushLight(C),C.castShadow&&_.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||K.intersectsSprite(C)){le&&Qe.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Oe);const Pe=ee.update(C),Ie=C.material;Ie.visible&&y.push(C,Pe,Ie,oe,Qe.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||K.intersectsObject(C))){const Pe=ee.update(C),Ie=C.material;if(le&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Qe.copy(C.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),Qe.copy(Pe.boundingSphere.center)),Qe.applyMatrix4(C.matrixWorld).applyMatrix4(Oe)),Array.isArray(Ie)){const Be=Pe.groups;for(let nt=0,it=Be.length;nt<it;nt++){const Ke=Be[nt],vt=Ie[Ke.materialIndex];vt&&vt.visible&&y.push(C,Pe,vt,oe,Qe.z,Ke)}}else Ie.visible&&y.push(C,Pe,Ie,oe,Qe.z,null)}}const we=C.children;for(let Pe=0,Ie=we.length;Pe<Ie;Pe++)ts(we[Pe],Q,oe,le)}function Ls(C,Q,oe,le){const q=C.opaque,we=C.transmissive,Pe=C.transparent;_.setupLightsView(oe),me===!0&&Fe.setGlobalState(D.clippingPlanes,oe),le&&je.viewport(V.copy(le)),q.length>0&&ns(q,Q,oe),we.length>0&&ns(we,Q,oe),Pe.length>0&&ns(Pe,Q,oe),je.buffers.depth.setTest(!0),je.buffers.depth.setMask(!0),je.buffers.color.setMask(!0),je.setPolygonOffset(!1)}function Xr(C,Q,oe,le){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[le.id]===void 0&&(_.state.transmissionRenderTarget[le.id]=new Di(1,1,{generateMipmaps:!0,type:dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float")?va:ya,minFilter:Us,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Lt.workingColorSpace}));const we=_.state.transmissionRenderTarget[le.id],Pe=le.viewport||V;we.setSize(Pe.z*D.transmissionResolutionScale,Pe.w*D.transmissionResolutionScale);const Ie=D.getRenderTarget();D.setRenderTarget(we),D.getClearColor(de),pe=D.getClearAlpha(),pe<1&&D.setClearColor(16777215,.5),D.clear(),Ct&&Me.render(oe);const Be=D.toneMapping;D.toneMapping=$a;const nt=le.viewport;if(le.viewport!==void 0&&(le.viewport=void 0),_.setupLightsView(le),me===!0&&Fe.setGlobalState(D.clippingPlanes,le),ns(C,oe,le),at.updateMultisampleRenderTarget(we),at.updateRenderTargetMipmap(we),dt.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let Ke=0,vt=Q.length;Ke<vt;Ke++){const bt=Q[Ke],Ht=bt.object,wt=bt.geometry,rt=bt.material,$e=bt.group;if(rt.side===pa&&Ht.layers.test(le.layers)){const dn=rt.side;rt.side=Zn,rt.needsUpdate=!0,xi(Ht,oe,le,wt,rt,$e),rt.side=dn,rt.needsUpdate=!0,it=!0}}it===!0&&(at.updateMultisampleRenderTarget(we),at.updateRenderTargetMipmap(we))}D.setRenderTarget(Ie),D.setClearColor(de,pe),nt!==void 0&&(le.viewport=nt),D.toneMapping=Be}function ns(C,Q,oe){const le=Q.isScene===!0?Q.overrideMaterial:null;for(let q=0,we=C.length;q<we;q++){const Pe=C[q],Ie=Pe.object,Be=Pe.geometry,nt=Pe.group;let it=Pe.material;it.allowOverride===!0&&le!==null&&(it=le),Ie.layers.test(oe.layers)&&xi(Ie,Q,oe,Be,it,nt)}}function xi(C,Q,oe,le,q,we){C.onBeforeRender(D,Q,oe,le,q,we),C.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),q.onBeforeRender(D,Q,oe,le,C,we),q.transparent===!0&&q.side===pa&&q.forceSinglePass===!1?(q.side=Zn,q.needsUpdate=!0,D.renderBufferDirect(oe,Q,le,q,C,we),q.side=es,q.needsUpdate=!0,D.renderBufferDirect(oe,Q,le,q,C,we),q.side=pa):D.renderBufferDirect(oe,Q,le,q,C,we),C.onAfterRender(D,Q,oe,le,q,we)}function $t(C,Q,oe){Q.isScene!==!0&&(Q=Ot);const le=Ye.get(C),q=_.state.lights,we=_.state.shadowsArray,Pe=q.state.version,Ie=ue.getParameters(C,q.state,we,Q,oe),Be=ue.getProgramCacheKey(Ie);let nt=le.programs;le.environment=C.isMeshStandardMaterial?Q.environment:null,le.fog=Q.fog,le.envMap=(C.isMeshStandardMaterial?O:Jt).get(C.envMap||le.environment),le.envMapRotation=le.environment!==null&&C.envMap===null?Q.environmentRotation:C.envMapRotation,nt===void 0&&(C.addEventListener("dispose",Ve),nt=new Map,le.programs=nt);let it=nt.get(Be);if(it!==void 0){if(le.currentProgram===it&&le.lightsStateVersion===Pe)return Xi(C,Ie),it}else Ie.uniforms=ue.getUniforms(C),C.onBeforeCompile(Ie,D),it=ue.acquireProgram(Ie,Be),nt.set(Be,it),le.uniforms=Ie.uniforms;const Ke=le.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ke.clippingPlanes=Fe.uniform),Xi(C,Ie),le.needsLights=_u(C),le.lightsStateVersion=Pe,le.needsLights&&(Ke.ambientLightColor.value=q.state.ambient,Ke.lightProbe.value=q.state.probe,Ke.directionalLights.value=q.state.directional,Ke.directionalLightShadows.value=q.state.directionalShadow,Ke.spotLights.value=q.state.spot,Ke.spotLightShadows.value=q.state.spotShadow,Ke.rectAreaLights.value=q.state.rectArea,Ke.ltc_1.value=q.state.rectAreaLTC1,Ke.ltc_2.value=q.state.rectAreaLTC2,Ke.pointLights.value=q.state.point,Ke.pointLightShadows.value=q.state.pointShadow,Ke.hemisphereLights.value=q.state.hemi,Ke.directionalShadowMap.value=q.state.directionalShadowMap,Ke.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ke.spotShadowMap.value=q.state.spotShadowMap,Ke.spotLightMatrix.value=q.state.spotLightMatrix,Ke.spotLightMap.value=q.state.spotLightMap,Ke.pointShadowMap.value=q.state.pointShadowMap,Ke.pointShadowMatrix.value=q.state.pointShadowMatrix),le.currentProgram=it,le.uniformsList=null,it}function yn(C){if(C.uniformsList===null){const Q=C.currentProgram.getUniforms();C.uniformsList=Jc.seqWithValue(Q.seq,C.uniforms)}return C.uniformsList}function Xi(C,Q){const oe=Ye.get(C);oe.outputColorSpace=Q.outputColorSpace,oe.batching=Q.batching,oe.batchingColor=Q.batchingColor,oe.instancing=Q.instancing,oe.instancingColor=Q.instancingColor,oe.instancingMorph=Q.instancingMorph,oe.skinning=Q.skinning,oe.morphTargets=Q.morphTargets,oe.morphNormals=Q.morphNormals,oe.morphColors=Q.morphColors,oe.morphTargetsCount=Q.morphTargetsCount,oe.numClippingPlanes=Q.numClippingPlanes,oe.numIntersection=Q.numClipIntersection,oe.vertexAlphas=Q.vertexAlphas,oe.vertexTangents=Q.vertexTangents,oe.toneMapping=Q.toneMapping}function jr(C,Q,oe,le,q){Q.isScene!==!0&&(Q=Ot),at.resetTextureUnits();const we=Q.fog,Pe=le.isMeshStandardMaterial?Q.environment:null,Ie=Y===null?D.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Or,Be=(le.isMeshStandardMaterial?O:Jt).get(le.envMap||Pe),nt=le.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,it=!!oe.attributes.tangent&&(!!le.normalMap||le.anisotropy>0),Ke=!!oe.morphAttributes.position,vt=!!oe.morphAttributes.normal,bt=!!oe.morphAttributes.color;let Ht=$a;le.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ht=D.toneMapping);const wt=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,rt=wt!==void 0?wt.length:0,$e=Ye.get(le),dn=_.state.lights;if(me===!0&&(Re===!0||C!==w)){const en=C===w&&le.id===U;Fe.setState(le,C,en)}let At=!1;le.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==dn.state.version||$e.outputColorSpace!==Ie||q.isBatchedMesh&&$e.batching===!1||!q.isBatchedMesh&&$e.batching===!0||q.isBatchedMesh&&$e.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&$e.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&$e.instancing===!1||!q.isInstancedMesh&&$e.instancing===!0||q.isSkinnedMesh&&$e.skinning===!1||!q.isSkinnedMesh&&$e.skinning===!0||q.isInstancedMesh&&$e.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&$e.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&$e.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&$e.instancingMorph===!1&&q.morphTexture!==null||$e.envMap!==Be||le.fog===!0&&$e.fog!==we||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==Fe.numPlanes||$e.numIntersection!==Fe.numIntersection)||$e.vertexAlphas!==nt||$e.vertexTangents!==it||$e.morphTargets!==Ke||$e.morphNormals!==vt||$e.morphColors!==bt||$e.toneMapping!==Ht||$e.morphTargetsCount!==rt)&&(At=!0):(At=!0,$e.__version=le.version);let Fn=$e.currentProgram;At===!0&&(Fn=$t(le,Q,q));let Si=!1,Un=!1,vn=!1;const Gt=Fn.getUniforms(),Nn=$e.uniforms;if(je.useProgram(Fn.program)&&(Si=!0,Un=!0,vn=!0),le.id!==U&&(U=le.id,Un=!0),Si||w!==C){je.buffers.depth.getReversed()?(Ee.copy(C.projectionMatrix),hT(Ee),dT(Ee),Gt.setValue(I,"projectionMatrix",Ee)):Gt.setValue(I,"projectionMatrix",C.projectionMatrix),Gt.setValue(I,"viewMatrix",C.matrixWorldInverse);const Mn=Gt.map.cameraPosition;Mn!==void 0&&Mn.setValue(I,qe.setFromMatrixPosition(C.matrixWorld)),zt.logarithmicDepthBuffer&&Gt.setValue(I,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(le.isMeshPhongMaterial||le.isMeshToonMaterial||le.isMeshLambertMaterial||le.isMeshBasicMaterial||le.isMeshStandardMaterial||le.isShaderMaterial)&&Gt.setValue(I,"isOrthographic",C.isOrthographicCamera===!0),w!==C&&(w=C,Un=!0,vn=!0)}if(q.isSkinnedMesh){Gt.setOptional(I,q,"bindMatrix"),Gt.setOptional(I,q,"bindMatrixInverse");const en=q.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),Gt.setValue(I,"boneTexture",en.boneTexture,at))}q.isBatchedMesh&&(Gt.setOptional(I,q,"batchingTexture"),Gt.setValue(I,"batchingTexture",q._matricesTexture,at),Gt.setOptional(I,q,"batchingIdTexture"),Gt.setValue(I,"batchingIdTexture",q._indirectTexture,at),Gt.setOptional(I,q,"batchingColorTexture"),q._colorsTexture!==null&&Gt.setValue(I,"batchingColorTexture",q._colorsTexture,at));const Rn=oe.morphAttributes;if((Rn.position!==void 0||Rn.normal!==void 0||Rn.color!==void 0)&&Ne.update(q,oe,Fn),(Un||$e.receiveShadow!==q.receiveShadow)&&($e.receiveShadow=q.receiveShadow,Gt.setValue(I,"receiveShadow",q.receiveShadow)),le.isMeshGouraudMaterial&&le.envMap!==null&&(Nn.envMap.value=Be,Nn.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),le.isMeshStandardMaterial&&le.envMap===null&&Q.environment!==null&&(Nn.envMapIntensity.value=Q.environmentIntensity),Un&&(Gt.setValue(I,"toneMappingExposure",D.toneMappingExposure),$e.needsLights&&vu(Nn,vn),we&&le.fog===!0&&k.refreshFogUniforms(Nn,we),k.refreshMaterialUniforms(Nn,le,J,$,_.state.transmissionRenderTarget[C.id]),Jc.upload(I,yn($e),Nn,at)),le.isShaderMaterial&&le.uniformsNeedUpdate===!0&&(Jc.upload(I,yn($e),Nn,at),le.uniformsNeedUpdate=!1),le.isSpriteMaterial&&Gt.setValue(I,"center",q.center),Gt.setValue(I,"modelViewMatrix",q.modelViewMatrix),Gt.setValue(I,"normalMatrix",q.normalMatrix),Gt.setValue(I,"modelMatrix",q.matrixWorld),le.isShaderMaterial||le.isRawShaderMaterial){const en=le.uniformsGroups;for(let Mn=0,Os=en.length;Mn<Os;Mn++){const In=en[Mn];W.update(In,Fn),W.bind(In,Fn)}}return Fn}function vu(C,Q){C.ambientLightColor.needsUpdate=Q,C.lightProbe.needsUpdate=Q,C.directionalLights.needsUpdate=Q,C.directionalLightShadows.needsUpdate=Q,C.pointLights.needsUpdate=Q,C.pointLightShadows.needsUpdate=Q,C.spotLights.needsUpdate=Q,C.spotLightShadows.needsUpdate=Q,C.rectAreaLights.needsUpdate=Q,C.hemisphereLights.needsUpdate=Q}function _u(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(C,Q,oe){const le=Ye.get(C);le.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,le.__autoAllocateDepthBuffer===!1&&(le.__useRenderToTexture=!1),Ye.get(C.texture).__webglTexture=Q,Ye.get(C.depthTexture).__webglTexture=le.__autoAllocateDepthBuffer?void 0:oe,le.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,Q){const oe=Ye.get(C);oe.__webglFramebuffer=Q,oe.__useDefaultFramebuffer=Q===void 0};const cl=I.createFramebuffer();this.setRenderTarget=function(C,Q=0,oe=0){Y=C,H=Q,z=oe;let le=!0,q=null,we=!1,Pe=!1;if(C){const Be=Ye.get(C);if(Be.__useDefaultFramebuffer!==void 0)je.bindFramebuffer(I.FRAMEBUFFER,null),le=!1;else if(Be.__webglFramebuffer===void 0)at.setupRenderTarget(C);else if(Be.__hasExternalTextures)at.rebindTextures(C,Ye.get(C.texture).__webglTexture,Ye.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ke=C.depthTexture;if(Be.__boundDepthTexture!==Ke){if(Ke!==null&&Ye.has(Ke)&&(C.width!==Ke.image.width||C.height!==Ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");at.setupDepthRenderbuffer(C)}}const nt=C.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(Pe=!0);const it=Ye.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(it[Q])?q=it[Q][oe]:q=it[Q],we=!0):C.samples>0&&at.useMultisampledRTT(C)===!1?q=Ye.get(C).__webglMultisampledFramebuffer:Array.isArray(it)?q=it[oe]:q=it,V.copy(C.viewport),he.copy(C.scissor),ne=C.scissorTest}else V.copy(P).multiplyScalar(J).floor(),he.copy(re).multiplyScalar(J).floor(),ne=ye;if(oe!==0&&(q=cl),je.bindFramebuffer(I.FRAMEBUFFER,q)&&le&&je.drawBuffers(C,q),je.viewport(V),je.scissor(he),je.setScissorTest(ne),we){const Be=Ye.get(C.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Be.__webglTexture,oe)}else if(Pe){const Be=Ye.get(C.texture),nt=Q;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Be.__webglTexture,oe,nt)}else if(C!==null&&oe!==0){const Be=Ye.get(C.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Be.__webglTexture,oe)}U=-1},this.readRenderTargetPixels=function(C,Q,oe,le,q,we,Pe,Ie=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=Ye.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Pe!==void 0&&(Be=Be[Pe]),Be){je.bindFramebuffer(I.FRAMEBUFFER,Be);try{const nt=C.textures[Ie],it=nt.format,Ke=nt.type;if(!zt.textureFormatReadable(it)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!zt.textureTypeReadable(Ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=C.width-le&&oe>=0&&oe<=C.height-q&&(C.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ie),I.readPixels(Q,oe,le,q,Ue.convert(it),Ue.convert(Ke),we))}finally{const nt=Y!==null?Ye.get(Y).__webglFramebuffer:null;je.bindFramebuffer(I.FRAMEBUFFER,nt)}}},this.readRenderTargetPixelsAsync=async function(C,Q,oe,le,q,we,Pe,Ie=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=Ye.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Pe!==void 0&&(Be=Be[Pe]),Be)if(Q>=0&&Q<=C.width-le&&oe>=0&&oe<=C.height-q){je.bindFramebuffer(I.FRAMEBUFFER,Be);const nt=C.textures[Ie],it=nt.format,Ke=nt.type;if(!zt.textureFormatReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!zt.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const vt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,vt),I.bufferData(I.PIXEL_PACK_BUFFER,we.byteLength,I.STREAM_READ),C.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ie),I.readPixels(Q,oe,le,q,Ue.convert(it),Ue.convert(Ke),0);const bt=Y!==null?Ye.get(Y).__webglFramebuffer:null;je.bindFramebuffer(I.FRAMEBUFFER,bt);const Ht=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await fT(I,Ht,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,vt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,we),I.deleteBuffer(vt),I.deleteSync(Ht),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,Q=null,oe=0){const le=Math.pow(2,-oe),q=Math.floor(C.image.width*le),we=Math.floor(C.image.height*le),Pe=Q!==null?Q.x:0,Ie=Q!==null?Q.y:0;at.setTexture2D(C,0),I.copyTexSubImage2D(I.TEXTURE_2D,oe,0,0,Pe,Ie,q,we),je.unbindTexture()};const is=I.createFramebuffer(),Wr=I.createFramebuffer();this.copyTextureToTexture=function(C,Q,oe=null,le=null,q=0,we=null){we===null&&(q!==0?(wr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),we=q,q=0):we=0);let Pe,Ie,Be,nt,it,Ke,vt,bt,Ht;const wt=C.isCompressedTexture?C.mipmaps[we]:C.image;if(oe!==null)Pe=oe.max.x-oe.min.x,Ie=oe.max.y-oe.min.y,Be=oe.isBox3?oe.max.z-oe.min.z:1,nt=oe.min.x,it=oe.min.y,Ke=oe.isBox3?oe.min.z:0;else{const Rn=Math.pow(2,-q);Pe=Math.floor(wt.width*Rn),Ie=Math.floor(wt.height*Rn),C.isDataArrayTexture?Be=wt.depth:C.isData3DTexture?Be=Math.floor(wt.depth*Rn):Be=1,nt=0,it=0,Ke=0}le!==null?(vt=le.x,bt=le.y,Ht=le.z):(vt=0,bt=0,Ht=0);const rt=Ue.convert(Q.format),$e=Ue.convert(Q.type);let dn;Q.isData3DTexture?(at.setTexture3D(Q,0),dn=I.TEXTURE_3D):Q.isDataArrayTexture||Q.isCompressedArrayTexture?(at.setTexture2DArray(Q,0),dn=I.TEXTURE_2D_ARRAY):(at.setTexture2D(Q,0),dn=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,Q.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,Q.unpackAlignment);const At=I.getParameter(I.UNPACK_ROW_LENGTH),Fn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Si=I.getParameter(I.UNPACK_SKIP_PIXELS),Un=I.getParameter(I.UNPACK_SKIP_ROWS),vn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,wt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,wt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,nt),I.pixelStorei(I.UNPACK_SKIP_ROWS,it),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ke);const Gt=C.isDataArrayTexture||C.isData3DTexture,Nn=Q.isDataArrayTexture||Q.isData3DTexture;if(C.isDepthTexture){const Rn=Ye.get(C),en=Ye.get(Q),Mn=Ye.get(Rn.__renderTarget),Os=Ye.get(en.__renderTarget);je.bindFramebuffer(I.READ_FRAMEBUFFER,Mn.__webglFramebuffer),je.bindFramebuffer(I.DRAW_FRAMEBUFFER,Os.__webglFramebuffer);for(let In=0;In<Be;In++)Gt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ye.get(C).__webglTexture,q,Ke+In),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ye.get(Q).__webglTexture,we,Ht+In)),I.blitFramebuffer(nt,it,Pe,Ie,vt,bt,Pe,Ie,I.DEPTH_BUFFER_BIT,I.NEAREST);je.bindFramebuffer(I.READ_FRAMEBUFFER,null),je.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(q!==0||C.isRenderTargetTexture||Ye.has(C)){const Rn=Ye.get(C),en=Ye.get(Q);je.bindFramebuffer(I.READ_FRAMEBUFFER,is),je.bindFramebuffer(I.DRAW_FRAMEBUFFER,Wr);for(let Mn=0;Mn<Be;Mn++)Gt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Rn.__webglTexture,q,Ke+Mn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Rn.__webglTexture,q),Nn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,en.__webglTexture,we,Ht+Mn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,en.__webglTexture,we),q!==0?I.blitFramebuffer(nt,it,Pe,Ie,vt,bt,Pe,Ie,I.COLOR_BUFFER_BIT,I.NEAREST):Nn?I.copyTexSubImage3D(dn,we,vt,bt,Ht+Mn,nt,it,Pe,Ie):I.copyTexSubImage2D(dn,we,vt,bt,nt,it,Pe,Ie);je.bindFramebuffer(I.READ_FRAMEBUFFER,null),je.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Nn?C.isDataTexture||C.isData3DTexture?I.texSubImage3D(dn,we,vt,bt,Ht,Pe,Ie,Be,rt,$e,wt.data):Q.isCompressedArrayTexture?I.compressedTexSubImage3D(dn,we,vt,bt,Ht,Pe,Ie,Be,rt,wt.data):I.texSubImage3D(dn,we,vt,bt,Ht,Pe,Ie,Be,rt,$e,wt):C.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,we,vt,bt,Pe,Ie,rt,$e,wt.data):C.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,we,vt,bt,wt.width,wt.height,rt,wt.data):I.texSubImage2D(I.TEXTURE_2D,we,vt,bt,Pe,Ie,rt,$e,wt);I.pixelStorei(I.UNPACK_ROW_LENGTH,At),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Fn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Si),I.pixelStorei(I.UNPACK_SKIP_ROWS,Un),I.pixelStorei(I.UNPACK_SKIP_IMAGES,vn),we===0&&Q.generateMipmaps&&I.generateMipmap(dn),je.unbindTexture()},this.copyTextureToTexture3D=function(C,Q,oe=null,le=null,q=0){return wr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,Q,oe,le,q)},this.initRenderTarget=function(C){Ye.get(C).__webglFramebuffer===void 0&&at.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?at.setTextureCube(C,0):C.isData3DTexture?at.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?at.setTexture2DArray(C,0):at.setTexture2D(C,0),je.unbindTexture()},this.resetState=function(){H=0,z=0,Y=null,je.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ma}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Lt._getDrawingBufferColorSpace(e),i.unpackColorSpace=Lt._getUnpackColorSpace()}}const $c={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class ll{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const wC=new mx(-1,1,1,-1,0,1);class DC extends ki{constructor(){super(),this.setAttribute("position",new xa([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new xa([0,2,0,0,2,0],2))}}const UC=new DC;class Mx{constructor(e){this._mesh=new Hi(UC,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,wC)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class NC extends ll{constructor(e,i="tDiffuse"){super(),this.textureID=i,this.uniforms=null,this.material=null,e instanceof Pn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ou.clone(e.uniforms),this.material=new Pn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Mx(this.material)}render(e,i,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class S0 extends ll{constructor(e,i){super(),this.scene=e,this.camera=i,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,i,s){const l=e.getContext(),c=e.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let f,h;this.inverse?(f=0,h=1):(f=1,h=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),c.buffers.stencil.setFunc(l.ALWAYS,f,4294967295),c.buffers.stencil.setClear(h),c.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(l.EQUAL,1,4294967295),c.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),c.buffers.stencil.setLocked(!0)}}class LC extends ll{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class OC{constructor(e,i){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),i===void 0){const s=e.getSize(new gt);this._width=s.width,this._height=s.height,i=new Di(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:va}),i.texture.name="EffectComposer.rt1"}else this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new NC($c),this.copyPass.material.blending=ga,this.clock=new gx}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,i){this.passes.splice(i,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const i=this.passes.indexOf(e);i!==-1&&this.passes.splice(i,1)}isLastEnabledPass(e){for(let i=e+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const i=this.renderer.getRenderTarget();let s=!1;for(let l=0,c=this.passes.length;l<c;l++){const f=this.passes[l];if(f.enabled!==!1){if(f.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),f.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),f.needsSwap){if(s){const h=this.renderer.getContext(),p=this.renderer.state.buffers.stencil;p.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),p.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}S0!==void 0&&(f instanceof S0?s=!0:f instanceof LC&&(s=!1))}}this.renderer.setRenderTarget(i)}reset(e){if(e===void 0){const i=this.renderer.getSize(new gt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,i){this._width=e,this._height=i;const s=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(s,l),this.renderTarget2.setSize(s,l);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(s,l)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class PC extends ll{constructor(e,i,s=null,l=null,c=null){super(),this.scene=e,this.camera=i,this.overrideMaterial=s,this.clearColor=l,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new pt}render(e,i,s){const l=e.autoClear;e.autoClear=!1;let c,f;this.overrideMaterial!==null&&(f=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(c=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=f),e.autoClear=l}}const zC={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new pt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class zr extends ll{constructor(e,i=1,s,l){super(),this.strength=i,this.radius=s,this.threshold=l,this.resolution=e!==void 0?new gt(e.x,e.y):new gt(256,256),this.clearColor=new pt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let c=Math.round(this.resolution.x/2),f=Math.round(this.resolution.y/2);this.renderTargetBright=new Di(c,f,{type:va}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let v=0;v<this.nMips;v++){const g=new Di(c,f,{type:va});g.texture.name="UnrealBloomPass.h"+v,g.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(g);const x=new Di(c,f,{type:va});x.texture.name="UnrealBloomPass.v"+v,x.texture.generateMipmaps=!1,this.renderTargetsVertical.push(x),c=Math.round(c/2),f=Math.round(f/2)}const h=zC;this.highPassUniforms=ou.clone(h.uniforms),this.highPassUniforms.luminosityThreshold.value=l,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Pn({uniforms:this.highPassUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader}),this.separableBlurMaterials=[];const p=[3,5,7,9,11];c=Math.round(this.resolution.x/2),f=Math.round(this.resolution.y/2);for(let v=0;v<this.nMips;v++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(p[v])),this.separableBlurMaterials[v].uniforms.invSize.value=new gt(1/c,1/f),c=Math.round(c/2),f=Math.round(f/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=i,this.compositeMaterial.uniforms.bloomRadius.value=.1;const m=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=m,this.bloomTintColors=[new ce(1,1,1),new ce(1,1,1),new ce(1,1,1),new ce(1,1,1),new ce(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ou.clone($c.uniforms),this.blendMaterial=new Pn({uniforms:this.copyUniforms,vertexShader:$c.vertexShader,fragmentShader:$c.fragmentShader,blending:iu,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new pt,this._oldClearAlpha=1,this._basic=new Mp,this._fsQuad=new Mx(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,i){let s=Math.round(e/2),l=Math.round(i/2);this.renderTargetBright.setSize(s,l);for(let c=0;c<this.nMips;c++)this.renderTargetsHorizontal[c].setSize(s,l),this.renderTargetsVertical[c].setSize(s,l),this.separableBlurMaterials[c].uniforms.invSize.value=new gt(1/s,1/l),s=Math.round(s/2),l=Math.round(l/2)}render(e,i,s,l,c){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const f=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),c&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let h=this.renderTargetBright;for(let p=0;p<this.nMips;p++)this._fsQuad.material=this.separableBlurMaterials[p],this.separableBlurMaterials[p].uniforms.colorTexture.value=h.texture,this.separableBlurMaterials[p].uniforms.direction.value=zr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[p]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[p].uniforms.colorTexture.value=this.renderTargetsHorizontal[p].texture,this.separableBlurMaterials[p].uniforms.direction.value=zr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[p]),e.clear(),this._fsQuad.render(e),h=this.renderTargetsVertical[p];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,c&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(s),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=f}_getSeparableBlurMaterial(e){const i=[];for(let s=0;s<e;s++)i.push(.39894*Math.exp(-.5*s*s/(e*e))/e);return new Pn({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new gt(.5,.5)},direction:{value:new gt(.5,.5)},gaussianCoefficients:{value:i}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new Pn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}zr.BlurDirectionX=new gt(1,0);zr.BlurDirectionY=new gt(0,1);const qn=28;class BC{constructor(){Et(this,"bands",new Float32Array(qn));Et(this,"level",0);Et(this,"speaker","idle");Et(this,"burst",0)}pulse(e=1){this.burst=Math.max(this.burst,e)}decay(e){for(let i=0;i<qn;i++)this.bands[i]*=e;this.level*=e}reset(){this.bands.fill(0),this.level=0}}const Nt=new BC,Ar=6e3,ko={idle:{core:new pt("#c3d2e6"),edge:new pt("#33455f")},user:{core:new pt("#cfe2ff"),edge:new pt("#1b6dff")},agent:{core:new pt("#ffd0c0"),edge:new pt("#ff2800")}},FC=`
  precision highp float;

  attribute float aBand;
  attribute float aSeed;
  attribute vec3  aDrift;

  uniform sampler2D uBandTex;
  uniform float uTime;
  uniform float uLevel;
  uniform float uSpread;   // eased 0..1 — how far the shell has opened
  uniform float uBurst;    // one-shot transition impulse
  uniform float uSize;
  uniform float uScale;   // half the drawing-buffer height, in device px

  varying float vAmp;
  varying float vFacing;
  varying float vSeed;

  void main() {
    float amp = texture2D(uBandTex, vec2((aBand + 0.5) / ${qn}.0, 0.5)).r;

    vec3 dir = normalize(position);

    // Idle breathing keeps the sphere alive when the room is silent.
    float breathe = sin(uTime * 0.55 + aSeed * 6.2831) * 0.010;

    // Radial: loud bands push their own pixels outward.
    float radial = 1.0 + breathe + uSpread * amp * 0.55 + uSpread * uLevel * 0.12 + uBurst * 0.30;

    // Tangential: each pixel walks its own axis so neighbours part company.
    float wander = sin(uTime * 2.3 + aSeed * 12.0) * 0.5 + 0.5;
    vec3 offset = aDrift * (uSpread * amp * (0.20 + wander * 0.30) + uBurst * 0.17 * wander);

    vec3 p = dir * radial + offset;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Facing: pixels on the far side of the shell dim, so it reads as a volume.
    vec3 n = normalize(normalMatrix * dir);
    vFacing = clamp(n.z * 0.5 + 0.5, 0.0, 1.0);

    vAmp = amp;
    vSeed = aSeed;

    // World-unit size projected to device pixels — the same formula three's
    // own PointsMaterial uses, so a pixel stays a pixel at any canvas size.
    float size = uSize * (1.0 + amp * 1.30 + uBurst * 0.55) * (0.62 + vFacing * 0.62);
    gl_PointSize = max(1.0, size * uScale / max(0.001, -mv.z));
  }
`,IC=`
  precision highp float;

  uniform vec3  uCore;
  uniform vec3  uEdge;
  uniform float uTime;
  uniform float uBurst;

  varying float vAmp;
  varying float vFacing;
  varying float vSeed;

  void main() {
    // Square pixel with a one-texel chamfer — no round sprites anywhere.
    vec2 q = abs(gl_PointCoord - 0.5);
    float d = max(q.x, q.y);
    float mask = 1.0 - smoothstep(0.42, 0.5, d);
    if (mask <= 0.001) discard;

    // Hot centre, cooler rim: the pixel itself has a filament.
    float core = 1.0 - smoothstep(0.0, 0.34, d);

    vec3 col = mix(uEdge, uCore, clamp(core * 0.75 + vAmp * 0.85, 0.0, 1.0));

    // A slow per-pixel scintillation so the shell never looks like a still.
    float twinkle = 0.86 + 0.14 * sin(uTime * 1.7 + vSeed * 30.0);

    float alpha = mask * twinkle * (0.14 + vFacing * 0.56) * (0.58 + vAmp * 0.62 + uBurst * 0.55);

    gl_FragColor = vec4(col * (0.80 + vAmp * 0.80), alpha);
  }
`;function HC({className:r}){const e=Z.useRef(null);return Z.useEffect(()=>{const i=e.current;if(!i)return;const s=new CC({antialias:!1,alpha:!0,powerPreference:"high-performance"}),l=Math.min(window.devicePixelRatio,2);s.setPixelRatio(l),s.setClearColor(0,0),i.appendChild(s.domElement),s.domElement.style.display="block";const c=new BT,f=new vi(38,1,.1,100);f.position.set(0,0,5.6);const h=new Float32Array(Ar*3),p=new Float32Array(Ar),m=new Float32Array(Ar),v=new Float32Array(Ar*3),g=Math.PI*(3-Math.sqrt(5));for(let ne=0;ne<Ar;ne++){const de=1-ne/(Ar-1)*2,pe=Math.sqrt(Math.max(0,1-de*de)),B=g*ne;h[ne*3]=Math.cos(B)*pe,h[ne*3+1]=de,h[ne*3+2]=Math.sin(B)*pe;const $=(de+1)/2,J=Math.floor(Math.abs($-.5)*2*qn+(Math.random()-.5)*3);p[ne]=Math.min(qn-1,Math.max(0,J)),m[ne]=Math.random();const Se=new ce(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();v[ne*3]=Se.x,v[ne*3+1]=Se.y,v[ne*3+2]=Se.z}const x=new ki;x.setAttribute("position",new Yn(h,3)),x.setAttribute("aBand",new Yn(p,1)),x.setAttribute("aSeed",new Yn(m,1)),x.setAttribute("aDrift",new Yn(v,3));const M=new Float32Array(qn),E=new FT(M,qn,1,vp,Ii);E.minFilter=zn,E.magFilter=zn,E.needsUpdate=!0;const b={uBandTex:{value:E},uTime:{value:0},uLevel:{value:0},uSpread:{value:0},uBurst:{value:0},uSize:{value:.056},uScale:{value:300},uCore:{value:ko.idle.core.clone()},uEdge:{value:ko.idle.edge.clone()}},y=new Pn({uniforms:b,vertexShader:FC,fragmentShader:IC,transparent:!0,depthWrite:!1,blending:iu}),_=new VT(x,y);c.add(_);const L=new OC(s);L.addPass(new PC(c,f));const N=new zr(new gt(1,1),.45,.5,.26);L.addPass(N);const D=()=>{const ne=i.clientWidth||1,de=i.clientHeight||1;s.setSize(ne,de),L.setSize(ne,de),N.resolution.set(ne,de),b.uScale.value=de*l/2,f.aspect=ne/de,f.updateProjectionMatrix()};D();const j=new ResizeObserver(D);j.observe(i);const H=ko.idle.core.clone(),z=ko.idle.edge.clone();let Y=0,U=0,w=0;const V=new gx,he=()=>{w=requestAnimationFrame(he);const ne=Math.min(V.getDelta(),1/30),de=V.elapsedTime,pe=Nt.speaker!=="idle";pe||Nt.decay(.9);for(let be=0;be<qn;be++)M[be]=Nt.bands[be];E.needsUpdate=!0;const B=pe?1:0,$=42,J=2*Math.sqrt($);U+=(B-Y)*$*ne-U*J*ne,Y+=U*ne;const Se=ko[Nt.speaker];H.lerp(Se.core,1-Math.pow(.001,ne)),z.lerp(Se.edge,1-Math.pow(.001,ne)),Nt.burst*=Math.pow(.05,ne),Nt.burst<.001&&(Nt.burst=0),b.uTime.value=de,b.uLevel.value=Nt.level,b.uSpread.value=Y,b.uBurst.value=Nt.burst,b.uCore.value.copy(H),b.uEdge.value.copy(z),N.strength=.42+Nt.level*.4+Nt.burst*.45,_.rotation.y+=ne*(.055+Nt.level*.1),_.rotation.x=Math.sin(de*.16)*.14,L.render()};return he(),()=>{cancelAnimationFrame(w),j.disconnect(),L.dispose(),N.dispose(),x.dispose(),y.dispose(),E.dispose(),s.dispose(),i.removeChild(s.domElement)}},[]),A.jsx("div",{ref:e,className:`pxs${r?` ${r}`:""}`,"aria-hidden":"true"})}let Yo={el:null,opacity:1};const el=new Set;function eu(r,e=1){Yo={el:r,opacity:e},el.forEach(i=>i())}function Ex(r){Yo.el===r&&(Yo={el:null,opacity:Yo.opacity},el.forEach(e=>e()))}function GC(){return Yo}function np(){el.forEach(r=>r())}function VC(r){return el.add(r),()=>el.delete(r)}const Xo=780,kC="transform 880ms cubic-bezier(0.33, 0, 0.15, 1), opacity 620ms ease",XC="transform 200ms ease-out, opacity 300ms ease";function jC(){const r=Z.useRef(null);return Z.useEffect(()=>{let e=0,i="",s=0,l=0,c=1,f="snap",h=0;const p=()=>{e=requestAnimationFrame(p);const M=r.current,{el:E,opacity:b}=GC();if(!M||!E)return;const y=E.getBoundingClientRect();if(!y.width)return;const _=y.width/Xo,L=y.left+y.width/2-Xo/2,N=y.top+y.height/2-Xo/2,D=`${L.toFixed(1)}|${N.toFixed(1)}|${_.toFixed(4)}|${b}`;if(D===i)return;i=D;const j=Math.abs(L-s)<26&&Math.abs(N-l)<26&&Math.abs(_-c)<.03;s=L,l=N,c=_,M.style.transition=f==="snap"?"none":j?XC:kC,M.style.transform=`translate3d(${L}px, ${N}px, 0) scale(${_})`,M.style.opacity=String(b)},m=window.matchMedia("(prefers-reduced-motion: reduce)"),v=()=>{m.matches||(f="glide",window.clearTimeout(h),h=window.setTimeout(()=>{f="snap"},1300))},g=()=>{f="snap",window.clearTimeout(h)},x=VC(v);return window.addEventListener("scroll",g,{passive:!0}),window.addEventListener("resize",g),p(),()=>{cancelAnimationFrame(e),window.clearTimeout(h),x(),window.removeEventListener("scroll",g),window.removeEventListener("resize",g)}},[]),A.jsx("div",{className:"sphere-layer",ref:r,style:{width:Xo,height:Xo},"aria-hidden":"true",children:A.jsx(HC,{className:"sphere-layer__canvas"})})}const Tp=[{id:"A",name:"Metadata-Aware Selective",description:"Full is_selected passage as a cohesive semantic unit with metadata tags.",threshold:"< 60 tokens",use_case:"Standard factoid queries (ENTITY, PERSON, LOCATION)"},{id:"B",name:"Parent-Child Hierarchical",description:"Sentence-level child chunks for high-precision embedding + full parent passage payload for LLM context.",threshold:"> 60 tokens OR DESCRIPTION query",use_case:"Descriptive and multi-sentence context questions"},{id:"C",name:"Script-Aware Sliding Window",description:"Overlapping windows of 128 tokens with 25% overlap snapped to Indic sentence delimiters (।, ॥).",threshold:"> 200 tokens",use_case:"Long narrative documents"},{id:"D",name:"Query-Type Adaptive Micro-Chunking",description:"Factoid-optimized micro spans prioritizing numbers and proper noun entities.",threshold:"< 40 tokens for NUMERIC/ENTITY",use_case:"High-precision numerical values, stats, and names"}],WC={stt:"Sarvam STT",input_guard:"Input Guardrails",session:"Session Context",retrieval:"Redis HNSW Search",output_guard:"Output Guardrail",llm_gen:"LLM Generation",groundedness:"Groundedness Check"},qC=["stt","input_guard","session","retrieval","output_guard","llm_gen","groundedness"];function jo(){return qC.map(r=>({id:r,label:WC[r],state:"pending"}))}const Tx=[{id:"pii",name:"PII redaction",scope:"input",detail:"Masks emails, phone numbers, card and government IDs before the query is embedded.",action:"redact",enabled:!0,hits:0},{id:"injection",name:"Prompt-injection screen",scope:"input",detail:"Detects imperative override language in user queries and blocks them.",action:"block",enabled:!0,hits:0},{id:"language",name:"Language validation",scope:"input",detail:"Ensures the query language is one of the 5 supported Indic languages or English.",action:"block",enabled:!0,hits:0},{id:"grounding",name:"Grounding check",scope:"output",detail:"Validates that the LLM answer is grounded in the retrieved passage with Indic numeral normalization.",action:"rewrite",enabled:!0,hits:0},{id:"confidence",name:"Confidence threshold",scope:"output",detail:"Abstains when the vector similarity score falls below the confidence floor.",action:"block",enabled:!0,hits:0},{id:"blocked_topics",name:"Blocked topics",scope:"input",detail:"Refuses queries that match harmful or off-topic content patterns.",action:"block",enabled:!0,hits:0}],YC=260,y0=[["01","Transcribe","saaras:v3-realtime over a WebSocket, mode=translate. Speech in Hindi, Marathi, Tamil or Sanskrit comes back as English text, so no separate translation hop sits between the voice and the index.",183],["02","Route","A rule ladder reads the query shape and picks the chunking strategy. The decision is logged, not hidden.",.1],["03","Retrieve","BM25 over the corpus, scoring each entry on its own question and its best passage. Sixty questions is small enough to search exhaustively.",.4],["04","Guard","Input, retrieval and output rails run in one pass. A question the corpus does not cover is refused, not guessed at.",.4],["05","Compose","The answer is looked up, not generated — the corpus ships gold answers in all four languages, so nothing can be invented.",.1],["06","Speak","Sentence-level TTS in the language the question was asked in.",0]];function ZC(){const r=Math.round(y0.reduce((g,x)=>g+x[3],0)),e=Z.useRef(null),i=uu(),[s,l]=Z.useState(!1),[c,f]=Z.useState(!1),[h,p]=Z.useState(null);Z.useEffect(()=>{const g=e.current;eu(g,.86);const x=requestAnimationFrame(()=>l(!0));return()=>{cancelAnimationFrame(x),Ex(g)}},[]);const m=g=>{var E;if(g.metaKey||g.ctrlKey||g.shiftKey||g.button!==0||(g.preventDefault(),c))return;f(!0),Nt.pulse(.72);const x=(E=e.current)==null?void 0:E.getBoundingClientRect();!!x&&x.bottom>40&&x.top<window.innerHeight-40?(np(),eu(e.current,1),p("go")):(p("park"),requestAnimationFrame(()=>requestAnimationFrame(()=>{np(),eu(e.current,1),p("go")}))),window.setTimeout(()=>i("/chat"),YC)},v=({children:g,className:x})=>A.jsx("a",{href:"/chat",className:x,onClick:m,children:g});return A.jsxs("div",{className:"lp","data-enter":s,"data-leaving":c,"data-orb":h??void 0,children:[A.jsxs("nav",{className:"nav",children:[A.jsxs("div",{className:"nav__mark",children:[A.jsx("span",{className:"nav__dot"}),"ZATPAT",A.jsx("span",{style:{color:"var(--ink-3)"},children:".AI"})]}),A.jsxs("div",{className:"nav__links",children:[A.jsx("a",{href:"#stack",children:"Stack"}),A.jsx("a",{href:"#routing",children:"Routing"}),A.jsx("a",{href:"#guardrails",children:"Guardrails"}),A.jsx("a",{href:"#specs",children:"Specs"})]}),A.jsx("div",{className:"nav__spacer"}),A.jsxs(v,{className:"btn-primary",children:["Open console ",A.jsx("span",{className:"arrow",children:"→"})]})]}),A.jsxs("header",{className:"hero",children:[A.jsx("div",{className:"hero__orb",ref:e}),A.jsxs("div",{className:"hero__inner",children:[A.jsx("div",{className:"hero__eyebrow",children:A.jsx("span",{className:"label",children:"Voice-native retrieval"})}),A.jsxs("h1",{children:["Ask in any",A.jsx("br",{}),"language.",A.jsx("br",{}),A.jsx("em",{children:"Answered in it."})]}),A.jsx("p",{className:"hero__sub",children:"A speech-in, speech-out retrieval system built for the part nobody demos: the milliseconds between the end of your sentence and the first syllable of the answer. Ask in Hindi, Marathi, Tamil or Sanskrit; Sarvam's saaras:v3-realtime translates as you speak, retrieval runs in under a millisecond, and the answer comes back in the language you asked it."}),A.jsxs("div",{className:"hero__cta",children:[A.jsxs(v,{className:"btn-primary",children:["Start speaking ",A.jsx("span",{className:"arrow",children:"→"})]}),A.jsx("a",{href:"#stack",className:"btn-ghost",children:"Read the stack"})]})]}),A.jsxs("div",{className:"hero__ticker",children:[A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Speech end → answer"}),A.jsxs("span",{className:"v",children:["184",A.jsx("small",{children:"ms"})]})]}),A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Retrieval"}),A.jsxs("span",{className:"v",children:["0.4",A.jsx("small",{children:"ms"})]})]}),A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Recall @1"}),A.jsxs("span",{className:"v",children:["100",A.jsx("small",{children:"%"})]})]}),A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Languages"}),A.jsxs("span",{className:"v",children:["05",A.jsx("small",{children:"spoken"})]})]})]})]}),A.jsx("section",{className:"sec",id:"stack",children:A.jsxs("div",{className:"sec__in",children:[A.jsxs("div",{className:"sec__head",children:[A.jsx("span",{className:"label",children:"§ 01 / Stack"}),A.jsxs("div",{children:[A.jsx("h2",{children:"Six stages, and a budget for each one."}),A.jsx("p",{children:"Latency in a voice system is not one number — it is a chain, and one slow link is audible. These are measurements, not budgets, taken from a real turn. One stage dominates completely: everything after transcription costs about a millisecond put together, which is what makes the target a question about speech, not about retrieval."})]})]}),A.jsxs("div",{className:"pipe",children:[y0.map(([g,x,M,E])=>A.jsxs("div",{className:"pipe__row",children:[A.jsx("span",{className:"label",children:g}),A.jsx("span",{className:"pipe__name",children:x}),A.jsx("span",{className:"pipe__desc",children:M}),A.jsxs("span",{className:"pipe__ms",children:[E,A.jsx("small",{children:" ms"})]})]},g)),A.jsxs("div",{className:"pipe__row",style:{borderBottom:0},children:[A.jsx("span",{className:"label",children:"Σ"}),A.jsx("span",{className:"pipe__name",style:{color:"var(--ink-0)"},children:"Budget"}),A.jsx("span",{className:"pipe__desc",style:{color:"var(--ink-3)"},children:"Measured end of speech to answer ready. Time spent speaking is not counted — that is your pace, not the system's."}),A.jsxs("span",{className:"pipe__ms",style:{color:"var(--blue-hi)"},children:[r,A.jsx("small",{children:" ms"})]})]})]})]})}),A.jsx("section",{className:"sec",id:"routing",children:A.jsxs("div",{className:"sec__in",children:[A.jsxs("div",{className:"sec__head",children:[A.jsx("span",{className:"label",children:"§ 02 / Routing"}),A.jsxs("div",{children:[A.jsx("h2",{children:"Chunking is routed, never chosen by hand."}),A.jsx("p",{children:"A comparison question and a date lookup want different indexes. Instead of asking the user to pick — or picking one strategy and living with it — the router reads the shape of the query and sends it to the index that suits it. Four strategies are indexed in parallel; the router selects based on passage length and query type."})]})]}),A.jsx("div",{className:"grid5",children:Tp.map(g=>A.jsxs("div",{className:"cell",children:[A.jsx("span",{className:"label",children:g.id}),A.jsx("h3",{children:g.name}),A.jsx("p",{children:g.description}),A.jsx("div",{className:"cell__bar",children:A.jsxs("div",{className:"cap",children:[A.jsx("span",{className:"label",children:g.threshold}),A.jsx("span",{className:"label",style:{color:"var(--ink-1)"},children:g.use_case})]})})]},g.id))})]})}),A.jsx("section",{className:"sec",id:"guardrails",children:A.jsxs("div",{className:"sec__in",children:[A.jsxs("div",{className:"sec__head",children:[A.jsx("span",{className:"label",children:"§ 03 / Guardrails"}),A.jsxs("div",{children:[A.jsx("h2",{children:"The rails run on the way in and on the way out."}),A.jsx("p",{children:"Retrieved text is untrusted input. These rails ship enabled by default, and the console lets you add your own — a pattern, a scope, an action — which then run in the same pass and report their hits in the trace."})]})]}),A.jsx("div",{className:"grails",children:Tx.map(g=>A.jsxs("div",{className:"grail",children:[A.jsx("span",{className:"grail__tick",children:g.enabled?"■":"□"}),A.jsxs("div",{children:[A.jsx("div",{className:"grail__name",children:g.name}),A.jsx("div",{className:"grail__detail",children:g.detail})]}),A.jsxs("span",{className:"tag",children:[g.scope," · ",g.action]})]},g.id))})]})}),A.jsx("section",{className:"sec",id:"specs",children:A.jsxs("div",{className:"sec__in",children:[A.jsxs("div",{className:"sec__head",children:[A.jsx("span",{className:"label",children:"§ 04 / Specs"}),A.jsx("div",{children:A.jsx("h2",{children:"What it is made of."})})]}),A.jsx("div",{className:"pipe",children:[["Speech","Sarvam saaras:v3-realtime, mode=translate","linear16 · 16 kHz mono"],["Languages","Hindi, Marathi, Tamil, Sanskrit, English","20 ms frames"],["Corpus","60 questions, 71 passages, gold answers ×4 languages","136 KB, fetched not bundled"],["Retrieval","BM25 over question and passage fields","k = 5 · 0.4 ms median"],["Answering","Looked up from the corpus, not generated","Nothing can be invented"],["Memory","Per-session turn buffer, no cross-session recall","Cleared on close"]].map(([g,x,M])=>A.jsxs("div",{className:"pipe__row",style:{gridTemplateColumns:"180px 1fr 240px"},children:[A.jsx("span",{className:"label",children:g}),A.jsx("span",{className:"pipe__desc",style:{color:"var(--ink-1)",fontSize:14},children:x}),A.jsx("span",{className:"pipe__ms",children:M})]},g))})]})}),A.jsxs("section",{className:"close",children:[A.jsx("h2",{children:"Press space. Start talking."}),A.jsx("p",{children:"The console runs in the browser. Grant the microphone, speak a sentence, and watch the shell open in blue while you talk and close in red while it answers."}),A.jsxs(v,{className:"btn-primary",children:["Open console ",A.jsx("span",{className:"arrow",children:"→"})]})]}),A.jsxs("footer",{className:"foot",children:[A.jsx("span",{className:"label",children:"Zatpat.ai — voice retrieval console"}),A.jsx("span",{className:"label",children:"Frontend preview · no backend attached"})]})]})}function bp({title:r,subtitle:e,onClose:i,children:s}){return Z.useEffect(()=>{const l=c=>{c.key==="Escape"&&(c.stopPropagation(),i())};return window.addEventListener("keydown",l,!0),()=>window.removeEventListener("keydown",l,!0)},[i]),A.jsxs("div",{className:"sheet",role:"dialog","aria-modal":"true","aria-label":r,children:[A.jsx("div",{className:"sheet__scrim",onClick:i}),A.jsxs("div",{className:"sheet__panel",children:[A.jsxs("div",{className:"sheet__head",children:[A.jsxs("div",{children:[A.jsx("h2",{children:r}),e&&A.jsx("p",{children:e})]}),A.jsx("button",{className:"sheet__x",onClick:i,children:"ESC"})]}),A.jsx("div",{className:"sheet__body",children:s})]})]})}function KC({rails:r,trace:e,onToggle:i,onAdd:s,onRemove:l,onClose:c}){const[f,h]=Z.useState(""),[p,m]=Z.useState("output"),[v,g]=Z.useState("flag"),x=()=>{const E=f.trim();E&&(s({id:`custom_${Date.now().toString(36)}`,name:E,scope:p,action:v,detail:`Custom rail. Runs on the ${p} pass; matches are handled by ${v}.`,enabled:!0,custom:!0,hits:0}),h(""))},M=r.filter(E=>E.enabled).length;return A.jsxs(bp,{title:"Guardrails",subtitle:"Input and output rails run on every query. Input guardrails check language, PII, injection, and blocked topics. Output guardrails verify confidence and groundedness.",onClose:c,children:[e&&e.guardHits.length>0&&A.jsxs("div",{className:"trace",children:[A.jsx("span",{className:"label",children:"Last turn — verdicts"}),A.jsx("div",{style:{marginTop:12,marginLeft:-24,marginRight:-24},children:e.guardHits.map(E=>A.jsxs("div",{className:"vd","data-pass":E.passed,children:[A.jsx("span",{className:"vd__m",children:E.passed?"✓":"■"}),A.jsx("span",{className:"vd__n",children:E.name}),A.jsx("span",{className:"vd__note",children:E.note??"passed"})]},E.railId))})]}),A.jsxs("div",{className:"compose",children:[A.jsx("span",{className:"label",children:"Add a rail"}),A.jsxs("div",{className:"compose__row",children:[A.jsxs("div",{className:"f",children:[A.jsx("span",{className:"label",children:"Name"}),A.jsx("input",{value:f,onChange:E=>h(E.target.value),onKeyDown:E=>E.key==="Enter"&&x(),placeholder:"e.g. no competitor names"})]}),A.jsxs("div",{className:"f",children:[A.jsx("span",{className:"label",children:"Scope"}),A.jsxs("select",{value:p,onChange:E=>m(E.target.value),children:[A.jsx("option",{value:"input",children:"input"}),A.jsx("option",{value:"retrieval",children:"retrieval"}),A.jsx("option",{value:"output",children:"output"})]})]}),A.jsxs("div",{className:"f",children:[A.jsx("span",{className:"label",children:"Action"}),A.jsxs("select",{value:v,onChange:E=>g(E.target.value),children:[A.jsx("option",{value:"flag",children:"flag"}),A.jsx("option",{value:"redact",children:"redact"}),A.jsx("option",{value:"rewrite",children:"rewrite"}),A.jsx("option",{value:"block",children:"block"})]})]}),A.jsx("button",{className:"btn-sq",onClick:x,disabled:!f.trim(),children:"Add"})]})]}),A.jsxs("div",{style:{padding:"20px 24px 8px",display:"flex",justifyContent:"space-between"},children:[A.jsx("span",{className:"label",children:"Active rails"}),A.jsxs("span",{className:"label",style:{color:"var(--ink-1)"},children:[M," / ",r.length]})]}),r.map(E=>A.jsxs("div",{className:"grow",children:[A.jsx("button",{className:"tog","data-on":E.enabled,onClick:()=>i(E.id),"aria-label":`${E.enabled?"Disable":"Enable"} ${E.name}`,children:A.jsx("i",{})}),A.jsxs("div",{children:[A.jsxs("h3",{children:[E.name,E.custom&&A.jsx("span",{className:"pill",style:{marginLeft:10},children:"Custom"})]}),A.jsx("p",{children:E.detail})]}),A.jsxs("div",{className:"grow__meta",children:[A.jsxs("span",{className:"tag",children:[E.scope," · ",E.action]}),A.jsxs("span",{className:"hits",children:[E.hits," HIT",E.hits===1?"":"S"]}),E.custom&&A.jsx("button",{className:"hits",style:{color:"var(--red-hi)"},onClick:()=>l(E.id),children:"REMOVE"})]})]},E.id))]})}const M0=200,QC={hi:"हिन्दी",mr:"मराठी",ta:"தமிழ்",sa:"संस्कृतम्",en:"English",auto:"Auto"},JC=["input_guard","session","retrieval","output_guard"];function $C({stages:r,trace:e,previousTotal:i,onOpen:s}){const l=r.filter(g=>JC.includes(g.id)),c=l.filter(g=>g.ms!=null),f=c.reduce((g,x)=>g+(x.ms??0),0),h=Math.round(f*100)/100,p=Math.max(1,...c.map(g=>g.ms??0)),m=i!=null&&h>0?Math.round((h-i)*100)/100:null,v=h>0?Math.round((h-M0)*100)/100:null;return A.jsxs("aside",{className:"lat",children:[A.jsxs("div",{className:"lat__head",children:[A.jsx("span",{className:"label",children:"RAG Latency"}),A.jsx("button",{className:"cs__tab",onClick:s,disabled:!e,children:"Trace"})]}),A.jsxs("div",{children:[A.jsxs("div",{className:"lat__total",children:[A.jsx("span",{className:"label",children:"Core RAG Pipeline"}),A.jsxs("div",{className:"lat__big",style:{marginTop:10},children:[h>0?h.toLocaleString():A.jsx("span",{style:{color:"var(--ink-3)"},children:"—"}),A.jsx("small",{children:"ms"})]}),A.jsxs("div",{className:"lat__delta","data-good":v==null?void 0:v<=0,children:[v==null?`BUDGET ${M0} MS`:`${v<=0?"▼":"▲"} ${Math.abs(v)} MS VS BUDGET`,m!=null&&m!==0&&A.jsxs("span",{style:{color:"var(--ink-3)",marginLeft:10},children:[m>0?"+":"",m," vs last"]})]})]}),A.jsx("div",{className:"lat__list",children:l.map(g=>{const x=g.ms??0,M=x>p*.7&&g.state==="done";return A.jsxs("div",{className:"st","data-state":g.state,"data-hot":M,children:[A.jsx("span",{className:"st__name",children:g.label}),A.jsx("span",{className:"st__ms",children:g.ms!=null?`${g.ms}`:g.state==="running"?"···":"—"}),A.jsx("div",{className:"st__bar",children:A.jsx("div",{className:"st__fill",style:{width:g.state==="running"?"100%":`${x/p*100}%`}})})]},g.id)})})]}),A.jsxs("div",{className:"lat__foot",children:[A.jsxs("div",{className:"kv",children:[A.jsx("span",{className:"label",children:"Grounded"}),A.jsx("b",{style:{color:e!=null&&e.grounded?"var(--green-hi, #4caf50)":"var(--red-hi, #f44336)"},children:e?e.grounded?"✔ Yes":"✗ No":"—"})]}),A.jsxs("div",{className:"kv",children:[A.jsx("span",{className:"label",children:"Language"}),A.jsx("b",{children:e!=null&&e.lang?QC[e.lang.split("-")[0]]??e.lang:"—"})]}),A.jsxs("div",{className:"kv",children:[A.jsx("span",{className:"label",children:"Top score"}),A.jsx("b",{children:e?e.topScore.toFixed(4):"—"})]}),A.jsxs("div",{className:"kv",children:[A.jsx("span",{className:"label",children:"Passages"}),A.jsx("b",{children:e?e.passagesCount:"—"})]})]})]})}function ew({phase:r,onToggle:e,disabled:i}){const s=Z.useRef(null);Z.useEffect(()=>{let c=0,f=0;const h=()=>{c=requestAnimationFrame(h),f+=(Nt.level-f)*.2;const p=s.current;p&&(p.style.transform=`scale(${(1+f*.42).toFixed(4)})`,p.style.opacity=String(.14+f*.55))};return h(),()=>cancelAnimationFrame(c)},[]);const l=r==="listening"?"Stop recording":r==="speaking"?"Interrupt agent":"Start recording";return A.jsxs("button",{className:"rec","data-phase":r,onClick:e,disabled:i,"aria-label":l,title:l,style:{color:r==="speaking"?"var(--red)":"var(--blue)"},children:[A.jsx("span",{className:"rec__ring",ref:s}),A.jsx("span",{className:"rec__core"})]})}function tw({strategies:r,trace:e,onClose:i}){var s;return A.jsxs(bp,{title:"Chunking & retrieval",subtitle:"Four strategies are indexed in parallel. The router selects one based on passage length and query type — the decision is shown, not configurable.",onClose:i,children:[e&&A.jsxs("div",{className:"trace",children:[A.jsx("span",{className:"label",children:"Last routing decision"}),A.jsxs("div",{style:{marginTop:10,fontSize:14,color:"var(--ink-1)",lineHeight:1.6},children:["Strategy"," ",A.jsx("b",{style:{color:"var(--blue-hi)",fontWeight:500},children:((s=r.find(l=>l.id===e.strategy))==null?void 0:s.name)??e.strategy}),e.queryType&&A.jsxs(A.Fragment,{children:[" ","· Query type"," ",A.jsx("b",{style:{color:"var(--ink-0)",fontWeight:500},children:e.queryType})]})]})]}),e&&e.topPassageSample&&A.jsxs(A.Fragment,{children:[A.jsx("div",{style:{padding:"18px 24px 8px"},children:A.jsx("span",{className:"label",children:"Top passage preview"})}),A.jsx("div",{style:{padding:"0 24px 16px",fontSize:12.5,color:"var(--ink-2)",lineHeight:1.6,fontFamily:"var(--mono)"},children:e.topPassageSample})]}),A.jsx("div",{style:{padding:"24px 24px 8px"},children:A.jsx("span",{className:"label",children:"Strategy catalogue"})}),r.map(l=>A.jsxs("div",{className:"srow","data-active":(e==null?void 0:e.strategy)===l.id,children:[A.jsxs("div",{children:[A.jsxs("h3",{children:[l.id,". ",l.name,(e==null?void 0:e.strategy)===l.id&&A.jsx("span",{className:"pill",children:"Routed"})]}),A.jsx("p",{children:l.description}),A.jsxs("div",{className:"srow__best",children:["Best for — ",l.use_case]})]}),A.jsx("div",{className:"srow__meta",children:A.jsxs("div",{className:"kv",children:[A.jsx("span",{className:"label",children:"Threshold"}),A.jsx("b",{style:{fontFamily:"var(--mono)",fontSize:11,color:"var(--ink-1)"},children:l.threshold})]})})]},l.id))]})}function nw({trace:r,onClose:e}){var s,l;const i=Math.max(1,...r.stages.map(c=>c.ms??0));return A.jsxs(bp,{title:"Turn trace",subtitle:"Where the milliseconds went, which strategy was routed, and what the guardrails decided.",onClose:e,children:[A.jsx("div",{className:"trace",children:A.jsxs("div",{className:"trace__grid",style:{marginTop:0},children:[A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"End to end"}),A.jsxs("span",{className:"v",children:[r.totalMs,A.jsx("small",{style:{fontSize:11,color:"var(--ink-3)"},children:" ms"})]})]}),A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Strategy"}),A.jsx("span",{className:"v",style:{fontSize:14},children:((s=Tp.find(c=>c.id===r.strategy))==null?void 0:s.name)??r.strategy})]}),A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Query type"}),A.jsx("span",{className:"v",style:{fontSize:14},children:r.queryType||"—"})]}),A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Grounded"}),A.jsxs("span",{className:"v",style:{fontSize:14,color:r.grounded?"var(--green-hi, #4caf50)":"var(--red-hi, #f44336)"},children:[r.grounded?"✔":"✗"," ",(r.groundednessScore*100).toFixed(0),"%"]})]})]})}),A.jsx("div",{style:{padding:"20px 24px 8px"},children:A.jsx("span",{className:"label",children:"Stage breakdown"})}),r.stages.map(c=>A.jsxs("div",{className:"st","data-state":c.state,style:{padding:"9px 24px 10px"},children:[A.jsx("span",{className:"st__name",style:{fontSize:12},children:c.label}),A.jsx("span",{className:"st__ms",children:c.ms!=null?`${c.ms}`:"—"}),A.jsx("div",{className:"st__bar",children:A.jsx("div",{className:"st__fill",style:{width:`${(c.ms??0)/i*100}%`}})})]},c.id)),r.topPassageSample&&A.jsxs(A.Fragment,{children:[A.jsx("div",{style:{padding:"26px 24px 8px"},children:A.jsx("span",{className:"label",children:"Top passage preview"})}),A.jsx("div",{style:{padding:"0 24px 16px",fontSize:13,color:"var(--ink-2)",lineHeight:1.6,fontFamily:"var(--mono)"},children:r.topPassageSample})]}),A.jsx("div",{style:{padding:"26px 24px 8px"},children:A.jsx("span",{className:"label",children:"Metrics"})}),A.jsx("div",{className:"trace",style:{marginTop:0},children:A.jsxs("div",{className:"trace__grid",style:{marginTop:0},children:[A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Top score"}),A.jsx("span",{className:"v",children:r.topScore.toFixed(4)})]}),A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Passages"}),A.jsx("span",{className:"v",children:r.passagesCount})]}),A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Tok/s"}),A.jsx("span",{className:"v",children:r.tokensPerSec.toFixed(1)})]}),A.jsxs("div",{children:[A.jsx("span",{className:"label",children:"Session"}),A.jsx("span",{className:"v",style:{fontSize:11,fontFamily:"var(--mono)"},children:((l=r.sessionId)==null?void 0:l.slice(0,12))??"—"})]})]})}),r.guardHits.length>0&&A.jsxs(A.Fragment,{children:[A.jsx("div",{style:{padding:"26px 24px 8px"},children:A.jsx("span",{className:"label",children:"Guardrail verdicts"})}),r.guardHits.map(c=>A.jsxs("div",{className:"vd","data-pass":c.passed,children:[A.jsx("span",{className:"vd__m",children:c.passed?"✓":"■"}),A.jsx("span",{className:"vd__n",children:c.name}),A.jsx("span",{className:"vd__note",children:c.note??"passed"})]},c.railId))]})]})}const iw=r=>new Date(r).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});function aw({messages:r,selectedId:e,onSelect:i,onClear:s}){var f;const l=Z.useRef(null);Z.useEffect(()=>{const h=l.current;h&&(h.scrollTop=h.scrollHeight)},[r.length,(f=r[r.length-1])==null?void 0:f.text]);const c=r.filter(h=>h.role==="user").length;return A.jsxs("aside",{className:"rail",children:[A.jsxs("div",{className:"rail__head",children:[A.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[A.jsx("span",{className:"label",style:{color:"var(--ink-0)",fontWeight:600},children:"Chat History"}),c>0&&A.jsxs("span",{style:{fontSize:10,padding:"1px 6px",borderRadius:10,background:"rgba(255,255,255,0.08)",color:"var(--ink-2)",fontFamily:"var(--mono)"},children:[c," ",c===1?"turn":"turns"]})]}),A.jsx("button",{className:"cs__tab",onClick:s,disabled:!r.length,children:"Clear"})]}),A.jsx("div",{className:"rail__scroll",ref:l,style:{padding:"12px 14px"},children:r.length?A.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:r.map(h=>{const p=h.role==="user",m=h.id===e;return A.jsxs("div",{onClick:()=>i(h),style:{display:"flex",flexDirection:"column",alignSelf:p?"flex-end":"flex-start",maxWidth:"92%",cursor:"pointer"},children:[A.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:4,alignSelf:p?"flex-end":"flex-start"},children:[A.jsx("span",{style:{fontSize:10,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:p?"var(--blue-hi, #60a5fa)":"var(--red-hi, #f87171)",fontFamily:"var(--mono)"},children:p?"You":"Zatpat AI"}),A.jsx("span",{style:{fontSize:9,color:"var(--ink-3)",fontFamily:"var(--mono)"},children:iw(h.at)})]}),A.jsx("div",{style:{padding:"10px 13px",borderRadius:p?"12px 12px 2px 12px":"12px 12px 12px 2px",background:p?"rgba(37, 99, 235, 0.15)":m?"rgba(255, 255, 255, 0.08)":"rgba(255, 255, 255, 0.04)",border:p?"1px solid rgba(59, 130, 246, 0.3)":m?"1px solid rgba(255, 255, 255, 0.18)":"1px solid rgba(255, 255, 255, 0.06)",color:"var(--ink-0, #f3f4f6)",fontSize:13,lineHeight:1.6,wordBreak:"break-word",whiteSpace:"pre-wrap",boxShadow:m?"0 0 12px rgba(0,0,0,0.4)":"none",transition:"all 0.15s ease"},children:h.text})]},h.id)})}):A.jsxs("div",{className:"rail__empty",style:{textAlign:"center",padding:"60px 12px"},children:[A.jsx("div",{style:{fontSize:20,marginBottom:8,opacity:.4},children:"💬"}),A.jsx("p",{style:{margin:0,color:"var(--ink-2)",fontSize:13},children:"No messages yet"}),A.jsx("p",{style:{margin:"6px 0 0",color:"var(--ink-3)",fontSize:11,lineHeight:1.5},children:"Ask a question by typing below or holding space to talk."})]})}),A.jsxs("div",{className:"rail__foot",style:{padding:"10px 14px"},children:[A.jsx("span",{className:"label",children:"Session Active"}),A.jsxs("span",{className:"label",style:{color:"var(--ink-1)"},children:[r.length," msgs"]})]})]})}const sw=Array.from({length:qn},(r,e)=>{const i=e/(qn-1);return Math.pow(Math.sin(Math.PI*Math.pow(i,.62)),1.15)*(1-i*.45)+.06});class rw{constructor(e={}){Et(this,"raf",0);Et(this,"envelope",0);Et(this,"pulseAt",0);Et(this,"phase",0);Et(this,"opts");Et(this,"speaking",!1);Et(this,"loop",()=>{if(!this.speaking)return;this.raf=requestAnimationFrame(this.loop);const i=performance.now()-this.pulseAt,s=Math.exp(-i/260)*(1-Math.exp(-i/22));this.envelope+=(s-this.envelope)*.35,this.phase+=.055;const l=Math.min(1,.16+this.envelope*.62);Nt.level+=(l-Nt.level)*.22;for(let c=0;c<qn;c++){const f=.5+.5*Math.sin(this.phase*(1+c*.17)+c*2.1)*.7+.5*Math.sin(this.phase*(.61+c*.09)+c*5.3)*.3,h=Math.min(1,sw[c]*(.1+this.envelope*.78)*(.5+f*.7)),p=Nt.bands[c];Nt.bands[c]=h>p?p+(h-p)*.5:p+(h-p)*.14}});this.opts=e}speak(e,i="en"){var c,f;if(this.cancel(),Nt.speaker="agent",this.speaking=!0,(f=(c=this.opts).onStart)==null||f.call(c),this.pulseAt=performance.now(),this.loop(),!("speechSynthesis"in window)){const h=Math.max(1400,e.length*52);setTimeout(()=>this.finish(),h);return}const s=new SpeechSynthesisUtterance(e);s.rate=1.04,s.pitch=.94,s.volume=1;const l=lw(i);l&&(s.voice=l),l&&(s.lang=l.lang),s.onboundary=h=>{var p,m;this.pulseAt=performance.now(),(m=(p=this.opts).onWord)==null||m.call(p,h.charIndex,h.charLength||0)},s.onend=()=>this.finish(),s.onerror=()=>this.finish(),window.speechSynthesis.speak(s)}finish(){var e,i;this.speaking=!1,cancelAnimationFrame(this.raf),this.raf=0,Nt.speaker==="agent"&&(Nt.speaker="idle"),(i=(e=this.opts).onEnd)==null||i.call(e)}cancel(){"speechSynthesis"in window&&window.speechSynthesis.cancel(),this.speaking&&this.finish()}}const ow={hi:["hi-IN"],mr:["mr-IN","hi-IN"],sa:["sa-IN","hi-IN"],ta:["ta-IN"],en:["en-IN","en-GB","en-US","en"]},ud=new Map;function lw(r){const e=r.split("-")[0].toLowerCase();if(ud.has(e))return ud.get(e)??null;const i=window.speechSynthesis.getVoices();if(!i.length)return null;let s=null;for(const l of ow[e]??[e])if(s=i.find(c=>c.lang.replace("_","-").toLowerCase().startsWith(l.toLowerCase()))??null,s)break;return s??(s=i.find(l=>l.lang.startsWith("en"))??i[0]??null),ud.set(e,s),s}const ip=16e3,cw="/sarvam/speech-to-text-realtime/ws";class uw{constructor(e={}){Et(this,"ws",null);Et(this,"opts");Et(this,"ping",0);Et(this,"closing",!1);Et(this,"pending",[]);this.opts=e}get ready(){var e;return((e=this.ws)==null?void 0:e.readyState)===WebSocket.OPEN}connect(e){if(this.ws)return;this.closing=!1;const i=this.opts.url??cw,s=i.startsWith("ws")?new URL(i):new URL(i,window.location.origin.replace(/^http/,"ws")),l=s.searchParams;l.set("model","saaras:v3-realtime"),l.set("mode",this.opts.mode??"translate"),l.set("language_code",e??this.opts.languageCode??"auto"),l.set("encoding","linear16"),l.set("sample_rate",String(ip)),l.set("stream_type",this.opts.streamType??"fast"),l.set("endpointing","vad"),l.set("silence_duration_ms",String(this.opts.silenceDurationMs??500)),l.set("min_speech_duration_ms",String(this.opts.minSpeechDurationMs??250));const c=new WebSocket(s.toString());c.binaryType="arraybuffer",this.ws=c,c.onopen=()=>{var f,h;(h=(f=this.opts).onOpen)==null||h.call(f);for(const p of this.pending)this.sendAudio(p);this.pending=[],this.ping=window.setInterval(()=>this.send({event:"ping"}),15e3)},c.onmessage=f=>{let h;try{h=JSON.parse(typeof f.data=="string"?f.data:new TextDecoder().decode(f.data))}catch{return}this.handle(h)},c.onerror=()=>{var f,h;this.closing||(h=(f=this.opts).onError)==null||h.call(f,"Realtime connection failed.",!0)},c.onclose=()=>{var f,h;window.clearInterval(this.ping),this.ping=0,this.ws=null,(h=(f=this.opts).onClose)==null||h.call(f,this.closing)}}handle(e){var i,s,l,c,f,h,p,m,v,g;switch(e.event){case"transcript.partial":(s=(i=this.opts).onPartial)==null||s.call(i,e.text,e.utterance_idx);break;case"transcript.final":(c=(l=this.opts).onFinal)==null||c.call(l,e.text,e.language,e.utterance_idx);break;case"vad.speech_start":(h=(f=this.opts).onSpeechStart)==null||h.call(f);break;case"vad.speech_end":(m=(p=this.opts).onSpeechEnd)==null||m.call(p);break;case"error":(g=(v=this.opts).onError)==null||g.call(v,e.message,e.is_fatal);break}}send(e){var i;((i=this.ws)==null?void 0:i.readyState)===WebSocket.OPEN&&this.ws.send(JSON.stringify(e))}pushPcm(e){var s;const i=fw(new Uint8Array(e));((s=this.ws)==null?void 0:s.readyState)===WebSocket.OPEN?this.sendAudio(i):this.pending.length<200&&this.pending.push(i)}sendAudio(e){this.send({event:"audio_input",audio:e})}close(){var e,i;this.closing=!0,this.pending=[],((e=this.ws)==null?void 0:e.readyState)===WebSocket.OPEN&&this.send({event:"end"}),(i=this.ws)==null||i.close()}}function fw(r){let e="";for(let s=0;s<r.length;s+=32768)e+=String.fromCharCode(...r.subarray(s,s+32768));return btoa(e)}const hw=1100,dw=.02,pw=.012;class mw{constructor(e={}){Et(this,"ctx",null);Et(this,"stream",null);Et(this,"analyser",null);Et(this,"worklet",null);Et(this,"scriptNode",null);Et(this,"freq",new Uint8Array(0));Et(this,"time",new Float32Array(0));Et(this,"raf",0);Et(this,"hasSpoken",!1);Et(this,"silenceSince",0);Et(this,"opts");Et(this,"state","idle");Et(this,"edges",[]);Et(this,"loop",()=>{var f,h,p,m;const e=this.analyser;if(!e)return;this.raf=requestAnimationFrame(this.loop),e.getByteFrequencyData(this.freq),e.getFloatTimeDomainData(this.time);let i=0;for(let v=0;v<this.time.length;v++)i+=this.time[v]*this.time[v];const s=Math.sqrt(i/this.time.length);for(let v=0;v<qn;v++){const g=this.edges[v],x=Math.max(this.edges[v+1],g+1);let M=0;for(let y=g;y<x;y++)this.freq[y]>M&&(M=this.freq[y]);const E=Math.pow(M/255,1.35),b=Nt.bands[v];Nt.bands[v]=E>b?b+(E-b)*.55:b+(E-b)*.12}const l=Math.min(1,s*9);Nt.level+=(l-Nt.level)*(l>Nt.level?.5:.09);const c=performance.now();s>dw?(this.hasSpoken||(this.hasSpoken=!0,(h=(f=this.opts).onSpeechStart)==null||h.call(f)),this.silenceSince=0):s<pw&&this.hasSpoken&&this.opts.localVad!==!1&&(this.silenceSince===0?this.silenceSince=c:c-this.silenceSince>hw&&((m=(p=this.opts).onUtteranceEnd)==null||m.call(p),this.stop()))});this.opts=e}setState(e){var i,s;this.state=e,(s=(i=this.opts).onState)==null||s.call(i,e)}async start(){var s;if(this.state==="live"||this.state==="requesting")return;if(!((s=navigator.mediaDevices)!=null&&s.getUserMedia)){this.setState("unsupported");return}this.setState("requesting");try{this.stream=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:ip,channelCount:1,echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}})}catch{this.setState("denied");return}this.ctx=new AudioContext({sampleRate:ip}),await this.ctx.resume();const e=this.ctx.createMediaStreamSource(this.stream),i=this.ctx.createAnalyser();if(i.fftSize=2048,i.smoothingTimeConstant=.72,i.minDecibels=-92,i.maxDecibels=-18,e.connect(i),this.analyser=i,this.freq=new Uint8Array(i.frequencyBinCount),this.time=new Float32Array(i.fftSize),this.edges=gw(i.frequencyBinCount,this.ctx.sampleRate),this.opts.onPcm){let l=!1;try{await this.ctx.audioWorklet.addModule("/pcm-worklet.js");const c=new AudioWorkletNode(this.ctx,"pcm",{numberOfInputs:1,numberOfOutputs:0,processorOptions:{frame:320}});c.port.onmessage=f=>{var h,p;return(p=(h=this.opts).onPcm)==null?void 0:p.call(h,f.data)},e.connect(c),this.worklet=c,l=!0}catch{l=!1}if(!l){const c=this.ctx.createScriptProcessor(2048,1,1);c.onaudioprocess=f=>{var m,v;const h=f.inputBuffer.getChannelData(0),p=new Int16Array(h.length);for(let g=0;g<h.length;g++){const x=Math.max(-1,Math.min(1,h[g]));p[g]=x<0?x*32768:x*32767}(v=(m=this.opts).onPcm)==null||v.call(m,p.buffer)},e.connect(c),c.connect(this.ctx.destination),this.scriptNode=c}}this.hasSpoken=!1,this.silenceSince=0,Nt.speaker="user",this.setState("live"),this.loop()}stop(){var e,i,s,l,c;cancelAnimationFrame(this.raf),this.raf=0,this.analyser=null,(e=this.worklet)==null||e.port.close(),(i=this.worklet)==null||i.disconnect(),this.worklet=null,(s=this.scriptNode)==null||s.disconnect(),this.scriptNode=null,(l=this.stream)==null||l.getTracks().forEach(f=>f.stop()),this.stream=null,(c=this.ctx)==null||c.close().catch(()=>{}),this.ctx=null,this.hasSpoken=!1,this.state!=="denied"&&this.state!=="unsupported"&&this.setState("idle"),Nt.speaker==="user"&&(Nt.speaker="idle")}}function gw(r,e){const i=e/2,s=60,l=Math.min(11e3,i),c=[];for(let f=0;f<=qn;f++){const h=s*Math.pow(l/s,f/qn);c.push(Math.min(r-1,Math.round(h/i*r)))}return c}const vw="ws://localhost:8000/ws/chat";class _w{constructor(e){Et(this,"ws",null);Et(this,"callbacks");Et(this,"reconnectTimer",null);Et(this,"alive",!0);this.callbacks=e}connect(){var e;if(((e=this.ws)==null?void 0:e.readyState)!==WebSocket.OPEN){try{this.ws=new WebSocket(vw)}catch{this.scheduleReconnect();return}this.ws.onopen=()=>{var i,s;(s=(i=this.callbacks).onConnect)==null||s.call(i)},this.ws.onclose=()=>{var i,s;(s=(i=this.callbacks).onDisconnect)==null||s.call(i),this.alive&&this.scheduleReconnect()},this.ws.onerror=()=>{},this.ws.onmessage=i=>{var s,l,c,f,h,p,m,v,g,x,M,E,b,y;try{const _=JSON.parse(i.data);switch(_.type){case"stt":(l=(s=this.callbacks).onSTT)==null||l.call(s,_);break;case"retrieval":(f=(c=this.callbacks).onRetrieval)==null||f.call(c,_);break;case"token":(p=(h=this.callbacks).onToken)==null||p.call(h,_.text);break;case"telemetry":(v=(m=this.callbacks).onTelemetry)==null||v.call(m,_.timings,_.tokens_per_sec??0);break;case"done":(x=(g=this.callbacks).onDone)==null||x.call(g,_);break;case"blocked":case"abstained":(E=(M=this.callbacks).onBlocked)==null||E.call(M,_);break;case"error":(y=(b=this.callbacks).onError)==null||y.call(b,_.error);break}}catch{}}}}sendQuery(e,i,s){!this.ws||this.ws.readyState!==WebSocket.OPEN||this.ws.send(JSON.stringify({query:e,lang:i,session_id:s,english_query:e}))}sendAudio(e){!this.ws||this.ws.readyState!==WebSocket.OPEN||this.ws.send(e)}get connected(){var e;return((e=this.ws)==null?void 0:e.readyState)===WebSocket.OPEN}close(){var e;this.alive=!1,this.reconnectTimer&&clearTimeout(this.reconnectTimer),(e=this.ws)==null||e.close(),this.ws=null}scheduleReconnect(){this.reconnectTimer||(this.reconnectTimer=setTimeout(()=>{this.reconnectTimer=null,this.alive&&this.connect()},2e3))}}const Wo=()=>Math.random().toString(36).slice(2,10),xw=290;function E0(r){return/[\u0B80-\u0BFF]/.test(r)?"ta":/[\u0900-\u097F]/.test(r)?/[ळ]|(\b(आहे|नाही|काय|कसे|आणि|यांचा|यांचे|मध्ये|कधी|कोण|होते|होती|सांगा)\b)/.test(r)?"mr":/\b(अस्ति|भवति|सङ्ग्रह|इति|किम्|कुत्र|कदा|यत्र|तत्र)\b/.test(r)?"sa":"hi":"en"}function T0(r,e){if(r==="auto"||!r)return"auto";const i=r.split("-")[0].toLowerCase();return["hi","mr","ta","sa","en"].includes(i)?i:"auto"}function Sw(){const[r,e]=Z.useState("idle"),[i,s]=Z.useState("idle"),[l,c]=Z.useState([]),[f,h]=Z.useState(jo()),[p,m]=Z.useState(null),[v,g]=Z.useState(null),[x,M]=Z.useState(Tx),[E]=Z.useState(Tp),[b,y]=Z.useState(null),[_,L]=Z.useState(null),[N,D]=Z.useState(""),[j,H]=Z.useState(""),[z,Y]=Z.useState({index:0,length:0}),[U,w]=Z.useState(""),[V,he]=Z.useState(null),[ne,de]=Z.useState(!1),[pe,B]=Z.useState("auto"),[$,J]=Z.useState(!1),[Se,be]=Z.useState(!1),P=Z.useRef(null),re=uu(),ye=Z.useRef(null),K=Z.useRef(null),me=Z.useRef(null),Re=Z.useRef(null),Ee=Z.useRef("session_"+Wo()),Oe=Z.useRef("idle"),qe=Z.useRef(pe),Qe=Z.useRef([]),Ot=Z.useRef(()=>{}),Ct=Z.useRef(""),mt=Z.useRef(null),I=Z.useRef({}),Qt=Z.useRef(0),dt=Z.useRef("auto");Oe.current=r,qe.current=pe,Qe.current=l,Z.useEffect(()=>{const G=P.current;eu(G,1);const ee=requestAnimationFrame(()=>requestAnimationFrame(()=>J(!0)));return()=>{cancelAnimationFrame(ee),Ex(G)}},[]);const zt=G=>{var ee,ue,k;G.metaKey||G.ctrlKey||G.shiftKey||G.button!==0||(G.preventDefault(),!Se&&(np(),be(!0),(ee=me.current)==null||ee.cancel(),(ue=ye.current)==null||ue.stop(),(k=K.current)==null||k.close(),Nt.pulse(.72),window.setTimeout(()=>re("/"),xw)))},je=Z.useCallback((G,ee)=>{var De;const ue=G.trim();if(!ue){e("idle");return}if(!((De=Re.current)!=null&&De.connected)){he("Backend not connected. Make sure server is running on :8000."),e("idle");return}const k=ee||(qe.current==="auto"?E0(ue):T0(qe.current));dt.current=k,c(Ce=>[...Ce,{id:Wo(),role:"user",text:ue,at:Date.now(),lang:k}]),D(""),H(""),Ct.current="",mt.current=null,I.current={},Qt.current=0,Y({index:0,length:0}),e("thinking"),h(jo()),Re.current.sendQuery(ue,k,Ee.current)},[]);Ot.current=je,Z.useEffect(()=>()=>void 0,[]),Z.useEffect(()=>{const G=new _w({onConnect:()=>{de(!0),he(null)},onDisconnect:()=>{de(!1)},onSTT:ee=>{const ue=ee.native_query||ee.english_query;D(ue),dt.current=ee.detected_lang||"en",h(k=>k.map(De=>De.id==="stt"?{...De,ms:ee.stt_latency_ms,state:"done"}:De))},onRetrieval:ee=>{mt.current=ee,h(ue=>ue.map(k=>k.id==="input_guard"?{...k,ms:0,state:"done"}:k.id==="session"?{...k,ms:0,state:"done"}:k.id==="retrieval"?{...k,ms:ee.retrieval_ms,state:"done"}:k))},onToken:ee=>{Ct.current+=ee,H(Ct.current),h(ue=>ue.map(k=>k.id==="llm_gen"&&k.state!=="done"?{...k,state:"running"}:k))},onTelemetry:(ee,ue)=>{I.current=ee,Qt.current=ue,h(k=>k.map(De=>{const Ce=fd(De.id);return Ce&&ee[Ce]!==void 0?{...De,ms:Math.round(ee[Ce]*100)/100,state:"done"}:De}))},onDone:ee=>{var Ge;const ue=ee.full_answer||Ct.current,k=mt.current,De=I.current,Ce=jo().map(Ue=>{const tt=fd(Ue.id);return tt&&De[tt]!==void 0?{...Ue,ms:Math.round(De[tt]*100)/100,state:"done"}:{...Ue,state:"done",ms:0}}),Fe=Math.round(((De.input_guardrail_ms??0)+(De.session_load_ms??0)+(De.retrieval_ms??0)+(De.output_guardrail_ms??0))*100)/100,ke=ee.lang||dt.current||T0(qe.current),Me={stages:Ce,totalMs:Fe>0?Fe:Math.round(ee.total_ms),lang:ke,utteranceMs:0,grounded:ee.is_grounded,groundednessScore:ee.groundedness_score,topScore:(k==null?void 0:k.top_score)??0,strategy:(k==null?void 0:k.strategy)??"A",passagesCount:(k==null?void 0:k.passages_count)??0,queryType:(k==null?void 0:k.query_type)??"",topPassageSample:(k==null?void 0:k.top_passage_sample)??"",k:(k==null?void 0:k.passages_count)??0,chunks:[],guardHits:[],tokensPerSec:Qt.current,sessionId:ee.session_id};g(Ue=>p?p.totalMs:Ue),m(Me),h(Ce);const Ne=Wo();c(Ue=>[...Ue,{id:Ne,role:"agent",text:ue,at:Date.now(),lang:ke,trace:Me}]),L(Ne),H(ue),e("speaking");const Ze=ke==="en"?"en-IN":`${ke}-IN`;(Ge=me.current)==null||Ge.speak(ue,Ze)},onBlocked:ee=>{const ue=ee.message||"Query blocked by guardrails.";H(ue);const k=Wo();c(De=>[...De,{id:k,role:"agent",text:ue,at:Date.now()}]),L(k),e("idle"),ee.timings&&h(De=>De.map(Ce=>{const Fe=fd(Ce.id);return Fe&&ee.timings[Fe]!==void 0?{...Ce,ms:Math.round(ee.timings[Fe]*100)/100,state:"done"}:Ce}))},onError:ee=>{he(ee),e("idle")}});return G.connect(),Re.current=G,()=>{G.close(),Re.current=null}},[]),Z.useEffect(()=>{const G=new uw({mode:"transcribe",languageCode:"auto",streamType:"fast",onPartial:k=>{D(k)},onFinal:(k,De)=>{var Ce,Fe;if((Ce=ye.current)==null||Ce.stop(),(Fe=K.current)==null||Fe.close(),k.trim()){const ke=De?De.split("-")[0].toLowerCase():E0(k);Ot.current(k.trim(),ke)}else e("idle")},onError:(k,De)=>{var Ce;he(k),De&&((Ce=ye.current)==null||Ce.stop(),e("idle"))}}),ee=new mw({localVad:!1,onState:s,onPcm:k=>{var De;(De=K.current)==null||De.pushPcm(k)}}),ue=new rw({onWord:(k,De)=>Y({index:k,length:De}),onEnd:()=>{e("idle"),Y({index:0,length:0})}});return K.current=G,ye.current=ee,me.current=ue,"speechSynthesis"in window&&window.speechSynthesis.getVoices(),()=>{ee.stop(),G.close(),ue.cancel(),Nt.reset(),Nt.speaker="idle",ye.current=null,K.current=null,me.current=null}},[]);const ct=Z.useCallback(()=>{var ee,ue,k;if(Oe.current==="listening"||Oe.current==="thinking")return;(ee=me.current)==null||ee.cancel(),H(""),D(""),he(null),e("listening");const G=qe.current==="auto"?void 0:qe.current;(ue=K.current)==null||ue.connect(G),(k=ye.current)==null||k.start()},[]),Ye=Z.useCallback(()=>{var G,ee;Oe.current==="listening"&&((G=ye.current)==null||G.stop(),(ee=K.current)==null||ee.close(),e("thinking"),h(jo()))},[]),at=Z.useCallback(()=>{var ee;const G=Oe.current;G==="listening"?Ye():G==="speaking"?((ee=me.current)==null||ee.cancel(),e("idle")):G==="idle"&&ct()},[ct,Ye]);Z.useEffect(()=>{const G=k=>k instanceof HTMLElement&&(k.tagName==="INPUT"||k.tagName==="SELECT"||k.isContentEditable),ee=k=>{k.code!=="Space"||k.repeat||G(k.target)||b||(k.preventDefault(),ct())},ue=k=>{k.code!=="Space"||G(k.target)||b||(k.preventDefault(),Ye())};return window.addEventListener("keydown",ee),window.addEventListener("keyup",ue),()=>{window.removeEventListener("keydown",ee),window.removeEventListener("keyup",ue)}},[ct,Ye,b]);const Jt=(()=>{if(r==="speaking"&&j){const{index:G,length:ee}=z,ue=j.slice(0,G),k=ee?j.slice(G,G+ee):"",De=j.slice(G+(ee||0));return A.jsxs("div",{className:"caption__in","data-role":"agent",children:[ue,k&&A.jsx("em",{children:k}),A.jsx("s",{children:De})]})}if(r==="listening")return A.jsxs("div",{className:"caption__in","data-role":"user",children:[N||A.jsx("span",{style:{color:"var(--ink-3)"},children:"Listening…"}),A.jsx("span",{className:"caption__cursor"})]});if(r==="thinking"){const G=[...l].reverse().find(ee=>ee.role==="user");return A.jsx("div",{className:"caption__in","data-role":"idle",children:j||(G==null?void 0:G.text)||"Retrieving from Redis…"})}return V?A.jsx("div",{className:"caption__in","data-role":"idle",style:{color:"var(--red-hi)"},children:V}):i==="denied"?A.jsx("div",{className:"caption__in","data-role":"idle",children:"Microphone blocked. Allow it in the address bar, or type a question below."}):ne?A.jsx("div",{className:"caption__in","data-role":"idle",children:l.length?"Press space, or the button, to ask again.":"Hold space or press the button, then ask a question — words stream in real time, and answers return in complete sentences."}):A.jsx("div",{className:"caption__in","data-role":"idle",children:"Connecting to backend…"})})(),O=l.find(G=>G.id===_)??null,T=(O==null?void 0:O.trace)??p;return A.jsxs("div",{className:"cs","data-enter":$,"data-leaving":Se,children:[A.jsxs("header",{className:"cs__bar",children:[A.jsxs("a",{href:"/",className:"cs__back",onClick:zt,children:[A.jsx("span",{className:"chev",children:"←"})," ZATPAT",A.jsx("span",{style:{color:"var(--ink-3)"},children:".AI"})]}),A.jsxs("div",{className:"cs__tabs",children:[A.jsx("button",{className:"cs__tab","data-on":b==="strategy",onClick:()=>y("strategy"),children:"Chunking"}),A.jsx("button",{className:"cs__tab","data-on":b==="guardrails",onClick:()=>y("guardrails"),children:"Guardrails"})]}),A.jsx("div",{className:"cs__spacer"}),A.jsxs("label",{className:"cs__lang",children:[A.jsx("span",{className:"label",children:"Language"}),A.jsxs("select",{value:pe,onChange:G=>B(G.target.value),children:[A.jsx("option",{value:"auto",children:"Auto-detect"}),A.jsx("option",{value:"hi-IN",children:"हिन्दी (Hindi)"}),A.jsx("option",{value:"mr-IN",children:"मराठी (Marathi)"}),A.jsx("option",{value:"ta-IN",children:"தமிழ் (Tamil)"}),A.jsx("option",{value:"sa-IN",children:"संस्कृतम् (Sanskrit)"}),A.jsx("option",{value:"en-IN",children:"English"})]})]}),A.jsxs("div",{className:"cs__state","data-phase":r,children:[A.jsx("i",{}),r==="idle"&&(ne?"ready":"connecting…"),r==="listening"&&"listening",r==="thinking"&&"retrieving",r==="speaking"&&"answering"]})]}),A.jsxs("div",{className:"cs__body",children:[A.jsx(aw,{messages:l,selectedId:_,onSelect:G=>{L(G.id),G.trace&&y("trace")},onClear:()=>{c([]),m(null),L(null),h(jo()),g(null),Ee.current="session_"+Wo()}}),A.jsxs("main",{className:"stage",children:[A.jsx("div",{className:"stage__orb",ref:P}),A.jsx("div",{className:"caption",children:Jt}),A.jsxs("div",{className:"ctl",children:[A.jsxs("div",{className:"type",children:[A.jsx("span",{className:"label",style:{color:"var(--ink-3)"},children:"›"}),A.jsx("input",{value:U,onChange:G=>w(G.target.value),onKeyDown:G=>{G.key==="Enter"&&U.trim()&&r!=="thinking"&&(je(U),w(""))},placeholder:"Ask any question in any language (Auto-detected)...","aria-label":"Type a query"})]}),A.jsx(ew,{phase:r,onToggle:at,disabled:r==="thinking"}),A.jsx("div",{className:"ctl__right",children:A.jsxs("span",{className:"ctl__hint",children:[A.jsx("kbd",{children:"space"})," hold to talk · ",A.jsx("kbd",{children:"click"})," auto-stop"]})})]})]}),A.jsx($C,{stages:f,trace:p,previousTotal:v,onOpen:()=>y("trace")})]}),b==="strategy"&&A.jsx(tw,{strategies:E,trace:T,onClose:()=>y(null)}),b==="guardrails"&&A.jsx(KC,{rails:x,trace:T,onToggle:G=>M(ee=>ee.map(ue=>ue.id===G?{...ue,enabled:!ue.enabled}:ue)),onAdd:G=>M(ee=>[...ee,G]),onRemove:G=>M(ee=>ee.filter(ue=>ue.id!==G)),onClose:()=>y(null)}),b==="trace"&&T&&A.jsx(nw,{trace:T,onClose:()=>y(null)})]})}function fd(r){return{stt:"stt_ms",input_guard:"input_guardrail_ms",session:"session_load_ms",retrieval:"retrieval_ms",output_guard:"output_guardrail_ms",llm_gen:"llm_generation_ms",groundedness:"groundedness_ms"}[r]??null}function yw(){return A.jsxs(A.Fragment,{children:[A.jsx(jC,{}),A.jsxs(GM,{children:[A.jsx(Xc,{path:"/",element:A.jsx(ZC,{})}),A.jsx(Xc,{path:"/chat",element:A.jsx(Sw,{})}),A.jsx(Xc,{path:"*",element:A.jsx(IM,{to:"/",replace:!0})})]})]})}Gy.createRoot(document.getElementById("root")).render(A.jsx(Z.StrictMode,{children:A.jsx(fE,{children:A.jsx(yw,{})})}));
