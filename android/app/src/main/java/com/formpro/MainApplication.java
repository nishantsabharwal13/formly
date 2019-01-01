package com.formpro;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;

import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
import cl.json.RNSharePackage;
import com.imagepicker.ImagePickerPackage;
import com.terrylinla.rnsketchcanvas.SketchCanvasPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;

import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import cl.json.ShareApplication;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ShareApplication, ReactApplication {

  @Override
  protected ReactGateway createReactGateway() {
      ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
          @Override
          protected String getJSMainModuleName() {
              return "index";
          }
      };
      return new ReactGateway(this, isDebug(), host);
  }
  
  @Override
  public boolean isDebug() {
      return BuildConfig.DEBUG;
  }
     @Override
     public String getFileProviderAuthority() {
            return "com.formpro.provider";
     }
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNFetchBlobPackage(),
            new AppCenterReactNativePackage(MainApplication.this),
            new RNHTMLtoPDFPackage(),
            new RNSharePackage(),
            new ImagePickerPackage(),
            new SketchCanvasPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics))
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }


  // public ReactNativeHost getReactNativeHost() {
  //   return mReactNativeHost;
  // }

  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    long size = 50L * 1024L * 1024L; // 50 MB 
    com.facebook.react.modules.storage.ReactDatabaseSupplier.getInstance(getApplicationContext()).setMaximumSize(size);
  }
}
