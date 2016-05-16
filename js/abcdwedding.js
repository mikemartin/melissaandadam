/*
CSS Browser Selector 0.6.1
Originally written by Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/

Co-maintained by:
https://github.com/verbatim/css_browser_selector

*/

showLog=true;
function log(m) {if ( window.console && showLog ) {console.log(m); }  }

function css_browser_selector(u)
  {
  var uaInfo = {},
    screens = [320, 480, 640, 768, 1024, 1152, 1280, 1440, 1680, 1920, 2560],
    allScreens = screens.length,
    ua=u.toLowerCase(),
    is=function(t) { return RegExp(t,"i").test(ua);  },
    version = function(p,n) 
      { 
      n=n.replace(".","_"); var i = n.indexOf('_'),  ver=""; 
      while (i>0) {ver += " "+ p+n.substring(0,i);i = n.indexOf('_', i+1);} 
      ver += " "+p+n; return ver; 
      },
    g='gecko',
    w='webkit',
    c='chrome',
    f='firefox',
    s='safari',
    o='opera',
    m='mobile',
    a='android',
    bb='blackberry',
    lang='lang_',
    dv='device_',
    html=document.documentElement,
    b=  [
    
      // browser
      (!(/opera|webtv/i.test(ua))&&/msie\s(\d+)/.test(ua))?('ie ie'+(/trident\/4\.0/.test(ua) ? '8' : RegExp.$1))
      :is('firefox/')?g+ " " + f+(/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+f+RegExp.$2 + ' '+f+RegExp.$2+"_"+RegExp.$4:'')  
      :is('gecko/')?g
      :is('opera')?o+(/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+o+RegExp.$2 + ' '+o+RegExp.$2+"_"+RegExp.$4 : (/opera(\s|\/)(\d+)\.(\d+)/.test(ua)?' '+o+RegExp.$2+" "+o+RegExp.$2+"_"+RegExp.$3:''))
      :is('konqueror')?'konqueror'
  
      :is('blackberry') ? 
        ( bb + 
          ( /Version\/(\d+)(\.(\d+)+)/i.test(ua)
            ? " " + bb+ RegExp.$1 + " "+bb+ RegExp.$1+RegExp.$2.replace('.','_')
            : (/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua) 
              ? ' ' +bb+RegExp.$2 + (RegExp.$3?' ' +bb+RegExp.$2+RegExp.$3:'')
              : '')
          )
        ) // blackberry
  
      :is('android') ? 
        (  a +
          ( /Version\/(\d+)(\.(\d+))+/i.test(ua)
            ? " " + a+ RegExp.$1 + " "+a+ RegExp.$1+RegExp.$2.replace('.','_')
            : '')
          + (/Android (.+); (.+) Build/i.test(ua)
            ? ' '+dv+( (RegExp.$2).replace(/ /g,"_") ).replace(/-/g,"_")
            :'' )
        ) //android
  
      :is('chrome')?w+   ' '+c+(/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+c+RegExp.$2 +((RegExp.$4>0) ? ' '+c+RegExp.$2+"_"+RegExp.$4:''):'') 
      
      :is('iron')?w+' iron'
      
      :is('applewebkit/') ? 
        ( w+ ' '+ s + 
          ( /version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)
            ?  ' '+ s +RegExp.$2 + " "+s+ RegExp.$2+RegExp.$3.replace('.','_')
            :  ( / Safari\/(\d+)/i.test(ua) 
              ? 
              ( (RegExp.$1=="419" || RegExp.$1=="417" || RegExp.$1=="416" || RegExp.$1=="412" ) ? ' '+ s + '2_0' 
                : RegExp.$1=="312" ? ' '+ s + '1_3'
                : RegExp.$1=="125" ? ' '+ s + '1_2'
                : RegExp.$1=="85" ? ' '+ s + '1_0'
                : '' )
              :'')
            )
        ) //applewebkit 
    
      :is('mozilla/')?g
      :''
      
      // mobile
      ,is("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk")?m:''
      
      // os/platform
      ,is('j2me')?'j2me'
      :is('ipad|ipod|iphone')?  
        ( 
          (
            /CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(ua)  ?
            'ios' + version('ios',RegExp.$2) : ''
          ) + ' ' + ( /(ip(ad|od|hone))/gi.test(ua) ? RegExp.$1 : "" )
        ) //'iphone'
      //:is('ipod')?'ipod'
      //:is('ipad')?'ipad'
      :is('playbook')?'playbook'
      :is('kindle|silk')?'kindle'
      :is('playbook')?'playbook'
      :is('mac')?'mac'+ (/mac os x ((\d+)[.|_](\d+))/.test(ua) ?    ( ' mac' + (RegExp.$2)  +  ' mac' + (RegExp.$1).replace('.',"_")  )     : '' )
      :is('win')?'win'+
          (is('windows nt 6.2')?' win8'
          :is('windows nt 6.1')?' win7'
          :is('windows nt 6.0')?' vista'
          :is('windows nt 5.2') || is('windows nt 5.1') ? ' win_xp' 
          :is('windows nt 5.0')?' win_2k'
          :is('windows nt 4.0') || is('WinNT4.0') ?' win_nt'
          : ''
          ) 
      :is('freebsd')?'freebsd'
      :(is('x11|linux'))?'linux'
      :''
      
      // user agent language
      ,(/[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua))?(lang+RegExp.$2).replace("-","_")+(RegExp.$3!=''?(' '+lang+RegExp.$1).replace("-","_"):''):''
    
      // beta: test if running iPad app
      ,( is('ipad|iphone|ipod') && !is('safari') )  ?  'ipad_app'  : ''
    
    
    ]; // b

    function screenSize() 
      {
    var w = window.outerWidth || html.clientWidth;
    var h = window.outerHeight || html.clientHeight;
    uaInfo.orientation = ((w<h) ? "portrait" : "landscape");
        // remove previous min-width, max-width, client-width, client-height, and orientation
        html.className = html.className.replace(/ ?orientation_\w+/g, "").replace(/ [min|max|cl]+[w|h]_\d+/g, "")
        for (var i=(allScreens-1);i>=0;i--) { if (w >= screens[i] ) { uaInfo.maxw = screens[i]; break; }}
    widthClasses="";
        for (var info in uaInfo) { widthClasses+=" "+info+"_"+ uaInfo[info]  };
    html.className =  ( html.className +widthClasses  );
    return widthClasses;
      } // screenSize
  
    window.onresize = screenSize;
  screenSize(); 

  var cssbs = (b.join(' ')) + " js ";
  html.className =   ( cssbs + html.className.replace(/\b(no[-|_]?)?js\b/g,"")  ).replace(/^ /, "").replace(/ +/g," ");

  return cssbs;
  }
  
css_browser_selector(navigator.userAgent);


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */


'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Button = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = (function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Button, [{
      key: 'toggle',

      // public

      value: function toggle() {
        var triggerChangeEvent = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(this._element).trigger('change');
            }
          }
        } else {
          this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
})(jQuery);
//# sourceMappingURL=button.js.map

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-flexbox-flexboxlegacy-domprefixes-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function s(e){var n=w.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?w.className.baseVal=n:w.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function l(e,n){return!!~(""+e).indexOf(n)}function f(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?f(o,t||n):o);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(){var e=n.body;return e||(e=i(_?"svg":"body"),e.fake=!0),e}function p(e,t,r,o){var s,a,l,f,u="modernizr",d=i("div"),p=c();if(parseInt(r,10))for(;r--;)l=i("div"),l.id=o?o[r]:u+(r+1),d.appendChild(l);return s=i("style"),s.type="text/css",s.id="s"+u,(p.fake?p:d).appendChild(s),p.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",f=w.style.overflow,w.style.overflow="hidden",w.appendChild(p)),a=t(d,e),p.fake?(p.parentNode.removeChild(p),w.style.overflow=f,w.offsetHeight):d.parentNode.removeChild(d),!!a}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+d(n[o])+":"+r+")");return s=s.join(" or "),p("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function h(e,n,o,s){function f(){d&&(delete z.style,delete z.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var u=m(e,o);if(!r(u,"undefined"))return u}for(var d,c,p,h,v,y=["modernizr","tspan"];!z.style;)d=!0,z.modElem=i(y.shift()),z.style=z.modElem.style;for(p=e.length,c=0;p>c;c++)if(h=e[c],v=z.style[h],l(h,"-")&&(h=a(h)),z.style[h]!==t){if(s||r(o,"undefined"))return f(),"pfx"==n?h:!0;try{z.style[h]=o}catch(g){}if(z.style[h]!=v)return f(),"pfx"==n?h:!0}return f(),!1}function v(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+E.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?h(a,n,o,s):(a=(e+" "+b.join(i+" ")+i).split(" "),u(a,n,t))}function y(e,n,r){return v(e,t,t,n,r)}var g=[],C=[],x={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=x,Modernizr=new Modernizr;var w=n.documentElement,_="svg"===w.nodeName.toLowerCase(),S="Moz O ms Webkit",b=x._config.usePrefixes?S.toLowerCase().split(" "):[];x._domPrefixes=b;var E=x._config.usePrefixes?S.split(" "):[];x._cssomPrefixes=E;var P={elem:i("modernizr")};Modernizr._q.push(function(){delete P.elem});var z={style:P.elem.style};Modernizr._q.unshift(function(){delete z.style}),x.testAllProps=v,x.testAllProps=y,Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),Modernizr.addTest("flexboxlegacy",y("boxDirection","reverse",!0)),o(),s(g),delete x.addTest,delete x.addAsyncTest;for(var N=0;N<Modernizr._q.length;N++)Modernizr._q[N]();e.Modernizr=Modernizr}(window,document);
WebFontConfig = {
  google: { families: [ 'Lato:400,700:latin', 'Oswald:300:latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();


//# sourceMappingURL=abcdwedding.js.map
