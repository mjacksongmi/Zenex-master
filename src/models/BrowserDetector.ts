export default class BrowserDetector {

   public Browser: string = "UNKNOWN";
   public iOS: string = "UNKNOWN";
   public Android: string = "UNKNOWN";
   public WebOS: string = "UNKNOWN";
   public MacOSX: string = "UNKNOWN";
   public Windows: string = "UNKNOWN";
   public IsMobile: boolean = false;
   public iPhone: boolean = false;
   public iPad: boolean = false;
   public IsMacOSX: boolean = false;
   public IsAndroid: boolean = false;
   public IsWebOS: boolean = false;
   public IsMac: boolean = false;
   public IsWindows: boolean = true;

   constructor(headers) {
       
       var ua = headers['user-agent'];

       if(/firefox/i.test(ua) ) { this.Browser = 'firefox'; }
       else if(/chrome/i.test(ua) ) { this.Browser = 'chrome'; }
       else if(/safari/i.test(ua) ) { this.Browser = 'safari'; }
       else if(/msie/i.test(ua) ) { this.Browser = 'msie'; }
       else { this.Browser = 'unknown'; }
       
       this.IsMobile = /mobile/i.test(ua);     

       if (/like Mac OS X/.test(ua)) {
           this.IsMacOSX = true;
           this.iOS = (/CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua) as any)[2].replace(/_/g, '.');
           this.iPhone = /iPhone/.test(ua);
           this.iPad = /iPad/.test(ua);
       }
       
       if (/Android/.test(ua)) {
           this.IsAndroid = true;
           this.Android = (/Android ([0-9\.]+)[\);]/.exec(ua) as any)[1];
       }
       if (/webOS\//.test(ua)) {
           this.IsWebOS = true;
           this.WebOS = (/webOS\/([0-9\.]+)[\);]/.exec(ua) as any)[1];
       }
       
       if (/(Intel|PPC) Mac OS X/.test(ua)) {
           this.IsMacOSX = true;
           this.MacOSX = (/(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua) as any)[2].replace(/_/g, '.');
       }

       if (/Windows NT/.test(ua)) {
           this.IsWindows = true;
           this.Windows = (/Windows NT ([0-9\._]+)[\);]/.exec(ua) as any)[1];
       }

   }
   
}