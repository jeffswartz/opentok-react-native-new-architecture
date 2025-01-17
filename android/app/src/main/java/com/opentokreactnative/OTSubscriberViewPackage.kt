package com.opentokreactnative

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class OTSubscriberViewPackage : TurboReactPackage() {
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(OTSubscriberViewManager(reactContext))
  }

  override fun getModule(s: String, reactApplicationContext: ReactApplicationContext): NativeModule? {
    when (s) {
      OTSubscriberViewManager.REACT_CLASS -> OTSubscriberViewManager(reactApplicationContext)
    }
    return null
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
    mapOf(OTSubscriberViewManager.REACT_CLASS to ReactModuleInfo(
      _name = OTSubscriberViewManager.REACT_CLASS,
      _className = OTSubscriberViewManager.REACT_CLASS,
      _canOverrideExistingModule = false,
      _needsEagerInit = false,
      isCxxModule = false,
      isTurboModule = true,
    )
    )
  }
}