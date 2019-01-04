/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <AppCenterReactNativeCrashes/AppCenterReactNativeCrashes.h>
#import <AppCenterReactNativeAnalytics/AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNative/AppCenterReactNative.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#if RCT_DEV
  #import <React/RCTDevLoadingView.h>
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];

  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];  // Initialize AppCenter crashes

  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];  // Initialize AppCenter analytics

  [AppCenterReactNative register];  // Initialize AppCenter 

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  // RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
  //                                                     moduleName:@"FormPro"
  //                                              initialProperties:nil
  //                                                  launchOptions:launchOptions];

  RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
                                            moduleProvider:nil
                                             launchOptions:launchOptions];
// #if RCT_DEV
//   [bridge moduleForClass:[RCTDevLoadingView class]];
// #endif
//   RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
//                                                    moduleName:@"FormPro"
//                                             initialProperties:nil];   
                                            
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
                                                                                                                                    
  // rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  // self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  // UIViewController *rootViewController = [UIViewController new];
  // rootViewController.view = rootView;
  // self.window.rootViewController = rootViewController;
  // [self.window makeKeyAndVisible];
  return YES;
}

@end
